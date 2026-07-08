---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 18
unidad: 5
titulo_unidad: Planificación Jerárquica de la Producción
temas_del_plan:
  - Planificación Maestra de la Producción.
  - Disponible a prometer.
presentacion_fuente: "Unidad_5_-_10_-_Guía_de_ejercicios_PMP.pdf"
anio: 2025
---

# Apunte 18 — Guía de ejercicios de PMP

> **Unidad 5 — Planificación Jerárquica de la Producción.** Guía de **3 ejercicios** de **Planificación Maestra de la Producción**. En todos se parte del **plan agregado de una familia**, se **desagrega** por **mix** a un producto, se arma el **PMP inicial** (necesidades brutas/netas y lotes), se **ajusta** con información actualizada hasta el **PMP definitivo** (proyección de inventario + reglas de corrección) y se calcula el **disponible a prometer (ATP)** para **responder consultas de clientes**. El ejercicio 3 agrega el **dimensionamiento del lote** y el **stock de seguridad** (puente con la Unidad 4). Se transcriben los enunciados y se anota el **método** (Apuntes 15 y 16); la cátedra **no publicó soluciones** de esta guía, por lo que **no se fabrican** resultados.

> **Cómo resolver.** Usar la **plantilla de PMP** (`recursos-planificacion/plantilla-pmp.xlsx`). El **caso resuelto del Apunte 16** (P1/P2) es el modelo de referencia para el procedimiento completo (PMP inicial → definitivo → ATP).

> **Recordatorio de método (Apunte 15).**
> - **Desagregación:** $PA_{\text{producto}} = \text{mix} \times PA_{\text{familia}}$, repartido por semana (distribución uniforme) → necesidades brutas $NB_s$.
> - **PMP inicial:** $NN_s = NB_s - IE_s - OPC_s$; si $NN_s>0$ se lanza lote; $IE_s = PMP_{s-1} - NN_{s-1}$.
> - **PMP definitivo:** $I_s = I_{s-1} + OPC_s + PMP_s - PPE_s - \max(PVCP_s,\,PCC_s)$; si $I_s < Ss$ se corrige con las **4 reglas** (adelantar / agregar / retrasar / quitar lote).
> - **ATP** (primer período): $I_0 + (OPC + Lote) - Ss - PPE - \sum PCC$ (hasta el período previo al próximo lote); si $<0 \Rightarrow 0$.

---

## Ejercicio 1 — Familia A-003, artículo A-003-25

Planta de **lunes a viernes**. Inventario nulo a inicios de octubre. **Plan agregado de la familia** (6 meses):

| | OCT | NOV | DIC | ENE | FEB | MAR |
|---|--:|--:|--:|--:|--:|--:|
| Plan agregado [u] | 38650 | 43430 | 71220 | 64640 | 46840 | 35840 |

**Tarea 1 — PMP inicial (oct–nov):** la familia tiene **30 artículos**; el **mix de A-003-25 = 0,35**. **Lote = 3000 u.** Hay **órdenes en curso** de 3000 u (semana 1 de oct) y 3000 u (semana 2).

**Tarea 2 — PMP definitivo:** se incorpora **pronóstico de mediano plazo** (OCT–MAR): 14550, 16630, 28170, 25640, 16260, 13220; y **pronóstico de ventas de corto plazo** (8 semanas):

| Sem | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Pronóst. CP [u] | 3600 | 3800 | 3500 | 3900 | 4100 | 4000 | 4250 | 4375 |
| Pedidos comprometidos [u] | 1450 | 3950 | 1600 | 4120 | 1200 | 900 | 4260 | 330 |

**$Ss=200$ u.** Sin pendientes de entrega; quedan **350 u en inventario** a fin de septiembre.

**Consultas de cliente (vía ATP):** ¿qué respuesta dar a un pedido de **1000 u para la semana 3** y a otro de **900 u para la semana 4**?

**Enfoque:** desagregar (0,35 × plan familia, repartido por semana) → PMP inicial con lote 3000 e imputando las órdenes en curso; luego proyectar inventario consumiendo $\max(\text{CP, comprometidos})$, corregir si cae bajo 200, y calcular el ATP de cada ventana de lote. Las consultas se responden comparando la **cantidad pedida** con el **ATP disponible** en la semana solicitada.

---

## Ejercicio 2 — Familia Smart TV, artículo Smart TV 42

Planta de **lunes a viernes**. Inventario nulo a inicios de octubre. **Plan agregado de la familia** (6 meses):

| | OCT | NOV | DIC | ENE | FEB | MAR |
|---|--:|--:|--:|--:|--:|--:|
| Plan agregado [u] | 24600 | 27800 | 42550 | 48640 | 36800 | 28840 |

