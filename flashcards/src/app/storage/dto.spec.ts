import { parseHistoryDto, parseSessionDto, toSessionDto } from './dto';
import {
  SESSION_KINDS,
  type SessionRecord,
} from '../models/study-history.model';

function baseRecord(overrides: Partial<SessionRecord> = {}): SessionRecord {
  return {
    id: 'sesion-1',
    kind: SESSION_KINDS.free,
    startedAt: 1_000,
    endedAt: 2_000,
    unidades: ['Unidad 1'],
    plannedCount: 2,
    answers: [
      { questionId: 7, correct: true, userAnswer: true, at: 1_100 },
      { questionId: 9, correct: false, userAnswer: true, at: 1_200 },
    ],
    ...overrides,
  };
}

describe('DTO del historial', () => {
  it('sobrevive a un ida y vuelta por JSON', () => {
    const record = baseRecord();

    const restored = parseSessionDto(
      JSON.parse(JSON.stringify(toSessionDto(record))),
    );

    expect(restored).toEqual(record);
  });

  it('conserva las tres clases de sesión', () => {
    for (const kind of Object.values(SESSION_KINDS)) {
      const record = baseRecord({ kind });
      expect(parseSessionDto(toSessionDto(record))?.kind).toBe(kind);
    }
  });

  it('usa nombres compactos en disco', () => {
    expect(Object.keys(toSessionDto(baseRecord())).sort()).toEqual([
      'a',
      'e',
      'i',
      'k',
      'p',
      's',
      'un',
    ]);
  });

  it('rechaza sesiones con campos faltantes o de tipo incorrecto', () => {
    expect(parseSessionDto(null)).toBeNull();
    expect(parseSessionDto({})).toBeNull();
    expect(parseSessionDto({ ...toSessionDto(baseRecord()), i: 5 })).toBeNull();
    expect(
      parseSessionDto({ ...toSessionDto(baseRecord()), k: 'inventado' }),
    ).toBeNull();
  });

  it('rechaza la sesión entera si alguna respuesta es ilegible', () => {
    const dto = { ...toSessionDto(baseRecord()), a: [{ q: 1 }] };

    expect(parseSessionDto(dto)).toBeNull();
  });

  it('descarta sólo las sesiones ilegibles y conserva el resto', () => {
    const valida = toSessionDto(baseRecord({ id: 'buena' }));

    const history = parseHistoryDto([valida, { basura: true }, null]);

    expect(history.map((s) => s.id)).toEqual(['buena']);
  });

  it('devuelve historial vacío si el contenido no es una lista', () => {
    expect(parseHistoryDto({ nope: true })).toEqual([]);
  });
});
