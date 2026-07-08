export interface Referencia {
  /** Slug del archivo de apunte, p. ej. 'apunte-14-planificacion-agregada-produccion'. */
  readonly apunte: string;
  /** Texto del encabezado, p. ej. '4. Planificación Agregada de la Producción (PAP)'. */
  readonly seccion: string;
  /** Slug/id del encabezado para el scroll, p. ej. '4-planificacion-agregada-de-la-produccion-pap'. */
  readonly ancla: string;
}

export interface Question {
  readonly id: number;
  readonly examen: string;
  readonly pregunta: number;
  readonly afirmacion: string;
  readonly respuesta: boolean;
  readonly justificacion: string;
  readonly unidades: readonly string[];
  /** 0..n; la primera es la referencia principal; [] = "sin referencia". */
  readonly referencias: readonly Referencia[];
  /** Id de cluster (Nivel 2/3) que agrupa variantes de un mismo concepto. */
  readonly concepto?: string;
  /** Finales donde apareció la pregunta (procedencia). */
  readonly examenes: readonly string[];
  /** Frecuencia derivada a nivel tarjeta. */
  readonly frecuencia: number;
  /** Frecuencia derivada a nivel concepto. */
  readonly frecuencia_concepto: number;
}

export interface SessionAnswer {
  readonly questionId: number;
  readonly answeredCorrectly: boolean;
  readonly userAnswer: boolean;
}

export interface SessionStats {
  readonly total: number;
  readonly answered: number;
  readonly correct: number;
  readonly incorrect: number;
  readonly remaining: number;
}
