---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 7
unidad: 3
titulo_unidad: Pronósticos de Demanda
temas_del_plan:
  - Tipos de Pronósticos.
  - Componentes y patrones de la demanda.
  - Proceso para la elaboración de pronósticos.
  - Modelos/Métodos cuantitativos.
  - "Métodos de análisis individual de series temporales: medias móviles, alisado exponencial, alisado exponencial ajustado, ajuste lineal de tendencia, ajuste estacional."
  - Precisión del pronóstico y medidas de errores. Control de pronósticos.
  - Métodos causales. Método de regresión lineal. Correlación y coeficientes de determinación. Métodos de regresión múltiple.
  - Métodos cualitativos.
presentacion_fuente: "Unidad_3_-_01_-_Forecasting-SG (2025).pdf"
anio: 2025
---

# Apunte 7 — Gestión de Pronósticos (Forecasting) de Demanda

> **Unidad 3 — Pronósticos de Demanda.** Primera presentación de la unidad. Recorre de forma integral el pronóstico de demanda: qué es y qué tipos hay, su rol estratégico en la gestión de operaciones y la cadena de suministro, los componentes y patrones de la demanda, el proceso de elaboración de pronósticos y —su núcleo— el **catálogo completo de métodos de pronóstico** (cuantitativos de series de tiempo, cuantitativos causales y cualitativos), junto con las medidas de exactitud y las técnicas de control. Cubre prácticamente la totalidad de los temas del plan analítico de la Unidad 3.

**Docente responsable:** Dr. Ing. Pablo D. Villarreal

**Bibliografía de referencia de la presentación:**

- Russell & Taylor, *Operations Management. Creating Value Along the Supply Chain* (7.ª ed.), John Wiley & Sons, 2011 — Capítulo 12: *Forecasting*.
- F. Robert Jacobs & Richard B. Chase, *Operations and Supply Chain Management*, McGraw Hill, 2018 — Capítulo 18: *Forecasting*.

---

## Agenda de la presentación

1. Introducción.
2. Rol estratégico del pronóstico.
3. Componentes de un pronóstico de demanda.
4. Proceso de pronóstico.
5. Métodos de pronóstico **cuantitativos**:
   - Métodos de análisis de series de tiempo.
   - Exactitud del pronóstico.
   - Control de pronóstico.
   - Modelos de relaciones entre variables (métodos causales).
6. Métodos de pronóstico **cualitativos**.

---

## 1. Introducción

> **Pronóstico:** es una **predicción de lo que ocurrirá en el futuro**.

Caracterización del pronóstico:

- Es un **proceso sujeto a incertidumbres**: un intento de anticipación de un futuro incierto. No se trata de pronosticar para "acertar" un futuro incierto.
- Generalmente se basa en el **estudio de datos históricos** y la **extrapolación** de los mismos para producir el pronóstico.
- Los pronósticos generalmente forman parte de un **proceso complejo de toma de decisiones**.

> **Idea clave:** obtener un buen pronóstico implica usar un **juicio razonable** junto con la **generación de resultados numéricos**. No es sólo cálculo ni sólo intuición.

### Tipos de pronósticos

Tres ejes para clasificar pronósticos:

1. **Largo plazo vs. corto plazo** (según el horizonte de tiempo).
2. **Micro vs. macro:**
   - **Macropronósticos:** de habitantes, ciudades, países, etc.
   - **Micropronósticos:** generalmente enfocados a variables que están en el ámbito de una organización.
3. **Cualitativos vs. cuantitativos:**
   - **Métodos cuantitativos:** basados en fórmulas matemáticas.
   - **Métodos cualitativos:** basados en métodos subjetivos.

---

## 2. Rol estratégico del pronóstico

El pronóstico cumple un rol diferenciado según el horizonte:

- **Pronósticos de largo plazo** — nuevos productos, nuevos mercados emergentes, nuevas tecnologías. Son **críticos para el diseño estratégico de la cadena de suministro** de una empresa.
- **Planificación de mediano y corto plazo** — de inventarios, producción, distribución, compras, etc., a lo largo de la cadena de suministro. Esta planificación **requiere de pronósticos de demanda**.

### Por qué importan los pronósticos precisos

Siempre que exista alguna de estas condiciones:

- Tiempos de aprovisionamiento significativos en producción.
- Variación de la demanda.
- Necesidad de un alto y rápido nivel de servicio al cliente,

→ **se necesitará mantener inventarios**, y **cuanto más preciso sea el pronóstico, menos inventarios** harán falta.

El costo de un **pronóstico incorrecto** se manifiesta por dos lados:

| Si el pronóstico es… | Consecuencia | Efecto |
|---|---|---|
| **Demasiado alto** (sobrestima) | Stocks excesivos | Costos ↑ |
| **Demasiado bajo** (subestima) | Faltantes | Servicio al cliente ↓ |

> **Conclusión:** los **pronósticos de demanda precisos disminuyen la incertidumbre** a lo largo de toda la cadena de suministro.

---

## 3. Componentes de un pronóstico de demanda

Un pronóstico de demanda se define por dos componentes:

### a) Horizonte de tiempo (*time frame*)

- **Corto y mediano plazo:** pronósticos de demanda diarios, semanales o mensuales; hasta **2 años** futuros. Se usan para determinar el *scheduling* de producción y entrega, niveles de inventarios, etc.
- **Largo plazo:** planificación estratégica (productos, mercados, tecnologías, nuevas instalaciones); desde **2 a 10 años** futuros.

