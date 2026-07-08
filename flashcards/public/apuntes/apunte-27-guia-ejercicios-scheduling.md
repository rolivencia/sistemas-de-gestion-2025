---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 27
unidad: 8
titulo_unidad: Programación de la Producción (Scheduling)
temas_del_plan:
  - Reglas de secuenciamiento.
  - Diagrama de Gantt.
  - Tipos de procesos de producción (flow shop, job shop).
  - Manufactura sincrónica (OPT).
  - Métodos heurísticos, algoritmos genéticos.
  - Objetivos en scheduling.
presentacion_fuente: "Unidad_8_-_07_-_Guía_de_ejercicios.pdf"
anio: 2025
---

# Apunte 27 — Guía de ejercicios (Scheduling)

> **Unidad 8 — Programación de la Producción (Scheduling).** Cuatro ejercicios de práctica que reproducen las cuatro técnicas de la unidad: **Ej. 1** Flow Shop con políticas de almacenamiento; **Ej. 2** Job Shop con regla de menor fecha de entrega; **Ej. 3** Job Shop por OPT vs. regla; **Ej. 4** algoritmo genético sobre Flow Shop sin almacén. La **cátedra no publicó soluciones** de esta guía: este apunte **transcribe los enunciados, marca las variaciones respecto de los casos resueltos** (Apunte 26) y **anota el método**, sin fabricar la clave numérica (mismo criterio que los Apuntes 10, 13, 18, 21 y 24).

> **Cómo usarlo.** Cada ejercicio remite al caso resuelto análogo del **Apunte 26**, donde la mecánica está desarrollada y verificada. Los **Ejercicios 3 y 4** son **prácticamente idénticos** a los Casos 3 y 4 (el Ej. 4 solo pide más iteraciones), así que sirven de **autoevaluación**: se puede resolver y contrastar contra la solución de cátedra del caso. La teoría de respaldo está en el Apunte 25.

---

## Ejercicio 1 — Flow Shop (tres políticas)

**Sistema:** Flow Shop, **permutativo**, estrategia de **despacho**, regla **menor tiempo total de producción**. **Objetivos:** tardanza promedio y tardanza máxima.

**Datos:**

| Orden | CT1 (u) | CT2 (u) | CT3 (u) | Unidades | Fecha entrega | **T. proc. total** |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| O1 | 4 | 3 | 1 | 2 | 20 | $8\times2=16$ |
| O2 | 2 | 2 | 2 | 3 | 21 | $6\times3=18$ |
| O3 | 3 | 1 | 4 | 2 | 16 | $8\times2=16$ |
| O4 | 2 | 3 | 1 | 2 | 28 | $6\times2=12$ |

- **Arribos:** O1≥2, O2≥3, O3≥3, O4≥2. **Recursos:** $R_1$≥3, $R_2$≥5, $R_3$≥1.
- **Políticas a aplicar:** **A)** sin almacén (lote transporte = 1); **B)** almacén, lote transporte = 1; **C)** almacén, lote transporte = lote de producción.

**Método (ver Caso 1, Apunte 26 §1).** Calcular el tiempo total y **secuenciar** de menor a mayor: $O4\ (12)$, luego $O1\ (16)$ y $O3\ (16)$ **empatan** (el enunciado no fija desempate; conviene declarar el criterio adoptado, p. ej. por fecha de entrega → O3 antes que O1), y por último $O2\ (18)$. Con la secuencia fija, armar el **Gantt por cada política** respetando arribos y disponibilidad de recursos, y evaluar **tardanza promedio y máxima**. Recordar la lectura del Caso 1: el **lote de transporte = 1 con almacén** suele dar el **menor *makespan*** (más solapamiento), mientras que **sin almacén** aparecen **bloqueos (B)**.

> **Diferencias respecto del Caso 1:** datos y arribos distintos, y solo **tres** políticas (A/B/C, sin ZW ni mixta). Notar además que aquí la **política A es "sin almacén"** (en el Caso 1, A era "almacén con lote = lote de producción"): conviene no copiar etiquetas de memoria.

---

## Ejercicio 2 — Job Shop

**Sistema:** Job Shop, **no permutativo**, estrategia de **despacho**, regla **menor fecha de entrega primero**. **Objetivo:** tardanza total.

**Datos y rutas:**

| Orden | CT1 | CT2 | CT3 | Fecha entrega | Ruta |
|:--:|:--:|:--:|:--:|:--:|:--:|
| O1 | 3 | 1 | 3 | 12 | CT1 → CT3 → CT2 |
| O2 | 2 | 5 | 4 | 15 | CT2 → CT1 → CT3 |
| O3 | 4 | 3 | 2 | 9 | CT2 → CT3 → CT1 |

