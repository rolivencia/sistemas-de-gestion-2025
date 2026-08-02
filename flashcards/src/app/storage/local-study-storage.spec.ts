import { TestBed } from '@angular/core/testing';
import { LocalStudyStorage } from './local-study-storage';
import { writeEnvelope } from './envelope';
import {
  HISTORY_SCHEMA_VERSION,
  MAX_SESSIONS,
  STUDY_KEYS,
} from './study-storage.port';
import {
  SESSION_KINDS,
  type ProgressDocument,
  type SessionRecord,
} from '../models/study-history.model';

function record(id: string): SessionRecord {
  return {
    id,
    kind: SESSION_KINDS.free,
    startedAt: 1_000,
    endedAt: 2_000,
    unidades: [],
    plannedCount: 1,
    answers: [{ questionId: 1, correct: true, userAnswer: true, at: 1_500 }],
  };
}

function progressDoc(): ProgressDocument {
  return {
    algo: 'leitner5',
    algoVersion: 1,
    sourceSessionCount: 1,
    lastSessionId: 'a',
    prunedSessions: 0,
    byQuestion: {},
  };
}

function quotaError(): DOMException {
  const error = new Error('cuota superada');
  error.name = 'QuotaExceededError';
  return error as DOMException;
}

describe('LocalStudyStorage', () => {
  let storage: LocalStudyStorage;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    storage = TestBed.inject(LocalStudyStorage);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('empieza sin historial ni progreso', async () => {
    expect(await storage.loadHistory()).toEqual([]);
    expect(await storage.loadProgress()).toBeNull();
    expect(storage.degraded()).toBe(false);
  });

  it('guarda y recupera sesiones en orden', async () => {
    await storage.appendSession(record('a'));
    await storage.appendSession(record('b'));

    expect((await storage.loadHistory()).map((s) => s.id)).toEqual(['a', 'b']);
  });

  it('guarda y recupera el documento de progreso', async () => {
    await storage.saveProgress(progressDoc());

    expect(await storage.loadProgress()).toEqual(progressDoc());
  });

  it('descarta las sesiones más antiguas al superar el tope', async () => {
    for (let i = 0; i < MAX_SESSIONS + 3; i++) {
      await storage.appendSession(record(`s${i}`));
    }

    const history = await storage.loadHistory();
    expect(history).toHaveLength(MAX_SESSIONS);
    expect(history[0].id).toBe('s3');
    expect(history.at(-1)?.id).toBe(`s${MAX_SESSIONS + 2}`);
  });

  it('descarta un historial ilegible en lugar de romper', async () => {
    localStorage.setItem(STUDY_KEYS.history, '{roto');

    expect(await storage.loadHistory()).toEqual([]);
    expect(localStorage.getItem(STUDY_KEYS.history)).toBeNull();
  });

  it('nunca pisa datos escritos por una versión futura', async () => {
    const futuro = writeEnvelope(HISTORY_SCHEMA_VERSION + 1, [{ algo: true }]);
    localStorage.setItem(STUDY_KEYS.history, futuro);

    expect(await storage.loadHistory()).toEqual([]);
    expect(storage.degraded()).toBe(true);

    await storage.appendSession(record('nueva'));

    expect(localStorage.getItem(STUDY_KEYS.history)).toBe(futuro);
  });

  it('poda el historial y reintenta cuando se agota la cuota', async () => {
    for (let i = 0; i < MAX_SESSIONS; i++) {
      await storage.appendSession(record(`s${i}`));
    }

    const original = Storage.prototype.setItem;
    let attempts = 0;
    Storage.prototype.setItem = function (key: string, value: string) {
      if (key === STUDY_KEYS.history && attempts++ === 0) throw quotaError();
      return original.call(this, key, value);
    };

    try {
      await storage.appendSession(record('ultima'));
    } finally {
      Storage.prototype.setItem = original;
    }

    const history = await storage.loadHistory();
    expect(attempts).toBe(2);
    expect(history).toHaveLength(Math.floor(MAX_SESSIONS / 2));
    expect(history.at(-1)?.id).toBe('ultima');
    expect(storage.degraded()).toBe(false);
  });

  it('se marca degradado si ni siquiera el historial podado entra', async () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key: string, value: string) {
      if (key === STUDY_KEYS.history) throw quotaError();
      return original.call(this, key, value);
    };

    try {
      await storage.appendSession(record('a'));
    } finally {
      Storage.prototype.setItem = original;
    }

    expect(storage.degraded()).toBe(true);
  });

  it('propaga errores de escritura que no son de cuota', async () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error('fallo inesperado');
    };

    try {
      await expect(storage.appendSession(record('a'))).rejects.toThrow(
        'fallo inesperado',
      );
    } finally {
      Storage.prototype.setItem = original;
    }
  });

  it('borra ambas claves al limpiar', async () => {
    await storage.appendSession(record('a'));
    await storage.saveProgress(progressDoc());

    await storage.clearAll();

    expect(localStorage.getItem(STUDY_KEYS.history)).toBeNull();
    expect(localStorage.getItem(STUDY_KEYS.progress)).toBeNull();
  });
});
