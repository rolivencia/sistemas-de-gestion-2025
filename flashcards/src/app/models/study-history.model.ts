/**
 * Modelo de lo que se persiste entre sesiones.
 *
 * Sólo se guardan ids de pregunta, nunca su texto: `preguntas.json` sigue
 * siendo la única fuente de verdad del contenido.
 */

export const SESSION_KINDS = Object.freeze({
  /** Sesión normal iniciada desde el home. */
  free: 'free',
  /** Repaso de los errores de la sesión anterior. */
  mistakes: 'mistakes',
  /** Sesión dirigida lanzada desde el diagnóstico. */
  targeted: 'targeted',
} as const);

export type SessionKind = (typeof SESSION_KINDS)[keyof typeof SESSION_KINDS];

export interface AnswerRecord {
  readonly questionId: number;
  readonly correct: boolean;
  readonly userAnswer: boolean;
  /** Epoch en ms. */
  readonly at: number;
}

export interface SessionRecord {
  readonly id: string;
  readonly kind: SessionKind;
  readonly startedAt: number;
  readonly endedAt: number;
  /** Unidades seleccionadas al iniciar; `[]` significa "todas". */
  readonly unidades: readonly string[];
  /** Preguntas del pool. Si supera `answers.length`, la sesión se abandonó. */
  readonly plannedCount: number;
  readonly answers: readonly AnswerRecord[];
}

/** Cuántos resultados recientes se conservan por pregunta. */
export const RECENT_WINDOW = 10;

export interface QuestionStats {
  readonly seen: number;
  readonly correct: number;
  /** Aciertos consecutivos hasta la última respuesta. */
  readonly currentStreak: number;
  readonly longestStreak: number;
  readonly lastAnswerAt: number;
  /** Últimos `RECENT_WINDOW` resultados; el más reciente al final. */
  readonly recent: readonly boolean[];
}

export interface SrsState {
  /** Caja de Leitner, 1 (frágil) a `MAX_BOX` (dominada). */
  readonly box: number;
  readonly intervalDays: number;
  /** Epoch en ms a partir del cual la pregunta toca repasarse. */
  readonly dueAt: number;
  readonly lastReviewedAt: number;
  /** Fallos cometidos estando ya en una caja alta. */
  readonly lapses: number;
}

export interface QuestionProgress {
  readonly stats: QuestionStats;
  readonly srs: SrsState;
}

export interface ProgressDocument {
  /** Algoritmo con el que se calculó; un cambio fuerza reconstrucción. */
  readonly algo: string;
  readonly algoVersion: number;
  /** Sesiones proyectadas: se compara con el historial para detectar deriva. */
  readonly sourceSessionCount: number;
  readonly lastSessionId: string | null;
  /** Sesiones descartadas por límite de tamaño; el agregado ya no es exacto. */
  readonly prunedSessions: number;
  readonly byQuestion: Readonly<Record<number, QuestionProgress>>;
}