### b) Comportamiento de la demanda

- **No predecible (impredecible):** movimientos **aleatorios**, irregulares, sin un patrón.
- **Predecible:** sigue **patrones**.

**Patrones de demanda predecibles:**

- **Tendencia (*trend*):** crecimiento o decrecimiento gradual a largo plazo.
- **Patrón estacional (*seasonal*):** oscilaciones periódicas de la demanda que se repiten; frecuentemente relacionadas con las estaciones del año.
- **Ciclos (*cycle*):** movimientos crecientes y decrecientes que se repiten en horizontes de tiempo largos (mayores a 1 año).

Estos patrones pueden combinarse (p. ej., **tendencia con patrón estacional**) y conviven con el **movimiento aleatorio**.

---

## 4. Proceso de pronóstico

El pronóstico no es un cálculo aislado sino un **proceso iterativo** de 11 pasos con un punto de decisión que realimenta:

```
1. Identificar el objetivo  ─► 2. Recolectar datos  ─► 3. Identificar patrones
   del pronóstico              históricos               (graficar datos)
                                                              │
   ┌──────────────────────────────────────────────────────────┘
   ▼
4. Seleccionar un        ─► 5. Calcular el          ─► 6. Evaluar exactitud
   MÉTODO de pronóstico     pronóstico para los         con medidas de errores
                            períodos históricos              │
                                                             ▼
   8. Ajustar parámetros  ◄── no ──◄ 7. ¿La exactitud del pronóstico
      del modelo o                       es aceptable?
      seleccionar otro                       │ sí
      método  ─(vuelve a 5)                  ▼
9. Pronosticar el        ─► 10. Ajustar con          ─► 11. Monitorear resultados y
   próximo período           información cualitativa     medir exactitud del pronóstico
                             o subjetividad
```

- El **paso 6** evalúa los pronósticos calculados sobre los **períodos históricos** (donde se conoce la demanda real) usando medidas de error.
- El **paso 7** es el punto de decisión: si la exactitud **no** es aceptable, se vuelve al paso 8 (ajustar parámetros o cambiar de método) y se recalcula; si **sí**, se avanza a pronosticar el período futuro.
- Los pasos finales incorporan el **juicio cualitativo** (paso 10) y el **monitoreo continuo** (paso 11), cerrando el ciclo con la idea de la introducción: números + juicio razonable.

### Familias de métodos de pronóstico

```
                         ┌─────────────────────────────┐
                         │   MÉTODOS DE PRONÓSTICO      │
                         └──────────────┬──────────────┘
              ┌─────────────────────────┴───────────────────────┐
        CUANTITATIVOS                                       CUALITATIVOS
              │                                                  │
   ┌──────────┴───────────┐                          (métodos subjetivos)
Series de tiempo      Causales
(el tiempo es el      (relación demanda ↔
 factor explicativo)   variables independientes)
```

- **Métodos de series de tiempo (cuantitativos):** técnicas estadísticas que usan datos históricos.
- **Métodos causales (cuantitativos):** relación entre la demanda y las variables independientes que influyen en su comportamiento.
- **Métodos cualitativos:** uso de métodos subjetivos para hacer pronósticos.

---

## ★ Catálogo de métodos de pronóstico (énfasis del apunte)

> Esta es la columna vertebral de la Unidad 3. Conviene tener clarísimo **qué método existe, en qué familia está, qué supone sobre la demanda y para qué se usa**. La tabla siguiente reúne **todos** los métodos mencionados en la presentación; las secciones posteriores los desarrollan uno por uno.

| # | Método | Familia | Supuesto / cuándo conviene |
|:--:|---|---|---|
| 1 | **Medias móviles** (*moving average*, MA) | Cuantitativo · Serie de tiempo | Demanda **estable**, sin tendencia ni estacionalidad. Corto plazo. Suaviza el ruido. |
| 2 | **Media móvil ponderada** (*weighted MA*, WMA) | Cuantitativo · Serie de tiempo | Igual que MA, pero **pesa más los datos recientes**: reacciona mejor a fluctuaciones. |
| 3 | **Alisado exponencial** (*exponential smoothing*, AE) | Cuantitativo · Serie de tiempo | Sin tendencia ni estacionalidad. Pondera exponencialmente lo reciente; requiere **pocos datos**. |
| 4 | **Alisado exponencial ajustado** (con factor de tendencia) | Cuantitativo · Serie de tiempo | Series **con tendencia**: corrige el rezago del AE simple. |
| 5 | **Ajuste lineal de tendencia** (*linear trend line*) | Cuantitativo · Serie de tiempo (regresión sobre el tiempo) | Series con **tendencia regular**; extrapola sustituyendo $t$ por $t+1, t+2, \dots$ |
| 6 | **Ajuste estacional** (factor estacional) | Cuantitativo · Serie de tiempo | Series con **patrón estacional**; se combina con un pronóstico de tendencia. |
| 7 | **Regresión lineal** (simple) | Cuantitativo · **Causal** | Relación **causal** entre la demanda y **una** variable independiente. |
| 8 | **Regresión múltiple** | Cuantitativo · **Causal** | Relación causal con **dos o más** variables independientes. |
| 9 | **Modelos econométricos** | Cuantitativo · **Causal** | Relaciones entre variables sustentadas en **leyes económicas** (uni/multiecuacionales). |
| 10 | **Encuestas** | Cualitativo | Captan intención, expectativas y actitudes (insumo de variables explicativas). |
| 11 | **Diseño de experimentos** | Cualitativo | Prueba piloto; estima efectos de "tratamientos" sobre la variable experimental. |
| 12 | **Simulación en base a modelos** | Cualitativo | Modelos multiecuacionales (p. ej., Forrester) con identidades y relaciones causales. |
| 13 | **Delphi (Delfos) e impactos cruzados** | Cualitativo | Encuesta iterativa y anónima a **expertos** con retroalimentación controlada. |

