import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { StudyHistoryStore } from './study-history.store';
import { FlashcardStore } from './flashcard.store';
import { MemoryStudyStorage } from '../storage/memory-study-storage';
import { provideMemoryStudyStorage } from '../storage/study-storage.token';
import { STUDY_STORAGE } from '../storage/study-storage.token';
import { CLOCK } from '../core/clock';
import { SESSION_KINDS } from '../models/study-history.model';
import type { SessionRecord } from '../models/study-history.model';
import {
  emptyProgressDocument,
  rebuildProgress,
  SCHEDULER_ALGO,
} from '../util/progress-projection';
import type { Question } from '../models/question.model';

const NOW = 1_700_000_000_000;

function baseQuestion(overrides: Partial<Question>): Question {
  return {
    id: 1,
    examen: 'Examen 1',
    pregunta: 1,
    afirmacion: 'Afirmación de prueba',
    respuesta: true,
    justificacion: '',
    unidades: ['Unidad 1'],
    referencias: [],
    examenes: ['Examen 1'],
    frecuencia: 1,
    frecuencia_concepto: 1,
    ...overrides,
  };
}

function record(id: string, questionId = 1, correct = true): SessionRecord {
  return {
    id,
    kind: SESSION_KINDS.free,
    startedAt: NOW,
    endedAt: NOW + 1_000,
    unidades: [],
    plannedCount: 1,
    answers: [{ questionId, correct, userAnswer: correct, at: NOW + 500 }],
  };
}

function configure(): void {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      provideMemoryStudyStorage(),
      { provide: CLOCK, useValue: () => NOW },
    ],
  });
}

describe('StudyHistoryStore', () => {
  beforeEach(configure);

  it('arranca vacío tras hidratar sin datos previos', async () => {
    const store = TestBed.inject(StudyHistoryStore);

    await store.hydrate();

    expect(store.history()).toEqual([]);
    expect(store.progress()).toEqual(emptyProgressDocument());
    expect(store.hydrated()).toBe(true);
  });

  it('persiste la sesión y actualiza el agregado', async () => {
    const store = TestBed.inject(StudyHistoryStore);
    await store.hydrate();

    await store.recordSession(record('s1', 7, false));

    expect(store.history().map((s) => s.id)).toEqual(['s1']);
    expect(store.progress().byQuestion[7].stats).toMatchObject({
      seen: 1,
      correct: 0,
    });
    expect(store.progress().lastSessionId).toBe('s1');
  });

  it('recupera lo guardado en una carga posterior', async () => {
    const storage = TestBed.inject(MemoryStudyStorage);
    const first = TestBed.inject(StudyHistoryStore);
    await first.hydrate();
    await first.recordSession(record('s1'));

    // Simula un arranque nuevo compartiendo el mismo almacenamiento.
    expect((await storage.loadHistory()).map((s) => s.id)).toEqual(['s1']);
    expect((await storage.loadProgress())?.lastSessionId).toBe('s1');
  });

  it('reconstruye el agregado cuando no cuadra con el historial', async () => {
    const storage = TestBed.inject(STUDY_STORAGE);
    await storage.appendSession(record('s1', 7, false));
    await storage.appendSession(record('s2', 7, false));
    // Caché que dice cubrir una sola sesión: quedó desincronizada.
    await storage.saveProgress({
      ...rebuildProgress([record('s1', 7, false)]),
    });

    const store = TestBed.inject(StudyHistoryStore);
    await store.hydrate();

    expect(store.progress().sourceSessionCount).toBe(2);
    expect(store.progress().byQuestion[7].stats.seen).toBe(2);
  });

  it('reconstruye si el agregado viene de otro algoritmo', async () => {
    const storage = TestBed.inject(STUDY_STORAGE);
    await storage.appendSession(record('s1'));
    await storage.saveProgress({
      ...rebuildProgress([record('s1')]),
      algo: 'sm2',
    });

    const store = TestBed.inject(StudyHistoryStore);
    await store.hydrate();

    expect(store.progress().algo).toBe(SCHEDULER_ALGO);
  });

  it('vacía historial y agregado al limpiar', async () => {
    const store = TestBed.inject(StudyHistoryStore);
    await store.hydrate();
    await store.recordSession(record('s1'));

    await store.clear();

    expect(store.history()).toEqual([]);
    expect(store.progress().byQuestion).toEqual({});
  });
});

