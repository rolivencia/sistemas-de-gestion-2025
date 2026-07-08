---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 3
unidad: 2
titulo_unidad: Gestión de Procesos de Negocio
temas_del_plan:
  - Ciclo de vida de la Gestión de Procesos de Negocio.
presentacion_fuente: "Unidad_2_-_02_-_BPM_-_SG (2025).pdf"
anio: 2025
---

# Apunte 3 — Introducción a la Gestión de Procesos de Negocio (BPM)

> **Unidad 2 — Gestión de Procesos de Negocio.** Presentación introductoria y conceptual de la disciplina BPM (*Business Process Management*). Contrasta la gestión organizacional tradicional (funcional/vertical) con la gestión por procesos (horizontal), define qué es un proceso de negocio y sus elementos, desarrolla el **ciclo de vida de la Gestión de Procesos de Negocio** (tema central del plan analítico) y presenta el enfoque metodológico para implementar BPM, los KPIs de procesos y el rediseño As-Is → To-Be.

**Docente responsable:** Dr. Pablo D. Villarreal

**Bibliografía de referencia de la presentación:**

- Marlon Dumas, Marcello La Rosa, Jan Mendling, Hajo A. Reijers, *Fundamentals of Business Process Management*, Springer-Verlag Berlin Heidelberg, 2018.
- Mathias Weske, *Business Process Management: Concepts, Languages, Architectures*, Springer-Verlag Berlin Heidelberg, 2012.

---

## Agenda de la presentación

1. Gestión organizacional tradicional vs. gestión organizacional por procesos.
2. Gestión de Procesos de Negocio: ciclo de vida.
3. Enfoque metodológico para implementar la Gestión de Procesos de Negocio.

---

## 1. Gestión organizacional tradicional vs. gestión por procesos

### Gestión organizacional tradicional

¿Cómo describiríamos la estructura de una organización? El **organigrama** es la herramienta ampliamente utilizada para representar la estructura y las funciones de una organización (por ejemplo: Gerencia → Compras, Producción, Logística, Ventas).

**¿Qué información oculta esta forma de visualizar la estructura?** El organigrama no muestra:

- ¿Quiénes son los **clientes**?
- ¿Cuáles son los **productos o servicios**?
- ¿Qué **recursos** se requieren?
- ¿Cuáles son los **procesos y actividades**?

Es decir, no permite analizar, definir ni gestionar esos aspectos.

**Problemas de la gestión funcional/vertical:**

- **Carencia de visibilidad global** y de conocimiento de las operaciones:
  - Es difícil optimizar y adaptarse a los cambios.
  - Oculta ineficiencias: pobre separación de responsabilidades, operaciones secuenciales innecesarias, pasos redundantes o innecesarios, cuellos de botella, etc.
- **Sub-optimización funcional** (cada área optimiza lo suyo, no el conjunto).
- **Pérdida de tiempo e información** en las comunicaciones verticales.

Las actividades, en realidad, **atraviesan horizontalmente** las áreas funcionales, algo que el organigrama no refleja.

### Gestión organizacional por procesos

Las nuevas tendencias de gestión organizacional de los años '80 y '90 incrementaron el énfasis en **analizar y definir la estructura de la organización por medio de los procesos de negocio**, que cruzan transversalmente las áreas. Ejemplos de estas corrientes: **Cadena de Valor**, **Gestión de la Calidad de Procesos** y **Reingeniería de Procesos de Negocio**.

**Definiciones de proceso de negocio:**

> "Un proceso de negocio es un conjunto de **actividades** ordenadas e interrelacionadas, que toman una o más **entradas** y crean una **salida** que es de **valor** al **cliente**, las cuales son realizadas con el propósito de alcanzar una **meta** organizacional de negocio." Las actividades son realizadas por los **recursos** (personas, sistemas de software) de la organización.

> "Un proceso de negocio es una colección de **eventos**, **actividades** y **puntos de decisión** interrelacionados que involucran a varios **actores** y **objetos** y que de forma conjunta llevan a un **resultado** que proporciona **valor** para al menos un **cliente**." (Dumas et al., 2013)