---

## 5. Métodos de análisis de series de tiempo

Las **series de tiempo** son datos que se recolectan, registran u observan a lo largo de **incrementos sucesivos de tiempo** (intervalos fijos). Son técnicas estadísticas que usan datos históricos y:

- **Asumen que el pasado seguirá ocurriendo.**
- Su **estrategia** es que el **factor explicativo es el tiempo**.

El estudio de una serie de tiempo supone **4 componentes**:

- **T:** tendencia.
- **C:** movimientos cíclicos.
- **S:** estacionalidad.
- **I:** variaciones irregulares.

Que pueden combinarse en dos esquemas:

$$\text{Esquema multiplicativo:}\quad y = T \cdot S \cdot C \cdot I$$
$$\text{Esquema aditivo:}\quad y = T + S + C + I$$

Los métodos de series de tiempo de la cátedra son: **medias móviles**, **alisado exponencial**, **ajuste lineal de tendencia** y **ajuste estacional** (más sus variantes ponderada y ajustada).

### 5.1. Medias móviles (*moving average*)

Promedia la demanda de los últimos $n$ períodos.

$$MA_n = \frac{\displaystyle\sum_{i=1}^{n} D_i}{n}$$

donde $n$ = número de períodos, $D_i$ = demanda en el período $i$, $MA_n$ = pronóstico.

- **Suaviza (amortigua)** los cambios.
- Se usa para **demandas estables**, sin tendencia ni estacionalidad.
- Apropiado para **pronósticos de corto plazo**.

**Ejemplo (medias móviles de 3 y 5 meses):**

| Mes | Demanda | MA 3-meses | MA 5-meses |
|---|:--:|:--:|:--:|
| Ene | 120 | — | — |
| Feb | 90 | — | — |
| Mar | 100 | — | — |
| Abr | 75 | 103.3 | — |
| May | 110 | 88.3 | — |
| Jun | 50 | 95.0 | 99.0 |
| Jul | 75 | 78.3 | 85.0 |
| Ago | 130 | 78.3 | 82.0 |
| Sep | 110 | 85.0 | 88.0 |
| Oct | 90 | 105.0 | 95.0 |
| Nov | — | 110.0 | 91.0 |

> **Lección del gráfico:** las **medias móviles de plazo más largo (5-meses) reaccionan más lentamente** a los cambios que las de plazo corto (3-meses) — más suavizado, menos sensibilidad.

### 5.2. Media móvil ponderada (*weighted moving average*)

Ajuste a las medias móviles para reflejar más estrechamente las fluctuaciones: se asignan **pesos mayores a los datos más recientes**.

$$WMA_n = \sum_{i=1}^{n} W_i\, D_i, \qquad \sum W_i = 1.00$$

donde $W_i$ es el peso del período $i$ (entre 0 y 100 %).

**Ejemplo (pronóstico de noviembre):**

| Mes | Peso | Demanda |
|---|:--:|:--:|
| Agosto | 17 % | 130 |
| Septiembre | 33 % | 110 |
| Octubre | 50 % | 90 |

$$WMA_3 = (0.17)(130) + (0.33)(110) + (0.50)(90) = 103.4$$

### 5.3. Alisado exponencial (*exponential smoothing*)

Método de **ponderación exponencial** que da mayor peso a los datos más recientes y reacciona a los cambios recientes.

$$F_{t+1} = \alpha D_t + (1-\alpha) F_t, \qquad 0 \le \alpha \le 1$$

donde $F_{t+1}$ = pronóstico del siguiente período, $D_t$ = demanda del período actual, $F_t$ = pronóstico previamente obtenido para el período actual, $\alpha$ = **constante de alisado** (peso dado al dato de demanda más reciente).

**Ventajas:** método muy usado, requiere pocos datos, su matemática es fácil de entender, tiene buen registro de éxito y es preciso. **Útil en series sin tendencia ni estacionalidad.**

**Efecto de la constante de alisado** $\alpha$:

- Con $\alpha = 0.2$: $F_{t+1} = 0.2\,D_t + 0.8\,F_t$ → el pronóstico se basa en un 20 % de la demanda reciente y un 80 % de la pasada.
- Con $\alpha = 0.0$: $F_{t+1} = F_t$ → **no refleja** los datos recientes.
- Con $\alpha = 1.0$: $F_{t+1} = D_t$ → basado **sólo** en el dato reciente.

> **Regla práctica:** $\alpha$ cercano a **1** → el pronóstico **reacciona rápido** a cambios recientes. $\alpha$ cercano a **0** → mayor **efecto de alisado**, reacción más lenta a las diferencias entre demanda y pronóstico.

**Ejemplo (con $\alpha = 0.3$ y $\alpha = 0.5$):**

