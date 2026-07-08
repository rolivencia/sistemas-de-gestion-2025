---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 26
unidad: 8
titulo_unidad: Programación de la Producción (Scheduling)
temas_del_plan:
  - Reglas de secuenciamiento.
  - Diagrama de Gantt.
  - Tipos de procesos de producción (flow shop, job shop).
  - Manufactura sincrónica (OPT).
  - Métodos heurísticos, algoritmos genéticos.
  - Objetivos en scheduling.
presentacion_fuente: "Unidad_8_-_02_-_Casos_de_estudio.pdf + soluciones Excel de cátedra (…_03 Flow Shop, …_04 Job Shop, …_05 OPT, …_06 Algoritmo Genético)"
anio: 2025
---

# Apunte 26 — Casos de estudio resueltos (Scheduling)

> **Unidad 8 — Programación de la Producción (Scheduling).** Cuatro casos resueltos que aplican de punta a punta la teoría del Apunte 25: **(1)** scheduling de **Flow Shop** comparando cinco **políticas de almacenamiento/transporte** (lote de transporte = lote de producción, lote = 1, sin almacén, *Zero Wait* y una mixta); **(2)** scheduling de **Job Shop** con estrategia de intervalo y regla **menor fecha de entrega**; **(3)** scheduling de **Job Shop por OPT** (cuello de botella) contrastado con despacho por regla; y **(4)** un **algoritmo genético** sobre un Flow Shop sin almacén intermedio. Las **soluciones de cátedra** (cuatro planillas Excel) fueron **transcriptas y verificadas**; los casos 1 y 4 se **recalcularon de forma independiente** y coinciden. Cubre los temas de reglas de secuenciamiento, Gantt, flow/job shop, OPT y algoritmos genéticos.

> **Cómo leerlo.** Cada caso trae: los **datos**, la **regla/secuencia** usada, la **evaluación de objetivos** (fecha de terminación, tardanza, tardanza máxima, tardanza promedio, *makespan*) y la **lectura** del resultado. La mecánica teórica está en el Apunte 25; la **guía de ejercicios** (Apunte 27) propone problemas equivalentes para practicar. Las planillas Excel se conservan como recursos binarios en `recursos-scheduling/` (no se suben al conocimiento del proyecto; ver índice §5 y §12).

---

## 0. Convenciones comunes a los casos

Antes de los casos, conviene fijar el vocabulario operativo que usan las planillas:

- **Recursos** $R_1, R_2, R_3$ ≡ centros de trabajo **CT1, CT2, CT3**.
- **Tiempo de procesamiento total** de una orden = (suma de tiempos por unidad en todos los CT) × (unidades a producir). Es el criterio de la regla **"menor tiempo total de producción"**.
- **Fecha de terminación** (*completion time*): período en que la orden sale del sistema.
- **Tardanza** de una orden $= \max(0,\ \text{terminación} - \text{fecha de entrega})$. **Tardanza máxima** = la mayor entre las órdenes. **Tardanza promedio** = media de las tardanzas.
- **Makespan**: período en que se completa la **última** orden del conjunto.
- **Lote de producción** vs **lote de transporte**: el de producción es lo que se fabrica por orden; el de **transporte** es cuánto se mueve al siguiente CT por vez. Si el lote de transporte $< $ lote de producción, las operaciones **se solapan** entre CT (una unidad ya terminada en CT1 avanza mientras se procesan las demás), acortando el *makespan*.
- **Políticas de almacenamiento intermedio:** con **almacén** (buffer) las unidades terminadas esperan sin bloquear el recurso; **sin almacén** una unidad terminada **bloquea** el CT (marca **B**) hasta que el CT siguiente la reciba; **Zero Wait (ZW)** obliga a que la unidad pase **de inmediato** al CT siguiente (no puede esperar).

---

## 1. Caso 1 — Scheduling Flow Shop (cinco políticas)

**Sistema:** Flow Shop, permutativo, estrategia de **despacho**, regla **menor tiempo total de producción**.

**Datos:**

| Orden | CT1 (u) | CT2 (u) | CT3 (u) | Unidades | Fecha entrega | **T. proc. total** |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| O1 | 3 | 4 | 1 | 2 | 19 | $8\times2=16$ |
| O2 | 2 | 3 | 2 | 1 | 9 | $7\times1=7$ |
| O3 | 2 | 1 | 4 | 2 | 12 | $7\times2=14$ |
| O4 | 2 | 3 | 1 | 2 | 22 | $6\times2=12$ |

- **Arribos de órdenes** (no procesables antes de): O1≥5, O2≥5, O3≥4, O4≥2.
- **Disponibilidad de recursos** (no asignables antes de): $R_1$≥3, $R_2$≥5, $R_3$≥1.
- **Regla → secuencia:** por menor tiempo total: $\boxed{O2\ (7) \to O4\ (12) \to O3\ (14) \to O1\ (16)}$.

