import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideMarkdown } from 'ngx-markdown';
import SessionPage from './session.page';
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

async function renderAnswered(questions: Question[]) {
  const store = TestBed.inject(FlashcardStore);
  const http = TestBed.inject(HttpTestingController);

  const loading = store.loadQuestions();
  http.expectOne('/data/preguntas.json').flush(questions);
  await loading;

  store.startSession();
  store.answerQuestion(true);

  const fixture = TestBed.createComponent(SessionPage);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  http.verify();
  return fixture;
}

describe('SessionPage · referencias', () => {
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
      imports: [SessionPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMarkdown(),
      ],
    }).compileComponents();
  });

  it('muestra "Ver en el apunte" y las secciones secundarias cuando hay referencias', async () => {
    const fixture = await renderAnswered([
      baseQuestion({
        referencias: [
          { apunte: 'apunte-1-x', seccion: 'Sección principal', ancla: 'seccion-principal' },
          { apunte: 'apunte-1-x', seccion: 'Sección secundaria', ancla: 'seccion-secundaria' },
        ],
      }),
    ]);

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Ver en el apunte');
    expect(text).toContain('Sección secundaria');
  });

  it('no muestra "Ver en el apunte" cuando no hay referencias', async () => {
    const fixture = await renderAnswered([baseQuestion({ referencias: [] })]);

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toContain('Ver en el apunte');
  });

  it('muestra el id de la tarjeta junto a los metadatos de la pregunta', async () => {
    const fixture = await renderAnswered([baseQuestion({ id: 137 })]);

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('#137');
  });
});
