/**
 * Algoritmo de slug de encabezados, replicado EXACTAMENTE del generador de
 * `public/data/indice-anclas.json` (Etapa 3, Fase 0). Si este algoritmo se
 * desvía del que produjo el índice, el scroll a la sección del apunte falla.
 *
 * Pasos (documentados en `indice-anclas.json.meta.algoritmo_slug`):
 *   lowercase -> quitar acentos (NFD + strip Mn) -> runs de [^a-z0-9] a '-' ->
 *   trim '-'; duplicados dentro de un mismo apunte con sufijo -1, -2, ...
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Deduplicador con estado para una única pasada de encabezados (un apunte).
 * La primera aparición de un slug queda sin sufijo; las siguientes reciben
 * `-1`, `-2`, ... — igual que el índice de la Fase 0.
 *
 * Se instancia uno por render de `<markdown>` (cada render = un apunte).
 */
export class HeadingSlugger {
  private readonly seen = new Map<string, number>();

  slug(text: string): string {
    const base = slugify(text);
    const count = this.seen.get(base) ?? 0;
    this.seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  }

  reset(): void {
    this.seen.clear();
  }
}
