---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 13
unidad: 4
titulo_unidad: Gestión de Inventarios
temas_del_plan:
  - Clasificación ABC.
  - Principales modelos de gestión de inventarios.
  - Cálculo del lote óptimo. Cálculo del punto de pedido. Inventario de seguridad.
  - Demanda variable. Nivel de servicio.
  - Modelo básico de inventario de período fijo. Cálculo del período de revisión. Cálculo del tamaño de la orden.
presentacion_fuente: "Unidad_4_-_02_-_Casos_de_estudio_en_clase_-_Gestión_de_inventarios.pdf"
anio: 2025
---

# Apunte 13 — Casos de estudio en clase (Gestión de Inventarios)

> **Unidad 4 — Gestión de Inventarios.** Conjunto de **6 casos de estudio** de la cátedra para ejercitar la selección y aplicación de los modelos del [[apunte-12-gestion-de-inventarios|Apunte 12]]. Este apunte **transcribe los enunciados y sus datos** y, para cada uno, señala **qué modelo aplica, las fórmulas a usar y la hoja de la plantilla** que lo resuelve. La cátedra **no** publicó soluciones numéricas de estos casos (sólo la plantilla de cálculo); las indicaciones de enfoque son **orientativas** y se apoyan en la teoría del Apunte 12. El recorrido cubre, en orden, los grandes temas de la unidad: **ABC → EOQ (3 casos) → punto de pedido con demanda variable → período fijo**.

**Recurso asociado:** `recursos-inventarios/plantilla-modelos-inventarios.xls` (hojas: *Clasificación ABC, EOQ, EOQ II, Descuentos por Cantidad, Punto de Pedido, Modelo de Período Fijo*).

> **Método de trabajo (siempre el mismo):** identificar el **tipo de problema** (ABC / cuánto / cuándo / período fijo) → reconocer los **supuestos** (¿ingreso instantáneo o gradual? ¿demanda cierta o aleatoria?) → elegir el **modelo** y su **hoja** → cargar parámetros → leer salidas.

---

## Mapa de los casos

| Caso | Tema | Modelo del Apunte 12 | Hoja de la plantilla |
|:--:|---|---|---|
| 1 | Clasificación de 30 ítems | **Clasificación ABC** (§5) | `Clasificación ABC` |
| 2 | Lote óptimo de compra (orden entera) | **EOQ Caso 1** — ingreso instantáneo (§6.1) | `EOQ` |
| 3 | Lote óptimo de producción (tortas) | **EOQ Caso 2** — ingreso no instantáneo (§6.2) | `EOQ II` |
| 4 | Descuentos por cantidad | **EOQ Caso 3** — descuento por cantidad (§6.3) | `Descuentos por Cantidad` |
| 5 | Punto de pedido con demanda normal | **Punto de pedido con stock de seguridad** (§7) | `Punto de Pedido` |
| 6 | Revisión periódica (pizzas) | **Modelo de período fijo** (§8) | `Modelo de Período Fijo` |

---

## Caso 1 — Clasificación ABC (partes y materiales)

**Situación.** Una compañía almacena partes y materiales para fabricación. Al crecer la demanda, la administración del inventario se volvió dificultosa y se desea **clasificarlo según el criterio ABC**. Datos (30 ítems):

| Ítem | Uso anual | Costo unit. ($) | | Ítem | Uso anual | Costo unit. ($) |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 1 | 36 | 350 | | 16 | 60 | 60 |
| 2 | 510 | 30 | | 17 | 120 | 120 |
| 3 | 50 | 23 | | 18 | 270 | 270 |
| 4 | 300 | 45 | | 19 | 45 | 45 |
| 5 | 18 | 1900 | | 20 | 19 | 19 |
| 6 | 500 | 8 | | 21 | 500 | 910 |
| 7 | 710 | 4 | | 22 | 12 | 12 |
| 8 | 80 | 26 | | 23 | 30 | 30 |
| 9 | 344 | 28 | | 24 | 24 | 24 |
| 10 | 67 | 440 | | 25 | 470 | 870 |
| 11 | 510 | 2 | | 26 | 244 | 244 |
| 12 | 682 | 35 | | 27 | 350 | 750 |
| 13 | 95 | 50 | | 28 | 45 | 45 |
| 14 | 10 | 3 | | 29 | 46 | 46 |
| 15 | 820 | 1 | | 30 | 165 | 165 |

