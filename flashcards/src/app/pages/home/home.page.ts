import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardStore } from '../../store/flashcard.store';
import { StudyHistoryStore } from '../../store/study-history.store';
import { CLOCK } from '../../core/clock';
import { dueQuestions } from '../../util/diagnostics';
import { UnitSelectorComponent } from '../../components/unit-selector/unit-selector.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-home',
  imports: [UnitSelectorComponent, ThemeToggleComponent],
  template: `
    <div class="min-h-dvh flex flex-col bg-background">
      <!-- Header -->
      <header class="border-b border-border bg-card/60 backdrop-blur-md">
        <div class="max-w-3xl mx-auto px-6 py-5 sm:px-8 sm:py-6">
          <div class="flex items-center gap-4">
            <span class="text-3xl">📚</span>
            <div class="flex-1">
              <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Sistemas de Gesti&oacute;n
              </h1>
              <p class="text-sm text-muted-foreground mt-0.5">
                Flashcards de estudio &mdash; Verdadero o Falso
              </p>
            </div>
            <app-theme-toggle />
          </div>
        </div>
      </header>

      <!-- Main content -->
      <main class="flex-1 flex flex-col">
        <div class="max-w-3xl mx-auto w-full flex-1 flex flex-col px-6 py-8 sm:px-8 sm:py-12">
          @if (store.isLoading()) {
            <div class="flex-1 flex items-center justify-center">
              <div class="text-center space-y-4">
                <div
                  class="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"
                ></div>
                <p class="text-muted-foreground text-sm">Cargando preguntas...</p>
              </div>
            </div>
          } @else {
            <!-- Stats overview -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-10">
              <div class="bg-card border border-border rounded-2xl p-5 sm:p-6 text-center">
                <p class="text-3xl sm:text-4xl font-bold text-primary">
                  {{ store.allQuestions().length }}
                </p>
                <p class="text-sm text-muted-foreground mt-2">
                  Preguntas totales
                </p>
              </div>
              <div class="bg-card border border-border rounded-2xl p-5 sm:p-6 text-center">
                <p class="text-3xl sm:text-4xl font-bold text-primary">
                  {{ store.availableUnidades().length }}
                </p>
                <p class="text-sm text-muted-foreground mt-2">
                  Unidades
                </p>
              </div>
              <div
                class="col-span-2 sm:col-span-1 bg-card border border-border rounded-2xl p-5 sm:p-6 text-center"
              >
                <p class="text-3xl sm:text-4xl font-bold text-primary">
                  {{ filteredCount }}
                </p>
                <p class="text-sm text-muted-foreground mt-2">
                  Seleccionadas
                </p>
              </div>
            </div>

            <!-- Diagnóstico -->
            <button
              (click)="goToDiagnostico()"
              class="w-full flex items-center gap-4 mb-10 p-5 rounded-2xl text-left
                     bg-card border border-border hover:bg-secondary transition-colors"
            >
              <span class="text-2xl">🎯</span>
              <span class="flex-1">
                <span class="block text-sm font-semibold text-foreground">
                  Diagn&oacute;stico
                </span>
                <span class="block text-xs text-muted-foreground mt-0.5">
                  Qu&eacute; preguntas te cuestan m&aacute;s y cu&aacute;les toca repasar
                </span>
              </span>
              @if (dueCount() > 0) {
                <span
                  class="text-xs font-semibold px-3 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20"
                >
                  {{ dueCount() }} por repasar
                </span>
              }
              <svg class="w-5 h-5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Unit selector -->
            <div class="mb-10">
              <h2 class="text-lg font-semibold mb-5 text-foreground">
                Seleccionar unidades
              </h2>
              <app-unit-selector />
            </div>

            <!-- Start button -->
            <div class="mt-auto pt-4 pb-8">
              <button
                (click)="startSession()"
                [disabled]="filteredCount === 0"
                class="w-full py-4 px-6 bg-primary text-primary-foreground font-semibold
                       rounded-2xl text-base sm:text-lg transition-all duration-200
                       hover:opacity-90 hover:shadow-lg hover:shadow-primary/20
                       active:scale-[0.98]
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                Comenzar sesi&oacute;n ({{ filteredCount }} preguntas)
              </button>
            </div>
          }
        </div>
      </main>
    </div>
  `,
})
export default class HomePage {
  protected readonly store = inject(FlashcardStore);
  private readonly history = inject(StudyHistoryStore);
  private readonly router = inject(Router);
  private readonly clock = inject(CLOCK);

  protected readonly dueCount = computed(
    () =>
      dueQuestions(
        this.store.allQuestions(),
        this.history.progress(),
        this.clock(),
      ).length,
  );

  protected get filteredCount(): number {
    const selected = this.store.selectedUnidades();
    if (selected.length === 0) return this.store.allQuestions().length;
    return this.store
      .allQuestions()
      .filter((q) => q.unidades.some((u) => selected.includes(u))).length;
  }

  protected startSession(): void {
    void this.store.startSession();
    this.router.navigate(['/session']);
  }

  protected goToDiagnostico(): void {
    this.router.navigate(['/diagnostico']);
  }
}
