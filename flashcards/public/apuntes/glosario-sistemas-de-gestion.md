---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Glosario
titulo: Glosario de términos, siglas y acrónimos
abarca_unidades: "1 a 9"
fuentes: Apuntes 1 a 30 (corpus completo de la asignatura)
docente: Dr. Ing. Pablo D. Villarreal
anio: 2025
---

# Glosario de Sistemas de Gestión — siglas, acrónimos y términos clave

> **Material de referencia transversal.** Reúne y define las **siglas, acrónimos y términos** que recorren las Unidades 1 a 9 de la asignatura, consolidados a partir de los Apuntes 1–30. Está pensado como índice de consulta rápida durante el estudio y como repaso previo a parciales: la **§2 (siglas)** es la pieza central (énfasis pedido) y la **§3** desarrolla los conceptos no-acrónimos agrupados por unidad.

**Cómo leer la columna "Unidad":** indica dónde se introduce o usa principalmente cada término en el corpus. Algunas siglas atraviesan varias unidades (p. ej., `SCM`, `BPMS`).

---

## 1. Cómo usar este glosario

- **Buscás una sigla** (BPMN, MRP, EOQ, ATP…): andá directo a la **§2**, ordenada alfabéticamente.
- **Buscás un concepto** (efecto látigo, makespan, stock de seguridad…): andá a la **§3**, agrupada por unidad temática.
- Las siglas en inglés se dan con su **forma original** y su **sentido en la materia**; cuando la cátedra usa una traducción consagrada (p. ej., *Lista de Materiales* para BOM), se indica.
- ⚠️ Algunas siglas **colisionan** (p. ej., `TS` = *Tiempo de Suministro* en MRP/DRP **y** *Tracking Signal* en pronósticos): se aclara en la propia fila.

---

## 2. Siglas y acrónimos

