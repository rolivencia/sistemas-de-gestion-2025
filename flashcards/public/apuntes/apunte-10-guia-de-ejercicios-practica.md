---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 10
unidad: 3
titulo_unidad: Pronósticos de Demanda
temas_del_plan:
  - "Métodos de análisis individual de series temporales: medias móviles, alisado exponencial, alisado exponencial ajustado, ajuste lineal de tendencia, ajuste estacional."
  - Precisión del pronóstico y medidas de errores. Control de pronósticos.
  - Métodos causales. Método de regresión lineal. Correlación y coeficientes de determinación. Métodos de regresión múltiple.
presentacion_fuente: "Unidad_3_-_08_-_Guía_de_ejercicios_de_pronósticos_de_demanda.pdf"
anio: 2025
---

# Apunte 10 — Guía de ejercicios de práctica (Pronósticos de Demanda)

> **Unidad 3 — Pronósticos de Demanda.** Banco de **11 ejercicios** de práctica de la cátedra para ejercitar la selección y aplicación de métodos de pronóstico. Este apunte **transcribe los enunciados y sus datos** y, para cada uno, señala **qué método(s) ejercita y el enfoque sugerido**, de modo de poder resolverlos con la `plantilla-modelos-pronosticos.xlsx`. La cátedra **no** publicó soluciones numéricas de esta guía; las indicaciones de enfoque son orientativas y se apoyan en el [[apunte-7-pronosticos-de-demanda|Apunte 7]], el [[apunte-8-comparacion-modelos-pronostico|Apunte 8]] y los [[apunte-9-casos-de-estudio-resueltos|casos resueltos del Apunte 9]].

**Recurso asociado:** `recursos-pronosticos/plantilla-modelos-pronosticos.xlsx`.

> **Recordatorio de método de trabajo (siempre el mismo):** graficar → identificar patrón → elegir candidatos según el [[apunte-8-comparacion-modelos-pronostico|Apunte 8]] → calcular sobre el histórico → comparar con MAD/MAPD → verificar *tracking signal*.

---

## Ejercicio 1 — Distribución de cemento

Pronóstico de demanda de bolsas de cemento para enero del próximo año.

| Mes | Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct | Nov | Dic |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Demanda | 990 | 875 | 830 | 910 | 855 | 760 | 690 | 730 | 690 | 670 | 680 | 630 |

Consignas: a) determinar el comportamiento; b) seleccionar **al menos dos métodos** adecuados; c) determinar y justificar cuál ajusta mejor; d) monitorear (¿bajo control?).

**Enfoque:** demanda con **tendencia decreciente** y bastante ruido. Candidatos: alisado exponencial ajustado y tendencia lineal (capturan tendencia); contrastar contra medias móviles/alisado simple para evidenciar el rezago. Comparar MAD/MAPD y *tracking signal*.

---

## Ejercicio 2 — Distribución de gaseosas

Proyección de la demanda para **enero del año 3**, con 24 meses de historia (2 años).

| Año 1 | Ene 8500 · Feb 8000 · Mar 7600 · Abr 7100 · May 6900 · Jun 6200 · Jul 5600 · Ago 4600 · Sep 3600 · Oct 3700 · Nov 3500 · Dic 3900 |
|---|---|
| **Año 2** | Ene 4200 · Feb 4500 · Mar 5300 · Abr 5100 · May 6300 · Jun 7800 · Jul 7500 · Ago 8900 · Sep 9000 · Oct 10000 · Nov 12000 · Dic 15000 |

Consigna: obtener el pronóstico eligiendo el modelo más conveniente y **justificar**.

**Enfoque:** la serie **cae** durante el año 1 y **sube** fuertemente en el año 2 (forma de "V") ⇒ hay un **cambio de tendencia**. Es un buen caso para **alisado exponencial ajustado** (reacciona a cambios de tendencia), discutiendo por qué la tendencia lineal global o las medias móviles fallarían aquí.

---

## Ejercicio 3 — Heladeras con freezer (vs. pronóstico del gerente)