**Consigna.** Aplicar el análisis ABC y determinar **qué sistema de control** de inventario aplicaría a los ítems clasificados como **A** y **B**.

**Enfoque (modelo §5 + hoja `Clasificación ABC`).**

1. Calcular el **valor total anual** de cada ítem: $\text{(uso anual)} \times \text{(costo unitario)}$.
2. **Ordenar** los ítems de **mayor a menor** valor total.
3. Calcular el **% del valor total** y el **% acumulado**.
4. Cortar las clases: **A** ≈ primeros ítems hasta ~70–80 % del valor; **B** ≈ hasta ~95 %; **C** el resto.
5. **Decisión de control:** a los **A** (y normalmente **B**) → **revisión continua** (EOQ + punto de pedido, control estricto); a los **C** → esquema más liviano (p. ej. revisión periódica).

> En la hoja, se cargan las dos columnas de entrada (uso anual y costo unitario) por ítem; la planilla calcula el valor total, ordena y arma los porcentajes acumulados que delimitan A/B/C. Pista: ítems como el **5** (18×1900), **21** (500×910) y **25** (470×870) tienen valores totales altísimos y serán candidatos a clase **A**, pese a su bajo uso en unidades.

---

## Caso 2 — Lote óptimo de compra (EOQ Caso 1)

**Situación.** Una empresa almacena y vende un producto A y quiere determinar el lote óptimo a comprar al proveedor. Datos:

- Costo de emisión de pedido: $C_o = \$30$.
- Costo de almacenamiento: $C_c = \$20$ por unidad/año.
- Demanda anual (pronóstico, razonablemente constante): $D = 19\,200$ u.
- Cuando se emite una orden, **se entrega completa e inmediatamente** (⇒ **ingreso instantáneo**).
- La empresa opera ≈ **320 días al año**.

**Consigna.** Determinar: **a)** lote óptimo de compra; **b)** costo total mínimo del inventario; **c)** número óptimo de pedidos por año; **d)** tiempo entre pedidos.

**Enfoque (modelo §6.1 + hoja `EOQ`).** Entrega inmediata y completa ⇒ **EOQ Caso 1**. Fórmulas:

$$\text{a) } Q^* = \sqrt{\frac{2\,C_o\,D}{C_c}} \qquad \text{b) } TC_{min} = \sqrt{2\,C_o\,D\,C_c} \quad(\text{sin costo de compra})$$
$$\text{c) } N^* = \frac{D}{Q^*} \qquad \text{d) } T^* = \frac{\text{días/año}}{N^*} = \frac{320}{N^*}\ \text{días}$$

> En la hoja `EOQ` se cargan $C_c=20$, $C_o=30$, $D=19\,200$ y **días/año $=320$**; las salidas $Q_{opt}$, $TC_{min}$, n.º de pedidos/año y tiempo entre pedidos se calculan solas, junto con el gráfico de las curvas de costo.

---

## Caso 3 — Lote óptimo de producción (EOQ Caso 2)

**Situación.** Una panadería produce **tortas de manzana** para congelar y vender luego. Opera **5 días/semana, 52 semanas/año**. Datos:

- Velocidad de producción: $p = 64$ tortas/día.
- Costo de preparación (*setup*) del lote: $C_o = \$500$.
- Costo de mantener congelada: $C_c = \$5$ por torta/año.
- Demanda anual (constante): $D = 5\,000$ tortas.

**Consigna.** Determinar: **a)** lote óptimo de producción; **b)** costo total mínimo; **c)** número de corridas de producción por año; **d)** tiempo entre corridas; **e)** tiempo de ingreso del pedido; **f)** nivel máximo de inventario.

**Enfoque (modelo §6.2 + hoja `EOQ II`).** Producción propia, el inventario **ingresa gradualmente** mientras se consume ⇒ **EOQ Caso 2**. Primero obtener la demanda diaria: $d = D / (\text{días hábiles/año}) = 5\,000 / (5 \times 52) = 5\,000/260$. Luego:

$$\text{a) } Q^* = \sqrt{\frac{2\,C_o\,D}{C_c\left(1-\frac{d}{p}\right)}} \qquad \text{b) } TC_{min} = C_o\frac{D}{Q^*} + C_c\frac{Q^*}{2}\left(1-\frac{d}{p}\right)$$
$$\text{c) N.º corridas} = \frac{D}{Q^*} \qquad \text{d) } T^* = \frac{\text{días/año}}{\text{n.º corridas}} \qquad \text{e) } T_i = \frac{Q^*}{p} \qquad \text{f) } NI_{max} = Q^*\left(1-\frac{d}{p}\right)$$

