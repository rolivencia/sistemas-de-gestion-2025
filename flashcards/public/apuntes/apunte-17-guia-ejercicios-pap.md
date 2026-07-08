---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 17
unidad: 5
titulo_unidad: Planificación Jerárquica de la Producción
temas_del_plan:
  - Planificación Agregada de la Producción y Planificación de Capacidad.
  - "Modelos de prueba/error (mano de obra uniforme, seguimiento de la demanda, mixtos)."
presentacion_fuente: "Unidad_5_-_06_-_Guía_de_ejercicios_PAP.pdf (+ soluciones de cátedra de los ejercicios 1 y 5)"
anio: 2025
---

# Apunte 17 — Guía de ejercicios de PAP

> **Unidad 5 — Planificación Jerárquica de la Producción.** Guía de **5 ejercicios** de **Planificación Agregada de la Producción**. Cada uno pide generar un PAP con una técnica de prueba/error distinta (**caza**, **nivelación de mano de obra**, **mixta**) o con una **estrategia definida por restricciones** (producción regular + subcontratación/horas extra, decisión de **turnos**). Se transcriben los enunciados y se anota el **método** (parámetros, restricciones, algoritmo del Apunte 14). La cátedra publicó la **solución completa** sólo de los **ejercicios 1 y 5**; para los demás se indica el enfoque, **sin fabricar** la clave numérica.

> **Criterio (igual que Apuntes 10 y 13).** Se transcriben datos y se anota el modelo aplicable; los resultados que se muestran (ej. 1 y 5) son los de las planillas de cátedra (`solucion-guia-pap-ej1.xlsx`, `solucion-guia-pap-ej5.xlsx` en `recursos-planificacion/`). Conviene resolver con la **plantilla de PAP** (`recursos-planificacion/plantilla-pap.xlsx`).

> **Recordatorio de método (Apunte 14).** Producción máxima diaria $=\dfrac{Whe\cdot W}{Phe}$. Caza: $PR_t=D_t-I_{t-1}$, $W_t=\lceil MOReq_t/(d_t\,Whe)\rceil$. Nivelación de MO: $W$ constante $=\dfrac{(\text{Demanda total}-I_0)/\text{días totales}\cdot Phe}{Whe}$. Costos: regular, extra, subcontratación, contratación/despido, posesión, retraso, MO ociosa.

---

## Ejercicio 1 — Estrategia de caza ✅ (resuelto)

Planta de **lunes a sábado** (6 días/sem), 8 hs/op·día. **165 operarios** actuales, **60 efectivos**; se pueden contratar hasta **150 temporales** (la cátedra toma $W_{max}=210$); horas extra **≤ 20 %**. **$Phe=2$ hs/u.** Inventario a fin de mayo: **750 u**.

| | JUN | JUL | AGO | SEP | OCT | NOV |
|---|--:|--:|--:|--:|--:|--:|
| Demanda [u] | 14220 | 18990 | 25550 | 29790 | 22475 | 19140 |
| Días | 26 | 25 | 26 | 25 | 27 | 24 |

Costos: Cr 60 · Ce 100 · Co 80 · Cc 8000 · Cd 9200 · Cp 1 · CSr 10 · Cs 150.

**Solución de cátedra (caza):**

| | JUN | JUL | AGO | SEP | OCT | NOV |
|---|--:|--:|--:|--:|--:|--:|
| Prod. regular [u] | 13470 | 18990 | 21840 | 21000 | 22680 | 20160 |
| Empleados [op] | 130 | 190 | 210 | 210 | 210 | 210 |
| Inv. final [u] | 0 | 0 | −3710 | −12500 | −12295 | −11275 |

> La demanda pico (SEP 29 790) **supera la capacidad máxima** (≈ 21 000–22 680 u con 210 operarios), por lo que la caza **acumula faltantes** desde agosto. **Costo total ≈ $15 546 575** (MO $14 176 800 · despidos/contrat. $962 000 · retraso $398 175 · MO ociosa $9600). Es un buen caso para discutir el **límite estructural de capacidad**: ninguna estrategia coyuntural cubre la demanda sin subcontratar o sin ampliar la planta.

---

## Ejercicio 2 — Estrategia de nivelación de mano de obra

Planta de **lunes a viernes**, 8 hs/op·día. **50 operarios efectivos** (no despedibles); hasta **200 temporales** ($W_{max}=250$). Faltante **≤ 50 %** de la demanda del período. **$Phe=2{,}5$ hs/u.** Inventario a fin de mayo: **1000 u**.

| | JUN | JUL | AGO | SEP | OCT | NOV |
|---|--:|--:|--:|--:|--:|--:|
| Demanda [u] | 13880 | 18740 | 24150 | 27790 | 17620 | 15840 |
| Días | 21 | 22 | 22 | 21 | 23 | 22 |

Costos: Cr 65 · Ce 95 · Co 85 · Cc 7750 · Cd 10150 · Cp 1,5 · CSr 30 · Cs 200.

**Enfoque (sin solución de cátedra):** estrategia de **nivelación de MO** → calcular **una plantilla constante** $W$ con la demanda total menos el inventario inicial sobre los días operativos totales; producir a ritmo uniforme y dejar que el **inventario/faltante** absorba la diferencia mes a mes, **verificando** que el faltante de cada período no supere el **50 %** de su demanda (restricción del enunciado).

---

## Ejercicio 3 — Estrategia mixta

