import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { FlashcardStore } from './flashcard.store';
import { provideMemoryStudyStorage } from '../storage/study-storage.token';
import { CLOCK } from '../core/clock';
import type { Question } from '../models/question.model';

/** Reloj fijo: las respuestas llevan timestamp y no deben depender del real. */
const NOW = 1_700_000_000_000;

function baseQuestion(overrides: Partial<Question>): Question {
  return {
    id: 1,
    examen: 'Examen 1',
    pregunta: 1,
    afirmacion: 'Afirmación de prueba',
    respuesta: true,
    justificacion: 'Justificación de prueba',
    unidades: ['Unidad 1'],
    referencias: [],
    examenes: ['Examen 1'],
    frecuencia: 1,
    frecuencia_concepto: 1,
    ...overrides,
  };
}

type Store = InstanceType<typeof FlashcardStore>;

/** Responde la pregunta actual acertando o fallando, según se pida. */
function answerCurrent(store: Store, correctly: boolean): void {
  const question = store.currentQuestion();
  if (!question) throw new Error('No hay pregunta actual');
  store.answerQuestion(correctly ? question.respuesta : !question.respuesta);
}

async function loadStore(questions: Question[]): Promise<Store> {
  const store = TestBed.inject(FlashcardStore);
  const http = TestBed.inject(HttpTestingController);

  const loading = store.loadQuestions();
  http.expectOne('/data/preguntas.json').flush(questions);
  await loading;
  http.verify();

  return store;
}

