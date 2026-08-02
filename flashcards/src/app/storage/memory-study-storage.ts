import { Injectable, signal } from '@angular/core';
import type {
  ProgressDocument,
  SessionRecord,
} from '../models/study-history.model';
import { MAX_SESSIONS, type StudyStoragePort } from './study-storage.port';

/**
 * Respaldo en memoria: se usa cuando `localStorage` no está disponible y en los
 * tests, para que nada escriba en el almacenamiento real de jsdom.
 */
@Injectable({ providedIn: 'root' })
export class MemoryStudyStorage implements StudyStoragePort {
  private history: SessionRecord[] = [];
  private progress: ProgressDocument | null = null;

  readonly degraded = signal(false);

  async loadHistory(): Promise<readonly SessionRecord[]> {
    return [...this.history];
  }

  async appendSession(record: SessionRecord): Promise<void> {
    this.history = [...this.history, record].slice(-MAX_SESSIONS);
  }

  async loadProgress(): Promise<ProgressDocument | null> {
    return this.progress;
  }

  async saveProgress(doc: ProgressDocument): Promise<void> {
    this.progress = doc;
  }

  async clearAll(): Promise<void> {
    this.history = [];
    this.progress = null;
  }
}