| Per | Mes | Dem | Fcst ($\alpha=0.3$) | Fcst ($\alpha=0.5$) |
|:--:|---|:--:|:--:|:--:|
| 1 | Ene | 37 | 37.00 | 37.00 |
| 2 | Feb | 40 | 37.00 | 37.00 |
| 3 | Mar | 41 | 37.90 | 38.50 |
| 4 | Abr | 37 | 38.83 | 39.75 |
| 5 | May | 45 | 38.28 | 38.37 |
| 6 | Jun | 50 | 40.29 | 41.68 |
| 7 | Jul | 43 | 43.20 | 45.84 |
| 8 | Ago | 47 | 43.14 | 44.42 |
| 9 | Sep | 56 | 44.30 | 45.71 |
| 10 | Oct | 52 | 47.81 | 50.85 |
| 11 | Nov | 55 | 49.06 | 51.42 |
| 12 | Dic | 54 | 50.84 | 53.21 |
| 13 | **Ene** | — | **51.79** | **53.61** |

Cálculo de un par de términos (con $\alpha = 0.3$):

$$F_2 = (0.30)(37) + (0.70)(37) = 37.00$$
$$F_3 = (0.30)(40) + (0.70)(37) = 37.90$$
$$F_{13} = (0.30)(54) + (0.70)(50.84) = 51.79$$

> **Limitación observada:** el alisado exponencial **retrasa un período** los cambios o fluctuaciones de la demanda. Sobre una serie con tendencia (como la del ejemplo), **subestima** sistemáticamente: de ahí la necesidad del alisado exponencial ajustado.

### 5.4. Alisado exponencial ajustado (con factor de tendencia)

El método de alisado exponencial se **ajusta con un factor de ajuste de tendencia**, que refleja el peso dado al aumento o disminución entre el pronóstico actual ($F_{t+1}$) y el previo ($F_t$):

$$AF_{t+1} = F_{t+1} + T_{t+1}$$
$$F_{t+1} = \alpha D_t + (1-\alpha) F_t, \qquad 0 \le \alpha \le 1$$
$$T_{t+1} = \beta\,(F_{t+1} - F_t) + (1-\beta)\, T_t, \qquad 0 \le \beta \le 1$$

donde $\beta$ = constante de alisado de la **tendencia**, $T$ = factor de tendencia exponencialmente alisado, $T_t$ = factor de tendencia del último período.

**Ejemplo (con $\alpha = 0.5$, $\beta = 0.3$):**

| Per | Mes | Dem | $F_{t+1}$ | $T_{t+1}$ | $AF_{t+1}$ |
|:--:|---|:--:|:--:|:--:|:--:|
| 1 | Ene | 37 | 37.00 | — | — |
| 2 | Feb | 40 | 37.00 | 0.00 | 37.00 |
| 3 | Mar | 41 | 38.50 | 0.45 | 38.95 |
| 4 | Abr | 37 | 39.75 | 0.69 | 40.44 |
| 5 | May | 45 | 38.37 | 0.07 | 38.44 |
| 6 | Jun | 50 | 41.68 | 1.04 | 42.73 |
| 7 | Jul | 43 | 45.84 | 1.97 | 47.82 |
| 8 | Ago | 47 | 44.42 | 0.95 | 45.37 |
| 9 | Sep | 56 | 45.71 | 1.05 | 46.76 |
| 10 | Oct | 52 | 50.85 | 2.28 | 53.13 |
| 11 | Nov | 55 | 51.42 | 1.76 | 53.19 |
| 12 | Dic | 54 | 53.21 | 1.77 | 54.98 |
| 13 | **Ene** | — | **53.61** | **1.36** | **54.96** |

Cálculo de un par de términos:

$$T_3 = (0.30)(38.5 - 37.0) + (0.70)(0) = 0.45 \;\Rightarrow\; AF_3 = 38.5 + 0.45 = 38.95$$
$$T_{13} = (0.30)(53.61 - 53.21) + (0.70)(1.77) = 1.36 \;\Rightarrow\; AF_{13} = 53.61 + 1.36 = 54.96$$

### 5.5. Ajuste lineal de tendencia (*linear trend line*)

Es una **regresión lineal** que relaciona la demanda (variable dependiente, $y$) con el **tiempo** (variable independiente, $x$):

$$y_t = a + b\,x$$

- La variable $x$ corresponde a los **períodos** $t$.
- Permite **extrapolar** fácilmente a futuro una tendencia regular sustituyendo $t$ por $t+1, t+2, \dots$

Coeficientes por **mínimos cuadrados**:

$$b = \frac{\sum xy - n\,\bar{x}\,\bar{y}}{\sum x^2 - n\,\bar{x}^2}, \qquad a = \bar{y} - b\,\bar{x}$$

donde $\bar{x} = \dfrac{\sum x}{n}$, $\bar{y} = \dfrac{\sum y}{n}$, $a$ = ordenada al origen, $b$ = pendiente.

**Ejemplo:**

| $x$ | $y$ | $xy$ | $x^2$ |
|:--:|:--:|:--:|:--:|
| 1 | 37 | 37 | 1 |
| 2 | 40 | 80 | 4 |
| 3 | 41 | 123 | 9 |
| 4 | 37 | 148 | 16 |
| 5 | 45 | 225 | 25 |
| 6 | 50 | 300 | 36 |
| 7 | 43 | 301 | 49 |
| 8 | 47 | 376 | 64 |
| 9 | 56 | 504 | 81 |
| 10 | 52 | 520 | 100 |
| 11 | 55 | 605 | 121 |
| 12 | 54 | 648 | 144 |
| **Σ** | **557** | **3867** | **650** |