> En la hoja `EOQ II` se cargan $C_c=5$, $C_o=500$, $D=5\,000$, días/año (260 hábiles), velocidad de demanda $d$ y velocidad de producción $p=64$. La planilla devuelve $Q_{opt}$, $TC_{min}$, tiempo de ingreso, número de corridas, **inventario máximo** y tiempo entre corridas. **Atención al "días/año":** para una demanda *diaria* coherente con $p$ en tortas/día, usar los **260 días hábiles** (5×52).

---

## Caso 4 — Descuentos por cantidad (EOQ Caso 3)

**Situación.** El proveedor de una empresa revendedora ofrece **precios por tramo**:

| Tamaño de compra | Precio unitario |
|---|:--:|
| hasta 299 u. | $10 |
| 300 – 599 u. | $9 |
| 600 u. o más | $7 |

Datos: $D = 5\,000$ u, costo de pedido $C_o = \$2\,000$, costo de almacenamiento $C_c = \$100$ por producto/año.

**Consigna.** Determinar el **lote óptimo de compra** y el **costo total mínimo**.

**Enfoque (modelo §6.3 + hoja `Descuentos por Cantidad`).** Hay **descuento por cantidad** ⇒ **EOQ Caso 3**. Procedimiento:

1. Calcular el lote óptimo **sin costo de compra**: $Q_{opt} = \sqrt{2\,C_o\,D / C_c}$.
2. Ver en **qué tramo** de precio cae $Q_{opt}$.
3. Comparar el **costo total** $CT = C_p(Q)\,D + C_o\,D/Q + C_c\,Q/2$ entre $Q_{opt}$ (a su precio) y los **puntos de quiebre** de los tramos con precio **menor** (300 y 600), siguiendo el árbol de decisión del Apunte 12 (§6.3).
4. El óptimo es el de **menor $CT$**: o bien $Q_{opt}$, o bien un punto de quiebre (300 o 600).

> En la hoja `Descuentos por Cantidad` se cargan $C_c=100$, $C_o=2\,000$, $D=5\,000$ y la **tabla de tramos** (cantidad mínima por descuento y precio por unidad). La planilla calcula, para cada tramo, el $Q_{opt}$, la cantidad efectiva (ajustada al quiebre cuando corresponde) y el **costo total**, de modo de identificar el $Q^*$ global. **Nota:** acá el costo de compra **sí** entra en $CT$ (es lo que cambia entre tramos), a diferencia de los Casos 1 y 2.

---

## Caso 5 — Punto de pedido con demanda variable (Bar "El Imperio")

**Situación.** El bar y restaurante **"El Imperio"** sirve *chop*. La **demanda diaria** de barriles de cerveza sigue una **distribución normal** con media $\bar d = 18$ barriles y desvío estándar $\sigma_d = 4$ barriles. La empresa opera **330 días/año**. Datos:

- Costo de emisión de orden: $C_o = \$40$.
- Costo de almacenamiento: $C_c = \$4{,}50$ por barril/año.
- *Lead time*: $L = 3$ días.

**Consigna.** **a)** tamaño del lote óptimo de compra; **b)** stock de seguridad y punto de pedido para un **nivel de servicio del 90 %**; **c)** ¿cuál sería el **incremento** del stock de seguridad si se deseara un nivel de servicio del **95 %**?

**Enfoque (modelos §6.1 y §7 + hoja `Punto de Pedido`).** Combina **cuánto** (EOQ) y **cuándo** (punto de pedido con buffer):

- **a)** Demanda anual $D = \bar d \times 330 = 18 \times 330 = 5\,940$ u. Lote óptimo (EOQ Caso 1):
$$Q^* = \sqrt{\frac{2\,C_o\,D}{C_c}}$$
- **b)** Stock de seguridad y punto de pedido con demanda normal durante el *lead time*:
$$S_s = z\,\sigma_d\sqrt{L} \qquad P_p = \bar d\,L + S_s,\qquad z_{90\%} = 1.28$$
- **c)** Repetir con $z_{95\%} = 1.645$; el **incremento** del stock de seguridad es $\Delta S_s = (z_{95\%} - z_{90\%})\,\sigma_d\sqrt{L}$. Notar que **sólo cambia $z$**: el incremento es proporcional a la diferencia de los $z$, no requiere recalcular el resto.