Pronóstico de **noviembre** para la familia "heladeras con freezer". Se da, además, el pronóstico que venía haciendo el **gerente de marketing**.

| Mes | Ene | Feb | Mar | Abr | May | Jun | Jul | Ago | Sep | Oct |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Demanda | 310 | 300 | 290 | 330 | 380 | 370 | 390 | 430 | 410 | 460 |
| Pronóstico gerente | 300 | 290 | 310 | 280 | 340 | 390 | 370 | 400 | 450 | 420 |

Consigna: pronosticar con **al menos dos métodos**, justificar; **comparar** el método elegido con el del gerente (¿cuál más preciso?).

**Enfoque:** demanda con **tendencia** creciente ⇒ tendencia lineal / alisado exponencial ajustado. La clave es calcular el **error (MAD/MAPD)** del pronóstico del gerente sobre los 10 meses y compararlo contra el del método propio.

---

## Ejercicio 4 — Infoworks (computadoras)

| Mes | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Ventas (u.) | 1360 | 1277 | 1310 | 1123 | 1308 | 1017 | 1364 | 1084 | 1308 | 1045 |

Consignas: a) pronóstico del mes 11 **sin** usar tendencia lineal; b) **con** tendencia lineal; comparar y decir cuál es mejor.

**Enfoque:** serie **sin tendencia clara** (oscila alrededor de un nivel, con variación irregular). Es el caso "inverso" al del Caso 1: aquí se espera que **medias móviles / alisado exponencial** (parte a) ajusten **mejor** que la tendencia lineal (parte b), porque no hay tendencia real que extrapolar. Buen ejercicio para mostrar que "tendencia lineal" no siempre es la mejor opción.

---

## Ejercicio 5 — Aceros del Sur (estacional mensual, multi-año)

Demanda mensual de piezas de acero (2021–2024, últimos meses de 2024 parciales). Se pide el pronóstico **mensual** de mayo y junio 2024 y el pronóstico de **cada cuatrimestre** del período mayo 2024–abril 2025.

| Año | ENE | FEB | MAR | ABR | MAY | JUN | JUL | AGO | SEP | OCT | NOV | DIC |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 2021 | 1433 | 1310 | 1190 | 775 | 1128 | 1120 | 1615 | 1920 | 1963 | 2314 | 2527 | 2620 |
| 2022 | 1652 | 1401 | 1303 | 865 | 1104 | 1156 | 1928 | 2067 | 2039 | 2660 | 2522 | 2841 |
| 2023 | 2352 | 1451 | 1360 | 909 | 738 | 1006 | 1477 | 1705 | 1600 | 2154 | 2062 | 2353 |
| 2024 | 1813 | 1655 | 1254 | 766 | — | — | — | — | — | — | — | — |

**Enfoque:** patrón **estacional mensual** marcado (valle en abril, picos hacia fin de año) con tendencia ⇒ **ajuste estacional** (factores estacionales mensuales × pronóstico de tendencia), y agregación a cuatrimestres para la segunda parte.

---

## Ejercicio 6 — Bazar del Boulevard (parlantes bluetooth + celulares)

Demanda mensual de parlantes bluetooth (2021–2024 parcial) y demanda **anual** de celulares. Se pide el pronóstico del **cuatrimestre abr'24–jul'24** y determinar si las ventas anuales de celulares **explican** las de parlantes.

| Año | ENE | FEB | MAR | ABR | MAY | JUN | JUL | AGO | SEP | OCT | NOV | DIC |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 2021 | 115 | 130 | 110 | 75 | 95 | 115 | 161 | 190 | 195 | 230 | 245 | 260 |
| 2022 | 165 | 140 | 130 | 90 | 110 | 125 | 182 | 210 | 220 | 270 | 260 | 290 |
| 2023 | 195 | 160 | 150 | 70 | 85 | 100 | 137 | 170 | 190 | 215 | 225 | 235 |
| 2024 | 130 | 135 | 110 | — | — | — | — | — | — | — | — | — |

Celulares (anual): abr'21–mar'22 = 4200 · abr'22–mar'23 = 5400 · abr'23–mar'24 = 6600.