**Proceso de negocio — caracterización:**

- Define la **estructura del flujo de trabajo** de una organización: un conjunto ordenado de actividades atómicas o compuestas (subprocesos) que definen la forma de trabajo.
- La **unidad atómica (indivisible)** de un proceso es una **tarea**.
- Consiste de tareas que **abarcan y cruzan diferentes áreas** de la organización, para entregar valor a sus clientes (internos o externos).
- Puede ser **medible** en términos de métricas e indicadores de rendimiento asociados a sus metas de negocio.
- Está **basado en casos**: un **caso** es una ejecución específica de un proceso.

### Elementos de un proceso de negocio

- **Actividad:** representa el trabajo a realizar en un proceso.
  - **Tarea:** una o más acciones/pasos indivisibles para entregar un paso de valor al proceso.
  - **Subproceso:** actividad compuesta de varias tareas que constituye, a su vez, una tarea en el proceso padre.
- **Eventos:** cosas que suceden en el curso de un proceso.
- **Puntos de control de flujo:** donde el flujo se divide en más caminos o se sincronizan/unen varios caminos (ej.: puntos de decisión, paralelismo).
- **Recursos:** quienes realizan las tareas (recursos humanos, sistemas de software, hardware).
- **Datos:** objetos que se consumen y se generan en las tareas/eventos/flujos de control. Pueden ser físicos (un producto) o inmateriales (documentos electrónicos).
- **Salidas:** los objetos que son de valor para el cliente del proceso.
- **Participantes externos:** los clientes del proceso y quienes interactúan con él consumiendo o proveyendo información.

### Ejemplo de proceso de negocio

Proceso de **gestión de orden** definido en un modelo (pool "Gestión de Orden"):

```
Recibir Orden → (AND-split) ─┬─► Verificar Disponibilidad de Ítems ─┐
                             └─► Verificar Tarjeta de Crédito ───────┴─(AND-join)→ Evaluar Orden
   → (XOR-split) ─┬─[rechazada]─► Enviar rechazo ─────────────────────────────────┐
                  └─[aceptada]──► Enviar aceptación → Solicitar Despacho de        │
                     Productos → (AND-split) ─┬─► Recibir Notificación de Despacho ─┤
                                              └─► Generar Factura → Enviar Factura ─┴─(AND-join)→ Cerrar Orden → Fin
```

Casos (instancias) del proceso de gestión de orden, cada uno con su propio estado:

- Orden n.º 1120 — Estado: Cerrada.
- Orden n.º 1121 — Estado: Rechazada.
- Orden n.º 1122 — Estado: Aceptada.
- Orden n.º 1123 — Estado: En evaluación.

### Beneficios de la gestión por procesos

¿Por qué gestionar procesos? Porque:

- Incrementa la **eficiencia operacional**.
- Permite una **adaptación rápida a los cambios**.
- Da **visibilidad global** de las operaciones y mejor control.
- Mejora la **comunicación, la productividad y la calidad**.
- Permite la **reducción de costos** y una asignación eficiente de recursos.

---

## 2. Gestión de Procesos de Negocio (BPM): ciclo de vida

### ¿Qué es BPM (Business Process Management)?

- Es una **estrategia de mejoramiento continuo** de los procesos de una organización.
- Es la aplicación de **métodos, técnicas y software** al **diseño, ejecución, control y análisis** de procesos de negocio que involucran personas, organizaciones, aplicaciones, documentos y otras fuentes de información.
- **Objetivo:** mejorar la eficiencia y el rendimiento de una organización.

> **Fundamento esencial:** la **representación explícita** de los procesos de negocio. Esto posibilita analizar, redefinir, mejorar y ejecutar los procesos.

### Ciclo de vida (cuatro fases)

Ciclo iterativo que gira en torno a los **Procesos**:

1. **Evaluación** — evaluación de la situación existente:
   - Análisis de los resultados de monitoreo.
   - Análisis de los casos.
   - Evaluar resultados vs. metas de negocio.
   - Explicitar cada proceso actual ("As-is process") en un modelo.