| Sigla | Significado (forma original) | Sentido en la materia | Unidad |
|---|---|---|---|
| **ABC** | Clasificación ABC (principio de Pareto) | Segmenta los ítems de inventario en clases A/B/C según su valor de uso, para concentrar el control en los pocos críticos. | 4 |
| **AND** | *AND gateway* | Compuerta **paralela** en BPMN: divide o sincroniza flujos que ocurren **simultáneamente**. | 2 |
| **ARIMA** | *AutoRegressive Integrated Moving Average* | Modelo estadístico de series de tiempo (con diferenciación) usado para pronosticar más allá del Excel. | 3 |
| **ARMA** | *AutoRegressive Moving Average* | Caso de ARIMA **sin diferenciación** ($d=0$); combina componente autorregresiva y de media móvil. | 3 |
| **AS-IS** | *As-Is* | Modelo del proceso **tal como es hoy** (estado actual), punto de partida del rediseño. | 2 |
| **ATO** | *Assemble-to-Order* | Entorno de producción: se **ensambla contra pedido** a partir de subconjuntos pre-fabricados. | 5 |
| **ATP** | *Available-to-Promise* | **Disponible a Prometer**: cantidad del PMP aún no comprometida que se puede prometer a nuevos clientes. | 5 |
| **B2B** | *Business-to-Business* | Transacciones electrónicas **entre empresas** (habilitadoras de la cadena de suministro). | 9 |
| **B2C** | *Business-to-Consumer* | Transacciones electrónicas **entre empresa y consumidor final**. | 9 |
| **BI** | *Business Intelligence* | Inteligencia de negocios: OLAP, *data warehouse*, análisis para soporte de decisión. | 1 |
| **BOM** | *Bill of Materials* | **Lista de Materiales**: estructura del producto con componentes, multiplicidades y tiempos. | 6 |
| **BPEL** | *Business Process Execution Language* | Lenguaje de **ejecución** de procesos de negocio (orquestación de servicios). | 2 |
| **BPM** | *Business Process Management* | **Gestión de Procesos de Negocio**: disciplina de gestión por procesos (horizontal). | 2 |
| **BPMN** | *Business Process Model and Notation* | Notación **estándar** (OMG) para modelar gráficamente procesos de negocio. | 2 |
| **BPMS** | *Business Process Management System / Suite* | Sistema que **automatiza y ejecuta** procesos modelados; tipo de Sistema de Gestión. | 1 · 2 |
| **CPFR** | *Collaborative Planning, Forecasting and Replenishment* | Modelo de colaboración: planificación, pronóstico y reabastecimiento **conjuntos** (8 procesos). | 9 |
| **CPM** | *Critical Path Method* | Método del **camino crítico** para programación de proyectos. | 8 |
| **CR** | *Critical Ratio* | **Razón Crítica**: regla de secuenciamiento = tiempo restante hasta la entrega / trabajo restante. | 8 |
| **CRM** | *Customer Relationship Management* | Sistema de gestión de la relación con clientes. | 1 |
| **CRP** | *Capacity Requirements Plan* | **Plan de Requerimientos de Capacidad**: chequea capacidad a nivel de componente (espejo del MRP). | 5 · 6 |
| **CTP** | *Capable-to-Promise* | **Factible a Prometer**: fecha de promesa cuando no hay ATP, evaluando capacidad disponible. | 5 |
| **DAMA** | *Demand Activated Management Architecture* | Modelo de colaboración **activado por la demanda real**. | 9 |
| **DDATE** | *Due Date* | Fecha de entrega comprometida; base de la regla **EDD**. | 8 |
| **DRP** | *Distribution Requirements Planning* | **Planificación de Requerimientos de Distribución**: el "espejo" del MRP sobre la red de distribución. | 7 |
| **DSS** | *Decision Support System* | **Sistema Soporte de Decisión**: modelos + datos + interfaz para decisiones semiestructuradas. | 1 |
| **EDD** | *Earliest Due Date* | Regla de secuenciamiento: primero la orden de **fecha de entrega más próxima** (minimiza tardanza media). | 8 |
| **EOQ** | *Economic Order Quantity* | **Lote Económico de compra**: tamaño de pedido que minimiza el costo total de inventario. | 4 |
| **EPC** | *Event-driven Process Chain* | Cadena de procesos dirigida por eventos (notación alternativa de modelado). | 2 |
| **EPP** | Emisión de Pedidos Planificados | Fila (6) de la matriz MRP/DRP: la recepción **desplazada hacia atrás** $TS$ períodos (cuándo emitir). | 6 · 7 |
| **ERP** | *Enterprise Resource Planning* | Sistema de gestión empresarial **integrado**: une las funciones y gestiona procesos de negocio. | 1 |
| **FCFS** | *First Come, First Served* | Regla de secuenciamiento: se atiende en **orden de llegada**. | 8 |
| **ICC** | Índice de Confianza del Consumidor | Variable explicativa en un modelo de pronóstico **causal** (regresión). | 3 |
| **ISL** | *Inventory Stocking Location* | **Lugar de almacenamiento** de inventario en la red de distribución (PdeV, almacén regional/central). | 7 |
| **KO** | *(ticker bursátil de The Coca-Cola Company)* | Serie real usada en el ejemplo de pronóstico ARIMA/SARIMAX en Python. | 3 |
| **KPI** | *Key Performance Indicator* | **Indicador clave de desempeño** de un proceso (tiempo, costo, calidad, satisfacción). | 2 |
| **LCFS** | *Last Come, First Served* | Regla de secuenciamiento: primero el **último en llegar**. | 8 |
| **LT** | *Lead Time* | **Tiempo de provisión** entre emitir una orden y recibirla (≡ TS en MRP/DRP). | 4 · 6 |
| **MA** | *Moving Average* | **Media Móvil**: promedio de los últimos *n* períodos. | 3 |
| **MAD** | *Mean Absolute Deviation* | **Desviación Absoluta Media**: error medio del pronóstico (en unidades). | 3 |
| **MAE** | *Mean Absolute Error* | Error Absoluto Medio (métrica usada con scikit-learn en el ejemplo ARIMA). | 3 |
| **MAPD** | *Mean Absolute Percent Deviation* | Desviación absoluta media **porcentual** (error relativo del pronóstico). | 3 |
| **MIS** | *Management Information System* | Sistema de información gerencial (reportes para mandos medios). | 1 |
| **MPS** | *Master Production Schedule* | Equivalente en inglés de **PMP** (Plan Maestro de Producción). | 5 |
| **MRP** | *Material Requirements Planning* | **Planificación de Requerimientos de Materiales** para demanda **dependiente**. | 6 |
| **MRP II** | *Manufacturing Resource Planning* | Evolución del MRP que integra capacidad, finanzas y recursos de manufactura. | 1 |
| **MSE** | *Mean Squared Error* | Error Cuadrático Medio del pronóstico. | 3 |
| **MTO** | *Make-to-Order* | Entorno de producción: se **fabrica contra pedido** (sin stock de producto final). | 5 |
| **MTS** | *Make-to-Stock* | Entorno de producción: se **fabrica para stock** (producto final disponible). | 5 |
| **OLAP** | *Online Analytical Processing* | Análisis multidimensional de datos (soporte de decisión). | 1 |
| **OMG** | *Object Management Group* | Organismo que **estandariza** BPMN y UML. | 2 |
| **OPT** | *Optimized Production Technology* | **Manufactura sincrónica**: programación gobernada por el **cuello de botella**. | 8 |
| **OR** | *OR gateway* | Compuerta **inclusiva** en BPMN: habilita **uno o varios** caminos según condiciones. | 2 |
| **PAP** | Planificación Agregada de la Producción | Plan de mediano plazo que equilibra demanda y capacidad a nivel **agregado** (≡ S&OP). | 5 |
| **PD** | *Past Due* (período vencido) | Casillero inicial de la matriz MRP/DRP para órdenes **vencidas**; si una emisión cae en PD, el plan **no es factible**. | 6 · 7 |
| **PERT** | *Program Evaluation and Review Technique* | Técnica de programación de **proyectos** (con tiempos probabilísticos). | 8 |
| **PMP** | Planificación Maestra de la Producción | Desagrega el plan agregado a nivel de **producto**; interfaz con los clientes (≡ MPS). | 5 |
| **POQ** | *Periodic Order Quantity* | Regla de lote: se fija el **período** de pedido y la cantidad cubre esa ventana. | 4 · 6 |
| **RB** | Requerimientos Brutos | Fila (1) de la matriz MRP/DRP: la **demanda** del período (independiente o dependiente). | 6 · 7 |
| **RCCP** | *Rough-Cut Capacity Plan* | **Plan de Capacidad de Grano Grueso**: chequea capacidad de los centros críticos contra el PMP. | 5 |
| **RMSE** | *Root Mean Squared Error* | Raíz del error cuadrático medio; criterio de selección del mejor modelo ARIMA. | 3 |
| **RN** | Requerimientos Netos | Fila (4) de la matriz MRP/DRP: lo que falta cubrir tras descontar inventario y tránsito. | 6 · 7 |
| **ROP** | *Reorder Point* | **Punto de Pedido**: nivel de inventario que dispara una nueva orden (revisión continua). | 4 |
| **RRP** | *Resource Requirements Plan* | **Plan de Requerimientos de Recursos**: chequeo de capacidad a nivel **agregado** (junto al PAP). | 5 |
| **S&OP** | *Sales and Operations Planning* | Nombre en inglés de la **Planificación Agregada** (PAP); coordina ventas y operaciones. | 5 |
| **SARIMAX** | *Seasonal ARIMA with eXogenous regressors* | ARIMA con **estacionalidad** y variables exógenas; usado en el ejemplo en Python. | 3 |
| **SCM** | *Supply Chain Management* | **Gestión de la Cadena de Suministro**; también el tipo de sistema que la soporta. | 1 · 9 |
| **SCOR** | *Supply Chain Operations Reference model* | Modelo de **referencia de procesos** de la cadena: Plan–Source–Make–Deliver–Return. | 9 |
| **SFC** | *Shop Floor Control* | **Control de planta**: ejecución y seguimiento del programa en el taller. | 8 |
| **SIOP** | Sistemas de Información Orientados a Procesos | *Process-Aware Information Systems* (PAIS): sistemas conscientes del proceso que ejecutan (incluye los BPMS). | 2 |
| **SKU** | *Stock Keeping Unit* | **Unidad de mantenimiento de stock**: identificador de cada ítem/producto distinto. | 4 · 7 |
| **SLA** | *Service Level Agreement* | **Acuerdo de Nivel de Servicio**; su violación es un KPI de proceso. | 2 |
| **SLACK** | *Slack* | **Holgura**: regla de secuenciamiento que prioriza la orden de **menor holgura**. | 8 |
| **SPT** | *Shortest Processing Time* | Regla de secuenciamiento: primero el de **menor tiempo de proceso** (minimiza flowtime medio). | 8 |
| **Ss / SS** | *Safety Stock* | **Stock de Seguridad**: inventario de protección frente a variabilidad de demanda o *lead time*. | 4 · 6 |
| **TI** | Tecnología de la Información | Soporte tecnológico de los Sistemas de Gestión. | 1 |
| **TO-BE** | *To-Be* | Modelo del proceso **rediseñado** (estado objetivo), resultado de la mejora. | 2 |
| **TS** | Tiempo de Suministro / *Tracking Signal* | **(MRP/DRP)** tiempo de provisión (≡ LT). **⚠️ (Pronósticos)** *Tracking Signal*: señal de rastreo que vigila el sesgo del pronóstico en el tiempo. | 3 · 6 · 7 |
| **UML** | *Unified Modeling Language* | Lenguaje de modelado estándar (OMG); referencia conceptual junto a BPMN. | 2 |
| **VMI** | *Vendor Managed Inventory* | Modelo de colaboración: el **proveedor gestiona** el inventario del cliente. | 9 |
| **WIP** | *Work In Process* | **Inventario en proceso**: trabajo en curso dentro del sistema productivo. | 8 |
| **WMA** | *Weighted Moving Average* | **Media Móvil Ponderada**: pesa más los datos recientes. | 3 |
| **XOR** | *XOR gateway* | Compuerta **exclusiva** en BPMN: habilita **un único** camino según una condición. | 2 |