$$\bar{x} = \frac{78}{12} = 6.5 \qquad \bar{y} = \frac{557}{12} = 46.42$$
$$b = \frac{3867 - (12)(6.5)(46.42)}{650 - 12(6.5)^2} = 1.72 \qquad a = 46.42 - (1.72)(6.5) = 35.2$$
$$y = 35.2 + 1.72\,x \qquad\Rightarrow\qquad y_{13} = 35.2 + 1.72(13) = 57.56$$

> **Limitación:** el ajuste lineal de tendencia **asume que la tendencia observada será la misma en el futuro** → **no se ajusta** a los cambios recientes de tendencia.

### 5.6. Ajuste estacional

Un **patrón estacional** es un aumento/disminución repetitivo de la demanda (generalmente sobre base anual). El **método de ajuste estacional** aplica un **factor estacional** a un pronóstico para obtener un pronóstico **ajustado estacionalmente**.

**Factor estacional** — refleja la porción de la demanda anual asignada a la estación $i$:

$$S_i = \frac{D_i}{\sum D}, \qquad 0 \le S_i \le 1$$

**Procedimiento:** (1) calcular los factores estacionales $S_i$ de cada estación; (2) pronosticar el total del próximo período con un método de tendencia; (3) multiplicar ese total por cada $S_i$ para repartirlo entre las estaciones.

**Ejemplo (demanda trimestral, en miles de unidades):**

| Año | Trim 1 | Trim 2 | Trim 3 | Trim 4 | Total |
|---|:--:|:--:|:--:|:--:|:--:|
| 2006 | 12.6 | 8.6 | 6.3 | 17.5 | 45.0 |
| 2007 | 14.1 | 10.3 | 7.5 | 18.2 | 50.1 |
| 2008 | 15.3 | 10.6 | 8.1 | 19.6 | 53.6 |
| **Total** | **42.0** | **29.5** | **21.9** | **55.3** | **148.7** |
| **$S_i$** | **0.28** | **0.20** | **0.15** | **0.37** | |

Tendencia lineal anual: $y = 40.97 + 4.30\,x$. Pronóstico del año 4 (2009):

$$F_4 = 40.97 + 4.30(4) = 58.17$$

Reparto trimestral (pronóstico estacional $SF_i = S_i \cdot F_4$):

| | Trim 1 | Trim 2 | Trim 3 | Trim 4 |
|---|:--:|:--:|:--:|:--:|
| **2009** | 16.28 | 11.63 | 8.73 | 21.53 |

$$SF_1 = (0.28)(58.17) = 16.28 \qquad SF_2 = (0.20)(58.17) = 11.63$$
$$SF_3 = (0.15)(58.17) = 8.73 \qquad SF_4 = (0.37)(58.17) = 21.53$$

---

## 6. Exactitud del pronóstico

Es importante estimar también la **precisión** del pronóstico.

$$\text{Error de pronóstico} = \text{Real} - \text{Pronosticado} = D_t - F_t$$

> **Propósito:** encontrar un modelo que **minimice el error**.

**Medidas de error:**

### Desviación absoluta media — MAD (*Mean Absolute Deviation*)

$$MAD = \frac{\sum |D_t - F_t|}{n}$$

donde $t$ = período, $D_t$ = demanda real, $F_t$ = pronóstico, $n$ = número total de períodos.

**Ejemplo (alisado exponencial $\alpha = 0.3$):**

| Per | Mes | Dem | Fcst | Error | \|Error\| |
|:--:|---|:--:|:--:|:--:|:--:|
| 2 | Feb | 40 | 37.00 | 3.00 | 3.00 |
| 3 | Mar | 41 | 37.90 | 3.10 | 3.10 |
| 4 | Abr | 37 | 38.83 | −1.83 | 1.83 |
| 5 | May | 45 | 38.28 | 6.72 | 6.72 |
| 6 | Jun | 50 | 40.29 | 9.69 | 9.69 |
| 7 | Jul | 43 | 43.20 | −0.20 | 0.20 |
| 8 | Ago | 47 | 43.14 | 3.86 | 3.86 |
| 9 | Sep | 56 | 44.30 | 11.70 | 11.70 |
| 10 | Oct | 52 | 47.81 | 4.19 | 4.19 |
| 11 | Nov | 55 | 49.06 | 5.94 | 5.94 |
| 12 | Dic | 54 | 50.84 | 3.15 | 3.15 |
| | | | | **Σ = 49.31** | **Σ = 53.39** |

$$MAD = \frac{53.39}{11} \approx 4.85$$

### Otras medidas de error

**Desviación porcentual absoluta media — MAPD** (*Mean Absolute Percent Deviation*):

$$MAPD = \frac{\sum |D_t - F_t|}{\sum D_t}$$

**Error acumulado — E** (*Cumulative Error*):

$$E = \sum (D_t - F_t)$$

**Error promedio — Ē** (*Average Error*, o *bias*):

$$\bar{E} = \frac{\sum (D_t - F_t)}{n}$$

> Mientras MAD y MAPD miden la **magnitud** del error (siempre positivos), $E$ y $\bar{E}$ conservan el **signo** y por eso detectan **sesgo**: si son sistemáticamente positivos, el pronóstico subestima; si negativos, sobrestima.

### Comparación de pronósticos

Aplicando las medidas a los métodos del ejemplo, se obtiene una comparación que permite **elegir el método**:

| Método de pronóstico | MAD | MAPD | E | Ē |
|---|:--:|:--:|:--:|:--:|
| Alisado exponencial ($\alpha = 0.30$) | 4.85 | 9.6 % | 49.31 | 4.48 |
| Alisado exponencial ($\alpha = 0.50$) | 4.04 | 8.5 % | 33.21 | 3.02 |
| Alisado exponencial ajustado ($\alpha = 0.50,\ \beta = 0.30$) | 3.81 | 8.1 % | 21.14 | 1.92 |
| Ajuste lineal de tendencia | **2.29** | **4.9 %** | — | — |

> Para esta serie **con tendencia**, el **ajuste lineal de tendencia** es el más exacto (menor MAD y MAPD), seguido del alisado exponencial ajustado. Coherente con lo visto: el AE simple rezaga la tendencia.

---

## 7. Control de pronóstico (monitoreo y control)

Razones que pueden **dejar fuera de control** a los pronósticos: cambios de tendencia, eventos políticos, cambios climáticos, promociones, aparición de ciclos.

Las **técnicas de control de pronóstico** permiten determinar si el pronóstico está **consistentemente por debajo o por encima** de la demanda. Aplicaciones: evaluar métodos de pronóstico, indicar cambios en los patrones de la demanda y servir de monitoreo continuo.

### Tracking Signal (señal de rastreo)

Se calcula para cada período y se compara contra **límites de control**; el pronóstico está **en control** si la señal está dentro de los límites.

$$TS = \frac{\sum (D_t - F_t)}{MAD} = \frac{\text{Cum } E}{MAD}$$

Relación útil: $MAD \cong 0.8\,\sigma$. Se usan **límites de control de ±2 a ±5 MAD**.

**Ejemplo (alisado exponencial $\alpha = 0.3$):**

| Per | Dem | Fcst | Error | Cum. E | MAD | TS |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 2 | 40 | 37.00 | 3.00 | 3.00 | 3.00 | 1.00 |
| 3 | 41 | 37.90 | 3.10 | 6.10 | 3.05 | 2.00 |
| 4 | 37 | 38.83 | −1.83 | 4.27 | 2.64 | 1.62 |
| 5 | 45 | 38.28 | 6.72 | 10.99 | 3.66 | 3.00 |
| 6 | 50 | 40.29 | 9.69 | 20.68 | 4.87 | 4.25 |
| 7 | 43 | 43.20 | −0.20 | 20.48 | 4.09 | 5.01 |
| 8 | 47 | 43.14 | 3.86 | 24.34 | 4.06 | 6.00 |
| 9 | 56 | 44.30 | 11.70 | 36.04 | 5.01 | 7.19 |
| 10 | 52 | 47.81 | 4.19 | 40.23 | 4.92 | 8.17 |
| 11 | 55 | 49.06 | 5.94 | 46.17 | 5.02 | 9.19 |
| 12 | 54 | 50.84 | 3.15 | 49.32 | 4.85 | 10.16 |

> La TS del AE ($\alpha = 0.3$) **crece sostenidamente** (llega a >10): el pronóstico se sale de control porque subestima de forma sistemática (sesgo positivo), confirmando que no captura la tendencia. Una TS que oscila en torno a 0 indica un método en control.

### Monitoreo con gráficos de control estadísticos

Los errores de pronóstico también se monitorean con **gráficos de control** (igual que en control de calidad), usando como límites $\pm 3\sigma$ (UCL/LCL) y la base de la **distribución normal** (≈95 % dentro de ±2σ; ≈99.74 % dentro de ±3σ).

$$\sigma = \sqrt{\frac{\sum (D_t - F_t)^2}{n-1}}$$

Por ejemplo, con $\sum (D_t - F_t)^2 = 375.68$ y $n-1 = 10$: $\sigma = \sqrt{375.68/10} = 6.12$, lo que da límites $UCL = +3\sigma = 18.39$ y $LCL = -3\sigma = -18.39$. Si todos los errores caen dentro de la banda, el proceso de pronóstico está bajo control estadístico.

---

## 8. Modelos de relaciones entre variables (métodos causales)

A diferencia de las series de tiempo (donde el factor explicativo es el **tiempo**), los **métodos causales / de regresión** estudian la relación entre **dos o más variables**: variables **dependientes**, cuyo valor depende del valor de otras variables **independientes**.

### 8.1. Regresión lineal (simple)

$$y = a + b\,x$$

donde $a$ = ordenada al origen, $b$ = pendiente, $x$ = variable **independiente**, $y$ = demanda. Los coeficientes se obtienen por mínimos cuadrados con las **mismas fórmulas** que el ajuste lineal de tendencia (la diferencia es que ahora $x$ es una variable causal cualquiera, no el tiempo):

$$b = \frac{\sum xy - n\,\bar{x}\,\bar{y}}{\sum x^2 - n\,\bar{x}^2}, \qquad a = \bar{y} - b\,\bar{x}$$

**Ejemplo (ingresos de un club de fútbol):**

- $y$ = Ingresos (en miles de pesos); $x$ = Victorias en el campeonato.

| $x$ (victorias) | 4 | 6 | 6 | 8 | 6 | 7 | 5 | 7 |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| $y$ (ingresos) | 36.3 | 40.1 | 41.2 | 53.0 | 44.0 | 45.6 | 39.0 | 47.5 |

