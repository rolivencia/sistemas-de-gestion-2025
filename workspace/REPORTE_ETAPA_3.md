---
proyecto: Flashcards Sistemas de Gestión
documento: Plan de implementación — Etapa 3, Fase 3 (integración en la app)
base: workspace/PLAN.md (§7 "Blueprint de integración")
fecha: 2026-07-07
---

# Etapa 3 · Fase 3 — Plan de implementación

Este documento aterriza el §7 de `PLAN.md` al estado real del repositorio. Las
Fases 0–2 (datos) ya están consolidadas; solo resta la **integración en la app
Angular** (`flashcards/`).

## 1. Estado verificado (deltas respecto de lo que asumía PLAN.md)

| Item | PLAN.md asumía | Realidad en el repo | Impacto |
|---|---|---|---|
| `preguntas.json` | versión original (205, con `verificacion`, `n:1`) | **ya enriquecido**: 193 registros con `referencias` / `concepto` / `examenes` / `frecuencia` / `frecuencia_concepto`, sin `verificacion`. Todas las anclas referenciadas existen en el índice; 3 cards "sin referencia" (`referencias: []`) | Fases 1–2 hechas |
| `indice-anclas.json` | a generar (Fase 0) | **presente**: 28 apuntes, 482 anclas, algoritmo de slug documentado en `meta` | Fase 0 hecha |
| Modelo `Question` | declara `verificacion` | ya **no** tiene `verificacion`, pero **le faltan** los campos nuevos | falta el diff de §3 |
| Páginas session/results | renderizan bloque "Verificación" | ya **no** lo renderizan | solo agregar UI de referencias |
| Apuntes empaquetados | copia **sin frontmatter** | 28 `.md` presentes en `public/apuntes/`, **todavía con frontmatter YAML** (los 13 referenciados, todos) | quitar frontmatter en render |
| Sintaxis Obsidian | a transformar | en los 13 referenciados: **1 wikilink, 0 callouts** | trivial |
| KaTeX / Mermaid | "considerar" carga diferida | **esencial**: 7/13 con LaTeX (hasta 225 expr por apunte), 8/13 con Mermaid | lazy-load obligatorio |

**Decisiones confirmadas con el usuario:** visor = **drawer lateral** (empotrado, sin
navegación externa); apuntes = **ya disponibles** en `public/apuntes/`.

**Entorno:** `flashcards/` es una app Angular 21 **independiente**, con su propio
`package.json` y su propio `.claude/CLAUDE.md`. Sus scripts son `ng build` / `ng test`
/ `ng serve` (no aplica el `npm run ci` del monorepo raíz). Todo el trabajo ocurre
dentro de `flashcards/`.

## 2. Algoritmo de slug (fuente de verdad)

Del `meta` de `indice-anclas.json` — la Fase 3 **debe** replicarlo o el scroll no engancha:

> lowercase → quitar acentos (NFD + strip Mn) → runs de `[^a-z0-9]` a `'-'` → trim `'-'`;
> duplicados por apunte con sufijo `-1`, `-2`, …

## 3. Pasos de implementación

### Paso 0 · Cerrar el hueco de Fase 2 (preproceso en render)
Resolver frontmatter + Obsidian en **render-time** con un `preprocess` de `marked`
(no reescribir los `.md`, para no desincronizar del vault): quitar el frontmatter YAML
inicial y convertir el único wikilink a texto plano.

### Paso 1 · Dependencias (dentro de `flashcards/`)
```
npm i ngx-markdown@^21 marked marked-katex-extension katex mermaid@^11
```
Verificar peer-deps contra Angular 21.

### Paso 2 · Utilidad de slug — `src/app/util/slug.ts`
Implementar exactamente el algoritmo de §2, con dedup por documento (`-1`, `-2`, …).
Es el punto de falla nº1 del scroll → **test de paridad** contra muestras reales del índice.

### Paso 3 · Modelo — `src/app/models/question.model.ts`
Agregar `interface Referencia { apunte; seccion; ancla }` y a `Question` los campos
`referencias`, `concepto?`, `examenes`, `frecuencia`, `frecuencia_concepto`.

### Paso 4 · `src/app/app.config.ts`
`provideMarkdown(...)` con: renderer de encabezados que emite `id` usando la utilidad
del Paso 2 (mismo dedup); `preprocess` (frontmatter + wikilink); extensión KaTeX; Mermaid
vía atributo del componente. `provideHttpClient` ya está presente.

### Paso 5 · `angular.json`
Agregar `node_modules/katex/dist/katex.min.css` a `styles`. Los apuntes ya se sirven por
el glob `public/**/*` → **no** hace falta tocar `assets`.

### Paso 6 · Visor drawer — `src/app/components/apunte-viewer/` (lazy-loaded)
`<markdown [src]="'apuntes/'+apunte+'.md'" katex mermaid (ready)="onReady()">`.
En `ready`: `scrollIntoView` al `id === ancla` + clase de resaltado temporal. A11y:
`role="dialog"`, `aria-modal`, focus-trap, Esc/backdrop cierran, restaurar foco. Import
dinámico para mantener KaTeX/Mermaid/markdown fuera del bundle inicial.

### Paso 7 · UI de referencias
- `session.page.ts`: en el bloque de justificación, si `referencias.length` → principal
  (`referencias[0]`) como botón "Ver en el apunte" (abre drawer con slug+ancla), secundarias
  como enlaces; `[]` → nada.
- `results.page.ts`: mismo acceso "Ver en el apunte" por ítem del detalle (recomendado).

### Paso 8 · Tests (Vitest / `ng test`)
Slug (paridad con índice), visor (render + scroll a ancla + highlight + Esc cierra),
referencias (botón presente/ausente según `referencias`), y actualizar specs que toquen
el modelo.