> **Nota sobre la matriz MRP/DRP (Unidades 6 y 7).** Las seis filas estándar son: **(1) Requerimientos Brutos (RB)** · **(2) En Tránsito** · **(3) Disponibilidades** · **(4) Requerimientos Netos (RN)** · **(5) Recepción de Pedidos Planificados** · **(6) Emisión de Pedidos Planificados (EPP)**. En el DRP la fila (1) se llama **Pronóstico de Ventas** en los puntos de venta.

---

## 3. Glosario de términos por unidad

### Unidad 1 — Sistemas productivos y Sistemas de Gestión

- **Gestión de operaciones:** administración de los procesos que transforman insumos en bienes/servicios para **crear valor**.
- **Cadena de suministro:** red de proveedores, fabricantes, distribuidores y clientes por la que fluyen materiales, información y dinero.
- **Sistema de Gestión:** software que apoya la gestión de operaciones/procesos (transaccionales, MIS, DSS, MRP/ERP, BPMS).
- **Sistema transaccional:** registra y procesa las **operaciones diarias** (nivel operativo).
- **Modelo de Referencia de Procesos:** plantilla de procesos estándar (p. ej., SCOR) que orienta a los sistemas empresariales.

### Unidad 2 — Gestión de Procesos de Negocio (BPM / BPMN)

