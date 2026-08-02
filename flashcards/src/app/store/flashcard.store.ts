import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import type { Question, SessionAnswer } from '../models/question.model';
import {
  SESSION_KINDS,
  type SessionKind,
  type SessionRecord,
} from '../models/study-history.model';
import { QuestionService } from '../services/question.service';
import { StudyHistoryStore } from './study-history.store';
import { CLOCK } from '../core/clock';
import { newId } from '../util/id';
import { firstValueFrom } from 'rxjs';

interface FlashcardState {
  readonly allQuestions: Question[];
  readonly filteredQuestions: Question[];
  readonly currentIndex: number;
  readonly isFlipped: boolean;
  readonly answers: SessionAnswer[];
  readonly selectedUnidades: string[];
  readonly availableUnidades: string[];
  readonly isLoading: boolean;
  readonly sessionActive: boolean;
  readonly sessionComplete: boolean;
  readonly showJustification: boolean;
  readonly sessionId: string | null;
  readonly sessionStartedAt: number | null;
  readonly sessionKind: SessionKind;
  /** Evita que una misma sesión se guarde dos veces. */
  readonly sessionRecorded: boolean;
}

const initialState: FlashcardState = {
  allQuestions: [],
  filteredQuestions: [],
  currentIndex: 0,
  isFlipped: false,
  answers: [],
  selectedUnidades: [],
  availableUnidades: [],
  isLoading: true,
  sessionActive: false,
  sessionComplete: false,
  showJustification: false,
  sessionId: null,
  sessionStartedAt: null,
  sessionKind: SESSION_KINDS.free,
  sessionRecorded: false,
};

