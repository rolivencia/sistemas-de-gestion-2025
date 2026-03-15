import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const current = this.theme();
      if (!this.isBrowser) return;

      const root = document.documentElement;
      if (current === 'light') {
        root.classList.add('light');
      } else {
        root.classList.remove('light');
      }
      localStorage.setItem('theme', current);
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) return 'dark';

    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;

    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
}
