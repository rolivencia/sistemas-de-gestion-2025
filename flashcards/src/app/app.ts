import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlashcardStore } from './store/flashcard.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
    }
  `,
})
export class App implements OnInit {
  private readonly store = inject(FlashcardStore);

  ngOnInit(): void {
    this.store.loadQuestions();
  }
}
