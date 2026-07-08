---
proyecto: Flashcards Sistemas de Gestión
documento: Auditoría semántica de anclas — destino del botón "Ver en el apunte"
fecha: 2026-07-08
metodo: Un agente revisor por apunte; lee el apunte completo y juzga, por pregunta, si referencias[0] apunta a la sección que fundamenta la respuesta.
---

# Auditoría de anclas — ¿el botón "Ver en el apunte" cae donde debe?

## Resumen

- **190** preguntas con referencia primaria auditadas (13 apuntes, un agente por apunte).
- **153 OK** · **24 SUSPECT** · **13 WRONG**.
- **34 cambios accionables** (13 WRONG + 21 SUSPECT), todos con un ancla sugerido que **existe** en el índice del apunte.
- **3 no accionables** (ids 54, 78, 90): laguna de contenido del apunte, no hay mejor sección.

> Nota: en paralelo se corrigió un **bug de runtime** (los ids se asignaban por `textContent`, roto en 3 encabezados con LaTeX). Ya está resuelto asignando ids por orden del índice. Esta auditoría es sobre la **elección de sección** (semántica), independiente de aquel bug.

## WRONG — el ancla no contiene la teoría que fundamenta la respuesta (13)

| id | apunte | afirmación | ancla actual | ancla sugerida | motivo |
|---|---|---|---|---|---|
| 129 | 22-planificacion-requerimientos-distribucion | Un centro de reexpedición se diferencia de un almacén central en la cadena de distribuci… | `5-3-fuentes-de-suministro` | `5-2-lista-de-distribucion` | §5.3 trata las tres fuentes de suministro (logística/producción/compra), no la reexpedic… |
| 140 | 22-planificacion-requerimientos-distribucion | Los sistemas DRP son sistemas reactivos, no proactivos. | `4-que-es-el-drp-definicion-y-funciones` | `3-el-enfoque-drp-demanda-dependiente-por-ubicacion` | §4 no menciona proactivo/reactivo. La afirmación explícita 'Planificación proactiva, no … |
| 13 | 25-scheduling | Un proceso que utiliza lote de transferencia = lote de producción (siendo este mayor que… | `4-6-restricciones-de-capacidad-y-almacenamiento` | `11-manufactura-sincronica-opt` | §4.6 no menciona lote de transferencia; el concepto (lote de transporte ideal = 1) sólo … |
| 20 | 25-scheduling | Un schedule NO permutativo es más apropiado para estructuras de proceso tipo Job Shop. | `4-estrategias-de-scheduling` | `7-flow-shop-scheduling` | §4 no menciona schedule permutativo/no permutativo; ese concepto se define en §7 ('permu… |
| 24 | 25-scheduling | La estrategia de propagación de restricciones permite podar el árbol de búsqueda de solu… | `11-manufactura-sincronica-opt` | `5-3-metodos-mixtos` | §11 trata OPT/cuello de botella, no propagación de restricciones; ésta se lista explícit… |
| 28 | 25-scheduling | Un proceso que utiliza lote de transferencia = 1 se caracteriza por un menor tiempo tota… | `4-6-restricciones-de-capacidad-y-almacenamiento` | `11-manufactura-sincronica-opt` | El lote de transferencia = 1 sólo aparece en §11 (OPT); §4.6 no contiene esa teoría. |
| 35 | 25-scheduling | Un schedule permutativo es más apropiado para estructuras de proceso tipo Job Shop. | `4-estrategias-de-scheduling` | `7-flow-shop-scheduling` | §4 no define permutativo; §7 lo define (misma secuencia en todas las máquinas), propio d… |
| 43 | 25-scheduling | Un proceso que utiliza lote de transferencia = 1 se caracteriza por un menor inventario … | `4-6-restricciones-de-capacidad-y-almacenamiento` | `11-manufactura-sincronica-opt` | La noción de lote de transferencia (ideal = 1) y su efecto sobre el WIP sólo se expone e… |
| 58 | 25-scheduling | Un proceso que utiliza lote de transferencia = 1 se caracteriza por un mayor inventario … | `4-6-restricciones-de-capacidad-y-almacenamiento` | `11-manufactura-sincronica-opt` | El lote de transferencia y su relación con el WIP se tratan en §11 (OPT), no en §4.6. |
| 106 | 25-scheduling | Un lote de transferencia menor que el lote de producción permite reducir el inventario e… | `4-6-restricciones-de-capacidad-y-almacenamiento` | `11-manufactura-sincronica-opt` | El lote de transferencia menor al de producción es un concepto de §11 (OPT); §4.6 no lo … |
| 152 | 25-scheduling | La estrategia de Propagación de Restricciones ayuda a reducir el espacio de soluciones d… | `11-manufactura-sincronica-opt` | `5-3-metodos-mixtos` | La propagación de restricciones se enumera en §5.3, no en §11 (que trata OPT/cuello de b… |
| 154 | 25-scheduling | En un proceso tipo Job Shop un scheduling NO permutativo generalmente proporciona mejore… | `4-estrategias-de-scheduling` | `7-flow-shop-scheduling` | §4 no aborda el schedule permutativo/no permutativo; su definición está en §7 (permutati… |
| 199 | 4-bpmn | La interrupción o cancelación de una tarea o subproceso se puede modelar definiendo even… | `5-actividades-tareas-y-subprocesos` | `9-manejo-de-excepciones-y-compensacion` | La §5 (tareas y subprocesos) no trata terminación ni cancelación. La §9 es la que dice '… |

### Patrones sistemáticos (scheduling)
- **Lote de transferencia** anclado a §4.6 (buffers) → debe ser **§11 OPT** (ids 13, 28, 43, 58, 106; parciales 122, 134).
- **Schedule permutativo** anclado a §4 (estrategias) → se define en **§7 Flow Shop** (ids 20, 35, 154).
- **Propagación de restricciones** anclada a §11 (OPT) → se lista en **§5.3 Métodos mixtos** (ids 24, 152).

## SUSPECT — apunta al padre correcto pero una subsección aterriza mejor (21)

| id | apunte | afirmación | ancla actual | ancla sugerida | motivo |
|---|---|---|---|---|---|
| 103 | 12-gestion-de-inventarios | Cuanto mayor es el precio unitario de compra de un material, menor será el lote económic… | `6-1-caso-1-ingreso-instantaneo` | `a-costos-de-almacenamiento-holding-carrying-cost-c-c` | El nexo precio→EOQ solo se sostiene porque Cc es un 10–40% del valor del producto (secci… |
| 104 | 14-planificacion-agregada-produccion | La estrategia de caza consiste en nivelar el uso de mano de obra. | `4-planificacion-agregada-de-la-produccion-pap` | `5-2-estrategias-para-ajustar-la-capacidad` | La sección 5.2 define la caza como contratar/despedir para seguir la demanda y la nivela… |
| 107 | 14-planificacion-agregada-produccion | Un sistema de planificación es pro-activo. | `4-planificacion-agregada-de-la-produccion-pap` | `1-planificacion-de-operaciones` | La sección 1 define planificar como 'proyectar el futuro deseado y los medios para conse… |
| 149 | 14-planificacion-agregada-produccion | En el proceso de planificación operativa (corto plazo) solo se puede recurrir a cambios … | `4-planificacion-agregada-de-la-produccion-pap` | `2-1-planificar-implica-comparar` | La sección 2.1 asocia el corto/mediano plazo con ajustes coyunturales (horas extra, terc… |
| 164 | 14-planificacion-agregada-produccion | En el proceso de planificación estratégica (largo plazo) se puede recurrir a cambios est… | `4-planificacion-agregada-de-la-produccion-pap` | `2-1-planificar-implica-comparar` | La sección 2.1 asocia el largo plazo con ajustes estructurales (productos, procesos, cap… |
| 174 | 14-planificacion-agregada-produccion | Desarrollar un Plan de Producción Agregado implica verificar el plan respecto a la capac… | `4-planificacion-agregada-de-la-produccion-pap` | `2-1-planificar-implica-comparar` | La sección 2.1 plantea literalmente comparar 'Capacidad requerida (PLAN) ↔ Capacidad dis… |
| 189 | 14-planificacion-agregada-produccion | La estrategia de nivelación de mano de obra genera Planes Agregados cuyo objetivo es niv… | `4-planificacion-agregada-de-la-produccion-pap` | `9-2-algoritmo-de-pap-estrategia-de-nivelacion-de-mano-de-obra` | La sección 9.2 muestra que la nivelación fija la fuerza de trabajo constante y el invent… |
| 27 | 15-planificacion-maestra-produccion | El cálculo del disponible a prometer requiere descontar el stock de seguridad en cada pe… | `8-disponible-a-prometer-atp` | `8-1-formulas-de-calculo` | El detalle de que el Ss se descuenta solo en el primer periodo surge de las formulas del… |
| 42 | 15-planificacion-maestra-produccion | El cálculo del disponible a prometer requiere descontar el stock de seguridad solo en el… | `8-disponible-a-prometer-atp` | `8-1-formulas-de-calculo` | El descuento del Ss solo en el primer periodo se justifica con las formulas de 8.1, no c… |
| 55 | 15-planificacion-maestra-produccion | En el cálculo del PMP, un valor de inventario menor que el stock de seguridad que se man… | `9-2-paso-2-ajustar-el-pmp-inicial-y-generar-el-pmp-definitivo` | `reglas-para-corregir-el-pmp` | La distincion entre adelantar (regla 1) y agregar un lote (regla 2, escasez persistente)… |
| 57 | 15-planificacion-maestra-produccion | El cálculo del disponible a prometer requiere descontar el stock de seguridad en todos l… | `8-disponible-a-prometer-atp` | `8-1-formulas-de-calculo` | Que el Ss se descuenta solo en el primer periodo y no en cada periodo con lote se despre… |
| 61 | 15-planificacion-maestra-produccion | En el cálculo del disponible a prometer el stock de seguridad debe restarse a cada lote … | `8-disponible-a-prometer-atp` | `8-1-formulas-de-calculo` | Que el Ss no se resta a cada lote sino solo en el primer periodo se justifica con las fo… |
| 69 | 15-planificacion-maestra-produccion | En el cálculo del PMP, un valor de inventario menor que el stock de seguridad, seguido p… | `9-2-paso-2-ajustar-el-pmp-inicial-y-generar-el-pmp-definitivo` | `reglas-para-corregir-el-pmp` | La regla 1 exige IF_{t+1} estrictamente mayor que Ss; la tabla de reglas esta en la subs… |
| 105 | 25-scheduling | Una estrategia de despacho en general es menos eficiente que una estrategia de agenda al… | `4-4-inteligencia-del-despacho` | `4-1-forma-de-asignar-el-tiempo` | La dicotomía agenda (intervalo) vs despacho se introduce en §4.1; §4.4 sólo refina la in… |
| 122 | 25-scheduling | Sin almacén intermedio el lote de transporte debe ser igual al lote de producción. | `4-6-restricciones-de-capacidad-y-almacenamiento` | `11-manufactura-sincronica-opt` | El eje de la afirmación es el lote de transporte (definido sólo en §11); §4.6 sólo cubre… |
| 134 | 25-scheduling | Un lote de transferencia = lote de producción implica la existencia de inventario interm… | `4-6-restricciones-de-capacidad-y-almacenamiento` | `11-manufactura-sincronica-opt` | El lote de transferencia (crux de la afirmación) se define en §11; §4.6 sólo aporta la n… |
| 110 | 28-gestion-integrada-cadena-suministro | Una gestión integrada de la cadena de suministros permite reducir los inventarios en tod… | `4-3-problemas-que-causa` | `5-la-solucion-compartir-informacion-gestion-integrada-de-la-cadena-de-suministro` | 4.3 describe el inventario alto como problema del bullwhip, no que la gestión integrada … |
| 133 | 28-gestion-integrada-cadena-suministro | Los modelos de gestión integrada de la cadena de suministro tienen por propósito reducir… | `4-3-problemas-que-causa` | `5-la-solucion-compartir-informacion-gestion-integrada-de-la-cadena-de-suministro` | El propósito de reducir inventarios de seguridad se apoya en la solución (compartir info… |
| 143 | 28-gestion-integrada-cadena-suministro | Uno de los objetivos de la gestión integrada de la cadena de suministro es reducir los i… | `4-3-problemas-que-causa` | `5-la-solucion-compartir-informacion-gestion-integrada-de-la-cadena-de-suministro` | El objetivo de reducir inventarios de materiales corresponde a la solución (compartir in… |
| 205 | 6-patrones-modelado-procesos | Un proceso que tiene definido todos los posibles caminos de excepción es un proceso débi… | `2-6-terminacion-y-cancelacion` | `5-patrones-de-manejo-de-excepciones` | La §2.6 trata patrones de terminación/cancelación, no la distinción proceso estructurado… |
| 93 | 7-pronosticos-de-demanda | Se puede decir que el modelo de Alisado Exponencial captura mejor la tendencia de "corto… | `5-4-alisado-exponencial-ajustado-con-factor-de-tendencia` | `5-3-alisado-exponencial-exponential-smoothing` | La afirmación compara el Alisado Exponencial SIMPLE con el ajuste lineal; el apoyo está … |

## No accionables por re-anclaje (laguna de contenido / reasignación de apunte)

Estos casos el revisor los dejó OK/relativo porque **ninguna sección del apunte** desarrolla el tema; el arreglo real es de **contenido** o de **reasignar la pregunta a otro apunte**:

- **ap1** ids 54, 78, 90 — "conocimiento como ventaja competitiva" no está en el apunte (queda en `tendencias`).
- **ap14** ids 89, 113, 137, 147, 167, 182 (ATP), 175 (stock de seguridad PMP), 184 (entornos de producción) — son temas de **PMP (apunte-15)**, diferidos explícitamente; convendría **reapuntar a apunte-15**.
- **ap22** ids 68, 88, 91, 100, 144 — canal industrial/comercial/nivel cero no desarrollado en el apunte.
- **ap28** ids 39, 46 — el dato "~90% e-commerce es B2B" no figura en el apunte.
- **ap19** id 112 — la justificación invoca DRP, que no está en el apunte de MRP.

## Cómo se revisó (método reproducible)

1. **Integridad estructural** (determinística): toda `ancla` existe en su apunte, `seccion` coincide con el índice, y la unidad del apunte coincide con la de la pregunta → 0 inconsistencias.
2. **Correctitud semántica** (un agente por apunte): lee el apunte completo y, por pregunta, verifica que la sección enlazada contenga la teoría que fundamenta `justificacion`/`respuesta`; si no, propone la mejor sección disponible.
3. **Validación** del resultado: cada ancla sugerida existe en el índice; se separa lo accionable (cambio de sección) de las lagunas de contenido.

Datos crudos por apunte en `workspace/audit/*.result.json`; patch accionable en `workspace/audit/_patch.json`.