**Enfoque:** combina **regresión causal** (parlantes anuales ~ celulares anuales: verificar $r$, $r^2$) para estimar el total anual, con **ajuste estacional** para repartirlo en el cuatrimestre pedido. Ejercicio de integración causal + estacional.

---

## Ejercicio 7 — Heladería (kg de helado por día)

Demanda diaria (martes a domingo) de la sucursal A, últimas 3 semanas. Se pide el pronóstico **por día** de la próxima semana y un ajuste si hay mal tiempo.

| Semana | Mar | Mié | Jue | Vie | Sáb | Dom |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| 1 | 19 | 35 | 52 | 68 | 82 | 68 |
| 2 | 23 | 36 | 55 | 69 | 87 | 71 |
| 3 | 20 | 32 | 54 | 63 | 86 | 75 |

Consignas: a) pronóstico de cada día; b) si el pronóstico del tiempo indica lluvia (vie/sáb/dom), la demanda de esos días **baja 40 %**.

**Enfoque:** patrón **"estacional" intra-semana** (cada día tiene su nivel típico). Se trabaja por día (promedio/tendencia por día de la semana) y luego se aplica el factor de ajuste (×0.60) a viernes, sábado y domingo.

---

## Ejercicio 8 — Mundi (TV FHD 40" + promociones)

Ventas semanales y **promociones** ponderadas (Alto = 3, Mediano = 2, Bajo = 1).

| Semana | −5 | −4 | −3 | −2 | −1 (última) |
|---|:--:|:--:|:--:|:--:|:--:|
| Demanda | 125 | 245 | 520 | 440 | 780 |
| Promoción (peso) | 1 | 2 | 3 | 2 | 3 |
| Pronóstico de Marketing | 150 | 269 | 438 | 527 | 668 |

Consignas: a) ¿las promociones **explican** las ventas?; b) ¿el modelo de Marketing es más preciso que uno que considere las promociones?; c) pronóstico de la próxima semana con promo **Alto impacto** (=3); d) reparto intra-semana con patrón "estacional" (Lun-Mar 26 %, Mié-Jue 34 %, Vie-Sáb 40 %): obtener el de **Viernes-Sábado**.

**Enfoque:** **regresión** ventas ~ peso de promoción ($r$, $r^2$); comparar el **error** del modelo de Marketing contra el modelo de regresión; usar la regresión para el pronóstico con promo = 3; y aplicar el **factor estacional** intra-semana (×0.40 para Vie-Sáb).

---

## Ejercicio 9 — Wall-Store & Cokee-Cola (pronóstico colaborativo)

Alianza colaborativa (CPFR): ambas empresas deben acordar un **pronóstico común** para el "año 6", anual y por trimestre, de gaseosas en botella. Wall-Store propone un modelo basado en su **Plan de Publicidad (PP)** anual; Cokee-Cola, uno basado en el **Índice de Confianza del Consumidor (ICC)** anual. Para el año 6 se estima PP = $65.000 e ICC = 35,4.

| Año | T1 | T2 | T3 | T4 | PP anual ($) | ICC anual |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 1 | 348 | 246 | 126 | 85 | 49000 | 53,1 |
| 2 | 493 | 345 | 181 | 124 | 50000 | 52,7 |
| 3 | 696 | 496 | 256 | 173 | 55000 | 47,1 |
| 4 | 1001 | 705 | 365 | 250 | 61000 | 27,1 |
| 5 | 139 | 137 | 89 | 61 | 39000 | 53,9 |

Modelos propuestos: Wall-Store → Demanda = 0,086·PP − 3165,96 · Cokee-Cola → Demanda = −58,88·ICC + 4020,66.

Consignas: a) cuál modelo **explica mejor** la demanda; b) pronóstico **trimestral y anual** del año 6 con el modelo elegido; c) ¿pueden **combinarse** ambas variables en un único modelo?

