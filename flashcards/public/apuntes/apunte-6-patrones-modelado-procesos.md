---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte (complementario)
numero_apunte: 6
unidad: 2
titulo_unidad: Gestión de Procesos de Negocio
temas_del_plan:
  - Patrones de modelado de procesos.
presentacion_fuente: "— (apunte complementario, sin presentación de cátedra)"
fuentes:
  - "Dumas, La Rosa, Mendling & Reijers (2018). Fundamentals of Business Process Management (2.ª ed.). Springer."
  - "Weske (2012). Business Process Management: Concepts, Languages, Architectures. Springer."
  - "Workflow Patterns Initiative (van der Aalst, ter Hofstede, et al.), workflowpatterns.org."
anio: 2025
---

# Apunte 6 — Patrones de Modelado de Procesos

> **Unidad 2 — Gestión de Procesos de Negocio.** Cubre el tema del plan analítico **"Patrones de modelado de procesos"**, que no tenía presentación de cátedra asociada. **Apunte complementario:** a diferencia de los Apuntes 1 a 5 (derivados de diapositivas), este se elabora a partir de la **bibliografía del plan** —Dumas et al. (2018) y Weske (2012)— y del cuerpo de conocimiento de los *Workflow Patterns* (van der Aalst, ter Hofstede et al., workflowpatterns.org). El desarrollo es propio; no reproduce el texto de esas fuentes. La notación BPMN usada está catalogada en el **Apunte 4**, y los símbolos se incrustan desde `bpmn-icons/` (mantener esa carpeta junto a este archivo).

---

## 1. ¿Qué son los patrones de modelado de procesos?

Un **patrón** es una solución recurrente y reutilizable a un problema de modelado que aparece una y otra vez en distintos procesos. En el modelado de procesos de negocio, los patrones surgieron para dar respuesta a tres necesidades:

- **Vocabulario común:** nombrar situaciones típicas (una bifurcación exclusiva, una sincronización, una elección diferida) para comunicarlas sin ambigüedad.
- **Criterio de evaluación de lenguajes:** medir la **expresividad** de un lenguaje o herramienta (BPMN, BPEL, redes de Petri, EPC, etc.) según cuántos patrones puede representar de forma directa.
- **Guía de modelado:** ofrecer construcciones de referencia que el analista reconoce y aplica, evitando reinventar soluciones y reduciendo errores.

El catálogo de referencia más conocido es el de los **Workflow Patterns** (iniciativa de W. van der Aalst, A. ter Hofstede y colaboradores), organizado en varias **perspectivas**, en correspondencia con las vistas de un modelo de proceso vistas en el Apunte 4:

| Perspectiva | Qué capturan los patrones |
|---|---|
| **Flujo de control** | El orden y la lógica de ejecución de las actividades (bifurcaciones, sincronizaciones, ciclos, instancias múltiples, cancelaciones). Es la perspectiva central. |
| **Datos** | Cómo se definen, comparten, transfieren y usan los datos entre actividades, bloques, instancias y el entorno. |
| **Recursos** | Cómo se ofrecen y asignan las tareas a los recursos (roles, personas, sistemas) y cómo se distribuyen. |
| **Manejo de excepciones** | Cómo se reacciona ante desviaciones del flujo normal (fallos, cancelaciones, vencimientos). |

---

## 2. Patrones de flujo de control (control-flow)

Son el núcleo del catálogo y los que mejor se mapean a construcciones BPMN. Se agrupan, de menor a mayor complejidad, del siguiente modo.

### 2.1. Patrones básicos

| Patrón | Descripción | Construcción en BPMN | Notación |
|---|---|---|:--:|
| **Secuencia** (Sequence) | Una actividad se ejecuta después de que otra finaliza. | Flujo de secuencia entre dos actividades. | <img src="bpmn-icons/conexion-flujo-secuencia.svg" height="14"> |
| **División paralela** (Parallel Split / AND-split) | Un hilo se divide en varios que se ejecutan **en paralelo**. | Parallel Gateway (AND) divergente. | <img src="bpmn-icons/gateway-paralelo.svg" height="26"> |
| **Sincronización** (Synchronization / AND-join) | Varios hilos paralelos convergen y se **espera a todos** antes de continuar. | Parallel Gateway (AND) convergente. | <img src="bpmn-icons/gateway-paralelo.svg" height="26"> |
| **Elección exclusiva** (Exclusive Choice / XOR-split) | Se selecciona **exactamente un** camino entre varios, según una condición sobre datos. | Exclusive Gateway (XOR) divergente. | <img src="bpmn-icons/gateway-exclusivo.svg" height="26"> |
| **Fusión simple** (Simple Merge / XOR-join) | Varios caminos mutuamente excluyentes convergen **sin sincronizar**. | Exclusive Gateway (XOR) convergente. | <img src="bpmn-icons/gateway-exclusivo.svg" height="26"> |

### 2.2. Ramificación y sincronización avanzada