- **Proceso de negocio:** conjunto de actividades coordinadas que, a partir de entradas, producen un resultado de valor para un cliente.
- **Ciclo de vida BPM:** etapas de la disciplina (diseño/modelado → implementación → ejecución → monitoreo → optimización).
- **Modelado de procesos:** representación gráfica del proceso; en la materia, con **BPMN**.
- **Pool (*piscina*):** contenedor que representa un **participante** del proceso (organización o rol principal).
- **Lane (*carril*):** subdivisión de un pool que asigna actividades a un **rol/área** específico.
- **Gateway (*compuerta*):** punto de **bifurcación o unión** del flujo (XOR exclusiva, AND paralela, OR inclusiva).
- **Evento:** algo que **sucede** durante el proceso (inicio, intermedio, fin).
- **Actividad / Tarea:** unidad de trabajo realizada dentro del proceso.
- **Instancia de proceso:** una **ejecución concreta** del modelo de proceso (un caso particular).
- **Workflow:** flujo de trabajo automatizado que coordina tareas, datos y recursos.

### Unidad 3 — Pronósticos de demanda

- **Pronóstico:** estimación de la demanda futura como entrada de la planificación.
- **Serie de tiempo:** secuencia de observaciones ordenadas cronológicamente.
- **Patrón de demanda:** comportamiento de la serie (nivel, **tendencia**, **estacionalidad**, ciclo, aleatoriedad).
- **Suavizado (alisado) exponencial:** método que pondera exponencialmente los datos pasados, dando más peso a los recientes.
- **Pronóstico causal (regresión):** modela la demanda en función de **variables explicativas** (p. ej., ICC, plan de publicidad).
- **Tracking signal (señal de rastreo):** indicador que detecta **sesgo** sistemático del pronóstico para vigilarlo en el tiempo.
- **Demanda independiente vs. dependiente:** la independiente se **pronostica**; la dependiente se **calcula** (BOM/MRP).

### Unidad 4 — Gestión de inventarios

