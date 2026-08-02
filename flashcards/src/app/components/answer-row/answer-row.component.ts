import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { QuestionIdBadgeComponent } from '../question-id-badge/question-id-badge.component';
import type {
  AnsweredQuestion,
  Referencia,
} from '../../models/question.model';

/** Fila del detalle de respuestas: marca de acierto/error, afirmación y metadatos. */
@Component({
  selector: 'app-answer-row',
  imports: [QuestionIdBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-card border rounded-2xl p-5 transition-colors"
      [class]="item().answeredCorrectly ? 'border-success/30' : 'border-destructive/30'"
    >
      <div class="flex items-start gap-4">
        <div
          class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
          [class]="item().answeredCorrectly
            ? 'bg-success/20 text-success'
            : 'bg-destructive/20 text-destructive'"
        >
          @if (item().answeredCorrectly) {
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
            {{ item().question.afirmacion }}
          </p>
          <div class="flex flex-wrap items-center gap-2 mt-3">
            <app-question-id-badge [questionId]="item().question.id" />
            <span
              class="text-xs font-medium px-2.5 py-1 rounded-full"
              [class]="item().question.respuesta
                ? 'bg-success/10 text-success'
                : 'bg-destructive/10 text-destructive'"
            >
              Respuesta: {{ item().question.respuesta ? 'Verdadero' : 'Falso' }}
            </span>
            @if (!item().answeredCorrectly) {
              <span class="text-xs text-muted-foreground">
                Respondiste: {{ item().userAnswer ? 'Verdadero' : 'Falso' }}
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
      </div>
    </div>
  `,
})
export class AnswerRowComponent {
  readonly item = input.required<AnsweredQuestion>();
  readonly openApunte = output<Referencia>();
}
