import type { Question } from '../models/question.model';
import type {
  ProgressDocument,
  QuestionProgress,
} from '../models/study-history.model';
import { daysOverdue, isDue, MAX_BOX, MIN_BOX } from './srs';

/**
 * Métricas de diagnóstico: qué preguntas cuestan más y cuáles toca repasar.
 * Todo puro; el instante actual entra siempre por parámetro.
 */

export interface WeakQuestion {
  readonly question: Question;
  readonly progress: QuestionProgress;
  readonly score: number;
  readonly accuracy: number;
  readonly due: boolean;
  readonly daysOverdue: number;
}

export interface UnidadAccuracy {
  readonly unidad: string;
  readonly seen: number;
  readonly correct: number;
  readonly accuracy: number;
}

/** Días de atraso a partir de los cuales el retraso deja de sumar puntos. */
const OVERDUE_SATURATION_DAYS = 14;

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

/**
 * Precisión suavizada (regla de sucesión de Laplace). Sin el suavizado, una
 * pregunta fallada una única vez encabezaría el ranking por delante de otra
 * fallada cuatro de diez veces, que es la que de verdad cuesta.
 */
export function smoothedAccuracy(seen: number, correct: number): number {
  return (correct + 1) / (seen + 2);
}

/**
 * Puntaje de fragilidad en [0, 1]: cuanto más alto, más conviene repasar.
 * Combina el desempeño histórico, el reciente, el atraso del repaso y cuánto
 * pesa la pregunta en los finales.
 */
export function weaknessScore(
  progress: QuestionProgress,
  normalizedFrecuencia: number,
  now: number,
): number {
  const { stats, srs } = progress;
  const accuracy = smoothedAccuracy(stats.seen, stats.correct);

  const recentFailures = stats.recent.length
    ? stats.recent.filter((ok) => !ok).length / stats.recent.length
    : 0;

  const overdue = clamp01(daysOverdue(srs, now) / OVERDUE_SATURATION_DAYS);

  return (
    0.5 * (1 - accuracy) +
    0.2 * recentFailures +
    0.2 * overdue +
    0.1 * clamp01(normalizedFrecuencia)
  );
}

/**
 * Ordena de más a menos frágil. Las preguntas nunca respondidas quedan fuera:
 * sin datos no hay diagnóstico, y mezclarlas vaciaría de sentido el ranking.
 */
export function rankWeakest(
  questions: readonly Question[],
  document: ProgressDocument,
  now: number,
  limit?: number,
): WeakQuestion[] {
  const maxFrecuencia = Math.max(1, ...questions.map((q) => q.frecuencia));

  const ranked = questions.flatMap((question) => {
    const progress = document.byQuestion[question.id];
    if (!progress || progress.stats.seen === 0) return [];

    return [
      {
        question,
        progress,
        score: weaknessScore(progress, question.frecuencia / maxFrecuencia, now),
        accuracy: progress.stats.correct / progress.stats.seen,
        due: isDue(progress.srs, now),
        daysOverdue: daysOverdue(progress.srs, now),
      },
    ];
  });

  // Desempate por id para que el orden sea estable entre renders.
  ranked.sort((a, b) => b.score - a.score || a.question.id - b.question.id);

  return limit === undefined ? ranked : ranked.slice(0, limit);
}

/** Preguntas ya vistas cuyo repaso está vencido. */
export function dueQuestions(
  questions: readonly Question[],
  document: ProgressDocument,
  now: number,
): Question[] {
  return questions.filter((question) => {
    const progress = document.byQuestion[question.id];
    return Boolean(progress?.stats.seen) && isDue(progress.srs, now);
  });
}

export function neverSeenQuestions(
  questions: readonly Question[],
  document: ProgressDocument,
): Question[] {
  return questions.filter(
    (question) => !document.byQuestion[question.id]?.stats.seen,
  );
}

/** Cuántas preguntas hay en cada caja de Leitner, de la 1 a la `MAX_BOX`. */
export function boxDistribution(
  questions: readonly Question[],
  document: ProgressDocument,
): number[] {
  const counts = Array.from({ length: MAX_BOX }, () => 0);

  for (const question of questions) {
    const progress = document.byQuestion[question.id];
    if (!progress || progress.stats.seen === 0) continue;
    counts[progress.srs.box - MIN_BOX] += 1;
  }

  return counts;
}

export function accuracyByUnidad(
  questions: readonly Question[],
  document: ProgressDocument,
): UnidadAccuracy[] {
  const totals = new Map<string, { seen: number; correct: number }>();

  for (const question of questions) {
    const stats = document.byQuestion[question.id]?.stats;
    if (!stats?.seen) continue;

    for (const unidad of question.unidades) {
      const total = totals.get(unidad) ?? { seen: 0, correct: 0 };
      total.seen += stats.seen;
      total.correct += stats.correct;
      totals.set(unidad, total);
    }
  }

  return [...totals.entries()]
    .map(([unidad, { seen, correct }]) => ({
      unidad,
      seen,
      correct,
      accuracy: correct / seen,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || a.unidad.localeCompare(b.unidad));
}

export interface OverallStats {
  readonly seenQuestions: number;
  readonly totalQuestions: number;
  readonly answers: number;
  readonly correct: number;
  readonly accuracy: number;
}

export function overallStats(
  questions: readonly Question[],
  document: ProgressDocument,
): OverallStats {
  let seenQuestions = 0;
  let answers = 0;
  let correct = 0;

  for (const question of questions) {
    const stats = document.byQuestion[question.id]?.stats;
    if (!stats?.seen) continue;
    seenQuestions += 1;
    answers += stats.seen;
    correct += stats.correct;
  }

  return {
    seenQuestions,
    totalQuestions: questions.length,
    answers,
    correct,
    accuracy: answers === 0 ? 0 : correct / answers,
  };
}