**Tarea 1 — PMP inicial:** familia de **25 artículos**; **mix de Smart TV 42 = 0,30**. **Lote = 3500 u.** Órdenes en curso: 3500 u (sem 1) y 3500 u (sem 2).

**Tarea 2 — PMP definitivo:** pronóstico de **mediano plazo** (OCT–MAR): 9800, 11500, 17750, 18640, 14200, 10750; y de **corto plazo**:

| Sem | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Pronóst. CP [u] | 3000 | 1900 | 2900 | 2500 | 3850 | 3750 | 2900 | 2150 |
| Pedidos comprometidos [u] | 1800 | 2200 | 2100 | 2600 | 1100 | 3950 | 2930 | 350 |

**$Ss=220$ u.** Sin pendientes de entrega; **300 u en inventario** a fin de septiembre.

**Consultas de cliente (vía ATP):** un pedido de **500 u para la semana 2** y otro de **600 u para la semana 5**.

**Enfoque:** idéntico al ej. 1 con mix 0,30 y lote 3500.

---

## Ejercicio 3 — Producto A (con lote y stock de seguridad)

Generar el PMP de **A** por semana, horizonte de **3 meses**. **Plan agregado de la familia:**

| Mes | 1 | 2 | 3 |
|---|--:|--:|--:|
| Plan agregado [u] | 8000 | 7000 | 6000 |

**Mix de A = 0,70** (todos los meses). Órdenes en curso: **1400 u** (sem 1) y **700 u** (sem 2). **Inventario inicial = 700 u.**

**3.1 — Dimensionar el lote** que **minimice el costo de inventario**: costo de **preparación (set-up) = $50 000**; costo de **posesión = 1000 $/u·mes**.

> *Método (puente con Unidad 4):* lote tipo **EOQ**, $\;Q^\* = \sqrt{\dfrac{2\,D\,C_{prep}}{C_{pos}}}\;$, con $D$ la demanda del producto en el período. Se calcula con los datos de costos dados.

**3.2 — Stock de seguridad:** demanda = plan agregado de los 3 meses; **desvío diario $\sigma_d = 10$ u**; **nivel de servicio 96 %**; **tiempo de producción (lead time) = 10 días**.

> *Método (puente con Unidad 4):* $\;Ss = z \cdot \sigma_d \cdot \sqrt{LT}\;$, con $z \approx 1{,}75$ para un nivel de servicio del 96 %. (Con $\sigma_d=10$ y $LT=10$, queda $Ss \approx 1{,}75\cdot10\cdot\sqrt{10}$, a modo orientativo; el valor exacto se obtiene con la tabla normal que use la cátedra.)

**3.3 — PMP definitivo y ATP:** pronóstico de **mediano plazo** = plan agregado (8000, 7000, 6000). **Pronóstico de ventas de corto plazo** y **órdenes comprometidas**:

| Sem | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Pronóst. CP A [u] | 1000 | 1200 | 1000 | 1000 | 900 | 900 | 930 | 920 |
| Ord. comprometidas A [u] | 1100 | 800 | 1200 | 1000 | 600 | — | — | — |

Hay una **orden pendiente de entrega de 700 u** para la semana 1.

**Consultas de cliente (vía ATP):** un pedido de **100 u para la semana 3** y otro de **700 u para la semana 5**.

**Enfoque:** primero dimensionar **lote** y **$Ss$** (3.1 y 3.2); luego desagregar (0,70 × plan familia), armar el PMP inicial con las órdenes en curso, proyectar inventario (consumiendo $\max$(CP, comprometidos) y descontando la orden pendiente en la semana 1), corregir contra el $Ss$ y calcular el ATP para responder las dos consultas.

---

## Cierre

Los tres ejercicios ejercitan el ciclo completo del Apunte 15: **desagregación por mix → PMP inicial → proyección de inventario → corrección → PMP definitivo → ATP**, cerrando con **consultas de clientes** que se responden con el **disponible a prometer**. El ejercicio 3 además **integra la Unidad 4** (lote óptimo y stock de seguridad con nivel de servicio). El **modelo resuelto** para seguir paso a paso es el **Apunte 16** (caso P1/P2); la plantilla de cálculo está en `recursos-planificacion/plantilla-pmp.xlsx`.

---

> **Temas del plan analítico ejercitados (Unidad 5):** Planificación Maestra de la Producción · Disponible a prometer. *(El ej. 3 reutiliza además cálculo de lote óptimo y stock de seguridad de la Unidad 4.)*
