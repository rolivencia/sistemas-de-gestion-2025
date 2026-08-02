/**
 * Formato en disco del historial, deliberadamente distinto del modelo de
 * dominio: nombres de una letra para que una sesión completa (193 respuestas)
 * ocupe unos pocos KB, y desacople entre lo que se guarda y cómo se llama en el
 * código.
 */

import {
  SESSION_KINDS,
  type AnswerRecord,
  type SessionKind,
  type SessionRecord,
} from '../models/study-history.model';

interface AnswerDto {
  readonly q: number;
  readonly c: boolean;
  readonly u: boolean;
  readonly t: number;
}

interface SessionDto {
  readonly i: string;
  readonly k: string;
  readonly s: number;
  readonly e: number;
  readonly un: readonly string[];
  readonly p: number;
  readonly a: readonly AnswerDto[];
}

function toAnswerDto(answer: AnswerRecord): AnswerDto {
  return {
    q: answer.questionId,
    c: answer.correct,
    u: answer.userAnswer,
    t: answer.at,
  };
}

export function toSessionDto(record: SessionRecord): SessionDto {
  return {
    i: record.id,
    k: record.kind,
    s: record.startedAt,
    e: record.endedAt,
    un: [...record.unidades],
    p: record.plannedCount,
    a: record.answers.map(toAnswerDto),
  };
}

function isSessionKind(value: unknown): value is SessionKind {
  return (
    typeof value === 'string' &&
    Object.values(SESSION_KINDS).includes(value as SessionKind)
  );
}

function parseAnswer(raw: unknown): AnswerRecord | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const dto = raw as Partial<AnswerDto>;
  if (
    typeof dto.q !== 'number' ||
    typeof dto.c !== 'boolean' ||
    typeof dto.u !== 'boolean' ||
    typeof dto.t !== 'number'
  ) {
    return null;
  }
  return { questionId: dto.q, correct: dto.c, userAnswer: dto.u, at: dto.t };
}

/**
 * Reconstruye una sesión, descartando la entrada entera si le falta algo
 * esencial. Una sesión ilegible se pierde; el resto del historial sobrevive.
 */
export function parseSessionDto(raw: unknown): SessionRecord | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const dto = raw as Partial<SessionDto>;
  if (
    typeof dto.i !== 'string' ||
    !isSessionKind(dto.k) ||
    typeof dto.s !== 'number' ||
    typeof dto.e !== 'number' ||
    typeof dto.p !== 'number' ||
    !Array.isArray(dto.a)
  ) {
    return null;
  }

  const answers = dto.a.map(parseAnswer);
  if (answers.some((a) => a === null)) return null;

  return {
    id: dto.i,
    kind: dto.k,
    startedAt: dto.s,
    endedAt: dto.e,
    unidades: Array.isArray(dto.un) ? dto.un.filter((u) => typeof u === 'string') : [],
    plannedCount: dto.p,
    answers: answers as AnswerRecord[],
  };
}

export function parseHistoryDto(raw: unknown): SessionRecord[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry) => {
    const record = parseSessionDto(entry);
    return record ? [record] : [];
  });
}