describe('FlashcardStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMemoryStudyStorage(),
        { provide: CLOCK, useValue: () => NOW },
      ],
    });
  });

  describe('startSession', () => {
    it('activa la sesión con todas las preguntas cuando no hay unidades seleccionadas', async () => {
      const store = await loadStore([
        baseQuestion({ id: 1, unidades: ['Unidad 1'] }),
        baseQuestion({ id: 2, unidades: ['Unidad 2'] }),
      ]);

      store.startSession();

      expect(store.sessionActive()).toBe(true);
      expect(store.sessionComplete()).toBe(false);
      expect(store.stats().total).toBe(2);
      expect(store.currentIndex()).toBe(0);
      expect(store.answers()).toEqual([]);
    });

    it('filtra por las unidades seleccionadas', async () => {
      const store = await loadStore([
        baseQuestion({ id: 1, unidades: ['Unidad 1'] }),
        baseQuestion({ id: 2, unidades: ['Unidad 2'] }),
        baseQuestion({ id: 3, unidades: ['Unidad 2', 'Unidad 3'] }),
      ]);

      store.toggleUnidad('Unidad 2');
      store.startSession();

      expect(store.filteredQuestions().map((q) => q.id).sort()).toEqual([2, 3]);
    });
  });

  describe('answerQuestion', () => {
    it('registra la respuesta, marca el acierto y voltea la tarjeta', async () => {
      const store = await loadStore([baseQuestion({ id: 7, respuesta: true })]);
      store.startSession();

      store.answerQuestion(true);

      expect(store.answers()).toEqual([
        {
          questionId: 7,
          answeredCorrectly: true,
          userAnswer: true,
          answeredAt: NOW,
        },
      ]);
      expect(store.isFlipped()).toBe(true);
      expect(store.showJustification()).toBe(true);
      expect(store.stats().correct).toBe(1);
    });

    it('marca el error cuando la respuesta no coincide', async () => {
      const store = await loadStore([baseQuestion({ id: 7, respuesta: true })]);
      store.startSession();

      store.answerQuestion(false);

      expect(store.answers()[0].answeredCorrectly).toBe(false);
      expect(store.stats().incorrect).toBe(1);
    });

    it('ignora un segundo intento sobre la misma pregunta', async () => {
      const store = await loadStore([baseQuestion({ id: 7, respuesta: true })]);
      store.startSession();

      store.answerQuestion(false);
      store.answerQuestion(true);

      expect(store.answers()).toHaveLength(1);
      expect(store.answers()[0].userAnswer).toBe(false);
    });
  });

  describe('nextQuestion', () => {
    it('avanza el índice y reinicia el estado de la tarjeta', async () => {
      const store = await loadStore([
        baseQuestion({ id: 1 }),
        baseQuestion({ id: 2 }),
      ]);
      store.startSession();
      store.answerQuestion(true);

      store.nextQuestion();

      expect(store.currentIndex()).toBe(1);
      expect(store.isFlipped()).toBe(false);
      expect(store.showJustification()).toBe(false);
      expect(store.sessionComplete()).toBe(false);
    });

    it('marca la sesión como completa al pasar la última pregunta', async () => {
      const store = await loadStore([baseQuestion({ id: 1 })]);
      store.startSession();
      store.answerQuestion(true);

      store.nextQuestion();

      expect(store.sessionComplete()).toBe(true);
      expect(store.currentIndex()).toBe(0);
    });
  });

  describe('previousQuestion', () => {
    it('no retrocede más allá de la primera pregunta', async () => {
      const store = await loadStore([baseQuestion({ id: 1 })]);
      store.startSession();

      store.previousQuestion();

      expect(store.currentIndex()).toBe(0);
    });
  });

  describe('restartSession', () => {
    it('conserva el mismo conjunto de preguntas y limpia las respuestas', async () => {
      const store = await loadStore([
        baseQuestion({ id: 1 }),
        baseQuestion({ id: 2 }),
      ]);
      store.startSession();
      store.answerQuestion(true);

      store.restartSession();

      expect(store.answers()).toEqual([]);
      expect(store.currentIndex()).toBe(0);
      expect(store.sessionComplete()).toBe(false);
      expect(store.filteredQuestions().map((q) => q.id).sort()).toEqual([1, 2]);
    });
  });

  describe('reviewMistakes', () => {
    it('deja en el pool sólo las preguntas falladas', async () => {
      const store = await loadStore([
        baseQuestion({ id: 1, respuesta: true }),
        baseQuestion({ id: 2, respuesta: false }),
        baseQuestion({ id: 3, respuesta: true }),
      ]);
      store.startSession();

      const failedId = store.currentQuestion()!.id;
      answerCurrent(store, false);
      store.nextQuestion();
      answerCurrent(store, true);
      store.nextQuestion();
      answerCurrent(store, true);

      store.reviewMistakes();

      expect(store.filteredQuestions().map((q) => q.id)).toEqual([failedId]);
      expect(store.answers()).toEqual([]);
      expect(store.currentIndex()).toBe(0);
      expect(store.sessionComplete()).toBe(false);
    });

    it('no hace nada cuando no hubo errores', async () => {
      const store = await loadStore([
        baseQuestion({ id: 1 }),
        baseQuestion({ id: 2 }),
      ]);
      store.startSession();
      answerCurrent(store, true);

      store.reviewMistakes();

      expect(store.filteredQuestions()).toHaveLength(2);
      expect(store.answers()).toHaveLength(1);
    });
  });

  describe('answeredQuestions', () => {
    it('descarta respuestas cuya pregunta ya no está en el pool', async () => {
      const store = await loadStore([
        baseQuestion({ id: 1, respuesta: true }),
        baseQuestion({ id: 2, respuesta: true }),
      ]);
      store.startSession();
      answerCurrent(store, false);
      store.nextQuestion();
      answerCurrent(store, true);

      expect(store.answeredQuestions()).toHaveLength(2);

      // reviewMistakes reduce el pool y limpia answers: sin respuestas huérfanas.
      store.reviewMistakes();

      expect(store.answeredQuestions()).toEqual([]);
    });
  });

  describe('endSession', () => {
    it('desactiva la sesión', async () => {
      const store = await loadStore([baseQuestion({ id: 1 })]);
      store.startSession();

      store.endSession();

      expect(store.sessionActive()).toBe(false);
      expect(store.sessionComplete()).toBe(false);
    });
  });
});
