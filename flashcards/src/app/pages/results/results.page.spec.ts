import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideMarkdown } from 'ngx-markdown';
import ResultsPage from './results.page';
import { FlashcardStore } from '../../store/flashcard.store';
import { provideMemoryStudyStorage } from '../../storage/study-storage.token';
import type { Question } from '../../models/question.model';

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

async function configureTestBed(): Promise<void> {
  // jsdom no implementa matchMedia, del que depende ThemeService (theme-toggle).
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
    imports: [ResultsPage],
    providers: [
      provideRouter([]),
      provideHttpClient(),
      provideHttpClientTesting(),
      provideMarkdown(),
      provideMemoryStudyStorage(),
    ],
  }).compileComponents();
}

/**
 * Monta la pantalla de resultados tras responder el set completo.
 * `answerCorrectly` indica, por posición **en la sesión**, si se acierta o se
 * falla; como `startSession` baraja, devuelve también qué pregunta cayó en cada
 * balde para que las aserciones no dependan del orden del array de entrada.
 */
async function renderWithAnswers(
  questions: Question[],
  answerCorrectly: readonly boolean[],
) {
  const store = TestBed.inject(FlashcardStore);
  const http = TestBed.inject(HttpTestingController);

  const loading = store.loadQuestions();
  http.expectOne('/data/preguntas.json').flush(questions);
  await loading;

  store.startSession();
  const failed: Question[] = [];
  const correct: Question[] = [];
  answerCorrectly.forEach((shouldBeCorrect, index) => {
    const question = store.currentQuestion()!;
    store.answerQuestion(
      shouldBeCorrect ? question.respuesta : !question.respuesta,
    );
    (shouldBeCorrect ? correct : failed).push(question);
    if (index < answerCorrectly.length - 1) store.nextQuestion();
  });

  const fixture = TestBed.createComponent(ResultsPage);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  http.verify();
  return { fixture, failed, correct };
}

function textOf(fixture: { nativeElement: unknown }): string {
  return (fixture.nativeElement as HTMLElement).textContent ?? '';
}

describe('ResultsPage · referencias', () => {
  beforeEach(configureTestBed);

  it('muestra "Ver en el apunte" en el detalle cuando la pregunta tiene referencias', async () => {
    const { fixture } = await renderWithAnswers(
      [
        baseQuestion({
          referencias: [
            { apunte: 'apunte-1-x', seccion: 'Sección', ancla: 'seccion' },
          ],
        }),
      ],
      [false],
    );

    expect(textOf(fixture)).toContain('Ver en el apunte');
  });

  it('no muestra "Ver en el apunte" cuando la pregunta no tiene referencias', async () => {
    const { fixture } = await renderWithAnswers(
      [baseQuestion({ referencias: [] })],
      [false],
    );

    expect(textOf(fixture)).not.toContain('Ver en el apunte');
  });
});

describe('ResultsPage · identificación de tarjetas', () => {
  beforeEach(configureTestBed);

  it('muestra el id de la tarjeta en cada fila del detalle', async () => {
    const { fixture } = await renderWithAnswers(
      [baseQuestion({ id: 42 })],
      [false],
    );

    expect(textOf(fixture)).toContain('#42');
  });
});

describe('ResultsPage · separación de errores', () => {
  beforeEach(configureTestBed);

  it('agrupa los errores bajo "Para repasar" con su cantidad', async () => {
    const { fixture } = await renderWithAnswers(
      [
        baseQuestion({ id: 1, afirmacion: 'Primera' }),
        baseQuestion({ id: 2, afirmacion: 'Segunda' }),
      ],
      [false, true],
    );

    expect(textOf(fixture)).toContain('Para repasar (1)');
  });

  it('mantiene las correctas colapsadas hasta que se expanden', async () => {
    const { fixture, failed, correct } = await renderWithAnswers(
      [
        baseQuestion({ id: 1, afirmacion: 'Primera' }),
        baseQuestion({ id: 2, afirmacion: 'Segunda' }),
      ],
      [false, true],
    );

    expect(textOf(fixture)).toContain('Respondidas correctamente (1)');
    expect(textOf(fixture)).toContain(failed[0].afirmacion);
    expect(textOf(fixture)).not.toContain(correct[0].afirmacion);

    const toggle = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLButtonElement>(
      '[aria-controls="correct-answers-list"]',
    )!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(textOf(fixture)).toContain(correct[0].afirmacion);
  });

  it('celebra la sesión sin errores en lugar de mostrar un bloque vacío', async () => {
    const { fixture } = await renderWithAnswers(
      [baseQuestion({ id: 1 })],
      [true],
    );

    expect(textOf(fixture)).toContain('Sin errores en esta sesión.');
    expect(textOf(fixture)).not.toContain('Para repasar');
  });
});
