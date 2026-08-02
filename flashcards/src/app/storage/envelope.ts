/**
 * Sobre versionada para todo lo que se escribe en almacenamiento persistente.
 *
 * La versión va **dentro** del valor y no en el nombre de la clave: así una
 * migración futura puede leer lo viejo sin tener que adivinar nombres.
 */

export interface Envelope<T> {
  readonly v: number;
  readonly data: T;
}

/** Transforma los datos de la versión `n` a la `n + 1`. */
export type Migration = (data: unknown) => unknown;

export type ReadResult<T> =
  /** La clave no existe todavía. */
  | { readonly kind: 'empty' }
  /** Ilegible o de una versión que ya no se sabe migrar: se puede descartar. */
  | { readonly kind: 'corrupt' }
  /**
   * Escrita por una versión más nueva de la app. NO se debe borrar ni
   * sobrescribir: perder datos por abrir un build viejo es el peor fallo posible.
   */
  | { readonly kind: 'future'; readonly foundVersion: number }
  | { readonly kind: 'ok'; readonly data: T; readonly migrated: boolean };

function isEnvelope(value: unknown): value is Envelope<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Envelope<unknown>).v === 'number' &&
    Number.isInteger((value as Envelope<unknown>).v) &&
    'data' in value
  );
}

/**
 * Interpreta el contenido crudo de una clave.
 *
 * `migrations[n]` lleva de la versión `n` a la `n + 1`; se aplican en cadena
 * hasta alcanzar `currentVersion`. Si falta algún eslabón, el dato se considera
 * corrupto en vez de arriesgar una lectura incorrecta.
 */
export function readEnvelope<T>(
  raw: string | null,
  currentVersion: number,
  migrations: Readonly<Record<number, Migration>> = {},
): ReadResult<T> {
  if (raw === null || raw === '') return { kind: 'empty' };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { kind: 'corrupt' };
  }

  if (!isEnvelope(parsed)) return { kind: 'corrupt' };
  if (parsed.v > currentVersion) {
    return { kind: 'future', foundVersion: parsed.v };
  }
  if (parsed.v === currentVersion) {
    return { kind: 'ok', data: parsed.data as T, migrated: false };
  }

  let data = parsed.data;
  for (let version = parsed.v; version < currentVersion; version++) {
    const migrate = migrations[version];
    if (!migrate) return { kind: 'corrupt' };
    try {
      data = migrate(data);
    } catch {
      return { kind: 'corrupt' };
    }
  }
  return { kind: 'ok', data: data as T, migrated: true };
}

export function writeEnvelope<T>(version: number, data: T): string {
  return JSON.stringify({ v: version, data } satisfies Envelope<T>);
}
