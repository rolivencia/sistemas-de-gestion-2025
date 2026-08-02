import {
  accuracyByUnidad,
  boxDistribution,
  dueQuestions,
  neverSeenQuestions,
  overallStats,
  rankWeakest,
  smoothedAccuracy,
} from './diagnostics';
import { applySession, emptyProgressDocument } from './progress-projection';
import { MAX_BOX, MS_PER_DAY } from './srs';
import { SESSION_KINDS } from '../models/study-history.model';
import type {
  AnswerRecord,
  ProgressDocument,
} from '../models/study-history.model';
import type { Question } from '../models/question.model';

const START = 1_700_000_000_000;

function question(overrides: Partial<Question>): Question {
  return {
    id: 1,
    examen: 'Examen 1',
    pregunta: 1,
    afirmacion: 'Afirmación',
    respuesta: true,
    justificacion: '',
    unidades: ['Unidad 1'],
    referencias: [],
    examenes: ['Examen 1'],
    frecuencia: 1,
    frecuencia_concepto: 1,
    ...overrides,
  };
}

/** Construye el agregado aplicando las respuestas dadas como una sesión. */
function documentOf(answers: readonly AnswerRecord[]): ProgressDocument {
  return applySession(emptyProgressDocument(), {
    id: 's1',
    kind: SESSION_KINDS.free,
    startedAt: START,
    endedAt: START + 1_000,
    unidades: [],
    plannedCount: answers.length,
    answers,
  });
}

function answer(id: number, correct: boolean, at = START): AnswerRecord {
  return { questionId: id, correct, userAnswer: correct, at };
}

describe('smoothedAccuracy', () => {
  it('no toma un único acierto como dominio', () => {
    expect(smoothedAccuracy(1, 1)).toBeLessThan(1);
  });

  it('evita dividir por cero sin datos', () => {
    expect(smoothedAccuracy(0, 0)).toBe(0.5);
  });

  it('sube con la proporción de aciertos', () => {
    expect(smoothedAccuracy(10, 9)).toBeGreaterThan(smoothedAccuracy(10, 4));
  });
});

describe('rankWeakest', () => {
  it('pone primero la pregunta con peor desempeño', () => {
    const questions = [question({ id: 1 }), question({ id: 2 })];
    const doc = documentOf([
      answer(1, false, START),
      answer(1, false, START + 1),
      answer(2, true, START + 2),
      answer(2, true, START + 3),
    ]);

    const ranked = rankWeakest(questions, doc, START + 10);

    expect(ranked.map((r) => r.question.id)).toEqual([1, 2]);
    expect(ranked[0].score).toBeGreaterThan(ranked[1].score);
  });

  it('excluye las preguntas nunca respondidas', () => {
    const questions = [question({ id: 1 }), question({ id: 2 })];
    const doc = documentOf([answer(1, false)]);

    expect(rankWeakest(questions, doc, START).map((r) => r.question.id)).toEqual(
      [1],
    );
  });

  it('a igual tasa de error, prioriza la que tiene más evidencia', () => {
    const questions = [question({ id: 1 }), question({ id: 2 })];
    const doc = documentOf([
      // Cuatro fallos de cuatro.
      ...Array.from({ length: 4 }, (_, i) => answer(1, false, START + i)),
      // Un fallo de uno: mismo 0% de aciertos, mucha menos evidencia.
      answer(2, false, START + 10),
    ]);

    const ranked = rankWeakest(questions, doc, START + 20);

    expect(ranked.map((r) => r.question.id)).toEqual([1, 2]);
  });

  it('desempata por id para que el orden sea estable', () => {
    const questions = [question({ id: 5 }), question({ id: 2 })];
    const doc = documentOf([answer(5, false), answer(2, false)]);

    expect(rankWeakest(questions, doc, START).map((r) => r.question.id)).toEqual(
      [2, 5],
    );
  });

  it('respeta el límite pedido', () => {
    const questions = [question({ id: 1 }), question({ id: 2 })];
    const doc = documentOf([answer(1, false), answer(2, false)]);

    expect(rankWeakest(questions, doc, START, 1)).toHaveLength(1);
  });

  it('penaliza el atraso del repaso', () => {
    const questions = [question({ id: 1 })];
    const doc = documentOf([answer(1, true)]);

    const alDia = rankWeakest(questions, doc, START)[0].score;
    const atrasada = rankWeakest(questions, doc, START + 30 * MS_PER_DAY)[0]
      .score;

    expect(atrasada).toBeGreaterThan(alDia);
  });

  it('pesa más lo que aparece con frecuencia en los finales', () => {
    const questions = [
      question({ id: 1, frecuencia: 1 }),
      question({ id: 2, frecuencia: 8 }),
    ];
    const doc = documentOf([answer(1, false), answer(2, false)]);

    expect(rankWeakest(questions, doc, START)[0].question.id).toBe(2);
  });
});

