---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 16
unidad: 5
titulo_unidad: Planificación Jerárquica de la Producción
temas_del_plan:
  - Planificación Agregada de la Producción y Planificación de Capacidad.
  - "Modelos de prueba/error (mano de obra uniforme, seguimiento de la demanda, mixtos)."
  - Planificación Maestra de la Producción.
  - Disponible a prometer.
presentacion_fuente: "Unidad_5_-_02_-_Casos_de_estudio_-_Gestión_de_inventarios.docx (enunciado) + Unidad_5_-_03_-_Solución_PAP.xlsx + Unidad_5_-_04_-_Solución_PMP.xlsx"
anio: 2025
---

# Apunte 16 — Caso de estudio resuelto: PAP + PMP integrado

> **Unidad 5 — Planificación Jerárquica de la Producción.** Caso de estudio **resuelto por la cátedra** que integra, sobre una misma empresa y horizonte, los dos niveles vistos en los Apuntes 14 y 15: primero se genera el **Plan Agregado de Producción (PAP)** con las tres técnicas de prueba/error (**caza**, **nivelación de mano de obra** y **mixta**) y se comparan por costo; luego ese plan se **desagrega** en un **Plan Maestro de Producción (PMP)** semanal por producto (P1 y P2), se calcula la **proyección de inventario** y el **disponible a prometer (ATP)**, y se **ajusta** con las reglas de corrección hasta el PMP definitivo. Sirve como modelo completo de aplicación de la teoría de la unidad.

> **Nota de incorporación (anomalía de archivo).** El enunciado vino en el archivo `Unidad_5_-_02_-_Casos_de_estudio_-_Gestión_de_inventarios.docx`, **mal rotulado**: su contenido **no es de gestión de inventarios** sino, precisamente, este caso de **Planificación Agregada y Maestra de la Producción**. Las soluciones numéricas que se transcriben provienen de las planillas de cátedra `…_03 (Solución PAP)` y `…_04 (Solución PMP)`, conservadas en `recursos-planificacion/` como `solucion-caso-pap.xlsx` y `solucion-caso-pmp.xlsx`.

---

## Enunciado general

A principio de diciembre, una empresa que produce **una familia de productos** debe generar un **plan agregado de producción mensual** para el semestre **enero–junio**. La demanda (acordada por ventas, producción y logística) y los días laborables son:

| | ENE | FEB | MAR | ABR | MAY | JUN | **Total** |
|---|--:|--:|--:|--:|--:|--:|--:|
| **Demanda [u]** | 15000 | 15000 | 20000 | 5000 | 5000 | 10000 | **70000** |
| **Días** | 20 | 20 | 22 | 20 | 22 | 21 | **125** |

**Recursos y políticas:** planta de lunes a viernes; **8 hs/operario·día**; **150 operarios** actuales (máximo de la planta), de los cuales **50 efectivos** (no despedibles) y 100 temporarios; horas extra **≤ 10 %** de las horas regulares; **1,5 hs de MO por unidad**; inventario inicial **0** a fin de diciembre.

**Costos diferenciales:**

| Concepto | $ | Concepto | $ |
|---|--:|---|--:|
| MO regular [$/hr] | 20 | Despido [$/oper] | 3000 |
| MO extra [$/hr] | 30 | Inventario [$/u·mes] | 2 |
| MO ociosa [$/hr] | 22 | Retraso [$/u·mes] | 15 |
| Contratación [$/oper] | 2000 | Tercerización [$/u] | 30 |

**Parámetros derivados** (ver Apunte 14): producción diaria máxima $=\dfrac{Whe\cdot W}{Phe}=\dfrac{8\cdot 150}{1{,}5}=800$ u/día con plantilla completa; $We=50$, $W_{max}=150$, $W_0=150$, $Phe=1{,}5$.

---

## Primera parte — Plan Agregado (PAP)

Se generan las tres estrategias de prueba/error y se comparan. Se transcriben los **resultados de cátedra** (planilla `solucion-caso-pap.xlsx`).

### 1.1. Estrategia de caza (*chase*)

Se produce lo que pide cada mes ajustando la plantilla. Como la **capacidad máxima de marzo** (22 días × 800 = 17 600 u) es **menor que la demanda** (20 000), quedan **2400 u de faltante** en marzo que se recuperan en abril.

| | ENE | FEB | MAR | ABR | MAY | JUN | **Total** |
|---|--:|--:|--:|--:|--:|--:|--:|
| Prod. regular [u] | 15000 | 15000 | 17600 | 7400 | 5000 | 10000 | 70000 |
| Empleados [op] | 141 | 141 | 150 | 70 | 43 | 90 | — |
| Contrat./Desp. [op] | −9 | 0 | +9 | −80 | −20 | +40 | — |
| Hs ociosas [hs] | 60 | 60 | 0 | 100 | 1300 | 120 | — |
| Inventario final [u] | 0 | 0 | **−2400** | 0 | 0 | 0 | — |

**Costo total ≈ $2 597 080** (MO $2 100 000 · despidos/contrat. $425 000 · retraso $36 000 · MO ociosa $36 080).

