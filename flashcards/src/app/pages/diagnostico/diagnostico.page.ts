import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardStore } from '../../store/flashcard.store';
import { StudyHistoryStore } from '../../store/study-history.store';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { ApunteViewerComponent } from '../../components/apunte-viewer/apunte-viewer.component';
import { BoxDistributionComponent } from '../../components/box-distribution/box-distribution.component';
import { WeakQuestionRowComponent } from '../../components/weak-question-row/weak-question-row.component';
import { CLOCK } from '../../core/clock';
import {
  accuracyByUnidad,
  boxDistribution,
  dueQuestions,
  neverSeenQuestions,
  overallStats,
  rankWeakest,
} from '../../util/diagnostics';
import type { Referencia } from '../../models/question.model';

/** Cuántas preguntas frágiles se listan en el ranking. */
const RANKING_SIZE = 15;

@Component({
  selector: 'app-diagnostico',
  imports: [
    ThemeToggleComponent,
    ApunteViewerComponent,
    BoxDistributionComponent,
    WeakQuestionRowComponent,
  ],
  template: `
    <div class="min-h-dvh flex flex-col bg-background">
      <header class="border-b border-border bg-card/60 backdrop-blur-md">
        <div class="max-w-3xl mx-auto px-6 py-5 sm:px-8 sm:py-6">
          <div class="flex items-center gap-4">
            <button
              (click)="goHome()"
              class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors
                     px-3 py-2 -ml-3 rounded-xl hover:bg-secondary"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="text-sm hidden sm:inline">Volver</span>
            </button>
            <h1 class="flex-1 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Diagn&oacute;stico
            </h1>
            <app-theme-toggle />
          </div>
        </div>
      </header>

      <main class="flex-1">
        <div class="max-w-3xl mx-auto w-full px-6 py-8 sm:px-8 sm:py-12">
          @if (store.isLoading() || !history.hydrated()) {
            <div class="flex items-center justify-center py-20">
              <div class="text-center space-y-4">
                <div class="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p class="text-muted-foreground text-sm">Cargando tu historial...</p>
              </div>
            </div>
          } @else if (stats().answers === 0) {
            <div class="bg-card border border-border rounded-2xl p-8 text-center">
              <p class="text-base font-semibold text-foreground">
                Todav&iacute;a no hay datos que analizar.
              </p>
              <p class="text-sm text-muted-foreground mt-2">
                Complet&aacute; una sesi&oacute;n y ac&aacute; vas a ver qu&eacute; preguntas te cuestan m&aacute;s.
              </p>
              <button
                (click)="goHome()"
                class="mt-6 py-3 px-6 rounded-2xl font-semibold text-sm
                       bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Empezar una sesi&oacute;n
              </button>
            </div>
          } @else {
            @if (history.degraded()) {
              <div class="mb-8 bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-5">
                <p class="text-sm font-semibold text-destructive">
                  No se est&aacute;n pudiendo guardar los resultados en este navegador.
                </p>
                <p class="text-xs text-muted-foreground mt-1.5">
                  Lo que respondas en esta sesi&oacute;n puede perderse al recargar.
                </p>
              </div>
            }

            <!-- Resumen -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <div class="bg-card border border-border rounded-2xl p-5 text-center">
                <p class="text-2xl font-bold text-primary">
                  {{ stats().seenQuestions }}<span class="text-base text-muted-foreground">/{{ stats().totalQuestions }}</span>
                </p>
                <p class="text-xs text-muted-foreground mt-2">Vistas</p>
              </div>
              <div class="bg-card border border-border rounded-2xl p-5 text-center">
                <p class="text-2xl font-bold" [class]="accuracyColor()">
                  {{ accuracyPercent() }}%
                </p>
                <p class="text-xs text-muted-foreground mt-2">Precisi&oacute;n</p>
              </div>
              <div class="bg-card border border-border rounded-2xl p-5 text-center">
                <p class="text-2xl font-bold text-destructive">{{ due().length }}</p>
                <p class="text-xs text-muted-foreground mt-2">Para repasar hoy</p>
              </div>
              <div class="bg-card border border-border rounded-2xl p-5 text-center">
                <p class="text-2xl font-bold text-muted-foreground">{{ neverSeen().length }}</p>
                <p class="text-xs text-muted-foreground mt-2">Sin ver</p>
              </div>
            </div>

            <!-- Sesión dirigida -->
            <section class="mb-10 bg-card border border-border rounded-2xl p-6">
              <h2 class="text-lg font-semibold text-foreground">Practicar lo m&aacute;s d&eacute;bil</h2>
              <p class="text-sm text-muted-foreground mt-1.5">
                Arranca una sesi&oacute;n con las preguntas peor dominadas.
              </p>

              <label class="flex items-center gap-2.5 mt-4 text-sm text-muted-foreground cursor-pointer w-fit">
                <input
                  type="checkbox"
                  [checked]="onlyDue()"
                  (change)="onlyDue.set(!onlyDue())"
                  class="w-4 h-4 rounded accent-primary"
                />
                S&oacute;lo las vencidas ({{ due().length }})
              </label>

              <div class="flex flex-col sm:flex-row gap-3 mt-5">
                @for (size of practiceSizes(); track size) {
                  <button
                    type="button"
                    (click)="practice(size)"
                    class="flex-1 py-3 px-5 rounded-2xl font-semibold text-sm
                           bg-primary/10 text-primary border-2 border-primary/30
                           hover:bg-primary/20 transition-all active:scale-[0.98]"
                  >
                    Repasar {{ size }}
                  </button>
                }
                <button
                  type="button"
                  (click)="practice(null)"
                  [disabled]="candidates().length === 0"
                  class="flex-1 py-3 px-5 rounded-2xl font-semibold text-sm
                         bg-primary text-primary-foreground
                         hover:opacity-90 transition-all active:scale-[0.98]
                         disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Todas ({{ candidates().length }})
                </button>
              </div>
            </section>

            <!-- Distribución por caja -->
            <section class="mb-10">
              <h2 class="text-lg font-semibold text-foreground mb-1.5">Dominio por caja</h2>
              <p class="text-sm text-muted-foreground mb-5">
                Cada acierto sube una caja y espacia el repaso; cada error hace retroceder dos.
              </p>
              <app-box-distribution [counts]="boxes()" />
            </section>

            <!-- Ranking -->
            <section class="mb-10">
              <h2 class="text-lg font-semibold text-foreground mb-5">
                Las que m&aacute;s te cuestan
              </h2>
              <ol class="space-y-3">
                @for (item of ranking(); track item.question.id) {
                  <li>
                    <app-weak-question-row [item]="item" (openApunte)="openApunte($event)" />
                  </li>
                }
              </ol>
            </section>

            <!-- Precisión por unidad -->
            @if (byUnidad().length) {
              <section class="mb-10">
                <h2 class="text-lg font-semibold text-foreground mb-5">Precisi&oacute;n por unidad</h2>
                <ul class="space-y-2.5">
                  @for (row of byUnidad(); track row.unidad) {
                    <li class="flex items-center gap-3">
                      <span class="w-24 shrink-0 text-xs font-medium text-muted-foreground">
                        {{ row.unidad }}
                      </span>
                      <div
                        class="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden"
                        role="img"
                        [attr.aria-label]="
                          row.unidad + ': ' + percent(row.accuracy) + '% de aciertos en ' + row.seen + ' respuestas'
                        "
                      >
                        <div
                          class="h-full bg-primary rounded-full transition-all duration-500"
                          [style.width.%]="percent(row.accuracy)"
                        ></div>
                      </div>
                      <span class="w-12 shrink-0 text-right text-xs font-semibold text-foreground">
                        {{ percent(row.accuracy) }}%
                      </span>
                    </li>
                  }
                </ul>
              </section>
            }

            <!-- Mantenimiento -->
            <section class="pb-8">
              <details class="bg-card border border-border rounded-2xl p-5">
                <summary class="text-sm font-medium text-muted-foreground cursor-pointer">
                  Datos guardados ({{ history.sessionCount() }} sesiones)
                </summary>
                <div class="flex flex-col sm:flex-row gap-3 mt-5">
                  <button
                    type="button"
                    (click)="rebuild()"
                    class="flex-1 py-2.5 px-4 rounded-xl font-medium text-sm
                           bg-secondary text-foreground border border-border
                           hover:bg-secondary/80 transition-colors"
                  >
                    Recalcular estad&iacute;sticas
                  </button>
                  <button
                    type="button"
                    (click)="clearHistory()"
                    class="flex-1 py-2.5 px-4 rounded-xl font-medium text-sm
                           bg-destructive/10 text-destructive border border-destructive/30
                           hover:bg-destructive/20 transition-colors"
                  >
                    {{ confirmingClear() ? '¿Seguro? Tocá de nuevo para borrar' : 'Borrar historial' }}
                  </button>
                </div>
              </details>
            </section>
          }
        </div>
      </main>

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
export default class DiagnosticoPage {
  protected readonly store = inject(FlashcardStore);
  protected readonly history = inject(StudyHistoryStore);
  private readonly router = inject(Router);
  private readonly clock = inject(CLOCK);

  protected readonly apunteViewer = signal<Referencia | null>(null);
  protected readonly onlyDue = signal(false);
  protected readonly confirmingClear = signal(false);

  /**
   * Instante fijado al abrir la página: si se leyera el reloj en cada cómputo,
   * los vencimientos cambiarían de valor entre renders.
   */
  private readonly now = signal(this.clock());

  protected readonly stats = computed(() =>
    overallStats(this.store.allQuestions(), this.history.progress()),
  );

  protected readonly due = computed(() =>
    dueQuestions(
      this.store.allQuestions(),
      this.history.progress(),
      this.now(),
    ),
  );

  protected readonly neverSeen = computed(() =>
    neverSeenQuestions(this.store.allQuestions(), this.history.progress()),
  );

  protected readonly boxes = computed(() =>
    boxDistribution(this.store.allQuestions(), this.history.progress()),
  );

  protected readonly byUnidad = computed(() =>
    accuracyByUnidad(this.store.allQuestions(), this.history.progress()),
  );

  /** Preguntas ordenadas de más a menos frágil, con el filtro de vencidas. */
  protected readonly candidates = computed(() => {
    const pool = this.onlyDue() ? this.due() : this.store.allQuestions();
    return rankWeakest(pool, this.history.progress(), this.now());
  });

  protected readonly ranking = computed(() =>
    this.candidates().slice(0, RANKING_SIZE),
  );

  /**
   * Sólo se ofrecen los tamaños que recortan de verdad: con 17 candidatas,
   * "Repasar 20" sería el mismo botón que "Todas".
   */
  protected readonly practiceSizes = computed(() =>
    [10, 20].filter((size) => size < this.candidates().length),
  );

  protected readonly accuracyPercent = computed(() =>
    this.percent(this.stats().accuracy),
  );

  protected readonly accuracyColor = computed(() => {
    const pct = this.accuracyPercent();
    if (pct >= 80) return 'text-success';
    if (pct >= 60) return 'text-yellow-500';
    return 'text-destructive';
  });

  protected percent(ratio: number): number {
    return Math.round(ratio * 100);
  }

  protected practice(size: number | null): void {
    const selected = (
      size === null ? this.candidates() : this.candidates().slice(0, size)
    ).map((item) => item.question);

    if (selected.length === 0) return;

    void this.store.startTargetedSession(selected);
    this.router.navigate(['/session']);
  }

  protected openApunte(ref: Referencia): void {
    this.apunteViewer.set(ref);
  }

  protected rebuild(): void {
    void this.history.rebuild();
  }

  /** Borrado en dos toques: no hay forma de deshacerlo. */
  protected clearHistory(): void {
    if (!this.confirmingClear()) {
      this.confirmingClear.set(true);
      return;
    }
    this.confirmingClear.set(false);
    void this.history.clear();
  }

  protected goHome(): void {
    this.router.navigate(['/']);
  }
}