| Patrón | Descripción | Construcción en BPMN | Notación |
|---|---|---|:--:|
| **Elección múltiple** (Multi-Choice / OR-split) | Se selecciona **uno o más** caminos según condiciones independientes. | Inclusive Gateway (OR) divergente. | <img src="bpmn-icons/gateway-inclusivo.svg" height="26"> |
| **Fusión sincronizante estructurada** (Structured Synchronizing Merge / OR-join) | Convergen los caminos activados por un OR-split, **sincronizando solo los que recibieron token**. | Inclusive Gateway (OR) convergente. | <img src="bpmn-icons/gateway-inclusivo.svg" height="26"> |
| **Multi-fusión** (Multi-Merge) | Varios caminos convergen y la actividad siguiente se ejecuta **una vez por cada token** que llega (sin sincronizar). | Confluencia de flujos sin gateway de sincronización. | — |
| **Discriminador estructurado / N-de-M** (Structured Discriminator) | Tras varias ramas paralelas, continúa al **completarse la primera** (o N de M); las restantes se ignoran. | Complex Gateway. | <img src="bpmn-icons/gateway-complejo.svg" height="26"> |

> El **OR-join** es, históricamente, uno de los patrones de semántica más delicada (debe "saber" cuántas ramas esperar). Por eso se recomienda usarlo de forma estructurada, emparejado con su OR-split correspondiente (ver Apunte 4, Inclusive Gateway).

### 2.3. Instancias múltiples (Multiple Instances)

Modelan la ejecución de **varias instancias de una misma actividad**, que se distinguen según cuándo se conoce su número:

- **MI sin sincronización:** se lanzan instancias sin esperar su finalización.
- **MI con número conocido en diseño:** la cantidad es fija al modelar.
- **MI con número conocido en ejecución:** la cantidad se determina en tiempo de ejecución, antes de iniciar las instancias (p. ej., una por cada ítem de una orden).
- **MI sin número conocido a priori:** pueden seguir creándose instancias mientras otras ya se ejecutan.

| Construcción en BPMN | Notación |
|---|:--:|
| Actividad/subproceso con marcador de **múltiple instancia** (atributos `loopCardinality`, `isSequential`, `completionCondition`, `behavior`). | <img src="bpmn-icons/marcador-multiple-instancia.svg" height="20"> |

> Ejemplo del proyecto: en el **Apunte 5, Ejercicio 3-1 y Ejercicio 4**, el procesamiento por cada envío/parte se modela como subproceso de múltiple instancia con `loopCardinality` y `behavior = ALL`.

### 2.4. Patrones basados en estado (state-based)

Dependen del **estado** del proceso y de eventos externos, no solo de datos internos:

| Patrón | Descripción | Construcción en BPMN | Notación |
|---|---|---|:--:|
| **Elección diferida** (Deferred Choice) | La elección entre caminos **no la decide una condición sobre datos**, sino **qué evento ocurre primero** (un mensaje, un timer, etc.). | Event-Based Gateway. | <img src="bpmn-icons/gateway-basado-en-eventos.svg" height="26"> |
| **Ruteo paralelo intercalado** (Interleaved Parallel Routing) | Un conjunto de actividades se ejecuta en **cualquier orden, pero no simultáneamente** (una a la vez). | Subproceso Ad-Hoc. | <img src="bpmn-icons/marcador-adhoc.svg" height="20"> |
| **Hito** (Milestone) | Una actividad solo puede ejecutarse **mientras el proceso esté en cierto estado** (antes de que ocurra otro evento). | Combinación de event-based gateway / eventos con condiciones de estado. | — |

> Ejemplo del proyecto: en el **Apunte 5, Ejercicio 2**, la espera del pago de la factura usa un **event-based gateway** entre el evento de mensaje *Pago realizado* y un **timer de 7 días** (elección diferida).

### 2.5. Iteración y repetición

| Patrón | Descripción | Construcción en BPMN | Notación |
|---|---|---|:--:|
| **Ciclo estructurado** (Structured Loop) | Repetición de una actividad con condición de entrada (*while*) o de salida (*repeat-until*). | Marcador de **Loop** (atributos `loopCondition`, `loopMaximum`, `testBefore`). | <img src="bpmn-icons/marcador-loop.svg" height="20"> |
| **Ciclos arbitrarios** (Arbitrary Cycles) | Repeticiones con **múltiples puntos de entrada/salida**, no anidadas de forma estructurada. | Flujos de secuencia "hacia atrás" entre gateways. | — |

### 2.6. Terminación y cancelación

| Patrón | Descripción | Construcción en BPMN | Notación |
|---|---|---|:--:|
| **Terminación implícita** (Implicit Termination) | El proceso finaliza cuando **no quedan actividades por ejecutar** ni tokens activos. | Varios caminos terminan en sus propios eventos de fin. | <img src="bpmn-icons/evento-fin-none.svg" height="22"> |
| **Cancelar actividad** (Cancel Activity) | Se **interrumpe** una actividad en curso ante un evento. | Boundary event (interruptivo) sobre la actividad. | <img src="bpmn-icons/evento-subproceso-error-interrumpe.svg" height="22"> |
| **Cancelar caso / región** (Cancel Case / Region) | Se **terminan inmediatamente** todas (o parte de) las actividades del proceso. | Evento de fin de **terminación**; o evento **Cancel** en subproceso de transacción. | <img src="bpmn-icons/evento-fin-terminacion.svg" height="22"> &nbsp; <img src="bpmn-icons/evento-fin-cancelar.svg" height="22"> |