- **Inventario:** existencias de materiales/productos mantenidas para amortiguar la operación.
- **Costo de ordenamiento / de mantenimiento:** los dos costos que el **EOQ** equilibra.
- **Lote óptimo (EOQ):** cantidad de pedido que minimiza el costo total (casos: ingreso instantáneo, gradual, con descuentos por cantidad).
- **Punto de pedido (ROP):** nivel de inventario que dispara una orden en **revisión continua**.
- **Stock de seguridad (Ss):** colchón frente a la variabilidad de demanda y *lead time*, ligado al **nivel de servicio**.
- **Revisión continua vs. periódica:** los dos grandes sistemas de control de inventario.
- **Modelo de período fijo:** se pide a **intervalos fijos** una cantidad variable hasta un nivel objetivo.

### Unidad 5 — Planificación jerárquica de la producción

- **Planificación jerárquica:** matriz que coordina **planificación de la producción** y **de la capacidad** en niveles estratégico, táctico, operativo y de programación.
- **Plan agregado (PAP / S&OP):** plan de mediano plazo a nivel de **familias** de productos.
- **Estrategia de caza (*chase*) / de nivelación (*level*):** ajustar la capacidad a la demanda vs. mantener producción **constante**.
- **Entornos de producción (MTS / ATO / MTO):** definen **dónde se ancla el PMP** según cuánto se fabrica antes del pedido.
- **Disponible a Prometer (ATP):** lógica de promesa de pedidos al cliente sobre el PMP (frente a **CTP**, factible a prometer).

### Unidad 6 — Planificación de Requerimientos de Materiales (MRP)

- **Demanda dependiente:** la de componentes, **derivada** del producto final vía la BOM.
- **Lista de Materiales (BOM):** estructura del producto con multiplicidades y tiempos.
- **Regla de lote:** criterio para dimensionar la orden (lote a lote, POQ, lote fijo, EOQ).
- **Tiempo de provisión (TS / LT):** desplazamiento temporal entre **emitir** y **recibir** una orden.
- **Matriz MRP:** tabla de seis filas que se resuelve **ítem por ítem y nivel por nivel**.
- **Explosión de necesidades:** proceso de propagar requerimientos desde el producto final hacia los componentes.

### Unidad 7 — Planificación de Requerimientos de Distribución (DRP)

- **Red / canal de distribución:** estructura de puntos de venta, almacenes regionales y almacén central.
- **Lista de distribución:** estructura en árbol (análoga a la BOM) que modela la red para cada **SKU**.
- **Almacén central / regional · Punto de venta (PdeV):** nodos de la red, cada uno un **ISL**.
- **Demanda agregada del DRP:** salida que **alimenta al PMP** consolidando las emisiones de los nodos.
- **Recorrido del cálculo:** desde los **puntos de venta hacia el almacén central** (espejo del MRP).

### Unidad 8 — Scheduling (programación de operaciones)

- **Secuenciamiento:** orden en que se procesan las tareas en un recurso.
- **Carga / asignación:** distribución de tareas entre recursos disponibles.
- **Makespan:** tiempo total para completar **todo** el conjunto de órdenes.
- **Flowtime (tiempo de flujo):** tiempo que una orden permanece en el sistema.
- **Tardanza (*tardiness*):** atraso de una orden respecto de su fecha de entrega.
- **Cuello de botella:** recurso de menor capacidad que limita el flujo (eje de la **OPT**).
- **Regla de Johnson:** método óptimo para secuenciar *n* trabajos en **dos máquinas en serie**.
- **Diagrama de Gantt:** herramienta gráfica para visualizar y monitorear el programa.
- **Control Input/Output:** seguimiento del trabajo que **entra y sale** de cada centro.
- **Job shop / Flow shop:** tipos de configuración productiva que condicionan la técnica de scheduling.

### Unidad 9 — Gestión integrada de la Cadena de Suministro

- **Efecto látigo (*bullwhip*):** amplificación de la variabilidad de la demanda aguas arriba por **no compartir información**.
- **Colaboración / compartir información:** solución de fondo al efecto látigo.
- **Niveles de integración:** grados de articulación entre los actores de la cadena.
- **Modelos de colaboración de referencia:** **VMI, CPFR, DAMA, SCOR**.
- **E-marketplace:** plataforma electrónica que centraliza la integración **B2B** de múltiples socios.

---

_Glosario derivado de los Apuntes 1–30 del proyecto. Material de referencia transversal; ante una discrepancia, prevalece el apunte de la unidad correspondiente._
