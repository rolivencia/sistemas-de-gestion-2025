import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlashcardStore } from './store/flashcard.store';
import { StudyHistoryStore } from './store/study-history.store';

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
  private readonly historyStore = inject(StudyHistoryStore);

  ngOnInit(): void {
    this.store.loadQuestions();
    void this.historyStore.hydrate();
  }
}
