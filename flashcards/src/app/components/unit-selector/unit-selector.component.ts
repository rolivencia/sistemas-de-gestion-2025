import { Component, inject } from '@angular/core';
import { FlashcardStore } from '../../store/flashcard.store';

@Component({
  selector: 'app-unit-selector',
  template: `
    <div class="space-y-4">
      <!-- Quick actions -->
      <div class="flex gap-3">
        <button
          (click)="store.selectAllUnidades()"
          class="text-sm px-4 py-2 rounded-xl bg-secondary text-secondary-foreground
                 border border-border hover:bg-secondary/80 transition-colors"
        >
          Seleccionar todas
        </button>
        <button
          (click)="store.clearUnidades()"
          class="text-sm px-4 py-2 rounded-xl bg-secondary text-secondary-foreground
                 border border-border hover:bg-secondary/80 transition-colors"
        >
          Limpiar selecci&oacute;n
        </button>
      </div>

      <!-- Unit chips -->
      <div class="flex flex-wrap gap-2.5">
        @for (unidad of store.availableUnidades(); track unidad) {
          <button
            (click)="store.toggleUnidad(unidad)"
            [class]="getChipClasses(unidad)"
          >
            <span>{{ unidad }}</span>
            @if (isSelected(unidad)) {
              <svg
                class="w-4 h-4 ml-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          </button>
        }
      </div>

      @if (store.selectedUnidades().length > 0) {
        <p class="text-sm text-muted-foreground">
          {{ store.selectedUnidades().length }} unidad(es) seleccionada(s)
        </p>
      } @else {
        <p class="text-sm text-muted-foreground">
          Sin filtro &mdash; se incluyen todas las unidades
        </p>
      }
    </div>
  `,
})
export class UnitSelectorComponent {
  protected readonly store = inject(FlashcardStore);

  protected isSelected(unidad: string): boolean {
    return this.store.selectedUnidades().includes(unidad);
  }

  protected getChipClasses(unidad: string): string {
    const base =
      'inline-flex items-center px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer';
    if (this.isSelected(unidad)) {
      return `${base} bg-primary/20 border-primary/60 text-primary`;
    }
    return `${base} bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground`;
  }
}