> Estos patrones conectan directamente con el **manejo de excepciones y compensación** del Apunte 4 (boundary events, eventos de terminación, subprocesos de evento, compensaciones), y con los requerimientos de cancelación del **Ejercicio 3** del Apunte 5.

---

## 3. Patrones de datos (data)

Capturan cómo se manipula la información. Se agrupan en cuatro familias:

- **Visibilidad de datos:** alcance/ámbito de una variable (de tarea, de bloque/subproceso, de instancia, de proceso, de entorno, global).
- **Interacción de datos:** cómo se pasan datos *internamente* (entre tareas, entre una tarea y su bloque, entre instancias múltiples) y con el *entorno externo* (proceso ↔ recurso, proceso ↔ servicio).
- **Transferencia de datos:** mecanismo del pasaje (por valor, por referencia, copia, transformación).
- **Ruteo basado en datos:** cómo los valores de datos disparan o condicionan el flujo (precondiciones, poscondiciones, condiciones de los gateways).

En BPMN se materializan con **objetos de dato** (con estados), **data inputs/outputs**, **data stores** y las **expresiones condicionales** de los gateways (ver Apunte 4, §3.3).

---

## 4. Patrones de recursos (resource)

Describen cómo el trabajo se ofrece y asigna a los **recursos** (roles, personas, sistemas). Algunos representativos:

- **Patrones de creación / asignación** (en tiempo de diseño): *asignación directa* a un recurso concreto, *asignación basada en roles*, *asignación diferida* (en ejecución), *basada en capacidades/historial*, **separación de funciones** (dos tareas no pueden ser hechas por el mismo recurso), **retener familiaridad** (que la haga quien hizo una tarea relacionada).
- **Patrones push** (el sistema empuja el trabajo): ofrecer a un recurso, a varios, asignar directamente, ordenar por prioridad.
- **Patrones pull** (el recurso toma el trabajo): de una lista de trabajos compartida, reservar/iniciar tareas.
- **Patrones de desvío** (detour): delegar, escalar, reasignar, suspender/reanudar.

En BPMN, la perspectiva de recursos se modela con **lanes** (roles/unidades) dentro del **pool** de la organización; la asignación fina (listas de trabajo de un BPMS, capacidades) excede la notación y se complementa con el motor del BPMS o con UML.

---

## 5. Patrones de manejo de excepciones

Clasifican las respuestas a desviaciones del flujo normal, combinando: el **tipo de fallo** (de una tarea, por vencimiento/deadline, por restricción de recursos, por datos externos), el **comportamiento sobre la actividad afectada** (continuar, reintentar, interrumpir, compensar) y el **comportamiento sobre el caso** (continuar, cancelar región, cancelar caso, compensar). BPMN los expresa con **eventos intermedios asociados (boundary events)** interruptivos y no interruptivos, **subprocesos de evento**, **eventos de tiempo**, **eventos de error/cancelación** y **compensaciones** (Apunte 4, §9).

---

## 6. Para qué sirven, en la práctica

- **Evaluar herramientas y lenguajes:** decidir si BPMN (o un BPMS concreto) soporta directamente los patrones que el proceso necesita, o si requieren rodeos.
- **Modelar con criterio:** reconocer qué patrón aplica (¿elección exclusiva o diferida?, ¿OR-join o multi-merge?) y elegir la construcción correcta evita modelos ambiguos o con *deadlocks*.
- **Comunicar:** nombrar los patrones agiliza la discusión entre analistas y desarrolladores.

> **Cierre.** Los patrones de flujo de control son los más relevantes para la asignatura porque se traducen casi uno a uno a las construcciones BPMN ya estudiadas: gateways (AND/XOR/OR/event-based/complex), marcadores (loop, múltiple instancia, ad-hoc) y eventos (de tiempo, mensaje, error, terminación, compensación). Los patrones de datos, recursos y excepciones completan las perspectivas restantes del modelo de proceso.

---

## Síntesis del apunte

1. Un **patrón de modelado** es una solución recurrente y reutilizable; el catálogo de referencia (Workflow Patterns) se organiza por perspectivas: **flujo de control, datos, recursos y excepciones**.
2. Los **patrones de flujo de control** son el núcleo: básicos (secuencia, AND-split/join, XOR-split/merge), avanzados (OR-split/join, multi-merge, discriminador), de **instancias múltiples**, **basados en estado** (elección diferida, ruteo intercalado, hito), de **iteración** (loop estructurado, ciclos arbitrarios) y de **terminación/cancelación**.
3. Cada patrón tiene una **construcción BPMN** directa (gateways, marcadores, eventos), lo que conecta este tema con los Apuntes 4 y 5.
4. Los patrones de **datos**, **recursos** y **excepciones** cubren las demás perspectivas; en BPMN se apoyan en objetos de dato, lanes/pools y el mecanismo de eventos/compensación, complementándose con el BPMS o UML donde la notación no alcanza.
