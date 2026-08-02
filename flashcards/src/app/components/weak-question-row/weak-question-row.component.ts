import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { QuestionIdBadgeComponent } from '../question-id-badge/question-id-badge.component';
import { MAX_BOX } from '../../util/srs';
import type { WeakQuestion } from '../../util/diagnostics';
import type { Referencia } from '../../models/question.model';

/** Fila del ranking de preguntas frágiles. */
@Component({
  selector: 'app-weak-question-row',
  imports: [QuestionIdBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-card border border-border rounded-2xl p-5">
      <p class="text-sm text-foreground leading-relaxed">
        {{ item().question.afirmacion }}
      </p>

      <div class="flex flex-wrap items-center gap-2 mt-3">
        <app-question-id-badge [questionId]="item().question.id" />

        <span
          class="text-xs font-medium px-2.5 py-1 rounded-full"
          [class]="accuracyClass()"
        >
          {{ item().progress.stats.correct }}/{{ item().progress.stats.seen }}
          aciertos
        </span>

        <span
          class="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border"
        >
          Caja {{ item().progress.srs.box }} de {{ maxBox }}
        </span>

        @if (item().due) {
          <span
            class="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {{ overdueLabel() }}
          </span>
        }

        @if (item().question.referencias.length) {
          <button
            type="button"
            (click)="openApunte.emit(item().question.referencias[0])"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-primary
                   hover:underline underline-offset-2"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Ver en el apunte
          </button>
        }
      </div>
    </div>
  `,
})
export class WeakQuestionRowComponent {
  readonly item = input.required<WeakQuestion>();
  readonly openApunte = output<Referencia>();

  protected readonly maxBox = MAX_BOX;

  protected readonly accuracyClass = computed(() => {
    const accuracy = this.item().accuracy;
    if (accuracy >= 0.8) return 'bg-success/10 text-success';
    if (accuracy >= 0.5) return 'bg-yellow-500/10 text-yellow-500';
    return 'bg-destructive/10 text-destructive';
  });

  protected readonly overdueLabel = computed(() => {
    const days = Math.floor(this.item().daysOverdue);
    if (days <= 0) return 'Toca repasar';
    if (days === 1) return 'Vencida hace 1 día';
    return `Vencida hace ${days} días`;
  });
}