Modelo resultante: $y = 18.46 + 4.06\,x$. Permite pronosticar el nivel de ingresos del próximo año según las victorias esperadas.

### 8.2. Coeficiente de correlación y coeficiente de determinación

**Coeficiente de correlación, $r$** — mide la relación **lineal** entre variables:

$$r = \frac{n\sum xy - \sum x \sum y}{\sqrt{\left[\,n\sum x^2 - (\sum x)^2\,\right]\left[\,n\sum y^2 - (\sum y)^2\,\right]}}$$

- Relación lineal **fuerte**: valores cercanos a $-1.00$ o a $+1.00$.
- $r = 1$ → un incremento en la variable independiente produce un incremento lineal en la dependiente.
- $r = -1$ → un incremento en la independiente produce una disminución lineal en la dependiente.
- $r = 0$ → **no existe relación** entre las variables.

**Coeficiente de determinación, $r^2$** — porcentaje de la variación en la variable dependiente debido a la variación de la independiente.

En el ejemplo del club: $r = 0.947$ → **fuerte relación** entre $x$ e $y$; $r^2 = (0.947)^2 = 0.897$ → un **89.7 %** de los ingresos del club puede atribuirse al número de victorias (el 10.3 % restante se debe a otras variables no consideradas).

### 8.3. Regresión múltiple

Establece una relación causal de la demanda con **dos o más** variables independientes:

$$y = b_0 + b_1 x_1 + b_2 x_2 + \dots + b_k x_k$$

donde $b_0$ = ordenada al origen, $b_1, \dots, b_k$ = coeficientes de las variables independientes, $x_1, \dots, x_k$ = variables independientes (exógenas o explicativas).

**Cálculo de los coeficientes:** a partir de $n$ datos de cada variable explicativa, se calculan los $b_k$ que **minimizan la suma de los errores al cuadrado** (mínimos cuadrados):

$$\min_{b_k} \sum_{t=1}^{n} e_t^2 = \sum_{t=1}^{n} \left(y_t - b_0 - b_1 x_{1t} - \dots - b_k x_{kt}\right)^2$$

**Ejemplo (ganancias de un producto):**

- $y$ = Ganancias (en miles de pesos); $x_1$ = N.º de vendedores; $x_2$ = Precio del producto.

| Año | N.º Vendedores | Precio Producto | Ganancias (miles) |
|:--:|:--:|:--:|:--:|
| 1 | 24 | 95 | 120 |
| 2 | 25 | 93 | 150 |
| 3 | 25 | 92 | 20 |
| 4 | 28 | 90 | 350 |
| 5 | 27 | 87 | 410 |
| 6 | 29 | 86 | 560 |

Resultados: coeficiente de correlación = 0.986; coeficiente de determinación = 0.972. Modelo:

$$y = 36.14\,x_1 - 29.18\,x_2 + 1987.54$$
$$y_{(x_1=30,\ x_2=85)} = 591.35 \;\Rightarrow\; \$591\,350$$

### 8.4. Modelos econométricos

Cuantifican relaciones entre variables en base a las **leyes económicas** que las sustentan:

- **Modelos uniecuacionales:**
  - Regresión múltiple **estática**: $\;y_t = b_0 + b_1 x_{1t} + \dots + b_k x_{kt}$
  - Regresión múltiple **dinámica** (incorpora rezagos): $\;y_t = b_0 + b_1 x_{1t} + b_2 x_{1t-1} + \dots + \gamma_1 x_{kt} + \gamma_2 x_{kt-1} + \dots$
- **Modelos multiecuacionales:** sistemas de varias ecuaciones interrelacionadas, p. ej. $\;y_t = y_{1t} + y_{2t}\;$ con $\;y_{1t} = b_0 + b_1 x_{1t} + b_2 x_{2t}\;$ y $\;y_{2t} = \gamma_0 + \gamma_1 x_{3t} + \gamma_2 x_{4t}$.

---

## 9. Implementación de los métodos en sistemas de soporte de pronósticos

Aspectos a evaluar al implementar un método en un **sistema de gestión de pronósticos** (clave en una carrera de Sistemas: el método "elegible" no es sólo el más exacto, sino el más implementable a escala):

- **A. Volumen de datos históricos requeridos.** Implicancias en almacenamiento, mantenimiento, confiabilidad y seguridad de datos. ¿Existen los datos o pueden obtenerse?
- **B. Rapidez del método.** Crítica cuando hay que generar pronósticos mensuales, semanales o diarios de **varios miles de artículos**.
- **C. Complejidad del método.** ¿Se requieren funciones complejas? ¿Hay que integrar al sistema un paquete de software matemático?
- **D. Cantidad de parámetros (factores) a definir.** Implicancias del soporte para definirlos. ¿Es posible **automatizar** su definición?

---

## 10. Ejercicios (de la presentación)

**Ejercicio 1.** Una empresa *retailer* debe hacer **cada semana** el pronóstico de la próxima semana para **5000 códigos** de productos, observándose un **patrón de tendencia** en las últimas 16 semanas para todos ellos. ¿Cuál de estos métodos es más apropiado para implementar en un sistema de gestión de pronósticos?
- Medias móviles · Alisado exponencial ajustado · Tendencia lineal · Regresión lineal.

*(Pistas para resolver: hay tendencia → descartar medias móviles simples; alto volumen y alta frecuencia → priorizar rapidez, pocos datos y pocos parámetros automatizables, ver §9.)*

