import { Component, input, output } from '@angular/core';
import type { Question, SessionAnswer } from '../../models/question.model';

@Component({
  selector: 'app-flashcard',
  template: `
    <div
      class="flip-card w-full cursor-pointer select-none"
      (click)="flip.emit()"
      role="button"
      tabindex="0"
      [attr.aria-label]="isFlipped() ? 'Lado de la respuesta' : 'Lado de la pregunta. Clic para voltear.'"
    >
      <div class="flip-card-inner relative" [class.flipped]="isFlipped()">
        <!-- Front -->
        <div
          class="flip-card-front w-full min-h-[260px] sm:min-h-[320px] bg-card border border-border
                 rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center
                 shadow-lg shadow-black/20"
        >
          <p
            class="text-lg sm:text-xl md:text-2xl text-center leading-relaxed text-foreground font-medium"
          >
            {{ question().afirmacion }}
          </p>
          <p class="mt-8 text-sm text-muted-foreground/60">
            Toca para voltear
          </p>
        </div>

        <!-- Back -->
        <div
          class="flip-card-back absolute inset-0 w-full min-h-[260px] sm:min-h-[320px] bg-card border border-border
                 rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center
                 shadow-lg shadow-black/20"
        >
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
              [class]="question().respuesta
                ? 'bg-success/15 text-success'
                : 'bg-destructive/15 text-destructive'"
            >
              <span class="text-3xl font-bold">
                {{ question().respuesta ? 'V' : 'F' }}
              </span>
            </div>
            <p class="text-xl sm:text-2xl font-semibold text-foreground">
              {{ question().respuesta ? 'Verdadero' : 'Falso' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .flip-card {
      perspective: 1000px;
    }

    .flip-card-inner {
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
    }

    .flip-card-inner.flipped {
      transform: rotateY(180deg);
    }

    .flip-card-front,
    .flip-card-back {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    .flip-card-back {
      transform: rotateY(180deg);
    }
  `,
})
export class FlashcardComponent {
  readonly question = input.required<Question>();
  readonly isFlipped = input.required<boolean>();
  readonly answer = input.required<SessionAnswer | null>();
  readonly flip = output<void>();
}
