import { InjectionToken } from '@angular/core';

/**
 * Reloj inyectable. La lógica de repetición espaciada depende del tiempo, así
 * que ningún servicio debe llamar a `Date.now()` directamente: por este token
 * los tests fijan el instante sin recurrir a temporizadores falsos.
 */
export const CLOCK = new InjectionToken<() => number>('CLOCK', {
  providedIn: 'root',
  factory: () => () => Date.now(),
});