**Ejercicio 2.** Una empresa de producción debe realizar y revisar **cada seis meses** el pronóstico **anual** de ventas en unidades de sus **20 productos** principales. ¿Cuál de estos métodos es más apropiado, si se tienen los **últimos 10 años** de ventas? ¿Y si sólo se tuvieran los **últimos 4 años**?
- Medias móviles · Alisado exponencial ajustado · Ajuste estacional · Regresión lineal.

*(Pista: la cantidad de datos históricos disponibles —10 años vs. 4 años— condiciona qué método es viable, especialmente para capturar estacionalidad.)*

> Las **soluciones detalladas** de estos y otros casos de estudio de la unidad se incorporarán como apunte(s) complementario(s) cuando se adjunten.

---

## 11. Métodos cualitativos

**Base:** experiencia, opinión o juicio de individuos o grupos clave. **Uso típico:** procesos de **planificación estratégica de largo plazo** (donde no hay datos históricos suficientes, p. ej. productos o mercados nuevos).

**Grupos clave** que aportan el juicio:

- **Management:** conoce recursos y mercados.
- **Ventas:** conoce las expectativas de los clientes.
- **Ingeniería:** conoce tecnología y productos factibles.
- **Marketing:** conoce productos y servicios requeridos.

**Métodos cualitativos más usados:**

### 1. Encuestas

Captan información de los consumidores/mercado, que luego se usa como **variable explicativa** de modelos:

- **Intención** (de compra de bienes, de equipos…): horizonte reducido; la compra puede aplazarse o anularse; la "presentación" puede inducir la intención.
- **Expectativas:** ¿cree que la producción / el costo / etc. mejorará, se mantendrá o desmejorará?
- **Actitudes:** valoración de individuos o instituciones sobre sucesos del entorno (economía, desempleo, …).

### 2. Diseño de experimentos

Mediante una **prueba piloto** (costosa; con desfase de efectos por su duración y problemas de representatividad de la muestra) se estima un modelo del tipo:

$$Y_i = C_0 + C_1 X_{1i} + \dots + C_K X_{Ki} + e_i$$

donde $y$ = variable experimental, $i$ = número de experiencias, $k$ = "tratamiento" de la experimentación. Ejemplo: $V_i = C_0 + C_1 PR_i + C_2 PU_i + e_i,\ i = 1,\dots,6$.

### 3. Simulación en base a modelos

Modelos **multiecuacionales** (p. ej. de **Forrester**) que combinan:

- **Identidades:** $Y_1 = Y_2$; $\;Y = X_1 + X_2 + \dots + X_K$ (suma, producto, división).
- **Ecuaciones de evolución temporal:** $y = a + b\,t$; $\;y = a\,t^{b}$ ($t$ = variable explicativa).
- **Ecuaciones autorregresivas:** $y = c_0 + c_1 y_{-1} + \dots + c_K y_{-K}$.
- **Relaciones causales:** $y = a + b\,x$.

### 4. Delphi (Delfos) e impactos cruzados

Técnica de **encuesta a expertos**:

- Selección de **10 a 30 expertos**.
- **Anonimato** de las respuestas.
- **Retroalimentación controlada** (rondas sucesivas).
- Respuestas **cuantitativas**: valor, probabilidad.
- **Respuesta estadística de grupo** (se sintetiza la opinión grupal).
- **Variantes:** teleconferencia, autoevaluación, valoraciones cualitativas, **impacto cruzado**.

---

## Síntesis del apunte

El pronóstico de demanda es una **predicción bajo incertidumbre** que combina **números y juicio**, y es insumo crítico tanto del **diseño estratégico** de la cadena de suministro (largo plazo) como de la **planificación operativa** de inventarios, producción, distribución y compras (corto/mediano plazo). Un pronóstico más preciso reduce la incertidumbre y el costo de stocks excesivos o de faltantes.

El **proceso** de pronóstico es iterativo: identificar objetivo y datos → reconocer patrones → elegir método → calcular sobre el histórico → **evaluar el error** → ajustar/cambiar hasta lograr exactitud aceptable → pronosticar el futuro → ajustar con juicio cualitativo → monitorear.

El corazón de la unidad es el **catálogo de métodos**:

- **Cuantitativos · series de tiempo** (el tiempo explica la demanda): **medias móviles** y su versión **ponderada**; **alisado exponencial** y su versión **ajustada por tendencia**; **ajuste lineal de tendencia**; **ajuste estacional**. Conviene elegir según los **patrones** presentes (estable → MA/AE; con tendencia → AE ajustado o tendencia lineal; con estacionalidad → ajuste estacional).
- **Cuantitativos · causales** (otras variables explican la demanda): **regresión lineal** simple, con su **correlación $r$** y **determinación $r^2$**; **regresión múltiple**; y **modelos econométricos** (uni/multiecuacionales).
- **Cualitativos** (juicio experto, para largo plazo o sin histórico): **encuestas**, **diseño de experimentos**, **simulación en base a modelos** y **Delphi/impactos cruzados**.

La elección de método se valida con **medidas de error** (MAD, MAPD, E, Ē) y se vigila en el tiempo con técnicas de **control** (*tracking signal*, gráficos de control estadísticos). Finalmente, en un sistema de gestión, la elección no depende sólo de la exactitud sino también de la **implementabilidad** del método (volumen de datos, rapidez, complejidad y cantidad de parámetros), aspecto especialmente relevante cuando hay que pronosticar miles de artículos con alta frecuencia.
