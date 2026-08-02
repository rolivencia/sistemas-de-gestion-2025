import type { Signal } from '@angular/core';
import type {
  ProgressDocument,
  SessionRecord,
} from '../models/study-history.model';

/**
 * Puerto de persistencia del estudio. Es asíncrono aunque hoy lo respalde
 * `localStorage` (síncrono): es lo único que permite cambiar a IndexedDB o a un
 * backend sin tocar ninguna firma en el resto de la app.
 */
export interface StudyStoragePort {
  loadHistory(): Promise<readonly SessionRecord[]>;
  appendSession(record: SessionRecord): Promise<void>;
  loadProgress(): Promise<ProgressDocument | null>;
  saveProgress(doc: ProgressDocument): Promise<void>;
  clearAll(): Promise<void>;
  /** `true` cuando las escrituras dejaron de llegar al disco. */
  readonly degraded: Signal<boolean>;
}

export const STUDY_KEYS = Object.freeze({
  history: 'flashcards:sessions',
  progress: 'flashcards:progress',
} as const);

export const HISTORY_SCHEMA_VERSION = 1;
export const PROGRESS_SCHEMA_VERSION = 1;

/** Tope de sesiones guardadas; al superarlo se descartan las más antiguas. */
export const MAX_SESSIONS = 100;