- **Almacén** intermedio infinito; **arribos** todos en $t=0$; **disponibilidad de recursos:** **todos en $t=0$**.

**Método (ver Caso 2, Apunte 26 §2).** Secuenciar por **menor fecha de entrega**: $O3\ (9) \to O1\ (12) \to O2\ (15)$, y armar el Gantt por rutas reaplicando la regla en cada conflicto de recurso; evaluar **tardanza total**.

> **Diferencias respecto del Caso 2:** los **datos y rutas son los mismos**, pero aquí **todos los recursos están disponibles en $t=0$** (en el Caso 2 era $R_1$≥1, $R_2$≥3, $R_3$≥2) y la estrategia es de **despacho** (en el Caso 2, de **intervalo**). Por lo tanto el cronograma y las terminaciones **cambian**: es un buen ejercicio para ver el **efecto de la disponibilidad de recursos** sobre el resultado.

---

## Ejercicio 3 — Job Shop: OPT vs. regla

**Sistema:** Job Shop, **no permutativo**, **lote de transferencia = 1**, almacén infinito. **Objetivos:** *makespan*, tardanza total y tardanza máxima.

**Datos** (2 unidades por orden):

| Orden | $R_1$ (t, orden) | $R_2$ (t, orden) | $R_3$ (t, orden) | Fecha entrega |
|:--:|:--:|:--:|:--:|:--:|
| O1 | 5 (1.º) | 1 (3.º) | 4 (2.º) | 15 |
| O2 | — | 2 (1.º) | 5 (2.º) | 25 |
| O3 | 4 (1.º) | 1 (3.º) | 2 (2.º) | 10 |
| O4 | 1 (2.º) | 2 (1.º) | — | 14 |

- **a)** Método **OPT** (CT cuello de botella). **b)** Despacho con regla **menor fecha de entrega**.

**Método (ver Caso 3, Apunte 26 §3).** **a)** Sumar tiempos por recurso → CB $= R_3\ (11)$; secuenciar en el CB por $LT \le TP$ → $O2 \to O3 \to O1$; programar forward el CB y backward el resto. **b)** Secuencia EDD $O3 \to O4 \to O1 \to O2$. Comparar *makespan*: el OPT debería resultar **menor** que el despacho.

> **Este ejercicio es idéntico al Caso 3** (mismos datos y consignas). Sirve de **autoevaluación**: resolverlo y contrastar contra `recursos-scheduling/solucion-caso-3.xlsx`. Al hacerlo, tener presente la **anomalía de promediado** anotada en el Apunte 26 §3 (los promedios impresos de la hoja OPT no se reproducen con tardanza $=\max(0,\cdot)$); lo robusto a comparar es el ***makespan*** (OPT 30 vs regla 40).

---

## Ejercicio 4 — Algoritmo Genético (Flow Shop sin almacén)

**Sistema:** Flow Shop de 2 máquinas, **sin almacenamiento intermedio**. **Objetivo (fitness):** **tardanza media**.

**Datos:**

| Orden | $R_1$ | $R_2$ | Fecha entrega |
|:--:|:--:|:--:|:--:|
| O1 | 2 | 3 | 10 |
| O2 | 1 | 4 | 9 |
| O3 | 4 | 2 | 12 |
| O4 | 2 | 1 | 15 |

- **Población inicial (2 individuos):** $(4\,1\,2\,3)$ y $(3\,4\,2\,1)$. **Operador:** intercambio de **pares adyacentes**. **5 iteraciones.**

**Método (ver Caso 4, Apunte 26 §4).** Evaluar la **tardanza media** de cada individuo (recordando el **bloqueo** del flow shop sin buffer), seleccionar el **padre** (mejor fitness), generar un **hijo** por swap adyacente, y repetir. El Caso 4 hace **3** iteraciones y llega a fitness **0.25**; aquí se piden **5**, así que se continúa la evolución dos generaciones más (probando otros pares adyacentes a intercambiar) y se observa si el fitness **mejora o se estabiliza**.

> **Diferencia respecto del Caso 4:** mismos datos y población inicial; solo cambia el **número de iteraciones (5 en vez de 3)**. Es la extensión natural del caso resuelto.

---

## Nota de cobertura

La cátedra **no entregó soluciones** de esta guía. Los Ejercicios **1 y 2** son **variantes** de los Casos 1 y 2 (cambian datos, arribos, disponibilidad de recursos o estrategia), y los Ejercicios **3 y 4** **coinciden** con los Casos 3 y 4 (el 4 pide más iteraciones). Para la mecánica resuelta y verificada, ver el **Apunte 26**; para la teoría, el **Apunte 25**.