### 1.2. Estrategia de nivelación de mano de obra

Se fija una plantilla **constante** dimensionada sobre la demanda total: producción diaria requerida $=70000/125=560$ u/día → MO diaria $=560\cdot1{,}5=840$ hs → $W=840/8=\mathbf{105}$ operarios constantes.

| | ENE | FEB | MAR | ABR | MAY | JUN |
|---|--:|--:|--:|--:|--:|--:|
| Prod. regular [u] | 11200 | 11200 | 12320 | 11200 | 12320 | 11760 |
| Empleados [op] | 105 | 105 | 105 | 105 | 105 | 105 |
| Inventario final [u] | −3800 | −7600 | −15280 | −9080 | −1760 | 0 |

Producir a ritmo constante deja **grandes faltantes** en los meses pico (la demanda se concentra en ene–mar). **Costo total ≈ $2 797 800** (MO $2 100 000 · 1 despido masivo de 45 op. $135 000 · costo de retraso/inventario $562 800). Es la **más cara** de las tres.

### 1.3. Estrategia mixta

Combina plantilla ajustada con **horas extra y subcontratación** para cubrir el pico de marzo **sin generar faltantes**:

| | ENE | FEB | MAR | ABR | MAY | JUN |
|---|--:|--:|--:|--:|--:|--:|
| Prod. regular [u] | 15000 | 15000 | 17600 | 5000 | 5000 | 10000 |
| Prod. extra [u] | 0 | 0 | 1760 | 0 | 0 | 0 |
| Subcontratación [u] | 0 | 0 | 640 | 0 | 0 | 0 |
| Empleados [op] | 141 | 141 | 150 | 47 | 43 | 90 |
| Inventario final [u] | 0 | 0 | 0 | 0 | 0 | 0 |

**Costo total ≈ $2 593 616** (MO $2 028 000 · despidos/contrat. $460 000 · hs extra $79 200 · subcontratación $19 200 · MO ociosa $7216).

### 1.4. Comparación y decisión

| Estrategia | Costo total [$] |
|---|--:|
| **Mixta** | **2 593 616** ✅ (mínimo) |
| Caza | 2 597 080 |
| Nivelación de MO | 2 797 800 |

> La **mixta** resulta la de menor costo, apenas por debajo de la de caza. La cátedra remarca que, mientras las **estrategias puras** (caza y nivelación) pueden generarse de forma **automática**, la **mixta** requiere la **subjetividad de quien decide**: es un **proceso de decisión semi-estructurado** que un **Sistema Soporte de Decisión** asiste —no reemplaza— (a diferencia de un Sistema Experto). El plan agregado de producción elegido para desagregar toma como base la producción regular de la estrategia adoptada.

---

## Segunda parte — PMP inicial (desagregación)

A mediados de diciembre, el plan agregado acordado se **desagrega** en un PMP **semanal** por producto, sobre un horizonte de **12 semanas**. La familia se compone de **P1 y P2** con mix **[P1, P2] = [0,60 ; 0,40]**.

**Dimensionamiento de lote** (minimizar costo de inventario; set-up y posesión dados): set-up P1 = $3000 y posesión P1 = 2,25 $/u·mes; set-up P2 = $2500 y posesión P2 = 1,632 $/u·mes. La cátedra adopta **lote P1 = 4000 u** y **lote P2 = 3000 u**. Hay **órdenes en curso** que llegan en la semana 1: 4000 u de P1 y 3500 u de P2.

El plan agregado mensual se reparte **uniformemente** por semana (necesidades brutas $NB$); las necesidades netas son $NN_s = NB_s - IE_s - OPC_s$ (ver Apunte 15), y se lanza un lote cuando $NN_s>0$.

**P1 (60 %)** — necesidad bruta ≈ 2250 u/sem (ene–feb) y 2400 u/sem (mar):

| Semana | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| NB | 2250 | 2250 | 2250 | 2250 | 2250 | 2250 | 2250 | 2250 | 2400 | 2400 | 2400 | 2400 |
| Orden en curso | 4000 | — | — | — | — | — | — | — | — | — | — | — |
| **PMP inicial** | 0 | 4000 | 0 | 4000 | 0 | 4000 | 0 | 4000 | 4000 | 0 | 4000 | 0 |

**P2 (40 %)** — necesidad bruta ≈ 1500 u/sem (ene–feb) y 1600 u/sem (mar):

| Semana | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| NB | 1500 | 1500 | 1500 | 1500 | 1500 | 1500 | 1500 | 1500 | 1600 | 1600 | 1600 | 1600 |
| Orden en curso | 3500 | — | — | — | — | — | — | — | — | — | — | — |
| **PMP inicial** | 0 | 0 | 3000 | 0 | 3000 | 0 | 3000 | 0 | 3000 | 0 | 3000 | 0 |

---

## Tercera parte — PMP definitivo (ajuste + ATP)