describe('dueQuestions', () => {
  it('sólo devuelve las vistas cuyo repaso ya venció', () => {
    const questions = [
      question({ id: 1 }),
      question({ id: 2 }),
      question({ id: 3 }),
    ];
    // La 1 acierta (intervalo largo), la 2 falla (vuelve a la primera caja).
    const doc = documentOf([answer(1, true), answer(2, false)]);

    const due = dueQuestions(questions, doc, START + 2 * MS_PER_DAY);

    expect(due.map((q) => q.id)).toEqual([2]);
  });
});

describe('neverSeenQuestions', () => {
  it('lista las preguntas sin ninguna respuesta', () => {
    const questions = [question({ id: 1 }), question({ id: 2 })];
    const doc = documentOf([answer(1, true)]);

    expect(neverSeenQuestions(questions, doc).map((q) => q.id)).toEqual([2]);
  });
});

describe('boxDistribution', () => {
  it('cuenta las preguntas vistas por caja', () => {
    const questions = [
      question({ id: 1 }),
      question({ id: 2 }),
      question({ id: 3 }),
    ];
    const doc = documentOf([answer(1, true), answer(2, false)]);

    const distribution = boxDistribution(questions, doc);

    expect(distribution).toHaveLength(MAX_BOX);
    // La 2 quedó en la caja 1 y la 1 subió a la caja 2; la 3 no se vio.
    expect(distribution[0]).toBe(1);
    expect(distribution[1]).toBe(1);
    expect(distribution.reduce((a, b) => a + b, 0)).toBe(2);
  });
});

describe('accuracyByUnidad', () => {
  it('agrega por unidad y ordena de peor a mejor', () => {
    const questions = [
      question({ id: 1, unidades: ['Unidad 1'] }),
      question({ id: 2, unidades: ['Unidad 2'] }),
    ];
    const doc = documentOf([
      answer(1, false, START),
      answer(1, false, START + 1),
      answer(2, true, START + 2),
    ]);

    const rows = accuracyByUnidad(questions, doc);

    expect(rows.map((r) => r.unidad)).toEqual(['Unidad 1', 'Unidad 2']);
    expect(rows[0]).toMatchObject({ seen: 2, correct: 0, accuracy: 0 });
    expect(rows[1].accuracy).toBe(1);
  });

  it('cuenta una pregunta en todas sus unidades', () => {
    const questions = [question({ id: 1, unidades: ['Unidad 1', 'Unidad 2'] })];
    const doc = documentOf([answer(1, true)]);

    expect(accuracyByUnidad(questions, doc).map((r) => r.unidad)).toEqual([
      'Unidad 1',
      'Unidad 2',
    ]);
  });
});

describe('overallStats', () => {
  it('resume cobertura y precisión global', () => {
    const questions = [
      question({ id: 1 }),
      question({ id: 2 }),
      question({ id: 3 }),
    ];
    const doc = documentOf([
      answer(1, true, START),
      answer(1, false, START + 1),
      answer(2, true, START + 2),
    ]);

    expect(overallStats(questions, doc)).toEqual({
      seenQuestions: 2,
      totalQuestions: 3,
      answers: 3,
      correct: 2,
      accuracy: 2 / 3,
    });
  });

  it('no divide por cero sin respuestas', () => {
    expect(overallStats([question({ id: 1 })], emptyProgressDocument())).toEqual(
      {
        seenQuestions: 0,
        totalQuestions: 1,
        answers: 0,
        correct: 0,
        accuracy: 0,
      },
    );
  });
});
