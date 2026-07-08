---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 9
unidad: 3
titulo_unidad: Pronósticos de Demanda
temas_del_plan:
  - "Métodos de análisis individual de series temporales: medias móviles, alisado exponencial, alisado exponencial ajustado, ajuste lineal de tendencia, ajuste estacional."
  - Precisión del pronóstico y medidas de errores. Control de pronósticos.
  - Métodos causales. Método de regresión lineal. Correlación y coeficientes de determinación. Métodos de regresión múltiple.
presentacion_fuente: "Unidad_3_-_02_-_Casos_de_estudio.pdf (enunciados) + soluciones de cátedra (Unidad_3_-_04 PDF; Unidad_3_-_05/06/09 Excel)"
fuentes:
  - "Enunciados: Unidad_3_-_02_-_Casos_de_estudio.pdf"
  - "Solución Caso 1: Unidad_3_-_04 (PDF) y recursos-pronosticos/solucion-caso-1.xlsx"
  - "Solución Caso 2: recursos-pronosticos/solucion-caso-2.xlsx"
  - "Solución Caso 3: recursos-pronosticos/solucion-caso-3.xlsx"
anio: 2025
---

# Apunte 9 — Casos de estudio resueltos (Pronósticos de Demanda)

> **Unidad 3 — Pronósticos de Demanda.** Tres casos de estudio resueltos que ponen en práctica el catálogo de métodos del [[apunte-7-pronosticos-de-demanda|Apunte 7]] y la guía de selección del [[apunte-8-comparacion-modelos-pronostico|Apunte 8]]. Cada caso ilustra un patrón de demanda distinto y el método que lo captura: **tendencia → tendencia lineal** (Caso 1), **estacionalidad → ajuste estacional** (Caso 2) y **demanda explicada por otra variable → regresión lineal** (Caso 3). Los desarrollos numéricos provienen de las soluciones de cátedra (PDF y Excel).

**Recursos asociados** (en `recursos-pronosticos/`): `plantilla-modelos-pronosticos.xlsx` (planilla base, una hoja por método) y `solucion-caso-1.xlsx`, `solucion-caso-2.xlsx`, `solucion-caso-3.xlsx` (resoluciones completas con fórmulas, gráficos y medidas de error).

> **Cómo usar la plantilla.** La planilla de cátedra trae una hoja por método (*Medias Móviles, Alisado Exponencial, Alisado Exponencial Ajustado, Tendencia/Regresión Lineal, Regresión Múltiple, Ajuste Estacional*). Se cargan los datos de demanda en la columna de entrada y la hoja calcula automáticamente el pronóstico, las medidas de error (MAD, MAPD, E, Ē, error cuadrático) y el *tracking signal*. El flujo de trabajo es siempre el mismo del proceso de pronóstico: graficar → identificar patrón → probar métodos candidatos → comparar errores → verificar control.

---

## Caso 1 — Concesionaria de autos (demanda con tendencia)

**Situación.** Una concesionaria necesita el pronóstico de ventas de autos del **próximo mes** (mes 10). El proveedor es extranjero y los tiempos de provisión hacen muy costoso corregir el pedido dentro del mes, así que el pronóstico debe ser preciso. Datos históricos (9 meses):

| Mes | 1 Ene | 2 Feb | 3 Mar | 4 Abr | 5 May | 6 Jun | 7 Jul | 8 Ago | 9 Sep |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Ventas (u.) | 110 | 114 | 123 | 131 | 140 | 146 | 157 | 164 | 169 |

### a) Comportamiento de la serie

La demanda **crece de forma sostenida** mes a mes: la serie presenta una **tendencia** (creciente, aproximadamente lineal), sin estacionalidad ni ciclos visibles.

### b) Media móvil de 3 meses (pronóstico del mes 10)

$$MA_3 = \frac{D_7 + D_8 + D_9}{3} = \frac{157 + 164 + 169}{3} = 163.3 \approx \mathbf{164}$$

### c) Media móvil de 5 meses (pronóstico del mes 10)

$$MA_5 = \frac{D_5 + \dots + D_9}{5} = \frac{140 + 146 + 157 + 164 + 169}{5} = 155.2 \approx \mathbf{155}$$

### d) Alisado exponencial simple ($\alpha = 0.40$)

Pronóstico del mes 10 ≈ **159**. (Se inicializa $F_1 = D_1$ y se aplica $F_{t+1} = 0.40\,D_t + 0.60\,F_t$ período a período.)

### e) Alisado exponencial ajustado ($\alpha = 0.40$, $\beta = 0.30$)

Pronóstico del mes 10 ≈ **159**. (Se agrega el factor de tendencia $T_{t+1} = 0.30(F_{t+1}-F_t) + 0.70\,T_t$ y $AF_{t+1}=F_{t+1}+T_{t+1}$.)

