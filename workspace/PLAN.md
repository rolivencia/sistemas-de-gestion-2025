---
proyecto: Flashcards Sistemas de Gestión
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
repo: github.com/rolivencia/sistemas-de-gestion-2025
documento: Plan definitivo — Etapa 3 (enlazado de justificaciones a apuntes)
fecha: 2025
---

# Etapa 3 — Plan definitivo

Objetivo: que cada flashcard deje de ser una afirmación aislada y pase a ser una puerta de entrada al material. Desde la justificación, el estudiante abre el **apunte del vault embebido en la app**, posicionado en la sección exacta que fundamenta la respuesta. De paso, la Etapa 3 absorbe tres pendientes: re-grounding de las justificaciones contra la fuente confiable, tratamiento no destructivo de los casi-duplicados (Nivel 2) y la señal de frecuencia por examen.

Encuadre: soporte y asistencia para el estudio de **Sistemas de Gestión**, asignatura de la carrera de Ingeniería en Sistemas de Información dictada en la Facultad Regional Santa Fe de la Universidad Tecnológica Nacional (Argentina). Es la última asignatura de la carrera; la prioridad es información completamente consolidada.

---

## 1. Decisiones consensuadas (grilling)

| # | Decisión | Elección |
|---|---|---|
| 1 | Experiencia del enlace | Todo **empotrado en la app**, sin navegación externa |
| 2 | Qué se ve al abrir el apunte | **Apunte completo**, con scroll automático a la sección y resaltado |
| 3 | Precisión del ancla | La **subsección más específica (H3)**; cae a H2 solo si no hay H3 pertinente |
| 4 | Cardinalidad de referencias | **Lista ordenada** (1.ª = principal) + secundarias opcionales; se admite **cero** (marcado "sin referencia") |
| 5 | Nivel 2 (casi-duplicados) | **Etiquetar** con `concepto` (no destructivo); no se colapsa |
| 6 | Capa 2 (robustez) | **Re-grounding completo** de las 193 justificaciones contra el vault |
| 7 | Frecuencia por examen | `examenes: string[]` + `frecuencia` derivado; frecuencia también a nivel `concepto` |
| 8 | Cadencia de ejecución | **Híbrido:** calibrar con 1–2 unidades, luego autónomo |
| 9 | Fuente de verdad de apuntes | Los **28 del vault** (`/mnt/project`), empaquetados sin frontmatter; markdown viejo del repo, deprecado |
| 10 | Reparto de trabajo | Datos **acá** (Fases 0–2) + **blueprint** de Fase 3; implementación en **Claude Code** |

---

## 2. Estado técnico relevado

**App (repo `flashcards/`):** Angular **21** (standalone + signals + `@ngrx/signals`), Tailwind, deploy en Vercel, tests con Vitest. Datos en `flashcards/public/data/preguntas.json`. Componentes: `flashcard` (solo muestra V/F), páginas `home`/`session`/`results`, `store/flashcard.store.ts`, `services/question.service.ts`, `models/question.model.ts`. El repo trae `.claude/` y `AGENTS.md` (listo para Claude Code).

**Brechas a cerrar en Fase 3:**
- `preguntas.json` del repo es **la versión original** (205 registros, `verificacion`, `n:1`): no recibió el trabajo de las etapas previas. Existe una branch que ya elimina `verificacion`.
- El modelo `Question` **aún declara `verificacion`**; las páginas `session` y `results` renderizan un bloque "Verificación".
- **No hay renderer de Markdown** en dependencias.

**Apuntes del vault (28):** con frontmatter YAML y encabezados numerados consistentes (`## N.` / `### N.M.`). Contenido rico: **13 usan LaTeX** (`$$…$$`), **12 usan Mermaid**, **28 tienen tablas**. El markdown del repo (`01-introduccion.md`, carpeta `02 - …`) es un borrador anterior y queda fuera.

---

## 3. Esquema de datos objetivo

Sucesor de `flashcards-fusionado.json` (193 tarjetas). Retrocompatible: la app ignora campos que no conozca.

```ts
export interface Referencia {
  readonly apunte: string;   // slug de archivo, p. ej. 'apunte-22-planificacion-requerimientos-distribucion'
  readonly seccion: string;  // texto del encabezado, p. ej. '5.2. Lista de distribución'
  readonly ancla: string;    // id/slug para scroll, p. ej. '5-2-lista-de-distribucion'
}

export interface Question {
  readonly id: number;
  readonly examen: string;
  readonly pregunta: number;
  readonly afirmacion: string;
  readonly respuesta: boolean;
  readonly justificacion: string;              // re-grounded contra el vault (Capa 2)
  readonly unidades: readonly string[];
  readonly referencias: readonly Referencia[]; // 0..n; primera = principal; [] = "sin referencia"
  readonly concepto?: string;                  // id de cluster (Nivel 2/3); agrupa variantes
  readonly examenes: readonly string[];        // procedencia (finales donde apareció)
  readonly frecuencia: number;                 // derivado (a nivel tarjeta y a nivel concepto)
}
```

`verificacion` **se elimina** del modelo y de los datos.

---

## 4. Fase 0 — Índice de anclas (acá)

De los 28 apuntes del vault, generar `indice-anclas.json`: por cada encabezado, `{apunte, unidad, nivel, seccion, ancla}`. La `ancla` es el slug estilo GitHub (`### 5.2. Lista de distribución` → `5-2-lista-de-distribucion`) que la Fase 3 usará como `id` de scroll. Sumar un mapa `unidad → apuntes`.

