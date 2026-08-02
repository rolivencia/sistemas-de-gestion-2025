import { readEnvelope, writeEnvelope, type Migration } from './envelope';

describe('readEnvelope', () => {
  it('devuelve "empty" cuando la clave no existe', () => {
    expect(readEnvelope(null, 1)).toEqual({ kind: 'empty' });
    expect(readEnvelope('', 1)).toEqual({ kind: 'empty' });
  });

  it('devuelve "corrupt" ante JSON inválido', () => {
    expect(readEnvelope('{no es json', 1)).toEqual({ kind: 'corrupt' });
  });

  it('devuelve "corrupt" cuando el valor no tiene forma de sobre', () => {
    expect(readEnvelope('{"data":1}', 1)).toEqual({ kind: 'corrupt' });
    expect(readEnvelope('{"v":"1","data":1}', 1)).toEqual({ kind: 'corrupt' });
    expect(readEnvelope('[1,2,3]', 1)).toEqual({ kind: 'corrupt' });
  });

  it('lee los datos cuando la versión coincide', () => {
    const raw = writeEnvelope(1, { hola: 'mundo' });

    expect(readEnvelope(raw, 1)).toEqual({
      kind: 'ok',
      data: { hola: 'mundo' },
      migrated: false,
    });
  });

  it('señala "future" sin descartar datos de una versión más nueva', () => {
    const raw = writeEnvelope(9, { algo: true });

    expect(readEnvelope(raw, 1)).toEqual({ kind: 'future', foundVersion: 9 });
  });

  it('aplica la cadena de migraciones hasta la versión actual', () => {
    const migrations: Record<number, Migration> = {
      1: (data) => ({ ...(data as object), paso1: true }),
      2: (data) => ({ ...(data as object), paso2: true }),
    };

    const result = readEnvelope(writeEnvelope(1, { base: true }), 3, migrations);

    expect(result).toEqual({
      kind: 'ok',
      data: { base: true, paso1: true, paso2: true },
      migrated: true,
    });
  });

  it('trata como corrupto lo viejo sin migración disponible', () => {
    expect(readEnvelope(writeEnvelope(1, {}), 3, {})).toEqual({
      kind: 'corrupt',
    });
  });

  it('trata como corrupto lo que rompe durante la migración', () => {
    const migrations: Record<number, Migration> = {
      1: () => {
        throw new Error('migración rota');
      },
    };

    expect(readEnvelope(writeEnvelope(1, {}), 2, migrations)).toEqual({
      kind: 'corrupt',
    });
  });
});