> En la hoja `Punto de Pedido` se cargan $D$, $C_o=40$, $C_c=4{,}50$, *lead time* $=3$, desvío estándar de la demanda $=4$, **nivel de servicio** y días de trabajo/año $=330$. La planilla devuelve $Q_{opt}$, demanda diaria, n.º de órdenes/año, **stock de seguridad** y **punto de pedido**. Para el inciso c) basta cambiar el nivel de servicio de 90 % a 95 % y comparar los stocks de seguridad.

---

## Caso 6 — Modelo de período fijo (supermercado de pizzas)

**Situación.** Un supermercado almacena pizzas en un estante refrigerado. La **demanda diaria** sigue una normal con media $\bar d = 8$ pizzas y desvío $\sigma_d = 2{,}5$ pizzas. El proveedor **revisa el inventario cada $T = 10$ días** (revisión periódica). En una visita **no había pizzas** en el estante ($I = 0$). El *lead time* es $L = 3$ días.

**Consigna.** **a)** tamaño de la orden para este período con un **nivel de servicio del 99 %**; **b)** en la **siguiente** visita había **$I = 5$ pizzas**: ¿cuál es el tamaño del pedido para el próximo período?

**Enfoque (modelo §8 + hoja `Modelo de Período Fijo`).** Revisión **periódica** ⇒ el colchón cubre todo el intervalo $T + L$. Fórmula del tamaño de orden:

$$Q = \bar d\,(T + L) + \underbrace{z\,\sigma_d\sqrt{T+L}}_{S_s} - I, \qquad z_{99\%} = 2.33$$

- **a)** Con $I = 0$: $\;Q = 8\,(10+3) + 2.33\cdot 2{,}5\cdot\sqrt{13} - 0$.
- **b)** Con $I = 5$: misma expresión, restando $I=5$. El nivel objetivo $NI_{max} = \bar d\,(T+L) + S_s$ es el **mismo** en ambas visitas; sólo cambia cuánto falta para alcanzarlo según el inventario observado, así que el pedido del inciso b) es exactamente **5 unidades menos** que el del inciso a).

> En la hoja `Modelo de Período Fijo` se cargan velocidad de la demanda (media diaria $=8$), **tiempo entre revisiones** $T=10$, *lead time* $L=3$, desvío estándar $=2{,}5$, **inventario en stock** $I$ y nivel de servicio $=99\%$. La planilla devuelve el valor de $z$, el **stock de seguridad** y la **cantidad a ordenar** $Q$. Es la diferencia conceptual clave con el Caso 5: aquí el desvío se escala por $\sqrt{T+L}$ (no $\sqrt{L}$), porque entre revisiones el inventario queda "a ciegas".

---

## Síntesis del apunte

Los seis casos recorren, en orden didáctico, **toda la caja de herramientas** de la Unidad 4: primero **priorizar** (ABC, Caso 1) para decidir a qué ítems aplicar control estricto; luego **cuánto ordenar** con las tres variantes de **EOQ** —ingreso instantáneo (Caso 2), ingreso gradual/producción (Caso 3) y descuento por cantidad (Caso 4)—; después **cuándo ordenar** con el **punto de pedido y el stock de seguridad** bajo demanda aleatoria y un nivel de servicio objetivo (Caso 5); y finalmente el **modelo de período fijo** de la revisión periódica (Caso 6).

La clave para resolver cada uno es **leer los supuestos del enunciado** y mapearlos al modelo: *"se entrega completa e inmediatamente"* → EOQ Caso 1; *"se produce a tasa $p$"* → EOQ Caso 2; *"precio por tramos"* → EOQ Caso 3; *"demanda normal con desvío"* + revisión continua → punto de pedido con $\sqrt{L}$; *"revisa cada $T$ días"* → período fijo con $\sqrt{T+L}$. Cada caso tiene su **hoja dedicada** en `recursos-inventarios/plantilla-modelos-inventarios.xls`, que automatiza el cálculo; el valor de estudiar el enfoque a mano es **entender qué carga cada celda y por qué**. Recordar que estas resoluciones son **orientativas** (la cátedra no publicó la clave numérica): conviene contrastarlas en clase.
