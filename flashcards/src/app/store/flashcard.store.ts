import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import type { Question, SessionAnswer } from '../models/question.model';
import { QuestionService } from '../services/question.service';
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
      const questions = store.filteredQuestions();
      return answers.map((a) => ({
        ...a,
        question: questions.find((q) => q.id === a.questionId)!,
      }));
    }),
  })),
  withMethods((store) => {
    const questionService = inject(QuestionService);

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

      startSession(): void {
        const selected = store.selectedUnidades();
        const all = store.allQuestions();
        const filtered =
          selected.length === 0
            ? all
            : all.filter((q) => q.unidades.some((u) => selected.includes(u)));
        patchState(store, {
          filteredQuestions: shuffle(filtered),
          currentIndex: 0,
          isFlipped: false,
          answers: [],
          sessionActive: true,
          sessionComplete: false,
          showJustification: false,
        });
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

      restartSession(): void {
        const filtered = store.filteredQuestions();
        patchState(store, {
          filteredQuestions: shuffle(filtered),
          currentIndex: 0,
          isFlipped: false,
          answers: [],
          sessionComplete: false,
          showJustification: false,
        });
      },

      reviewMistakes(): void {
        const answers = store.answers();
        const questions = store.filteredQuestions();
        const mistakes = answers
          .filter((a) => !a.answeredCorrectly)
          .map((a) => questions.find((q) => q.id === a.questionId)!)
          .filter(Boolean);

        if (mistakes.length === 0) return;

        patchState(store, {
          filteredQuestions: shuffle(mistakes),
          currentIndex: 0,
          isFlipped: false,
          answers: [],
          sessionComplete: false,
          showJustification: false,
        });
      },
    };
  }),
);