Chequeos de esta fase: detectar sintaxis Obsidian que Marked no interpreta (**wikilinks `[[…]]`**, callouts `> [!nota]`) y listarla para decidir transformación; confirmar unicidad de anclas por apunte (desambiguar colisiones con sufijo).

No depende de ninguna decisión pendiente → es el arranque seguro.

---

## 5. Fase 1 — Re-grounding + mapeo (acá, fase pesada)

Por tarjeta, apalancando los clusters de concepto para no repetir trabajo (mapear ~140 conceptos/únicas; las variantes heredan vía `concepto`):

1. **Ubicar la sección** del apunte de la unidad correspondiente (H3 más específico; fallback H2) usando el índice de la Fase 0.
2. **Re-grounding (Capa 2):** leer esa sección del vault y **verificar/reescribir la justificación** contra la fuente confiable, corrigiendo y reforzando lo que haga falta. No se usa el apunte anónimo (arrastraba ≥4 errores ya detectados).
3. **Asignar `referencias`** (principal + secundarias). Si ninguna sección aplica limpiamente (convención BPMN, las 3 sin fuente), `referencias: []` y **flag "sin referencia"** para revisión.
4. Marcar como **"dudoso"** cualquier caso donde el vault no confirme la respuesta almacenada.

**Cadencia (Q8):** primero **1–2 unidades como calibración** (fijar criterio de re-grounding, formato de `referencias`, estilo de reescritura); con tu OK, seguir autónomo. Entrega final: tabla de revisión + JSON.

---

## 6. Fase 2 — JSON enriquecido + apuntes listos para bundle (acá)

- Producir el JSON sucesor con el esquema de §3 (referencias, concepto, examenes, frecuencia; sin verificacion).
- Preparar los **28 apuntes para empaquetar**: copia **sin frontmatter YAML** y con la sintaxis Obsidian transformada según lo relevado en Fase 0.
- Recalcular `frecuencia` a nivel tarjeta y a nivel `concepto`.
- Validaciones: 193 registros, ids únicos, toda `ancla` existe en el índice, referencias sin apuntar a secciones inexistentes, flags de "sin referencia"/"dudoso" listados.

Entregables del handoff: JSON enriquecido + carpeta de apuntes procesados + `indice-anclas.json` + reporte de cambios.

---

## 7. Fase 3 — Blueprint de integración (Claude Code)

**Dependencias a agregar** (Angular 21 → `ngx-markdown@^21`):
```
npm i ngx-markdown@^21 marked marked-katex-extension katex mermaid@^11
```

**`angular.json`:** agregar `node_modules/katex/dist/katex.min.css` a `styles`; agregar la carpeta de apuntes a `assets` (p. ej. `flashcards/public/apuntes/`). Mermaid v11 se activa por atributo del componente.

**`app.config.ts`:** `provideMarkdown({ loader: provideHttpClient(...) , markedOptions: { ... heading-id renderer ... } })` para habilitar carga on-demand por `[src]` y emitir `id` en los encabezados (Marked no los emite por defecto; usar `marked-gfm-heading-id` o renderer custom, con el **mismo algoritmo de slug** que la Fase 0).

**`models/question.model.ts`:** aplicar el diff de §3 (quitar `verificacion`; agregar `Referencia`, `referencias`, `concepto?`, `examenes`, `frecuencia`).

**`public/data/preguntas.json`:** reemplazar por el JSON enriquecido de la Fase 2.

**`pages/session/session.page.ts` y `pages/results/results.page.ts`:** eliminar el bloque `@if (question.verificacion)`; conservar el de `justificacion`; **agregar UI de referencias** — la principal como botón "Ver en el apunte", secundarias como enlaces; si `referencias` está vacío, no mostrar nada.

**Nuevo visor de apunte** (componente drawer o ruta): usa `<markdown [src]="'apuntes/<apunte>.md'" katex mermaid>`; al terminar de renderizar (evento `ready`/`load`), hacer `scrollIntoView` al `id === ancla` y aplicar clase de **resaltado temporal**. Opción (a): se ve el apunte completo, posicionado en la sección.

**Tests (Vitest):** actualizar los que referencian el modelo/`verificacion`; agregar cobertura mínima del visor (carga + scroll a ancla) y del render de referencias.

---

## 8. Reparto y handoff

| Fase | Dónde | Entregable |
|---|---|---|
| 0 Índice de anclas | acá | `indice-anclas.json` |
| 1 Re-grounding + mapeo | acá | tabla de revisión + JSON parcial por unidad |
| 2 JSON enriquecido + apuntes | acá | JSON final + carpeta de apuntes sin frontmatter + reporte |
| 3 Integración app | Claude Code | branch con modelo, datos, visor, UI y tests |

El puente son los tres artefactos de datos (JSON + apuntes + índice); Claude Code ejecuta el blueprint de §7 sin redescubrir el análisis.

---

## 9. Riesgos / anomalías a vigilar

- **Sintaxis Obsidian** (`[[…]]`, callouts) que Marked no interpreta → transformar en Fase 2.
- **Colisión de anclas** dentro de un mismo apunte → desambiguar en Fase 0.
- **Slug consistente** entre Fase 0 y el heading-id de Marked → mismo algoritmo, o el scroll falla.
- **Tarjetas "dudoso"** que el vault no confirme → revisión tuya antes de cerrar.
- **Peso del bundle**: KaTeX + Mermaid + 28 apuntes → considerar carga diferida (lazy) del visor.

---

## 10. Próximo paso

Arrancar por la **Fase 0** (índice de anclas), que no depende de nada más y desbloquea el resto. Luego, la calibración de la Fase 1 con 1–2 unidades para fijar criterio antes de procesar las 193.