### f) Comparación por medidas de error

| Método | MAD | MAPD |
|---|:--:|:--:|
| Media móvil orden 3 | 15.58 | 7 % |
| Media móvil orden 5 | 15.75 | 7 % |
| Alisado exponencial ($\alpha=0.4$) | 18.55 | 6 % |
| Alisado exponencial ajustado ($\alpha=0.4,\ \beta=0.3$) | 13.11 | 5 % |

De estos cuatro, el **alisado exponencial ajustado** es el más exacto (menor MAD), porque es el único que incorpora la **tendencia**. Aun así, todos arrastran error importante.

> **¿Por qué el método menos exacto no sirve aquí?** Las medias móviles y el alisado exponencial simple **no capturan la tendencia**: promedian/suavizan datos pasados que son sistemáticamente **menores** que la demanda creciente actual, por lo que **subestiman** mes a mes (error con sesgo positivo y creciente). Para una demanda con tendencia, esos métodos van siempre "por detrás".

### g) Tendencia lineal (pronóstico del mes 10)

Ajustando $y = a + b\,x$ por mínimos cuadrados sobre los 9 meses:

$$y = 100.25 + 7.82\,x \qquad (r = 0.9976)$$
$$y_{10} = 100.25 + 7.82(10) = \mathbf{178.42}$$

| Método | MAD | MAPD |
|---|:--:|:--:|
| Media móvil orden 3 | 15.58 | 7 % |
| Media móvil orden 5 | 15.75 | 7 % |
| Alisado exponencial ($\alpha=0.4$) | 18.55 | 6 % |
| Alisado exponencial ajustado | 13.11 | 5 % |
| **Tendencia lineal** | **1.5** | **0 %** |

La **tendencia lineal se ajusta muchísimo mejor**: su MAD (1.5) es un orden de magnitud menor que el de los demás (13–18), y su coeficiente de correlación $r=0.9976$ confirma un ajuste casi perfecto. Es el método indicado porque **la serie es esencialmente lineal con tendencia**.

### h) ¿Conviene la tendencia lineal para pronosticar los próximos 5 meses?

**Sí, es conveniente**, porque la recta permite **extrapolar a más de un período a futuro** sustituyendo $x$ por $x+1, x+2, \dots, x+5$. Es apropiado usarla **mientras se mantenga la misma tendencia**; si se sospechara un cambio de tendencia, el ajuste lineal no lo reflejaría (ver Apunte 8) y convendría el alisado exponencial ajustado.

### i) Monitoreo (tracking signal): ¿están bajo control?

Al monitorear con *tracking signal* los pronósticos de alisado exponencial, alisado exponencial ajustado y tendencia lineal, **el único que queda dentro de los límites de control es la tendencia lineal**. Los otros, al no capturar la tendencia, acumulan error con sesgo y su señal se sale de los límites: están **fuera de control**.

> **Lección del Caso 1:** demanda con tendencia ⇒ **tendencia lineal** (mejor ajuste, único bajo control y extrapolable a varios períodos).

---

## Caso 2 — Fastgro Fertilizer (demanda estacional)

**Situación.** Fastgro distribuye fertilizantes y debe planificar su producción **trimestral** a partir de un pronóstico de toneladas demandadas. Datos de 3 años (toneladas):

| Año | Trim 1 | Trim 2 | Trim 3 | Trim 4 | Total anual |
|---|:--:|:--:|:--:|:--:|:--:|
| 1 | 105 | 150 | 93 | 121 | 469 |
| 2 | 140 | 170 | 105 | 150 | 565 |
| 3 | 150 | 170 | 110 | 130 | 560 |
| **Total** | **395** | **490** | **308** | **401** | **1594** |

### a) Comportamiento de la serie

Patrón **estacional** que se repite cada año: **pico en el Trim 2**, **valle en el Trim 3**, con una leve **tendencia** creciente en el total anual (469 → 565 → 560). Es el escenario del **ajuste estacional**.

### b) Pronóstico anual y trimestral del año 4

**Paso 1 — Pronóstico anual (tendencia lineal sobre la demanda anual):**

$$y = 440.33 + 45.5\,x \qquad (r = 0.842)$$
$$F_4 = 440.33 + 45.5(4) \approx \mathbf{622.3 \text{ ton}} \;(\approx 623)$$

**Paso 2 — Factores estacionales** ($S_i = \text{total trim } i \,/\, \text{total general}$):

| | Trim 1 | Trim 2 | Trim 3 | Trim 4 |
|---|:--:|:--:|:--:|:--:|
| $S_i$ | 0.248 | 0.307 | 0.193 | 0.252 |

**Paso 3 — Pronóstico trimestral** ($SF_i = S_i \cdot F_4$):