Se evalúan **cinco políticas** manteniendo esa secuencia. Resultados de cátedra (verificados):

| Política | Terminación O1 / O2 / O3 / O4 | Tardanza O1 / O2 / O3 / O4 | Tard. máx | Tard. prom. | **Makespan** |
|---|:--:|:--:|:--:|:--:|:--:|
| **A** — almacén, lote transp. = lote prod. | 30 / 11 / 26 / 18 | 11 / 2 / 14 / 0 | 14 | 6.75 | 30 |
| **B** — almacén, lote transp. = 1 | 26 / 11 / 24 / 16 | 7 / 2 / 12 / 0 | 12 | **5.25** | **26** |
| **C** — sin almacén (lote transp. = 1) | 29 / 11 / 24 / 16 | 10 / 2 / 12 / 0 | 12 | 6.00 | 29 |
| **D** — ZW (lote transp. = 1) | 31 / 11 / 24 / 16 | 12 / 2 / 12 / 0 | 12 | 6.50 | 31 |
| **E** — mixta (ver enunciado) | 35 / 11 / 24 / 16 | 16 / 2 / 12 / 0 | 16 | 7.50 | 35 |

> Política **E**: almacén con lote de transporte = lote de producción para **O1 y O2**, lote de transporte = 1 para el resto, y **ZW para O3**.

**Gantt de la política A** (lote completo se mueve junto; tabla de tareas de cátedra, períodos inclusivos):

| Orden | Tarea | Recurso | Inicio | Fin |
|:--:|:--:|:--:|:--:|:--:|
| O2 | T4–T6 | R1 / R2 / R3 | 5 / 7 / 10 | 6 / 9 / 11 |
| O4 | T10–T12 | R1 / R2 / R3 | 7 / 11 / 17 | 10 / 16 / 18 |
| O3 | T7–T9 | R1 / R2 / R3 | 11 / 17 / 19 | 14 / 18 / 26 |
| O1 | T1–T3 | R1 / R2 / R3 | 15 / 21 / 29 | 20 / 28 / 30 |

**Lectura.** La política **B (lote de transporte = 1 con almacén)** es la mejor: el solapamiento de unidades entre CT minimiza tanto el **makespan (26)** como la **tardanza promedio (5.25)**. Reducir el lote de transporte respecto del de producción (de A a B) **acorta el cronograma** a costa de más manipulación de material. Quitar el almacén (C) introduce **bloqueos** y alarga a 29; **ZW (D)** es aún más restrictiva (31); y la política **mixta (E)**, al forzar lote completo en O1/O2 y ZW en O3, es la peor (35). El *makespan* y la tardanza **dependen de la política de flujo**, no solo de la secuencia.

---

## 2. Caso 2 — Scheduling Job Shop

**Sistema:** Job Shop, **no** permutativo (cada orden tiene su **propia ruta**), estrategia de **intervalo**, regla **menor fecha de entrega primero**.

**Datos y rutas** (1 unidad por orden):

| Orden | CT1 | CT2 | CT3 | Fecha entrega | Ruta (secuencia de CT) |
|:--:|:--:|:--:|:--:|:--:|:--:|
| O1 | 3 | 1 | 3 | 12 | CT1 → CT3 → CT2 |
| O2 | 2 | 5 | 4 | 15 | CT2 → CT1 → CT3 |
| O3 | 4 | 3 | 2 | 9 | CT2 → CT3 → CT1 |

- **Almacén** intermedio infinito; **arribos** todos en $t=0$; **disponibilidad de recursos:** $R_1$≥1, $R_2$≥3, $R_3$≥2.
- **Regla → secuencia** (menor fecha de entrega): $\boxed{O3\ (9) \to O1\ (12) \to O2\ (15)}$.

**Evaluación de objetivos (cátedra):**

| Orden | Fecha terminación | Fecha entrega | Tardanza | Tard. máx |
|:--:|:--:|:--:|:--:|:--:|
| O1 | 11 | 12 | 0 | — |
| O2 | 17 | 15 | 2 | 2 |
| O3 | 11 | 9 | 2 | 2 |
| | | **Tardanza total** | **4** | |
| | | Tardanza promedio | 1.33 | |
| | | **Makespan** | **17** | |

**Lectura.** El **objetivo evaluado es la tardanza total (4)**. La dificultad del job shop es que las **rutas se cruzan** (O2 y O3 compiten por $R_2$ al inicio; varias órdenes pelean por el mismo recurso), por lo que la regla EDD se reaplica en cada conflicto. El diagrama de Gantt completo (con la ocupación período a período de $R_1, R_2, R_3$) está coloreado en la planilla de cátedra `recursos-scheduling/solucion-caso-2.xlsx`; conviene seguirlo allí para ver cómo se intercalan las operaciones.