function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const FlashcardStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    currentQuestion: computed(() => {
      const questions = store.filteredQuestions();
      const index = store.currentIndex();
      return questions[index] ?? null;
    }),
    stats: computed(() => {
      const total = store.filteredQuestions().length;
      const answers = store.answers();
      const correct = answers.filter((a) => a.answeredCorrectly).length;
      const incorrect = answers.filter((a) => !a.answeredCorrectly).length;
      return {
        total,
        answered: answers.length,
        correct,
        incorrect,
        remaining: total - answers.length,
      };
    }),
    progress: computed(() => {
      const total = store.filteredQuestions().length;
      if (total === 0) return 0;
      return Math.round((store.answers().length / total) * 100);
    }),
    currentQuestionAnswered: computed(() => {
      const question = store.filteredQuestions()[store.currentIndex()];
      if (!question) return false;
      return store.answers().some((a) => a.questionId === question.id);
    }),
    currentAnswer: computed(() => {
      const question = store.filteredQuestions()[store.currentIndex()];
      if (!question) return null;
      return store.answers().find((a) => a.questionId === question.id) ?? null;
    }),
    answeredQuestions: computed(() => {
      const answers = store.answers();
      const byId = new Map(store.filteredQuestions().map((q) => [q.id, q]));
      // Descarta respuestas huérfanas: el pool puede cambiar (repaso de errores,
      // sesión dirigida) sin que las respuestas previas sigan en él.
      return answers.flatMap((a) => {
        const question = byId.get(a.questionId);
        return question ? [{ ...a, question }] : [];
      });
    }),
  })),
  withMethods((store) => {
    const questionService = inject(QuestionService);
    const historyStore = inject(StudyHistoryStore);
    const clock = inject(CLOCK);

    function buildRecord(endedAt: number): SessionRecord {
      return {
        id: store.sessionId() ?? newId(),
        kind: store.sessionKind(),
        startedAt: store.sessionStartedAt() ?? endedAt,
        endedAt,
        unidades: [...store.selectedUnidades()],
        plannedCount: store.filteredQuestions().length,
        answers: store.answers().map((a) => ({
          questionId: a.questionId,
          correct: a.answeredCorrectly,
          userAnswer: a.userAnswer,
          at: a.answeredAt,
        })),
      };
    }

    /**
     * Persiste la sesión en curso. Es idempotente: puede llamarse de más sin
     * duplicar, lo que permite invocarla desde todos los caminos de salida.
     * No toca `sessionActive`/`sessionComplete`, de los que dependen las
     * guardas de las páginas.
     */
    function flushPendingSession(): Promise<void> {
      if (store.sessionRecorded() || store.answers().length === 0) {
        return Promise.resolve();
      }
      const record = buildRecord(clock());
      patchState(store, { sessionRecorded: true });
      return historyStore.recordSession(record);
    }

    /**
     * Único punto por el que se arranca una sesión. Guarda lo anterior antes
     * de limpiar `answers`: si no, cada "Repasar errores" perdería la sesión
     * que acaba de terminar.
     */
    function beginSession(
      questions: readonly Question[],
      kind: SessionKind,
    ): Promise<void> {
      const flushed = flushPendingSession();
      patchState(store, {
        filteredQuestions: shuffle(questions),
        currentIndex: 0,
        isFlipped: false,
        answers: [],
        sessionActive: true,
        sessionComplete: false,
        showJustification: false,
        sessionId: newId(),
        sessionStartedAt: clock(),
        sessionKind: kind,
        sessionRecorded: false,
      });
      return flushed;
    }

    return {
      async loadQuestions(): Promise<void> {
        patchState(store, { isLoading: true });
        const [questions, unidades] = await Promise.all([
          firstValueFrom(questionService.getAll()),
          firstValueFrom(questionService.getUnidades()),
        ]);
        patchState(store, {
          allQuestions: questions,
          availableUnidades: unidades,
          isLoading: false,
        });
      },

      /**
       * Las operaciones de sesión devuelven la promesa del guardado de la
       * sesión anterior. La interfaz no la espera —el estado ya se actualizó de
       * forma síncrona— pero permite a los tests sincronizarse con el disco.
       */
      startSession(): Promise<void> {
        const selected = store.selectedUnidades();
        const all = store.allQuestions();
        const filtered =
          selected.length === 0
            ? all
            : all.filter((q) => q.unidades.some((u) => selected.includes(u)));
        return beginSession(filtered, SESSION_KINDS.free);
      },

      /** Sesión sobre un conjunto elegido a mano, p. ej. desde el diagnóstico. */
      startTargetedSession(questions: readonly Question[]): Promise<void> {
        if (questions.length === 0) return Promise.resolve();
        return beginSession(questions, SESSION_KINDS.targeted);
      },

      /**
       * Guarda la sesión en curso sin cerrarla. La llaman todos los caminos de
       * salida (terminar, abandonar, volver al home).
       */
      finishSession(): Promise<void> {
        return flushPendingSession();
      },

      toggleUnidad(unidad: string): void {
        const current = store.selectedUnidades();
        const updated = current.includes(unidad)
          ? current.filter((u) => u !== unidad)
          : [...current, unidad];
        patchState(store, { selectedUnidades: updated });
      },

      selectAllUnidades(): void {
        patchState(store, {
          selectedUnidades: [...store.availableUnidades()],
        });
      },

      clearUnidades(): void {
        patchState(store, { selectedUnidades: [] });
      },

      flipCard(): void {
        patchState(store, { isFlipped: !store.isFlipped() });
      },

      answerQuestion(userAnswer: boolean): void {
        const question = store.currentQuestion();
        if (!question || store.currentQuestionAnswered()) return;

        const answer: SessionAnswer = {
          questionId: question.id,
          answeredCorrectly: userAnswer === question.respuesta,
          userAnswer,
          answeredAt: clock(),
        };

        patchState(store, {
          answers: [...store.answers(), answer],
          isFlipped: true,
          showJustification: true,
        });
      },

      nextQuestion(): void {
        const nextIndex = store.currentIndex() + 1;
        if (nextIndex >= store.filteredQuestions().length) {
          patchState(store, { sessionComplete: true });
          return;
        }
        patchState(store, {
          currentIndex: nextIndex,
          isFlipped: false,
          showJustification: false,
        });
      },

      previousQuestion(): void {
        const prevIndex = store.currentIndex() - 1;
        if (prevIndex < 0) return;
        patchState(store, {
          currentIndex: prevIndex,
          isFlipped: false,
          showJustification: false,
        });
      },

      endSession(): void {
        patchState(store, {
          sessionActive: false,
          sessionComplete: false,
          isFlipped: false,
          showJustification: false,
        });
      },

      restartSession(): Promise<void> {
        return beginSession(store.filteredQuestions(), store.sessionKind());
      },

      reviewMistakes(): Promise<void> {
        const byId = new Map(store.filteredQuestions().map((q) => [q.id, q]));
        const mistakes = store
          .answers()
          .filter((a) => !a.answeredCorrectly)
          .flatMap((a) => {
            const question = byId.get(a.questionId);
            return question ? [question] : [];
          });

        if (mistakes.length === 0) return Promise.resolve();

        return beginSession(mistakes, SESSION_KINDS.mistakes);
      },
    };
  }),
);
