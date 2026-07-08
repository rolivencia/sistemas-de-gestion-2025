import { HeadingSlugger, slugify } from './slug';
import indice from '../../../public/data/indice-anclas.json';

interface IndiceSeccion {
  readonly nivel: number;
  readonly seccion: string;
  readonly ancla: string;
  readonly linea: number;
}
interface IndiceApunte {
  readonly archivo: string;
  readonly secciones: readonly IndiceSeccion[];
}

describe('slugify', () => {
  it('pasa a minúsculas y reemplaza espacios por guiones', () => {
    expect(slugify('Gestión de Operaciones')).toBe('gestion-de-operaciones');
  });

  it('quita acentos (NFD + strip diacríticos)', () => {
    expect(slugify('Planificación Jerárquica')).toBe('planificacion-jerarquica');
  });

  it('colapsa signos y puntuación en un solo guión', () => {
    expect(slugify('4. Planificación Agregada (PAP)')).toBe(
      '4-planificacion-agregada-pap',
    );
  });

  it('recorta guiones iniciales y finales', () => {
    expect(slugify('¿Qué es la Gestión de Operaciones?')).toBe(
      'que-es-la-gestion-de-operaciones',
    );
  });
});

describe('HeadingSlugger', () => {
  it('deja la primera aparición sin sufijo y numera las siguientes', () => {
    const s = new HeadingSlugger();
    expect(s.slug('Objetivos')).toBe('objetivos');
    expect(s.slug('Objetivos')).toBe('objetivos-1');
    expect(s.slug('Objetivos')).toBe('objetivos-2');
  });

  it('reset limpia el estado de deduplicación', () => {
    const s = new HeadingSlugger();
    s.slug('Agenda');
    s.reset();
    expect(s.slug('Agenda')).toBe('agenda');
  });
});

describe('paridad con indice-anclas.json (Fase 0)', () => {
  it('reproduce las 482 anclas del índice a partir del texto de sección', () => {
    const apuntes = (indice as { apuntes: readonly IndiceApunte[] }).apuntes;
    const mismatches: string[] = [];
    let total = 0;

    for (const apunte of apuntes) {
      const slugger = new HeadingSlugger();
      for (const seccion of apunte.secciones) {
        total++;
        const got = slugger.slug(seccion.seccion);
        if (got !== seccion.ancla) {
          mismatches.push(
            `${apunte.archivo}: "${seccion.seccion}" -> ${got} (esperado ${seccion.ancla})`,
          );
        }
      }
    }

    expect(mismatches).toEqual([]);
    expect(total).toBe(482);
  });
});
