import {
  RECENT_WINDOW,
  type AnswerRecord,
  type ProgressDocument,
  type QuestionProgress,
  type QuestionStats,
  type SessionRecord,
} from '../models/study-history.model';
import { initialSrsState, scheduleNext } from './srs';

/**
 * Proyección del historial de sesiones al agregado por pregunta.
 *
 * El historial es el registro autoritativo; este documento es una caché que
 * puede reconstruirse por completo. Todo aquí es puro: mismas entradas, mismo
 * resultado, sin reloj ni almacenamiento de por medio.
 */

export const SCHEDULER_ALGO = 'leitner5';
export const SCHEDULER_ALGO_VERSION = 1;

export function emptyProgressDocument(
  prunedSessions = 0,
): ProgressDocument {
  return {
    algo: SCHEDULER_ALGO,
    algoVersion: SCHEDULER_ALGO_VERSION,
    sourceSessionCount: 0,
    lastSessionId: null,
    prunedSessions,
    byQuestion: {},
  };
}

function initialStats(): QuestionStats {
  return {
    seen: 0,
    correct: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastAnswerAt: 0,
    recent: [],
  };
}

function nextStats(
  previous: QuestionStats,
  correct: boolean,
  at: number,
): QuestionStats {
  const currentStreak = correct ? previous.currentStreak + 1 : 0;
  return {
    seen: previous.seen + 1,
    correct: previous.correct + (correct ? 1 : 0),
    currentStreak,
    longestStreak: Math.max(previous.longestStreak, currentStreak),
    lastAnswerAt: at,
    recent: [...previous.recent, correct].slice(-RECENT_WINDOW),
  };
}

export function applyAnswer(
  previous: QuestionProgress | undefined,
  answer: AnswerRecord,
): QuestionProgress {
  const stats = previous?.stats ?? initialStats();
  const srs = previous?.srs ?? initialSrsState(answer.at);

  return {
    stats: nextStats(stats, answer.correct, answer.at),
    srs: scheduleNext(srs, answer.correct, answer.at),
  };
}

/**
 * Incorpora una sesión al agregado. Las respuestas se ordenan por instante
 * para que el resultado no dependa del orden en que se guardaron.
 */
export function applySession(
  document: ProgressDocument,
  record: SessionRecord,
): ProgressDocument {
  const byQuestion: Record<number, QuestionProgress> = {
    ...document.byQuestion,
  };

  for (const answer of [...record.answers].sort((a, b) => a.at - b.at)) {
    byQuestion[answer.questionId] = applyAnswer(
      byQuestion[answer.questionId],
      answer,
    );
  }

  return {
    ...document,
    algo: SCHEDULER_ALGO,
    algoVersion: SCHEDULER_ALGO_VERSION,
    sourceSessionCount: document.sourceSessionCount + 1,
    lastSessionId: record.id,
    byQuestion,
  };
}

export function rebuildProgress(
  history: readonly SessionRecord[],
  prunedSessions = 0,
): ProgressDocument {
  return history.reduce(applySession, emptyProgressDocument(prunedSessions));
}

/**
 * Detecta que la caché dejó de reflejar el historial: falta, la calculó otra
 * versión del algoritmo, o el número/última sesión no coinciden.
 */
export function needsRebuild(
  document: ProgressDocument | null,
  history: readonly SessionRecord[],
): boolean {
  if (!document) return true;
  return (
    document.algo !== SCHEDULER_ALGO ||
    document.algoVersion !== SCHEDULER_ALGO_VERSION ||
    document.sourceSessionCount !== history.length ||
    document.lastSessionId !== (history.at(-1)?.id ?? null)
  );
}