| | Trim 1 | Trim 2 | Trim 3 | Trim 4 |
|---|:--:|:--:|:--:|:--:|
| **Año 4** | **154.4** | **191.5** | **120.4** | **156.7** |

Los cuatro trimestres suman ≈ 623 ton, repartidas según el peso estacional de cada trimestre.

> **Lección del Caso 2:** demanda estacional ⇒ **ajuste estacional** (pronóstico anual por tendencia lineal × factor estacional de cada estación).

---

## Caso 3 — ACME Tools (demanda explicada por otra variable)

**Situación.** ACME Tools quiere pronosticar sus **ventas anuales** ($) en función del **gasto anual en publicidad** ($). Sospecha que las ventas aumentan con la publicidad. Datos de 10 años:

| Año | Ventas (miles $) | Publicidad (miles $) |
|:--:|:--:|:--:|
| 1 | 110 | 39 |
| 2 | 170 | 49 |
| 3 | 260 | 55 |
| 4 | 240 | 68 |
| 5 | 230 | 85 |
| 6 | 290 | 91 |
| 7 | 320 | 105 |
| 8 | 330 | 116 |
| 9 | 320 | 120 |
| 10 | 340 | 130 |

Aquí la variable explicativa **no es el tiempo** sino la **publicidad** ⇒ método **causal (regresión lineal)**.

### a) Fuerza de la relación lineal (coeficiente de correlación)

$$r = 0.9059$$

Es un valor **cercano a +1** ⇒ existe una **relación lineal positiva fuerte**: a mayor inversión en publicidad, mayores ventas.

### b) Coeficiente de determinación

$$r^2 = 0.8206$$

Significa que **≈ 82 % de la variación de las ventas** queda explicada por la variación del gasto en publicidad; el ≈ 18 % restante se debe a otras variables no consideradas.

### c) Modelo de regresión y pronósticos

$$y = 77.90 + 2.134\,x$$

- Si la publicidad **sube a $150.000** ($x = 150$): $\;y = 77.90 + 2.134(150) = 398.0 \Rightarrow \mathbf{\$398.010}$
- Si la publicidad **baja a $115.000** ($x = 115$): $\;y = 77.90 + 2.134(115) = 323.3 \Rightarrow \mathbf{\$323.310}$

### d) Modelo de tendencia lineal (ventas en función del tiempo)

$$y = 135.33 + 22.85\,x \qquad (r = 0.9164,\; r^2 = 0.8397)$$
$$y_{11} = 135.33 + 22.85(11) = \mathbf{386.7} \;(\$386.670)$$

### e) Comparación: regresión (publicidad) vs. tendencia lineal (tiempo)

| Modelo | MAD | MAPD | $r^2$ |
|---|:--:|:--:|:--:|
| Regresión lineal (ventas ~ publicidad) | 24.44 | 9.4 % | 0.8206 |
| Tendencia lineal (ventas ~ tiempo) | 22.11 | 9.5 % | 0.8397 |

Por las medidas de error, ambos modelos son **muy parejos**; la **tendencia lineal** resulta **levemente más precisa** en el ajuste histórico (MAD 22.11 < 24.44; $r^2$ algo mayor). No obstante, el **modelo de regresión sobre publicidad es el único que responde la pregunta de negocio** ("¿qué pasa con las ventas si cambio el presupuesto de publicidad?"), algo que la tendencia temporal no puede hacer. La elección depende del objetivo: si se busca el **mejor ajuste/extrapolación temporal**, tendencia lineal; si se busca **explicar y manejar el driver causal**, regresión.

> **Lección del Caso 3:** cuando la demanda depende de **otra variable** (publicidad, precio, etc.), el método es **regresión**; $r$ mide la fuerza de la relación y $r^2$ cuánta variación explica. Conviene igual contrastar con la tendencia lineal y comparar errores.

---

## Síntesis del apunte

Los tres casos recorren el árbol de decisión del [[apunte-8-comparacion-modelos-pronostico|Apunte 8]]:

| Caso | Patrón dominante | Método ganador | Evidencia |
|---|---|---|---|
| 1 — Concesionaria | **Tendencia** | Tendencia lineal | MAD 1.5 vs 13–18; único bajo control |
| 2 — Fastgro | **Estacionalidad** | Ajuste estacional | Pronóstico anual × factores estacionales |
| 3 — ACME | **Causal** (ventas ~ publicidad) | Regresión lineal | $r = 0.91$, $r^2 = 0.82$ |

El método de trabajo es siempre el mismo: **graficar e identificar el patrón**, **probar varios candidatos** con la plantilla, **comparar con medidas de error** (MAD, MAPD) y **verificar control** (*tracking signal*). El patrón de la demanda descarta candidatos *a priori*; el error y el control deciden el ganador *a posteriori*.