2. **(Re)diseño** — diseño de la situación futura:
   - Rediseño o mejora de los procesos → "To-be processes".
   - Incorporar puntos de mejora y/o innovación en los modelos de procesos.
   - Verificación y validación.
3. **Implementación** — Tecnologías de Información para la gestión de procesos:
   - Desarrollo de un sistema de información.
   - Configuración de un Sistema de Gestión de Procesos de Negocio (BPMS).
4. **Ejecución** — ejecución (gestión) de los casos de los procesos:
   - De acuerdo a un modelo de proceso.
   - Monitoreo para evaluar estados.
   - Recolección de información de gestión.

### Ciclo de vida (modelo de seis fases, Dumas et al.)

Versión más detallada del ciclo, con los artefactos que se producen entre fases:

```
                       ┌────────────────────────┐
                       │ Process identification │
                       └───────────┬────────────┘
                                   │ Process architecture
                                   ▼
        ┌──────────────────────────────────────────────────┐
   ┌───►│                 Process discovery                 │
   │    └─────────────────────────┬────────────────────────┘
   │                              │ As-is process model
   │ Conformance and              ▼
   │ performance       ┌────────────────────┐
   │ insights          │  Process analysis  │
   │                   └─────────┬──────────┘
   │                             │ Insights on weaknesses
   │                             │ and their impact
   │                             ▼
┌──┴──────────────────┐   ┌────────────────────┐
│ Process monitoring  │   │  Process redesign  │
│   and controlling   │   └─────────┬──────────┘
└─────────▲───────────┘             │ To-be process model
          │ Executable              ▼
          │ process     ┌────────────────────────┐
          │ model       │ Process implementation │
          └─────────────┴────────────────────────┘
```

El flujo es **circular**: la columna izquierda desciende, la fila inferior conecta *Process redesign* con *Process implementation*, la columna derecha asciende, y *Process monitoring and controlling* cierra el ciclo retornando a *Process discovery*.

Secuencia: *Process identification → Process discovery → Process analysis → Process redesign → Process implementation → Process monitoring and controlling*, y de vuelta a *Process discovery*. (Fuente: M. Dumas et al., *Fundamentals of BPM*, Springer-Verlag, 2013.)

### Características de la Gestión de Procesos de Negocio

- **Estructura organizacional centrada en procesos:** mediante el análisis, rediseño y mejora continua de los procesos, la organización puede alcanzar eficiencia, reducir costos, mejorar sus beneficios y adaptarse rápidamente a cambios, alineando los procesos con las estrategias y metas.
- Es una **estrategia de mejoramiento continuo** de procesos.
- **Alineación** de los procesos de negocio con las metas y estrategias de la organización.
- **Alineación** de los sistemas de información con los procesos.
- **Definición de mecanismos de medición** de procesos que se alineen con las metas.
- **Ejecución, control y análisis** de los procesos de negocio.
- **No implica sólo** un proyecto de desarrollo de software o de IT.

### Ciclo de vida y herramientas de software

A cada etapa del ciclo le corresponden herramientas de software:

- **Diagnóstico:** Herramientas de *Process Mining*.
- **Análisis y (Re)diseño:** Herramientas de Análisis y/o Simulación de Procesos.
- **Implementación:** Herramientas de Modelado y Especificación de Procesos de Negocio.
- **Ejecución:** Servicio de Ejecución del BPMS.
- **Monitoreo:** Herramientas de Monitoreo y Control.

> Las herramientas y sistemas que soportan las etapas de la gestión de procesos de negocio pueden formar parte de un mismo BPMS o ser aplicaciones separadas.

---

## 3. Enfoque metodológico para implementar BPM

### Tres niveles de implementación

La implementación de BPM se aborda en una pirámide de tres niveles:

- **Nivel organizacional:** definir el mapa de procesos y la alineación de los procesos con las metas estratégicas y de negocio.
- **Nivel de proceso:** rediseño o mejora de procesos.
- **Nivel de implementación:** proyectos de implementación de sistemas de información orientados a procesos.

### Indicadores de rendimiento de procesos (KPIs)

