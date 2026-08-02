import { Injectable, signal } from '@angular/core';
import type {
  ProgressDocument,
  SessionRecord,
} from '../models/study-history.model';
import { parseHistoryDto, toSessionDto } from './dto';
import { readEnvelope, writeEnvelope } from './envelope';
import {
  HISTORY_SCHEMA_VERSION,
  MAX_SESSIONS,
  PROGRESS_SCHEMA_VERSION,
  STUDY_KEYS,
  type StudyStoragePort,
} from './study-storage.port';

function isQuotaError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  // Los códigos numéricos cubren navegadores viejos que no fijan `name`.
  const code = (error as DOMException).code;
  return (
    error.name === 'QuotaExceededError' ||
    error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    code === 22 ||
    code === 1014
  );
}

@Injectable({ providedIn: 'root' })
export class LocalStudyStorage implements StudyStoragePort {
  private readonly degradedSignal = signal(false);
  /** Claves escritas por una versión futura: se leen pero jamás se pisan. */
  private readonly readOnlyKeys = new Set<string>();

  readonly degraded = this.degradedSignal.asReadonly();

  async loadHistory(): Promise<readonly SessionRecord[]> {
    const result = readEnvelope<unknown>(
      localStorage.getItem(STUDY_KEYS.history),
      HISTORY_SCHEMA_VERSION,
    );

    if (result.kind === 'future') {
      this.markReadOnly(STUDY_KEYS.history);
      return [];
    }
    if (result.kind === 'corrupt') {
      localStorage.removeItem(STUDY_KEYS.history);
      return [];
    }
    if (result.kind === 'empty') return [];

    const history = parseHistoryDto(result.data);
    if (result.migrated) this.writeHistory(history);
    return history;
  }

  async appendSession(record: SessionRecord): Promise<void> {
    if (this.readOnlyKeys.has(STUDY_KEYS.history)) return;

    const history = [...(await this.loadHistory()), record];
    const trimmed = history.slice(-MAX_SESSIONS);

    if (this.writeHistory(trimmed)) return;

    // Ante falta de espacio, sacrificar historia antigua antes que la reciente.
    if (this.writeHistory(trimmed.slice(-Math.floor(MAX_SESSIONS / 2)))) return;

    this.degradedSignal.set(true);
  }

  async loadProgress(): Promise<ProgressDocument | null> {
    const result = readEnvelope<ProgressDocument>(
      localStorage.getItem(STUDY_KEYS.progress),
      PROGRESS_SCHEMA_VERSION,
    );

    if (result.kind === 'future') {
      this.markReadOnly(STUDY_KEYS.progress);
      return null;
    }
    if (result.kind === 'corrupt') {
      localStorage.removeItem(STUDY_KEYS.progress);
      return null;
    }
    if (result.kind === 'empty') return null;

    return result.data;
  }

  async saveProgress(doc: ProgressDocument): Promise<void> {
    if (this.readOnlyKeys.has(STUDY_KEYS.progress)) return;

    // El agregado es una proyección: si no entra, se recalcula al arrancar.
    if (!this.write(STUDY_KEYS.progress, PROGRESS_SCHEMA_VERSION, doc)) {
      this.degradedSignal.set(true);
    }
  }

  async clearAll(): Promise<void> {
    localStorage.removeItem(STUDY_KEYS.history);
    localStorage.removeItem(STUDY_KEYS.progress);
    this.readOnlyKeys.clear();
    this.degradedSignal.set(false);
  }

  private markReadOnly(key: string): void {
    this.readOnlyKeys.add(key);
    this.degradedSignal.set(true);
  }

  private writeHistory(history: readonly SessionRecord[]): boolean {
    return this.write(
      STUDY_KEYS.history,
      HISTORY_SCHEMA_VERSION,
      history.map(toSessionDto),
    );
  }

  /** `false` si la escritura no llegó al disco. */
  private write(key: string, version: number, data: unknown): boolean {
    try {
      localStorage.setItem(key, writeEnvelope(version, data));
      return true;
    } catch (error) {
      if (!isQuotaError(error)) throw error;
      return false;
    }
  }
}