**Enfoque:** comparar dos **regresiones lineales simples** (demanda anual ~ PP vs. demanda anual ~ ICC) por $r^2$ y control; con el modelo ganador estimar el anual y repartirlo con **ajuste estacional**; la parte c) abre la puerta a la **regresión múltiple** (PP + ICC). Vincula con la Unidad 9 (procesos colaborativos / CPFR).

---

## Ejercicio 10 — Pincelap (proceso de pronóstico multi-departamento)

Pronóstico anual de pinturas sintéticas para interiores, siguiendo un **proceso** entre departamentos: Ventas (sólo histórico) → Marketing (agrega **publicidad**) → Gerencia (agrega **precio**).

| Año | Ventas (u.) | Publicidad (miles $) | Precio (miles $/u.) |
|:--:|:--:|:--:|:--:|
| 1 | 3189 | 3530 | 55 |
| 2 | 3987 | 7500 | 53 |
| 3 | 4761 | 9100 | 53 |
| 4 | 5624 | 10000 | 50 |
| 5 | 5033 | 12000 | 49 |
| 6 | 6558 | 16500 | 51 |

Próximo año: publicidad = $18.500 (miles), precio = $50 (miles)/u.

Consignas: a) ejecutar el proceso y determinar el pronóstico a enviar a Producción; b) como consultor, evaluar si el **proceso** de pronóstico es adecuado.

**Enfoque:** encadena **tendencia lineal** (Ventas) vs **regresión simple** (ventas ~ publicidad) → elegir el más preciso y **bajo control** → **regresión múltiple** (ventas ~ publicidad + precio) para el pronóstico final. Es el ejercicio que integra todo el **proceso de pronóstico** del [[apunte-7-pronosticos-de-demanda|Apunte 7]].

---

## Ejercicio 11 — Baterías Mordoni (baterías ↔ asistencias)

| Mes | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Ventas baterías (u.) | 880 | 1033 | 1110 | 1323 | 1208 | 917 | 1462 | 984 | 1346 | 1045 |
| Asistencias (cant.) | 572 | 730 | 685 | 995 | 806 | 668 | 1035 | 703 | 972 | 765 |

Consignas: a) ¿conviene explicar las **asistencias** en función de las **ventas de baterías**? (justificar); b) pronóstico de asistencias del mes 11 **usando** las ventas de baterías; c) **tendencia lineal** de asistencias; d) comparar (b) y (c).

**Enfoque:** **regresión causal** (asistencias ~ baterías: medir $r$, $r^2$ para justificar a)) frente a **tendencia lineal** (asistencias ~ tiempo); comparar por MAD/MAPD. Es el espejo del [[apunte-9-casos-de-estudio-resueltos|Caso 3]] del Apunte 9.

---

## Mapa: qué método ejercita cada ejercicio

| Ej. | Tema central | Método(s) principal(es) |
|:--:|---|---|
| 1 | Tendencia decreciente + monitoreo | AE ajustado / tendencia lineal; medidas de error; control |
| 2 | Cambio de tendencia ("V") | AE ajustado |
| 3 | Tendencia + comparar con pronóstico dado | Tendencia lineal / AEA; MAD/MAPD |
| 4 | Serie sin tendencia | Medias móviles / AE vs. tendencia lineal |
| 5 | Estacionalidad mensual multi-año | Ajuste estacional |
| 6 | Causal + estacional | Regresión (celulares) + ajuste estacional |
| 7 | "Estacionalidad" intra-semana + ajuste | Patrón por día + factor de ajuste |
| 8 | Causal (promociones) + intra-semana | Regresión + ajuste estacional |
| 9 | Selección entre dos causales + colaborativo | Regresión simple ×2 → múltiple; estacional |
| 10 | Proceso completo de pronóstico | Tendencia / regresión simple → **regresión múltiple** |
| 11 | Causal vs. tendencia | Regresión vs. tendencia lineal |

> Cada ejercicio puede resolverse cargando sus datos en la `plantilla-modelos-pronosticos.xlsx`. Si querés, puedo desarrollar la solución numérica completa de cualquiera de ellos en un apunte aparte o en una copia de la plantilla.