Próximo a fin de diciembre se revisa el PMP inicial con **información actualizada**. El dato central: la demanda de **diciembre superó lo previsto en 5000 u**; quedaron **4500 u pendientes de entrega** (2500 de P1 + 2000 de P2, a despachar en la semana 1) y **500 u se cubrieron con stock de seguridad** (a reponer). El pronóstico de mediano plazo de enero se reestimó a la baja (9000), pero **ventas registra 10 000 u de pedidos comprometidos** para enero, de modo que el **plan de necesidades** vuelve a 15 000 en enero.

**Stock de seguridad:** $Ss$ = 500 u (P1 = 300, P2 = 200). Se aplica la **proyección de inventario** $I_s = I_{s-1} + OPC_s + PMP_s - PPE_s - \max(PVCP_s,\,PCC_s)$ y, donde el inventario cae por debajo del $Ss$, las **4 reglas de corrección** (ver Apunte 15).

### 3.1. Producto P1 ($Ss=300$)

| Semana | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| PMP inicial | 0 | 4000 | 0 | 4000 | 0 | 4000 | 0 | 4000 | 4000 | 0 | 4000 | 0 |
| Inv. final (inicial) | 500 | 2500 | 1000 | 3500 | 1500 | 3500 | 1000 | 2500 | 3500 | 500 | 1500 | **−1500** |
| **PMP ajustado** | 0 | 4000 | 0 | 4000 | 0 | 4000 | 0 | 4000 | 4000 | 0 | 4000 | **4000** |
| Inv. final (ajustado) | 500 | 2500 | 1000 | 3500 | 1500 | 3500 | 1000 | 2500 | 3500 | 500 | 1500 | 2500 |
| **ATP** | 200 | 500 | 0 | 1500 | 0 | 4000 | 0 | 4000 | 0 | 0 | 4000 | 0 |

> **Corrección P1:** el inventario de la semana 12 caía a **−1500** (< $Ss$). Como no hay lote posterior para adelantar, se aplica la **Regla 2** (agregar un lote en el período): se **agrega un lote de 4000 u en la semana 12**, restaurando el inventario a 2500.

### 3.2. Producto P2 ($Ss=200$)

| Semana | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| PMP inicial | 0 | 0 | 3000 | 0 | 3000 | 0 | 3000 | 0 | 3000 | 0 | 3000 | 0 |
| Inv. final (inicial) | 1000 | 0 | 1750 | 500 | 2000 | 500 | 2100 | 500 | 1682 | **−136** | 1045 | **−773** |
| **PMP ajustado** | 0 | 3000 | 0 | 0 | 3000 | 0 | 3000 | 0 | 3000 | 3000 | 0 | 3000 |
| Inv. final (ajustado) | 1000 | 3000 | 1750 | 500 | 2000 | 500 | 2100 | 500 | 1682 | 2864 | 1045 | 2227 |
| **ATP** | 800 | 2000 | 0 | 0 | 2200 | 0 | 3000 | 0 | 3000 | 3000 | 0 | 3000 |

> **Corrección P2:** aparecían inventarios negativos en las semanas 10 y 12. Se **reprograman lotes** (adelanto/reubicación de los lotes de las últimas semanas) para que ningún período quede por debajo del $Ss$; el resultado es el PMP ajustado de la fila correspondiente, con todos los inventarios finales ≥ 200.

> **Lectura del ATP.** El **disponible a prometer** indica cuánto puede comprometerse a nuevos clientes en cada ventana de lote sin afectar los pedidos ya tomados (ver fórmulas en Apunte 15). Por ejemplo, el ATP de la semana 1 de P1 (**200**) surge de inventario inicial + orden en curso − $Ss$ − pendientes de entrega − pedidos comprometidos hasta el próximo lote.

---

## Síntesis del caso

- En el **PAP**, la estrategia **mixta** minimiza el costo ($≈$2,59 M) al cubrir el pico de marzo con horas extra y subcontratación, evitando los faltantes que penalizan a la caza y, sobre todo, a la nivelación de MO.
- En el **PMP**, la familia se **desagrega** por mix (P1 60 %, P2 40 %), se dimensionan lotes (4000 y 3000) y se obtiene el PMP inicial; al **ajustar** con información real (pendientes de entrega, pedidos comprometidos, reposición de $Ss$) se aplican las **reglas de corrección** y se obtiene el PMP definitivo junto con el **ATP**.
- El caso ilustra el carácter **semi-estructurado** de la decisión (rol del Sistema Soporte de Decisión) y el encadenamiento **PAP → PMP → ATP** que vertebra la Unidad 5.

> **Recursos asociados** (en `recursos-planificacion/`): `solucion-caso-pap.xlsx` (hojas *Caza, Mano Obra, Mixta*) y `solucion-caso-pmp.xlsx` (hojas *PMP Inicial, PMP Definitivo*) contienen el detalle celda a celda de esta solución.

---

> **Temas del plan analítico ejercitados (Unidad 5):** Planificación Agregada de la Producción y Planificación de Capacidad · Modelos de prueba/error (caza, nivelación de MO, mixta) · Planificación Maestra de la Producción · Disponible a prometer.
