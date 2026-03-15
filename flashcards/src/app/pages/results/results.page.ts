import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardStore } from '../../store/flashcard.store';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-results',
  imports: [ThemeToggleComponent],
  template: `
    <div class="min-h-dvh flex flex-col bg-background">
      <!-- Header -->
      <header class="border-b border-border bg-card/60 backdrop-blur-md">
        <div class="max-w-3xl mx-auto px-6 py-5 sm:px-8 sm:py-6">
          <div class="flex items-center gap-4">
            <span class="text-3xl">📊</span>
            <h1 class="flex-1 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Resultados de la sesi&oacute;n
            </h1>
            <app-theme-toggle />
          </div>
        </div>
      </header>

      <main class="flex-1 flex flex-col">
        <div class="max-w-3xl mx-auto w-full px-6 py-8 sm:px-8 sm:py-12">
          <!-- Score card -->
          <div class="bg-card border border-border rounded-2xl p-8 sm:p-10 text-center mb-10 animate-bounce-in shadow-lg shadow-black/10">
            <div
              class="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5"
              [class]="scoreColor"
            >
              <span class="text-2xl sm:text-3xl font-bold">
                {{ store.stats().correct }}/{{ store.stats().total }}
              </span>
            </div>
            <p class="text-4xl sm:text-5xl font-bold text-foreground">
              {{ percentage }}%
            </p>
            <p class="text-muted-foreground mt-3 text-base">
              {{ scoreMessage }}
            </p>
          </div>

          <!-- Stats grid -->
          <div class="grid grid-cols-3 gap-4 sm:gap-5 mb-10">
            <div class="bg-card border border-border rounded-2xl p-5 sm:p-6 text-center">
              <p class="text-2xl sm:text-3xl font-bold text-success">
                {{ store.stats().correct }}
              </p>
              <p class="text-sm text-muted-foreground mt-2">Correctas</p>
            </div>
            <div class="bg-card border border-border rounded-2xl p-5 sm:p-6 text-center">
              <p class="text-2xl sm:text-3xl font-bold text-destructive">
                {{ store.stats().incorrect }}
              </p>
              <p class="text-sm text-muted-foreground mt-2">Incorrectas</p>
            </div>
            <div class="bg-card border border-border rounded-2xl p-5 sm:p-6 text-center">
              <p class="text-2xl sm:text-3xl font-bold text-foreground">
                {{ store.stats().total }}
              </p>
              <p class="text-sm text-muted-foreground mt-2">Total</p>
            </div>
          </div>

          <!-- Review list -->
          @if (store.answeredQuestions().length > 0) {
            <div class="mb-10">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-lg font-semibold text-foreground">
                  Detalle de respuestas
                </h2>
                <div class="flex gap-2">
                  <button
                    (click)="showFilter.set('all')"
                    [class]="filterBtnClass('all')"
                  >
                    Todas
                  </button>
                  <button
                    (click)="showFilter.set('incorrect')"
                    [class]="filterBtnClass('incorrect')"
                  >
                    Incorrectas
                  </button>
                  <button
                    (click)="showFilter.set('correct')"
                    [class]="filterBtnClass('correct')"
                  >
                    Correctas
                  </button>
                </div>
              </div>

              <div class="space-y-3">
                @for (item of filteredAnswers(); track item.questionId) {
                  <div
                    class="bg-card border rounded-2xl p-5 transition-colors"
                    [class.border-success/30]="item.answeredCorrectly"
                    [class.border-destructive/30]="!item.answeredCorrectly"
                  >
                    <div class="flex items-start gap-4">
                      <div
                        class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                        [class]="item.answeredCorrectly
                          ? 'bg-success/20 text-success'
                          : 'bg-destructive/20 text-destructive'"
                      >
                        @if (item.answeredCorrectly) {
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                          </svg>
                        } @else {
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        }
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-foreground leading-relaxed">
                          {{ item.question.afirmacion }}
                        </p>
                        <div class="flex flex-wrap items-center gap-2 mt-3">
                          <span
                            class="text-xs font-medium px-2.5 py-1 rounded-full"
                            [class]="item.question.respuesta
                              ? 'bg-success/10 text-success'
                              : 'bg-destructive/10 text-destructive'"
                          >
                            Respuesta: {{ item.question.respuesta ? 'Verdadero' : 'Falso' }}
                          </span>
                          @if (!item.answeredCorrectly) {
                            <span class="text-xs text-muted-foreground">
                              Respondiste: {{ item.userAnswer ? 'Verdadero' : 'Falso' }}
                            </span>
                          }
                        </div>
                        @if (!item.answeredCorrectly && item.question.verificacion) {
                          <p class="text-xs text-muted-foreground mt-3 leading-relaxed">
                            {{ item.question.verificacion }}
                          </p>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Action buttons -->
          <div class="flex flex-col sm:flex-row gap-3 pb-8">
            @if (mistakeCount > 0) {
              <button
                (click)="reviewMistakes()"
                class="flex-1 py-3.5 px-5 rounded-2xl font-semibold text-base
                       bg-destructive/10 text-destructive border-2 border-destructive/30
                       hover:bg-destructive/20 transition-all active:scale-[0.98]"
              >
                Repasar errores ({{ mistakeCount }})
              </button>
            }
            <button
              (click)="restart()"
              class="flex-1 py-3.5 px-5 rounded-2xl font-semibold text-base
                     bg-secondary text-secondary-foreground border-2 border-border
                     hover:bg-secondary/80 transition-all active:scale-[0.98]"
            >
              Reiniciar sesi&oacute;n
            </button>
            <button
              (click)="goHome()"
              class="flex-1 py-3.5 px-5 rounded-2xl font-semibold text-base
                     bg-primary text-primary-foreground
                     hover:opacity-90 hover:shadow-lg hover:shadow-primary/20
                     transition-all active:scale-[0.98]"
            >
              Nueva sesi&oacute;n
            </button>
          </div>
        </div>
      </main>
    </div>
  `,
})
export default class ResultsPage implements OnInit {
  protected readonly store = inject(FlashcardStore);
  private readonly router = inject(Router);
  protected readonly showFilter = signal<'all' | 'correct' | 'incorrect'>('all');