Los procesos se miden en tres dimensiones:

| Dimensión | Indicadores |
|---|---|
| **Costo** | Costo de ejecución, utilización de recursos, desperdicio/despilfarro |
| **Tiempo** | Tiempo de ciclo promedio, tiempos de espera, tiempos de procesamiento |
| **Calidad** | Tasa de errores, violaciones de acuerdos de nivel de servicio (SLA), feedback del cliente |

### Identificación de procesos: definir el mapa o arquitectura de procesos

Enfoques para definir el mapa/arquitectura de procesos:

- Basado en la **cadena de valor**.
- Basado en **modelos de referencia**.
- Clasificando los procesos en **de soporte, gerenciales y operativos**.

### Rediseño o mejora de un proceso (As-Is → To-Be)

El rediseño parte del proceso existente y produce el proceso mejorado:

```
   Medidas de rendimiento            Medidas de rendimiento deseadas
   del proceso existente             del proceso rediseñado/modificado
            │                                      │
            ▼                                      ▼
   ┌──────────────────┐                 ┌──────────────────────┐
   │   As-Is Process  │                 │    To-be Process     │
   │     (Proceso     │  ───────────►   │ (Proceso Rediseñado  │
   │    Existente)    │                 │     o Mejorado)      │
   └──────────────────┘                 └──────────────────────┘
   ┌──────────────────┐                 ┌──────────────────────┐
   │   Análisis del   │                 │    Re/diseño del     │
   │      Proceso     │                 │       Proceso        │
   └──────────────────┘                 └──────────────────────┘

   1- Definir el As-Is    2- Determinar         3- Definir cómo
   (cómo es hoy)             necesidades            debería ser
                            de cambios             el proceso
```

La flecha central, **verticalmente centrada** respecto de las cajas As-Is y To-Be, es sólo el conector entre ambos estados del proceso (existente y rediseñado), no un paso del procedimiento.

- **Medidas de rendimiento del proceso existente** (As-Is) vs. **medidas de rendimiento deseadas** del proceso rediseñado o modificado (To-Be).
- Pasos:
  1. Definir el **As-Is** (cómo es hoy el proceso).
  2. Determinar las **necesidades de cambios**.
  3. Definir **cómo debería ser** el proceso (To-Be).

---

## Ejercicios

**¿Proceso de negocio o actividad?** (clasificar cada caso):

1. "La creación y carga del formulario de una orden de venta."
2. "La evaluación de la gestión de las órdenes de ventas."
3. "La gestión de una orden de venta."
4. "La generación del plan de órdenes de compras a partir de un sistema MRP."

**Verdadero o Falso (justificar):**

- Un proceso de negocio expresa tareas, eventos, flujos de control y recursos.
- La gestión por procesos implica una vista horizontal y vertical de la estructura de la organización.
- La gestión de procesos de negocio tiene como principal objetivo la automatización de los procesos de negocio.
- La gestión de procesos de negocio tiene como principal objetivo la medición de los procesos de negocio.

---

## Síntesis del apunte

Esta presentación introduce **BPM** como disciplina de gestión. El hilo conceptual es:

1. **Del organigrama al proceso:** la gestión funcional/vertical oculta clientes, productos, recursos y, sobre todo, los procesos que cruzan horizontalmente la organización; la gestión por procesos hace explícita esa vista transversal y permite analizar, medir y mejorar.
2. **Qué es un proceso de negocio:** actividades ordenadas que transforman entradas en salidas de valor para el cliente, con sus elementos (actividades/tareas/subprocesos, eventos, puntos de control de flujo, recursos, datos, salidas y participantes externos) y su noción de caso/instancia.
3. **BPM y su ciclo de vida:** estrategia de mejora continua basada en la representación explícita de los procesos, formalizada en un ciclo iterativo (versión de cuatro fases de la cátedra y versión de seis fases de Dumas et al.), apoyada en herramientas de software por etapa.
4. **Implementación:** los tres niveles (organizacional, de proceso, de implementación), la medición por KPIs (costo, tiempo, calidad) y el rediseño As-Is → To-Be.