---

## 3. Caso 3 — Job Shop: OPT vs. despacho por regla

**Sistema:** Job Shop, **no** permutativo, **lote de transferencia = 1**, almacén intermedio infinito. **Objetivos:** *makespan*, tardanza total y tardanza máxima. Se resuelve por **dos métodos** para comparar.

**Datos** (tiempo y orden de cada operación; 2 unidades por orden):

| Orden | $R_1$ (t, orden) | $R_2$ (t, orden) | $R_3$ (t, orden) | Fecha entrega |
|:--:|:--:|:--:|:--:|:--:|
| O1 | 5 (1.º) | 1 (3.º) | 4 (2.º) | 15 |
| O2 | — | 2 (1.º) | 5 (2.º) | 25 |
| O3 | 4 (1.º) | 1 (3.º) | 2 (2.º) | 10 |
| O4 | 1 (2.º) | 2 (1.º) | — | 14 |

### 3.a) Método OPT (cuello de botella)

**Paso 1 — identificar el CB** (suma de tiempos por recurso):

$$R_1 = 5+4+1 = 10 \qquad R_2 = 1+2+1+2 = 6 \qquad R_3 = 4+5+2 = 11 \ \Rightarrow\ \boxed{\text{CB} = R_3}$$

**Paso 2 — secuencia en el CB.** Para cada orden con operación en $R_3$, se compara el **tiempo de provisión** al CB (LT, lo que tarda en llegar al CB) con su **tiempo de proceso** en el CB (TP). Se programa primero el que cumple $LT \le TP$:

| Orden | LT al CB | TP en CB | ¿$LT \le TP$? |
|:--:|:--:|:--:|:--:|
| O1 | 5 | 4 | No ($5>4$) |
| O2 | 2 | 5 | **Sí** ($2<5$) |
| O3 | 4 | 2 | No ($4>2$) |
| O4 | — (sin op. en $R_3$) | — | — |

$\Rightarrow$ Secuencia en el CB: $\boxed{O2 \to O3 \to O1}$ (forward en el CB; las demás máquinas se programan backward alrededor).

**Evaluación de cátedra (bloque bajo el Gantt):**

| Orden | Terminación | Entrega | Tardanza | Tard. máx |
|:--:|:--:|:--:|:--:|:--:|
| O1 | 30 | 15 | 15 | 15 |
| O2 | 17 | 25 | 0 | — |
| O3 | 22 | 10 | 12 | — |
| O4 | 20 | 14 | 6 | — |
| | | **Makespan** | **30** | |

### 3.b) Método por regla (menor fecha de entrega)

- **Secuencia EDD:** $O3\ (10) \to O4\ (14) \to O1\ (15) \to O2\ (25)$.

| Orden | Terminación | Entrega | Tardanza | Tard. máx |
|:--:|:--:|:--:|:--:|:--:|
| O1 | 26 | 15 | 11 | — |
| O2 | 40 | 25 | 15 | 15 |
| O3 | 11 | 10 | 1 | — |
| O4 | 11 | 14 | 0 | — |
| | | Tardanza promedio | 6.75 | |
| | | **Makespan** | **40** | |

**Lectura.** El **OPT reduce el *makespan* de 40 a 30** frente al despacho por regla, porque **sincroniza el flujo a través del recurso más cargado** ($R_3$) en vez de dejar que la regla EDD lo congestione. Es la ventaja central de la **manufactura sincrónica**: programar primero el cuello de botella y acomodar el resto a su ritmo.

> **Anomalía detectada en la planilla del caso 3 (a verificar con la cátedra).** La hoja del método OPT trae **dos bloques de evaluación** con resultados distintos para **O4** (terminación 20 vs 11) y promedios de tardanza inconsistentes (**6.75** y **4.75**) que **no se reproducen** con el criterio estándar de tardanza $=\max(0,\ \text{term.}-\text{entrega})$: con las terminaciones del Gantt (O1=30, O2=17, O3=22, O4=20) las tardanzas son **15, 0, 12, 6**, lo que da **total 33 y promedio 8.25** (máx 15). Los promedios impresos parecen mezclar tardanzas con y sin recorte en 0. Se transcribe el bloque tal cual figura y se señala la inconsistencia; conviene **cotejar el criterio de promediado** con el docente. Lo que **no** está en duda y es el aprendizaje del caso: **OPT (makespan 30) supera al despacho EDD (makespan 40)**.

---

## 4. Caso 4 — Algoritmo Genético (Flow Shop sin almacén)