  protected readonly filteredAnswers = computed(() => {
    const all = this.store.answeredQuestions();
    const filter = this.showFilter();
    if (filter === 'correct') return all.filter((a) => a.answeredCorrectly);
    if (filter === 'incorrect') return all.filter((a) => !a.answeredCorrectly);
    return all;
  });

  ngOnInit(): void {
    if (!this.store.sessionComplete() && !this.store.sessionActive()) {
      this.router.navigate(['/']);
    }
  }

  protected get percentage(): number {
    const stats = this.store.stats();
    if (stats.total === 0) return 0;
    return Math.round((stats.correct / stats.total) * 100);
  }

  protected get scoreColor(): string {
    const pct = this.percentage;
    if (pct >= 80) return 'bg-success/15 text-success';
    if (pct >= 60) return 'bg-yellow-500/15 text-yellow-400';
    return 'bg-destructive/15 text-destructive';
  }

  protected get scoreMessage(): string {
    const pct = this.percentage;
    if (pct === 100) return 'Perfecto! Dominas todos los temas.';
    if (pct >= 80) return 'Muy bien! Solo algunos detalles por revisar.';
    if (pct >= 60) return 'Buen progreso. Repasa los temas con errores.';
    if (pct >= 40) return 'Necesitas repasar bastante. No te rindas!';
    return 'Te recomendamos revisar el material de estudio.';
  }

  protected get mistakeCount(): number {
    return this.store.stats().incorrect;
  }

  protected filterBtnClass(filter: string): string {
    const base = 'text-xs font-medium px-3 py-1.5 rounded-xl transition-colors';
    if (this.showFilter() === filter) {
      return `${base} bg-primary/20 text-primary border border-primary/30`;
    }
    return `${base} text-muted-foreground hover:text-foreground border border-transparent`;
  }

  protected reviewMistakes(): void {
    this.store.reviewMistakes();
    this.router.navigate(['/session']);
  }

  protected restart(): void {
    this.store.restartSession();
    this.router.navigate(['/session']);
  }

  protected goHome(): void {
    this.store.endSession();
    this.router.navigate(['/']);
  }
}
