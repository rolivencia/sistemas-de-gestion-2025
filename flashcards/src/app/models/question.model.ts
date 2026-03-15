export interface Question {
  readonly id: number;
  readonly examen: string;
  readonly pregunta: number;
  readonly afirmacion: string;
  readonly respuesta: boolean;
  readonly justificacion: string;
  readonly unidades: readonly string[];
  readonly verificacion: string;
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