**Sistema:** Flow Shop de **2 máquinas** ($R_1, R_2$), **sin almacenamiento intermedio** (una unidad terminada en $R_1$ **bloquea** $R_1$ hasta que $R_2$ se libere; marca **B**). **Objetivo (fitness):** **tardanza media** (a minimizar).

**Datos:**

| Orden | $R_1$ | $R_2$ | Fecha entrega |
|:--:|:--:|:--:|:--:|
| O1 | 2 | 3 | 10 |
| O2 | 1 | 4 | 9 |
| O3 | 4 | 2 | 12 |
| O4 | 2 | 1 | 15 |

- **Población inicial (2 individuos):** $(4\,1\,2\,3) = O4,O1,O2,O3$ y $(3\,4\,2\,1) = O3,O4,O2,O1$.
- **Operador:** intercambio de **pares adyacentes**. **3 iteraciones (generaciones).**

**Generación 1 — evaluación de la población inicial** (tardanzas verificadas con el modelo de bloqueo de 2 máquinas):

| Individuo | Secuencia | Tard. O1 / O2 / O3 / O4 | **Fitness (tard. media)** |
|:--:|:--:|:--:|:--:|
| 1 | O4, O1, O2, O3 | 0 / 2 / 1 / 0 | **0.75** |
| 2 | O3, O4, O2, O1 | 4 / 2 / 0 / 0 | 1.50 |

- **Selección del padre:** el de mejor fitness → Individuo 1 ($O4,O1,O2,O3$, 0.75).
- **Nuevo hijo** (swap adyacente de las posiciones 2–3, $O1\leftrightarrow O2$): $O4, O2, O1, O3$ → tardanzas 0/0/1/0 → **fitness 0.25**.

**Generación 2:**

| Individuo | Secuencia | Fitness |
|:--:|:--:|:--:|
| 1 | O4, O1, O2, O3 | 0.75 |
| 2 | O4, O2, O1, O3 | **0.25** |

- **Padre:** $O4, O2, O1, O3$ (0.25). **Hijo** (swap posiciones 1–2, $O4\leftrightarrow O2$): $O2, O4, O1, O3$ → **fitness 0.25**.

**Generación 3 (población final):**

| Individuo | Secuencia | Fitness |
|:--:|:--:|:--:|
| 1 | O4, O2, O1, O3 | 0.25 |
| 2 | O2, O4, O1, O3 | 0.25 |

**Verificación del individuo 1 (cómo se calcula una tardanza con bloqueo).** Secuencia $O4, O1, O2, O3$ en 2 máquinas sin buffer:

| Orden | $R_1$ inicio→fin | $R_2$ inicio→fin | Terminación | Entrega | Tardanza |
|:--:|:--:|:--:|:--:|:--:|:--:|
| O4 | 0 → 2 | 2 → 3 | 3 | 15 | 0 |
| O1 | 2 → 4 | 4 → 7 | 7 | 10 | 0 |
| O2 | 4 → 5 (bloquea 5→7) | 7 → 11 | 11 | 9 | 2 |
| O3 | 7 → 11 | 11 → 13 | 13 | 12 | 1 |

Tardanza media $=(0+0+2+1)/4 = 0.75$. ✓

**Lectura.** El algoritmo **mejora generación a generación**: el mejor fitness baja de **0.75 a 0.25** en una sola descendencia y se estabiliza. Ilustra cómo una heurística evolutiva **converge a buenas soluciones** sin enumerar las $4! = 24$ secuencias —ventaja que se vuelve decisiva cuando $n$ crece (Apunte 25, §5.2 y §13).

---

## 5. Síntesis

- **Caso 1 (Flow Shop):** a igual secuencia, la **política de flujo** decide el resultado; **lote de transporte = 1 con almacén (B)** minimiza *makespan* (26) y tardanza promedio (5.25); sin buffer, ZW y la mixta lo empeoran.
- **Caso 2 (Job Shop):** con rutas cruzadas, la regla **EDD** se reaplica en cada conflicto de recurso; objetivo tardanza total = 4, *makespan* 17.
- **Caso 3 (OPT vs regla):** programar **alrededor del cuello de botella** baja el *makespan* de **40 a 30** frente al despacho EDD (con una anomalía de promediado en la planilla, anotada).
- **Caso 4 (Genético):** el operador de **intercambio adyacente** evoluciona la población y baja la **tardanza media de 0.75 a 0.25**.

> En conjunto, los cuatro casos recorren las técnicas del Apunte 25: **reglas de secuenciamiento**, **Gantt**, **OPT** y **algoritmos genéticos**, sobre las dos estructuras (**flow shop** y **job shop**) y las distintas **políticas de almacenamiento**.
