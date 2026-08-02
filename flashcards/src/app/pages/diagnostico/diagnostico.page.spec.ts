import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideMarkdown } from 'ngx-markdown';
import DiagnosticoPage from './diagnostico.page';
import { FlashcardStore } from '../../store/flashcard.store';
import { StudyHistoryStore } from '../../store/study-history.store';
import { provideMemoryStudyStorage } from '../../storage/study-storage.token';
import { STUDY_STORAGE } from '../../storage/study-storage.token';
import { CLOCK } from '../../core/clock';
import { SESSION_KINDS } from '../../models/study-history.model';
import type {
  AnswerRecord,
  SessionRecord,
} from '../../models/study-history.model';
import type { Question } from '../../models/question.model';

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

function session(answers: readonly AnswerRecord[]): SessionRecord {
  return {
    id: 's1',
    kind: SESSION_KINDS.free,
    startedAt: NOW - 10_000,
    endedAt: NOW - 1_000,
    unidades: [],
    plannedCount: answers.length,
    answers,
  };
}

function answer(questionId: number, correct: boolean, at = NOW - 5_000) {
  return { questionId, correct, userAnswer: correct, at };
}

async function render(
  questions: Question[],
  history: readonly SessionRecord[] = [],
) {
  const storage = TestBed.inject(STUDY_STORAGE);
  for (const record of history) await storage.appendSession(record);

  const store = TestBed.inject(FlashcardStore);
  const historyStore = TestBed.inject(StudyHistoryStore);
  const http = TestBed.inject(HttpTestingController);

  const loading = store.loadQuestions();
  http.expectOne('/data/preguntas.json').flush(questions);
  await loading;
  await historyStore.hydrate();

  const fixture = TestBed.createComponent(DiagnosticoPage);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  http.verify();
  return fixture;
}

function textOf(fixture: { nativeElement: unknown }): string {
  return (fixture.nativeElement as HTMLElement).textContent ?? '';
}

function buttonWith(fixture: { nativeElement: unknown }, label: string) {
  return [
    ...(fixture.nativeElement as HTMLElement).querySelectorAll('button'),
  ].find((b) => (b.textContent ?? '').includes(label));
}

describe('DiagnosticoPage', () => {
  beforeEach(async () => {
    // jsdom no implementa matchMedia, del que depende ThemeService.
    if (!window.matchMedia) {
      window.matchMedia = ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      })) as unknown as typeof window.matchMedia;
    }

    await TestBed.configureTestingModule({
      imports: [DiagnosticoPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMarkdown(),
        provideMemoryStudyStorage(),
        { provide: CLOCK, useValue: () => NOW },
      ],
    }).compileComponents();
  });

  it('invita a estudiar cuando todavía no hay historial', async () => {
    const fixture = await render([baseQuestion({ id: 1 })]);

    expect(textOf(fixture)).toContain('Todavía no hay datos que analizar.');
  });

  it('resume cobertura y precisión del historial', async () => {
    const fixture = await render(
      [baseQuestion({ id: 1 }), baseQuestion({ id: 2 })],
      [session([answer(1, true), answer(1, false), answer(2, true)])],
    );

    const text = textOf(fixture);
    // 2 de 3 preguntas vistas y 2 de 3 respuestas correctas.
    expect(text).toContain('/2');
    expect(text).toContain('67%');
  });

  it('ordena el ranking de la más frágil a la menos', async () => {
    const fixture = await render(
      [
        baseQuestion({ id: 1, afirmacion: 'La difícil' }),
        baseQuestion({ id: 2, afirmacion: 'La fácil' }),
      ],
      [
        session([
          answer(1, false, NOW - 9_000),
          answer(1, false, NOW - 8_000),
          answer(2, true, NOW - 7_000),
          answer(2, true, NOW - 6_000),
        ]),
      ],
    );

    const text = textOf(fixture);
    expect(text.indexOf('La difícil')).toBeGreaterThanOrEqual(0);
    expect(text.indexOf('La difícil')).toBeLessThan(text.indexOf('La fácil'));
  });

  it('muestra el id de cada pregunta del ranking', async () => {
    const fixture = await render(
      [baseQuestion({ id: 84 })],
      [session([answer(84, false)])],
    );

    expect(textOf(fixture)).toContain('#84');
  });

  it('lanza una sesión dirigida con las peores y navega a la sesión', async () => {
    const fixture = await render(
      [
        baseQuestion({ id: 1, afirmacion: 'La difícil' }),
        baseQuestion({ id: 2, afirmacion: 'La fácil' }),
      ],
      [
        session([
          answer(1, false, NOW - 9_000),
          answer(2, true, NOW - 8_000),
        ]),
      ],
    );
    const store = TestBed.inject(FlashcardStore);
    const router = TestBed.inject(Router);
    const navigate = router.navigate.bind(router);
    const visited: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      visited.push(commands);
      return Promise.resolve(true);
    }) as typeof router.navigate;

    try {
      buttonWith(fixture, 'Todas (')!.click();
      await fixture.whenStable();
    } finally {
      router.navigate = navigate;
    }

    expect(store.sessionKind()).toBe(SESSION_KINDS.targeted);
    expect(store.filteredQuestions().map((q) => q.id).sort()).toEqual([1, 2]);
    expect(visited).toEqual([['/session']]);
  });

  it('limita la práctica al tamaño pedido', async () => {
    const questions = Array.from({ length: 12 }, (_, i) =>
      baseQuestion({ id: i + 1 }),
    );
    const fixture = await render(questions, [
      session(questions.map((q, i) => answer(q.id, false, NOW - 9_000 + i))),
    ]);
    const store = TestBed.inject(FlashcardStore);
    const router = TestBed.inject(Router);
    router.navigate = (() => Promise.resolve(true)) as typeof router.navigate;

    buttonWith(fixture, 'Repasar 10')!.click();
    await fixture.whenStable();

    expect(store.filteredQuestions()).toHaveLength(10);
  });

  it('pide confirmación antes de borrar el historial', async () => {
    const fixture = await render(
      [baseQuestion({ id: 1 })],
      [session([answer(1, false)])],
    );
    const history = TestBed.inject(StudyHistoryStore);

    buttonWith(fixture, 'Borrar historial')!.click();
    fixture.detectChanges();

    expect(history.history()).toHaveLength(1);
    expect(textOf(fixture)).toContain('Tocá de nuevo para borrar');

    buttonWith(fixture, 'Tocá de nuevo para borrar')!.click();
    await fixture.whenStable();

    expect(history.history()).toEqual([]);
  });
});
