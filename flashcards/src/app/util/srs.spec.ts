import {
  daysOverdue,
  initialSrsState,
  isDue,
  LEITNER_INTERVALS_DAYS,
  MAX_BOX,
  MIN_BOX,
  MS_PER_DAY,
  scheduleNext,
} from './srs';

const NOW = 1_700_000_000_000;

describe('scheduleNext', () => {
  it('sube una caja al acertar', () => {
    const state = scheduleNext(initialSrsState(NOW), true, NOW);

    expect(state.box).toBe(MIN_BOX + 1);
    expect(state.intervalDays).toBe(LEITNER_INTERVALS_DAYS[MIN_BOX + 1]);
    expect(state.lastReviewedAt).toBe(NOW);
  });

  it('no pasa de la última caja por mucho que se acierte', () => {
    let state = initialSrsState(NOW);
    for (let i = 0; i < 20; i++) state = scheduleNext(state, true, NOW);

    expect(state.box).toBe(MAX_BOX);
    expect(state.intervalDays).toBe(LEITNER_INTERVALS_DAYS[MAX_BOX]);
  });

  it('retrocede dos cajas al fallar', () => {
    let state = initialSrsState(NOW);
    for (let i = 0; i < 4; i++) state = scheduleNext(state, true, NOW);
    expect(state.box).toBe(MAX_BOX);

    const failed = scheduleNext(state, false, NOW);

    expect(failed.box).toBe(MAX_BOX - 2);
  });

  it('no baja de la primera caja', () => {
    const state = scheduleNext(initialSrsState(NOW), false, NOW);

    expect(state.box).toBe(MIN_BOX);
  });

  it('calcula el vencimiento sumando el intervalo de la caja', () => {
    const state = scheduleNext(initialSrsState(NOW), true, NOW);

    expect(state.dueAt).toBe(NOW + LEITNER_INTERVALS_DAYS[2] * MS_PER_DAY);
  });

  it('cuenta como recaída sólo el fallo desde una caja alta', () => {
    const baja = scheduleNext(initialSrsState(NOW), false, NOW);
    expect(baja.lapses).toBe(0);

    let alta = initialSrsState(NOW);
    for (let i = 0; i < 3; i++) alta = scheduleNext(alta, true, NOW);
    expect(alta.box).toBeGreaterThanOrEqual(3);

    expect(scheduleNext(alta, false, NOW).lapses).toBe(1);
  });

  it('no depende del reloj: el instante siempre llega por parámetro', () => {
    const a = scheduleNext(initialSrsState(0), true, 5_000);
    const b = scheduleNext(initialSrsState(0), true, 5_000);

    expect(a).toEqual(b);
  });
});

describe('isDue / daysOverdue', () => {
  it('marca vencida la tarjeta al llegar su fecha', () => {
    const state = scheduleNext(initialSrsState(NOW), true, NOW);

    expect(isDue(state, state.dueAt - 1)).toBe(false);
    expect(isDue(state, state.dueAt)).toBe(true);
  });

  it('mide el atraso en días y nunca en negativo', () => {
    const state = scheduleNext(initialSrsState(NOW), true, NOW);

    expect(daysOverdue(state, state.dueAt - MS_PER_DAY)).toBe(0);
    expect(daysOverdue(state, state.dueAt + 3 * MS_PER_DAY)).toBe(3);
  });
});
