/**
 * Identificador de sesión. `crypto.randomUUID` no existe en contextos no
 * seguros (p. ej. servir por http en la red local), así que hace falta un
 * respaldo; no se necesita calidad criptográfica, sólo unicidad local.
 */
export function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  const random = Math.random().toString(36).slice(2, 10);
  return `s-${Date.now().toString(36)}-${random}`;
}
