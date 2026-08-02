import type { SrsState } from '../models/study-history.model';

/**
 * Repetición espaciada por cajas de Leitner.
 *
 * Se eligió Leitner y no SM-2 porque las tarjetas son de verdadero/falso: SM-2
 * necesita una autoevaluación de 0 a 5 y, con una respuesta binaria, su factor
 * de facilidad sólo tendría dos transiciones posibles. Las cajas, además, se
 * explican solas en la interfaz ("Caja 3 de 5").
 *
 * Ninguna función lee el reloj: el instante siempre entra por parámetro para
 * que las pruebas sean deterministas.
 */

export const MS_PER_DAY = 86_400_000;

/** Días de espera por caja; el índice es el número de caja (el 0 no se usa). */
export const LEITNER_INTERVALS_DAYS = Object.freeze([
  0, 1, 3, 7, 16, 35,
] as const);

export const MIN_BOX = 1;
export const MAX_BOX = LEITNER_INTERVALS_DAYS.length - 1;

/** Caja a partir de la cual un fallo cuenta como recaída. */
const LAPSE_BOX_THRESHOLD = 3;

/** Cajas que se retroceden al fallar. */
const DEMOTION_STEP = 2;

export function initialSrsState(now: number): SrsState {
  return {
    box: MIN_BOX,
    intervalDays: 0,
    dueAt: now,
    lastReviewedAt: 0,
    lapses: 0,
  };
}

function clampBox(box: number): number {
  return Math.min(Math.max(box, MIN_BOX), MAX_BOX);
}

/**
 * Acertar sube una caja; fallar retrocede dos en lugar de reiniciar a la
 * primera. Con respuestas binarias hay un 50% de acierto por azar: el castigo
 * total haría que cualquier golpe de suerte pareciera dominio, y el reinicio
 * total dejaría a la tarjeta rebotando entre las dos primeras cajas.
 */
export function scheduleNext(
  previous: SrsState,
  correct: boolean,
  answeredAt: number,
): SrsState {
  const box = clampBox(
    correct ? previous.box + 1 : previous.box - DEMOTION_STEP,
  );
  const intervalDays = LEITNER_INTERVALS_DAYS[box];
  const isLapse = !correct && previous.box >= LAPSE_BOX_THRESHOLD;

  return {
    box,
    intervalDays,
    dueAt: answeredAt + intervalDays * MS_PER_DAY,
    lastReviewedAt: answeredAt,
    lapses: previous.lapses + (isLapse ? 1 : 0),
  };
}

export function isDue(state: SrsState, now: number): boolean {
  return now >= state.dueAt;
}

export function daysOverdue(state: SrsState, now: number): number {
  return Math.max(0, (now - state.dueAt) / MS_PER_DAY);
}