describe('FlashcardStore · grabado de sesiones', () => {
  beforeEach(configure);

  async function loadSession(questions: Question[]) {
    const store = TestBed.inject(FlashcardStore);
    const history = TestBed.inject(StudyHistoryStore);
    const http = TestBed.inject(HttpTestingController);

    const loading = store.loadQuestions();
    http.expectOne('/data/preguntas.json').flush(questions);
    await loading;
    await history.hydrate();
    http.verify();

    return { store, history };
  }

  it('guarda la sesión al terminarla', async () => {
    const { store, history } = await loadSession([baseQuestion({ id: 1 })]);
    store.startSession();
    store.answerQuestion(true);

    await store.finishSession();

    expect(history.history()).toHaveLength(1);
    expect(history.history()[0].answers).toHaveLength(1);
    expect(history.history()[0].kind).toBe(SESSION_KINDS.free);
  });

  it('no duplica la sesión si se termina dos veces', async () => {
    const { store, history } = await loadSession([baseQuestion({ id: 1 })]);
    store.startSession();
    store.answerQuestion(true);

    await Promise.all([store.finishSession(), store.finishSession()]);

    expect(history.history()).toHaveLength(1);
  });

  it('no guarda nada si no se respondió ninguna pregunta', async () => {
    const { store, history } = await loadSession([baseQuestion({ id: 1 })]);
    store.startSession();

    await store.finishSession();

    expect(history.history()).toEqual([]);
  });

  it('guarda la sesión previa antes de repasar los errores', async () => {
    const { store, history } = await loadSession([
      baseQuestion({ id: 1, respuesta: true }),
      baseQuestion({ id: 2, respuesta: true }),
    ]);
    store.startSession();
    store.answerQuestion(!store.currentQuestion()!.respuesta);
    store.nextQuestion();
    store.answerQuestion(store.currentQuestion()!.respuesta);

    await store.reviewMistakes();

    expect(history.history()).toHaveLength(1);
    expect(history.history()[0].answers).toHaveLength(2);
    expect(store.sessionKind()).toBe(SESSION_KINDS.mistakes);
    expect(store.answers()).toEqual([]);
  });

  it('registra la sesión abandonada con menos respuestas que preguntas', async () => {
    const { store, history } = await loadSession([
      baseQuestion({ id: 1 }),
      baseQuestion({ id: 2 }),
      baseQuestion({ id: 3 }),
    ]);
    store.startSession();
    store.answerQuestion(true);

    await store.finishSession();

    const saved = history.history()[0];
    expect(saved.plannedCount).toBe(3);
    expect(saved.answers).toHaveLength(1);
  });

  it('marca como dirigida la sesión lanzada desde el diagnóstico', async () => {
    const { store } = await loadSession([
      baseQuestion({ id: 1 }),
      baseQuestion({ id: 2 }),
    ]);

    await store.startTargetedSession([baseQuestion({ id: 2 })]);

    expect(store.sessionKind()).toBe(SESSION_KINDS.targeted);
    expect(store.filteredQuestions().map((q) => q.id)).toEqual([2]);
    expect(store.sessionActive()).toBe(true);
  });

  it('ignora una sesión dirigida sin preguntas', async () => {
    const { store } = await loadSession([baseQuestion({ id: 1 })]);

    await store.startTargetedSession([]);

    expect(store.sessionActive()).toBe(false);
  });

  it('no expulsa de resultados: terminar no desactiva la sesión', async () => {
    const { store } = await loadSession([baseQuestion({ id: 1 })]);
    store.startSession();
    store.answerQuestion(true);
    store.nextQuestion();

    store.finishSession();

    expect(store.sessionComplete()).toBe(true);
    expect(store.sessionActive()).toBe(true);
  });

  it('acumula el progreso de varias sesiones sobre la misma pregunta', async () => {
    const { store, history } = await loadSession([
      baseQuestion({ id: 1, respuesta: true }),
    ]);

    store.startSession();
    store.answerQuestion(false);
    await store.finishSession();

    store.startSession();
    store.answerQuestion(true);
    await store.finishSession();

    expect(history.history()).toHaveLength(2);
    expect(history.progress().byQuestion[1].stats).toMatchObject({
      seen: 2,
      correct: 1,
    });
  });
});
