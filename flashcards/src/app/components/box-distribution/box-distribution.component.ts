import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { LEITNER_INTERVALS_DAYS } from '../../util/srs';

interface BoxBar {
  readonly box: number;
  readonly count: number;
  readonly percent: number;
  readonly intervalDays: number;
}

/** Cuántas preguntas hay en cada caja de Leitner, de la más frágil a la dominada. */
@Component({
  selector: 'app-box-distribution',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="space-y-2.5" [attr.aria-label]="'Distribución por caja de repaso'">
      @for (bar of bars(); track bar.box) {
        <li class="flex items-center gap-3">
          <span class="w-16 shrink-0 text-xs font-medium text-muted-foreground">
            Caja {{ bar.box }}
          </span>
          <div
            class="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden"
            role="img"
            [attr.aria-label]="
              bar.count +
              ' preguntas en la caja ' +
              bar.box +
              ', repaso cada ' +
              bar.intervalDays +
              ' días'
            "
          >
            <div
              class="h-full rounded-full transition-all duration-500"
              [class]="barColor(bar.box)"
              [style.width.%]="bar.percent"
            ></div>
          </div>
          <span class="w-8 shrink-0 text-right text-xs font-semibold text-foreground">
            {{ bar.count }}
          </span>
        </li>
      }
    </ol>
  `,
})
export class BoxDistributionComponent {
  /** Conteo por caja, empezando por la caja 1. */
  readonly counts = input.required<readonly number[]>();

  protected readonly bars = computed<BoxBar[]>(() => {
    const counts = this.counts();
    const max = Math.max(1, ...counts);

    return counts.map((count, index) => ({
      box: index + 1,
      count,
      percent: (count / max) * 100,
      intervalDays: LEITNER_INTERVALS_DAYS[index + 1] ?? 0,
    }));
  });

  /** De frágil a dominada: rojo, ámbar, violeta, verde. */
  protected barColor(box: number): string {
    if (box === 1) return 'bg-destructive';
    if (box === 2) return 'bg-yellow-500';
    if (box >= 4) return 'bg-success';
    return 'bg-primary';
  }
}
