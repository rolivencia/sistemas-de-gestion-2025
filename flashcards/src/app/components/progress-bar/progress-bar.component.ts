import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div
      class="w-full h-2 bg-secondary rounded-full overflow-hidden"
      role="progressbar"
      [attr.aria-valuenow]="progress()"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full bg-primary rounded-full transition-all duration-500 ease-out"
        [style.width.%]="progress()"
      ></div>
    </div>
  `,
})
export class ProgressBarComponent {
  readonly progress = input.required<number>();
}
