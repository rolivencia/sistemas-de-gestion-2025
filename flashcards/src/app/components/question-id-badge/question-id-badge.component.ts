import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Identificador estable de la tarjeta. Es el único campo realmente único del
 * dataset: `examen` + `pregunta` se repite entre variantes de un mismo concepto.
 */
@Component({
  selector: 'app-question-id-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="text-xs font-semibold px-3 py-1 rounded-full font-mono
             bg-secondary text-muted-foreground border border-border"
    >
      <span class="sr-only">Tarjeta n&uacute;mero </span>#{{ questionId() }}
    </span>
  `,
})
export class QuestionIdBadgeComponent {
  readonly questionId = input.required<number>();
}