Planta de **lunes a sábado**, 8 hs/op·día. **110 operarios efectivos** (no despedibles); contratación de temporales **sólo jun–sep**; $W_{max}=280$ (hasta 170 temporales). Horas extra **≤ 20 %**; **subcontratación sin límite**; faltante **≤ 10 %** de la demanda mensual. **$Phe=1{,}5$ hs/u.** Inventario a fin de abril: **800 u**.

| | MAY | JUN | JUL | AGO | SEP | OCT |
|---|--:|--:|--:|--:|--:|--:|
| Demanda [u] | 13550 | 16720 | 23420 | 28640 | 23580 | 15840 |
| Días | 26 | 25 | 26 | 25 | 27 | 24 |

Costos: Cr 75 · Ce 105 · Co 100 · Cc 6500 · Cd 8000 · Cp 4 · CSr 100 · Cs 120.

**Enfoque (sin solución de cátedra):** estrategia **mixta** → combinar plantilla ajustada con **horas extra** (tope 20 %) y **subcontratación** (sin tope) para cubrir los picos, respetando la **ventana de contratación** (sólo jun–sep) y el límite de faltante (≤ 10 % mensual). Se elaboran planes alternativos y se elige el de **menor costo total** que cumpla las restricciones (decisión semi-estructurada).

---

## Ejercicio 4 — Estrategia por turnos (regular + extra/subcontratación)

Estrategia indicada: **producir la mayor parte en horas regulares; subcontratar o hacer horas extra si hace falta; no se admiten faltantes; se admite inventario; se admiten horas ociosas.** La planta opera **5 días/sem + 2 sábados y domingos al mes**; turnos de **8 hs**, **15 trabajadores por turno**; **máximo 3 turnos/día**; un operario hace como máximo un turno/día. **Mes 0:** 1 turno. **$Phe=2$ hs/u.** Inventario fin Mes 0: **225 u**. La decisión clave es **con cuántos turnos opera la planta**.

| | MAY | JUN | JUL | AGO |
|---|--:|--:|--:|--:|
| Demanda [u] | 850 | 1930 | 3072 | 2500 |
| Días | 24 | 26 | 25 | 24 |

Costos: Cr 70 · Ce 91 · Co 85 · Cc 7000 · Cd 10000 · Cp 2 · CSr 50 · Cs 85.

**Enfoque (sin solución de cátedra):** la variable de decisión es el **número de turnos** (1 a 3), que fija la MO disponible (15 op × turnos × 8 hs × días). Cubrir la demanda primero con **producción regular**; si la capacidad regular no alcanza, recurrir a **horas extra** y/o **subcontratación**; usar **inventario** para nivelar y registrar **horas ociosas** cuando sobre capacidad. No se permiten faltantes.

---

## Ejercicio 5 — Regular + subcontratación, decisión de turnos ✅ (resuelto)

Estrategia indicada: **producir en horas regulares; no se permiten horas extra; subcontratar si hace falta; no se admiten faltantes; no se admite inventario; no se admite MO ociosa.** Planta **5 días/sem**; **10 operarios por turno**; decidir turnos (**máx. 3**). **Mes 0:** 2 turnos. **$Phe=2$ hs/u.** Inventario fin Mes 0: **100 u**.

| | MAY | JUN | JUL | AGO |
|---|--:|--:|--:|--:|
| Demanda [u] | 850 | 1930 | 3072 | 2500 |
| Días | 20 | 22 | 21 | 20 |

Costos: Cr 80 · Ce — · Co 90 · Cc 15000 · Cd 30000 · Cp 2 · CSr 10 · Cs 250.

**Solución de cátedra:**

| | MAY | JUN | JUL | AGO |
|---|--:|--:|--:|--:|
| Prod. regular [u] | 800 | 1760 | 2520 | 2400 |
| Subcontratación [u] | 0 | 120 | 552 | 100 |
| Empleados [op] (turnos) | 10 (1) | 20 (2) | 30 (3) | 30 (3) |
| Inv. final [u] | 50 | 0 | 0 | 0 |

> Se opera con **1, 2, 3 y 3 turnos** respectivamente; la capacidad regular se completa con **subcontratación** en los meses pico, sin horas extra ni faltantes. **Costo total ≈ $1 990 000** (MO $1 196 800 · despidos/contrat. $600 000 · subcontratación $193 000 · inventario $200). *Nota: la solución corresponde a la primera hoja del archivo de cátedra; las otras dos hojas contienen copias sueltas de datos del caso de estudio y no aplican a este ejercicio.*

---

## Cierre

Los cinco ejercicios recorren todo el repertorio del Apunte 14: las **estrategias puras** (caza en el ej. 1, nivelación de MO en el ej. 2), la **mixta** (ej. 3) y dos variantes con **decisión de turnos** y reglas operativas específicas (ej. 4 y 5). El ej. 1 muestra el **límite de capacidad** (faltantes inevitables) y el ej. 5, el uso de la **subcontratación** como palanca cuando se prohíben extra/inventario/faltantes. Para los ejercicios sin clave (2, 3, 4) conviene resolver con la **plantilla de cátedra** y comparar costos totales.

---

> **Temas del plan analítico ejercitados (Unidad 5):** Planificación Agregada de la Producción y Planificación de Capacidad · Modelos de prueba/error (mano de obra uniforme, seguimiento de la demanda, mixtos).