### Paso 9 · Verificación
`ng build` (con chunk lazy del visor) + `ng test`; humo manual: card id 1 → `apunte-14`
ancla `4-planificacion-agregada-de-la-produccion-pap`, confirmar scroll + highlight +
KaTeX + Mermaid.

## 4. Riesgos

- **Paridad de slug** Fase 0 ↔ heading-id de Marked → mitigado por el test del Paso 2.
- **Peso del bundle** (KaTeX + Mermaid + apuntes) → visor lazy.
- **Timing** scroll vs render async de Mermaid → scroll tras `ready`, con settle si hace falta.

## 5. Cadencia

Validar Pasos 1–6 contra **un** apunte con LaTeX+Mermaid (apunte-14) antes de cablear
toda la UI y los tests.

## 6. Seguimiento

| # | Paso | Estado |
|---|---|---|
| 0 | Preproceso de apuntes (frontmatter + wikilink) | ✅ Hecho (hook `preprocess` de marked) |
| 1 | Dependencias | ✅ ngx-markdown 21.3, marked 18, katex 0.16, mermaid 11 |
| 2 | Utilidad de slug + test | ✅ Paridad 482/482 anclas |
| 3 | Modelo `Question` / `Referencia` | ✅ Hecho |
| 4 | `app.config.ts` (provideMarkdown) | ✅ Hecho |
| 5 | `angular.json` (KaTeX CSS + allowedCommonJs) | ✅ Hecho |
| 6 | Visor drawer (lazy) | ✅ Hecho |
| 7 | UI de referencias (session + results) | ✅ Hecho |
| 8 | Tests | ✅ 15/15 pasan |
| 9 | Verificación (build + test + humo) | ✅ Build 379 kB, humo OK |

## 7. Resultado de la verificación (build + tests + humo en navegador)

- **Build de producción:** OK. Bundle inicial **379 kB** (bajo el presupuesto de 500 kB).
  KaTeX (267 kB) y Mermaid quedan en **chunks diferidos** cargados solo al abrir el visor.
- **Tests:** 15/15 pasan (slug 482/482, visor, referencias, app shell).
- **Humo (Playwright, apunte-14 vía card id 1):**
  - Drawer empotrado abre sobre la sesión ✅
  - Markdown renderiza; los 27 encabezados reciben `id` ✅
  - **Scroll aterriza exacto** en `4-planificacion-agregada-de-la-produccion-pap` (16 px = `scroll-margin`) ✅
  - **KaTeX** renderiza (97 fórmulas en apunte-14) ✅
  - **Mermaid** renderiza (5 diagramas) ✅
  - 0 errores de consola ✅

## 8. Hallazgos y decisiones de implementación (más allá del blueprint §7 del PLAN)

1. **Los `id` de encabezado se asignan sobre el DOM ya renderizado**, no vía renderer de
   `marked`. Motivo: el sanitizador de ngx-markdown descarta el atributo `id` del HTML.
   La asignación post-render usa el mismo `HeadingSlugger` (algoritmo de Fase 0) sobre el
   `textContent`, con paridad probada.
2. **KaTeX/Mermaid no se cargan como scripts globales** (Mermaid pesa ~2.9 MB): se importan
   de forma diferida dentro del visor (`ApunteRenderLibsLoader`) y se exponen como globales
   (`katex`, `renderMathInElement`, `mermaid`), que es como ngx-markdown los consume. El
   `<markdown>` se monta recién cuando las librerías están listas (`libsReady`).
3. **`katexOptions = { throwOnError: false }`**: algunos apuntes traen LaTeX malformado
   (p. ej. `\[4pt]` en apunte-15); así se renderizan en rojo en vez de romper la consola.
   → Candidato a corrección de datos en el vault (fuera de esta etapa).
4. **`marked-katex-extension` se descartó**: importaba KaTeX de forma eager e inflaba el
   bundle inicial a 647 kB. Se usa el KaTeX nativo de ngx-markdown (atributo `katex`).

## 9. Code review (agente `code-reviewer`) — APPROVED WITH COMMENTS

Sin issues críticos. Warnings/sugerencias abordadas:

| # | Hallazgo | Estado |
|---|----------|--------|
| 1 | Loader sin caché de promesa en vuelo (carrera al escribir globales) | ✅ Corregido (`loadPromise ??= loadOnce()`) |
| 2 | `.then` del loader no protegido tras destroy | ✅ Corregido (flag `destroyed`) |
| 3 | Fondo del drawer sin `inert`/`aria-hidden` (WCAG AA / AXE) | ✅ Corregido (`inert` a los hermanos, restaurado al cerrar) |
| 4 | Scroll de Mermaid con `setTimeout(400)` mágico | ✅ Mejorado (`ResizeObserver` sobre el contenido, corte a 1.5 s) |
| 5 | `secondaryRefs` como método (deriva en cada CD) | ✅ Convertido a `computed()` |
| 6 | `results.page.ts` sin spec para la nueva UI | ✅ Agregado `results.page.spec.ts` |
| 7 | Regex de wikilink no cubría embeds `![[…]]` | ✅ Corregido (`!?` + test) |
| 8 | `onError(_event: unknown)` | ✅ Tipado `string \| Error` |
| 9 | Sin validación runtime (Zod) al cargar `preguntas.json` | ⏭️ Preexistente, fuera de alcance |
| — | `markdown-extensions.ts` sin spec | ✅ Agregado `markdown-extensions.spec.ts` |

Re-verificación tras los fixes: **22/22 tests pasan**, build **379 kB**, humo en navegador OK
(scroll exacto, KaTeX 97, Mermaid 5, **fondo con `inert` al abrir y restaurado al cerrar**,
`body.overflow` restaurado, 0 errores de consola).
