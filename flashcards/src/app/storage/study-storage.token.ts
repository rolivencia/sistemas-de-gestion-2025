import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStudyStorage } from './local-study-storage';
import { MemoryStudyStorage } from './memory-study-storage';
import type { StudyStoragePort } from './study-storage.port';

function localStorageUsable(): boolean {
  try {
    const probe = '__flashcards_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    // Modo privado de Safari, cookies bloqueadas o cuota en cero.
    return false;
  }
}

export const STUDY_STORAGE = new InjectionToken<StudyStoragePort>(
  'STUDY_STORAGE',
  {
    providedIn: 'root',
    factory: () =>
      isPlatformBrowser(inject(PLATFORM_ID)) && localStorageUsable()
        ? inject(LocalStudyStorage)
        : inject(MemoryStudyStorage),
  },
);

/**
 * Aísla los tests del `localStorage` real de jsdom. Usa `useExisting` para que
 * inyectar `MemoryStudyStorage` o `STUDY_STORAGE` devuelva la misma instancia.
 */
export function provideMemoryStudyStorage() {
  return { provide: STUDY_STORAGE, useExisting: MemoryStudyStorage };
}
