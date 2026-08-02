import {
  applySession,
  emptyProgressDocument,
  needsRebuild,
  rebuildProgress,
  SCHEDULER_ALGO,
  SCHEDULER_ALGO_VERSION,
} from './progress-projection';
import { RECENT_WINDOW, SESSION_KINDS } from '../models/study-history.model';
import type {
  AnswerRecord,
  SessionRecord,
} from '../models/study-history.model';

const START = 1_700_000_000_000;

function session(
  id: string,
  answers: readonly AnswerRecord[],
  overrides: Partial<SessionRecord> = {},
): SessionRecord {
  return {
    id,
    kind: SESSION_KINDS.free,
    startedAt: START,
    endedAt: START + 1_000,
    unidades: [],
    plannedCount: answers.length,
    answers,
    ...overrides,
  };
}

function answer(
  questionId: number,
  correct: boolean,
  at: number,
): AnswerRecord {
  return { questionId, correct, userAnswer: correct, at };
}

describe('applySession', () => {
  it('acumula aciertos y errores por pregunta', () => {
    const doc = applySession(
      emptyProgressDocument(),
      session('s1', [
        answer(1, true, START),
        answer(2, false, START + 10),
        answer(1, false, START + 20),
      ]),
    );

    expect(doc.byQuestion[1].stats).toMatchObject({
      seen: 2,
      correct: 1,
      currentStreak: 0,
      longestStreak: 1,
      lastAnswerAt: START + 20,
    });
    expect(doc.byQuestion[2].stats).toMatchObject({ seen: 1, correct: 0 });
  });

  it('registra la sesión proyectada para poder detectar deriva', () => {
    const doc = applySession(
      emptyProgressDocument(),
      session('s1', [answer(1, true, START)]),
    );

    expect(doc.sourceSessionCount).toBe(1);
    expect(doc.lastSessionId).toBe('s1');
    expect(doc.algo).toBe(SCHEDULER_ALGO);
    expect(doc.algoVersion).toBe(SCHEDULER_ALGO_VERSION);
  });

  it('ordena las respuestas por instante, no por posición guardada', () => {
    const desordenada = applySession(
      emptyProgressDocument(),
      session('s1', [answer(1, false, START + 50), answer(1, true, START)]),
    );
    const ordenada = applySession(
      emptyProgressDocument(),
      session('s1', [answer(1, true, START), answer(1, false, START + 50)]),
    );

    expect(desordenada).toEqual(ordenada);
    expect(desordenada.byQuestion[1].stats.currentStreak).toBe(0);
  });

  it('conserva sólo los últimos resultados recientes', () => {
    const answers = Array.from({ length: RECENT_WINDOW + 5 }, (_, i) =>
      answer(1, i % 2 === 0, START + i),
    );

    const doc = applySession(emptyProgressDocument(), session('s1', answers));

    expect(doc.byQuestion[1].stats.recent).toHaveLength(RECENT_WINDOW);
    expect(doc.byQuestion[1].stats.recent.at(-1)).toBe(
      answers.at(-1)!.correct,
    );
  });

  it('no muta el documento recibido', () => {
    const original = emptyProgressDocument();

    applySession(original, session('s1', [answer(1, true, START)]));

    expect(original.byQuestion).toEqual({});
    expect(original.sourceSessionCount).toBe(0);
  });
});

describe('rebuildProgress', () => {
  const history = [
    session('s1', [answer(1, true, START), answer(2, false, START + 10)]),
    session('s2', [answer(1, false, START + 100), answer(3, true, START + 110)]),
    session('s3', [answer(2, true, START + 200)]),
  ];

  it('equivale a aplicar las sesiones de a una', () => {
    const incremental = history.reduce(applySession, emptyProgressDocument());

    expect(rebuildProgress(history)).toEqual(incremental);
  });

  it('parte de un documento vacío cuando no hay historial', () => {
    expect(rebuildProgress([])).toEqual(emptyProgressDocument());
  });

  it('arrastra el número de sesiones descartadas', () => {
    expect(rebuildProgress(history, 4).prunedSessions).toBe(4);
  });
});

describe('needsRebuild', () => {
  const history = [session('s1', [answer(1, true, START)])];
  const doc = rebuildProgress(history);

  it('no reconstruye si la caché está al día', () => {
    expect(needsRebuild(doc, history)).toBe(false);
  });

  it('reconstruye si no hay caché', () => {
    expect(needsRebuild(null, history)).toBe(true);
  });

  it('reconstruye si cambió el algoritmo o su versión', () => {
    expect(needsRebuild({ ...doc, algo: 'sm2' }, history)).toBe(true);
    expect(needsRebuild({ ...doc, algoVersion: 99 }, history)).toBe(true);
  });

  it('reconstruye si el historial creció o encogió por detrás', () => {
    expect(
      needsRebuild(doc, [...history, session('s2', [answer(1, true, START)])]),
    ).toBe(true);
    expect(needsRebuild(doc, [])).toBe(true);
  });

  it('reconstruye si la última sesión no coincide', () => {
    expect(needsRebuild({ ...doc, lastSessionId: 'otra' }, history)).toBe(true);
  });
});
