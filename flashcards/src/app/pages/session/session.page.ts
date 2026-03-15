import {
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardStore } from '../../store/flashcard.store';
import { FlashcardComponent } from '../../components/flashcard/flashcard.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-session',
  imports: [FlashcardComponent, ProgressBarComponent, ThemeToggleComponent],
  template: `
    <div class="min-h-dvh flex flex-col bg-background">
      <!-- Header -->
      <header class="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-10">
        <div class="max-w-3xl mx-auto px-6 py-4 sm:px-8 sm:py-5">
          <div class="flex items-center justify-between">
            <button
              (click)="goHome()"
              class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors
                     px-3 py-2 -ml-3 rounded-xl hover:bg-secondary"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 19l-7-7 7-7" />
              </svg>
              <span class="text-sm hidden sm:inline">Volver</span>
            </button>

            <div class="text-center">
              <p class="text-sm font-semibold text-foreground">
                {{ store.currentIndex() + 1 }}
                <span class="text-muted-foreground font-normal">de</span>
                {{ store.stats().total }}
              </p>
            </div>

            <app-theme-toggle />

            <!-- Score -->
            <div class="flex items-center gap-4 text-sm">
              <span class="flex items-center gap-1.5 text-success font-semibold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                {{ store.stats().correct }}
              </span>
              <span class="flex items-center gap-1.5 text-destructive font-semibold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                {{ store.stats().incorrect }}
              </span>
            </div>
          </div>

          <!-- Progress bar -->
          <app-progress-bar
            [progress]="store.progress()"
            class="mt-3 block"
          />
        </div>
      </header>

      <!-- Card area -->
      <main class="flex-1 flex flex-col items-center justify-center px-6 py-8 sm:px-8 sm:py-10">
        @if (store.currentQuestion(); as question) {
          <div class="w-full max-w-2xl animate-slide-in">
            <!-- Unit badges -->
            <div class="flex flex-wrap gap-2 mb-5 justify-center">
              @for (unidad of question.unidades; track unidad) {
                <span
                  class="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {{ unidad }}
                </span>
              }
              <span class="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
                {{ question.examen }} &mdash; Preg. {{ question.pregunta }}
              </span>
            </div>

            <!-- Flashcard -->
            <app-flashcard
              [question]="question"
              [isFlipped]="store.isFlipped()"
              [answer]="store.currentAnswer()"
              (flip)="store.flipCard()"
            />

            <!-- Answer buttons -->
            @if (!store.currentQuestionAnswered()) {
              <div class="flex gap-4 mt-8">
                <button
                  (click)="store.answerQuestion(true)"
                  class="flex-1 py-3.5 px-5 rounded-2xl font-semibold text-base
                         bg-success/10 text-success border-2 border-success/30
                         hover:bg-success/20 hover:border-success/50 transition-all active:scale-[0.97]"
                >
                  Verdadero
                </button>
                <button
                  (click)="store.answerQuestion(false)"
                  class="flex-1 py-3.5 px-5 rounded-2xl font-semibold text-base
                         bg-destructive/10 text-destructive border-2 border-destructive/30
                         hover:bg-destructive/20 hover:border-destructive/50 transition-all active:scale-[0.97]"
                >
                  Falso
                </button>
              </div>
            } @else {
              <!-- Result feedback -->
              <div class="mt-6 space-y-4 animate-fade-in">
                @if (store.currentAnswer(); as ans) {
                  <div
                    class="rounded-2xl p-5"
                    [class]="ans.answeredCorrectly
                      ? 'bg-success/10 border-2 border-success/30 text-success'
                      : 'bg-destructive/10 border-2 border-destructive/30 text-destructive'"
                  >
                    <p class="font-semibold text-base">
                      {{ ans.answeredCorrectly ? '&iexcl;Correcto!' : 'Incorrecto' }}
                      &mdash; La respuesta es:
                      <strong>{{ question.respuesta ? 'Verdadero' : 'Falso' }}</strong>
                    </p>
                  </div>
                }

                <!-- Justification -->
                @if (store.showJustification()) {
                  <div class="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                    @if (question.justificacion && question.justificacion !== '—') {
                      <div>
                        <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Justificaci&oacute;n
                        </p>
                        <p class="text-sm text-foreground/90 leading-relaxed">
                          {{ question.justificacion }}
                        </p>
                      </div>
                    }
                    @if (question.verificacion) {
                      <div>
                        <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Verificaci&oacute;n
                        </p>
                        <p class="text-sm text-foreground/90 leading-relaxed">
                          {{ question.verificacion }}
                        </p>
                      </div>
                    }
                  </div>
                }

                <!-- Next button -->
                <button
                  (click)="handleNext()"
                  class="w-full py-3.5 px-5 rounded-2xl font-semibold text-base
                         bg-primary text-primary-foreground hover:opacity-90
                         hover:shadow-lg hover:shadow-primary/20
                         transition-all active:scale-[0.98]"
                >
                  {{ isLastQuestion ? 'Ver resultados' : 'Siguiente pregunta' }}
                </button>
              </div>
            }
          </div>
        }

        <!-- Keyboard hints (desktop only) -->
        <div class="hidden sm:flex items-center gap-5 mt-10 text-xs text-muted-foreground">
          <span class="flex items-center gap-1.5">
            <kbd class="px-2 py-1 rounded-lg bg-secondary border border-border text-[11px] font-mono">V</kbd>
            Verdadero
          </span>
          <span class="flex items-center gap-1.5">
            <kbd class="px-2 py-1 rounded-lg bg-secondary border border-border text-[11px] font-mono">F</kbd>
            Falso
          </span>
          <span class="flex items-center gap-1.5">
            <kbd class="px-2 py-1 rounded-lg bg-secondary border border-border text-[11px] font-mono">Espacio</kbd>
            Voltear
          </span>
          <span class="flex items-center gap-1.5">
            <kbd class="px-2 py-1 rounded-lg bg-secondary border border-border text-[11px] font-mono">&rarr;</kbd>
            Siguiente
          </span>
        </div>
      </main>
    </div>
  `,
})
export default class SessionPage implements OnInit {
  protected readonly store = inject(FlashcardStore);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (!this.store.sessionActive()) {
      this.router.navigate(['/']);
    }
  }

  protected get isLastQuestion(): boolean {
    return (
      this.store.currentIndex() >= this.store.stats().total - 1
    );
  }

  @HostListener('window:keydown', ['$event'])
  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      if (!this.store.currentQuestionAnswered()) {
        this.store.flipCard();
      }
    }
    if (
      (event.key === 'v' || event.key === 'V') &&
      !this.store.currentQuestionAnswered()
    ) {
      this.store.answerQuestion(true);
    }
    if (
      (event.key === 'f' || event.key === 'F') &&
      !this.store.currentQuestionAnswered()
    ) {
      this.store.answerQuestion(false);
    }
    if (
      (event.key === 'ArrowRight' || event.key === 'Enter') &&
      this.store.currentQuestionAnswered()
    ) {
      this.handleNext();
    }
    if (event.key === 'ArrowLeft') {
      this.store.previousQuestion();
    }
  }

  protected handleNext(): void {
    if (this.isLastQuestion) {
      this.store.nextQuestion();
      this.router.navigate(['/results']);
    } else {
      this.store.nextQuestion();
    }
  }

  protected goHome(): void {
    this.store.endSession();
    this.router.navigate(['/']);
  }
}
