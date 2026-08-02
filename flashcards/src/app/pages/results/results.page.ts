import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardStore } from '../../store/flashcard.store';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { ApunteViewerComponent } from '../../components/apunte-viewer/apunte-viewer.component';
import { AnswerRowComponent } from '../../components/answer-row/answer-row.component';
import type { Referencia } from '../../models/question.model';

@Component({
  selector: 'app-results',
  imports: [ThemeToggleComponent, ApunteViewerComponent, AnswerRowComponent],
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

          <!-- Errores: bloque propio y destacado -->
          @if (mistakes().length > 0) {
            <section class="mb-10">
              <div class="flex items-center gap-3 mb-5">
                <h2 class="text-lg font-semibold text-destructive">
                  Para repasar ({{ mistakes().length }})
                </h2>
              </div>
              <div class="space-y-3">
                @for (item of mistakes(); track item.questionId) {
                  <app-answer-row [item]="item" (openApunte)="openApunte($event)" />
                }
              </div>
            </section>
          } @else if (store.answeredQuestions().length > 0) {
            <section class="mb-10">
              <div class="bg-success/10 border-2 border-success/30 rounded-2xl p-6 text-center">
                <p class="text-base font-semibold text-success">
                  Sin errores en esta sesi&oacute;n.
                </p>
                <p class="text-sm text-muted-foreground mt-2">
                  No hay nada pendiente de repaso.
                </p>
              </div>
            </section>
          }

          <!-- Correctas: colapsadas, secundarias -->
          @if (correctAnswers().length > 0) {
            <section class="mb-10">
              <button
                type="button"
                (click)="correctExpanded.set(!correctExpanded())"
                [attr.aria-expanded]="correctExpanded()"
                aria-controls="correct-answers-list"
                class="w-full flex items-center gap-2 py-3 px-4 rounded-2xl text-left
                       bg-card border border-border text-muted-foreground
                       hover:text-foreground hover:bg-secondary transition-colors"
              >
                <svg
                  class="w-4 h-4 transition-transform"
                  [class.rotate-90]="correctExpanded()"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span class="text-sm font-medium">
                  Respondidas correctamente ({{ correctAnswers().length }})
                </span>
              </button>

              @if (correctExpanded()) {
                <div id="correct-answers-list" class="space-y-3 mt-3">
                  @for (item of correctAnswers(); track item.questionId) {
                    <app-answer-row [item]="item" (openApunte)="openApunte($event)" />
                  }
                </div>
              }
            </section>
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

      <!-- Apunte drawer (lazy) -->
      @defer (when apunteViewer() !== null) {
        @if (apunteViewer(); as viewer) {
          <app-apunte-viewer
            [apunte]="viewer.apunte"
            [ancla]="viewer.ancla"
            [seccion]="viewer.seccion"
            (close)="apunteViewer.set(null)"
          />
        }
      }
    </div>
  `,
})
export default class ResultsPage implements OnInit {
  protected readonly store = inject(FlashcardStore);
  private readonly router = inject(Router);
  protected readonly apunteViewer = signal<Referencia | null>(null);
  protected readonly correctExpanded = signal(false);

  protected openApunte(ref: Referencia): void {
    this.apunteViewer.set(ref);
  }

  protected readonly mistakes = computed(() =>
    this.store.answeredQuestions().filter((a) => !a.answeredCorrectly),
  );

  protected readonly correctAnswers = computed(() =>
    this.store.answeredQuestions().filter((a) => a.answeredCorrectly),
  );

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

  protected reviewMistakes(): void {
    void this.store.reviewMistakes();
    this.router.navigate(['/session']);
  }

  protected restart(): void {
    void this.store.restartSession();
    this.router.navigate(['/session']);
  }

  protected goHome(): void {
    // Redundante en el camino normal (ya se guardó al terminar), pero cubre la
    // vuelta atrás desde el navegador; es idempotente.
    void this.store.finishSession();
    this.store.endSession();
    this.router.navigate(['/']);
  }
}
