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

async function renderWithAnswer(questions: Question[]) {
  const store = TestBed.inject(FlashcardStore);
  const http = TestBed.inject(HttpTestingController);

  const loading = store.loadQuestions();
  http.expectOne('/data/preguntas.json').flush(questions);
  await loading;

  store.startSession();
  store.answerQuestion(true);

  const fixture = TestBed.createComponent(ResultsPage);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  http.verify();
  return fixture;
}

describe('ResultsPage · referencias', () => {
  beforeEach(async () => {
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
      ],
    }).compileComponents();
  });

  it('muestra "Ver en el apunte" en el detalle cuando la pregunta tiene referencias', async () => {
    const fixture = await renderWithAnswer([
      baseQuestion({
        referencias: [
          { apunte: 'apunte-1-x', seccion: 'Sección', ancla: 'seccion' },
        ],
      }),
    ]);

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Ver en el apunte');
  });

  it('no muestra "Ver en el apunte" cuando la pregunta no tiene referencias', async () => {
    const fixture = await renderWithAnswer([baseQuestion({ referencias: [] })]);

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toContain('Ver en el apunte');
  });
});
