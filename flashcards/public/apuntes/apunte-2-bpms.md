---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 2
unidad: 2
titulo_unidad: Gestión de Procesos de Negocio
temas_del_plan:
  - "Sistemas de Información Orientados a Procesos: clasificaciones y tipos."
  - "Gestión de Workflows: gestión de recursos, distribución y asignación de tareas."
  - Arquitectura genérica de los Sistemas de Gestión de Procesos de Negocio.
presentacion_fuente: "Unidad_2_-_01_-_BPMS_-_SG (2025).pdf"
anio: 2025
---

# Apunte 2 — Sistemas de Gestión de Procesos de Negocio (BPMS)

> **Unidad 2 — Gestión de Procesos de Negocio.** Primera presentación de la unidad. Aborda los Sistemas de Información Orientados a Procesos (SIOP / *Process-Aware Information Systems*) y, dentro de ellos, los Sistemas de Gestión de Procesos de Negocio (BPMS): cómo automatizan procesos, su arquitectura genérica y la gestión de recursos en la ejecución de workflows. Cubre, del plan analítico, los temas: *Sistemas de Información Orientados a Procesos (clasificaciones y tipos)*, *Arquitectura genérica de los BPMS* y *Gestión de Workflows (gestión de recursos, distribución y asignación de tareas)*.

**Docente responsable:** Dr. Pablo D. Villarreal

**Bibliografía de referencia de la presentación:**

- Marlon Dumas, Marcello La Rosa, Jan Mendling, Hajo A. Reijers, *Fundamentals of Business Process Management* (2.ª ed.), Springer-Verlag Berlin Heidelberg, 2018 — Capítulo 9.
- Mathias Weske, *Business Process Management: Concepts, Languages, Architectures*, Springer-Verlag Berlin Heidelberg, 2012 — Secciones 2.4 y 7.1.

---

## Agenda de la presentación

1. Sistemas de Información Orientados a Procesos (*Process-Aware Information Systems*)
2. Automatización de Procesos
3. Arquitectura Genérica de los Sistemas de Gestión de Procesos de Negocio / Workflows
4. Gestión de Recursos en la Automatización de Procesos / Workflows

---

## 1. Sistemas de Información Orientados a Procesos (SIOP)

### Dos tendencias previas en los Sistemas de Información

**Tendencia (1): de orientación a datos a orientación a procesos**

Los sistemas de información orientados a datos:

- Los métodos orientados a datos dominaron los años '70 y '80.
- La TI se enfocó en el almacenamiento, recuperación y presentación de información.
- Surgieron técnicas de modelado y herramientas robustas (modelo Entidad-Relación, DBMS).

**Resultado:**

- La lógica de los procesos de negocio quedó definida *dentro* de las aplicaciones y de los procedimientos manuales: está **implícita**.
- Desventajas de esa lógica implícita:
  - Es difícil optimizar los procesos de negocio y adaptarlos a los cambios.
  - Los procesos de las organizaciones deben ajustarse al sistema de información (y no al revés).
  - Se introducen ineficiencias, pobre separación de responsabilidades, incapacidad de detectar cuellos de botella, operaciones secuenciales innecesarias, pasos redundantes, etc.

**Tendencia (2): desde programación a integración**

- Incremento de aplicaciones específicas del dominio y específicas de cada organización.
- Necesidad de una vista global en la operación de los sistemas de información.
- Cambio: desde la **programación de aplicaciones** hacia la **integración de aplicaciones**.

> Tendencia hacia la **integración** y **orquestación** de piezas de software de cada una de las capas, en lugar de la codificación de módulos individuales.

### La idea principal de un SIOP

Un Sistema de Información Orientado a Procesos (*Process-Aware Information System*) separa dos niveles:

```
   ┌─────────────────────────────┐
   │  Process-Aware Information   │   ← gestión de la LÓGICA DEL PROCESO
   │           System            │
   └─────────────────────────────┘
   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
   ┌──────────────┐      ┌───────┐
   │  Aplicación  │      │  BD   │   ← ejecución de las ACTIVIDADES
   └──────────────┘      └───────┘
```

**Objetivos:**

- Separar la lógica de las aplicaciones de la lógica de los procesos de negocio.
- Definir y gestionar en forma **explícita** la lógica de los procesos.

### Definición de SIOP

> Un **Sistema de Información Orientado a Procesos** es aquel sistema de software que gestiona y ejecuta procesos —los cuales involucran personas, aplicaciones y/o fuentes de información— sobre la base de **Modelos de Procesos**.

### Modelo de proceso, instancia y SIOP

> Un **Modelo (Definición o Especificación) de Proceso** representa la estructura de un proceso, esto es, las posibles actividades y secuencias de actividades del mismo, junto con los recursos que soportan dichas actividades.

- Un SIOP **interpreta** modelos de procesos para llevar a cabo la ejecución de los procesos.
- La ejecución implica crear una **instancia de proceso** a partir de un modelo. La instancia es gestionada por el SIOP.
- Una instancia de proceso es única y representa un caso o proceso particular.
  - Ej.: el proceso de la orden de compra n.º 1546.

### Beneficios de los SIOP

- Los modelos de procesos sirven como medio de comunicación entre analistas de negocio e ingenieros en sistemas.
- Los modelos de procesos permiten cambiar los procesos de negocio sin modificar el código de los sistemas que soportan las tareas.
- La representación explícita de los procesos:
  - Permite que puedan ser ejecutados y automatizados a través de un sistema de información.
  - Posibilita el soporte de gestión en el nivel de (re)diseño (simulación y análisis de procesos).
  - Permite el control y monitoreo de los procesos.

### Tipos de SIOP

- **SIOP específicos del dominio:**
  - Sistemas ERP.
  - Sistemas CRM (*Customer Relationship Management*).
  - Sistemas SCM (*Supply Chain Management*).
- **SIOP genéricos (agnósticos del dominio):**
  - Sistemas de Gestión de Procesos de Negocio (BPMS).
  - Sistemas de seguimiento de tickets.

### Tecnología a estudiar en el curso

Dentro de los SIOP, el curso se centra en los **Sistemas de Gestión de Procesos de Negocio / Workflow**, que soportan:

- **Procesos de Persona-a-Aplicación y de Aplicación-a-Aplicación:** tareas humanas e interacción entre personas, y tareas automatizadas e interacciones entre aplicaciones. Soporte para que personas y aplicaciones trabajen en forma integrada.
- **Procesos estructurados:** la ejecución del proceso sigue el modelo de proceso definido a priori.
- **Procesos intra-organizacionales:** tradicionales; involucran personas y aplicaciones dentro de una organización.

### Ejercicios (Verdadero/Falso, justificar)

1. Un sistema desarrollado para gestionar el procesamiento de expedientes puede ser considerado un SIOP.
2. Un Sistema ERP es un SIOP.
3. La implementación de un SIOP requiere codificar de manera integrada (en un mismo código) la lógica del flujo de control de las actividades junto con la lógica interna de las actividades.
4. Un sistema de gestión de proyectos basado en la técnica PERT/CPM puede ser considerado un SIOP.
5. Un proceso que tiene definidos todos los posibles caminos de excepción es un proceso débilmente estructurado.

---

## 2. Automatización de Procesos y Workflows

### Del modelo a la ejecución

La automatización articula tres artefactos, cada uno definido por un medio distinto:

```
  Modelo de Proceso  ──►  Especificación de Proceso  ──►  Ejecución del Proceso
        │                          │                            │
   definido por               definido por                 realizada por
        ▼                          ▼                            ▼
  Lenguaje de Modelado     Lenguaje de Especificación    Sistema de Gestión de
  de Procesos de Negocio   de Procesos                   Procesos de Negocio
```

### Especificación de proceso (modelo ejecutable)

> Una **especificación de proceso** (especificación de workflow o **modelo ejecutable**) es la representación de un proceso de negocio en un formato que puede ser interpretado por un sistema de gestión de procesos de negocio/workflows para dar soporte a la ejecución del proceso.

Esta definición o especificación consiste de:

- **Tareas** y sus relaciones de precedencia.
- **Flujo de control** del proceso (ruteo de las tareas).
- **Datos** del proceso y cómo se pasan entre las tareas.
- **Recursos** que ejecutan las tareas y cómo se invocan: participantes, aplicaciones de software.

### Caso / Instancia de proceso

- Un **caso** o **instancia de proceso** hace referencia a la "cosa" (producto, información o servicio) a ser procesada siguiendo la definición del proceso. Ej.: la orden de compra n.º 1024, el reclamo Rec-3468.
- Representa una **ejecución específica** del proceso.
- Cada instancia se controla independientemente y mantiene su propio estado de ejecución.

El **estado** del caso o instancia está determinado por:

- **Variables de instancia del proceso:** valor que poseen los *atributos del proceso*, utilizados para el ruteo de las actividades.
- **Condiciones sobre la estructura del proceso:** dependencias entre actividades, actividades ejecutadas y habilitadas.

### Ciclo de vida de la instancia de un proceso/workflow

Estados y transiciones (máquina de estados):

- Estado inicial → **Iniciado** (transición `/iniciar`).
- **Iniciado** → **En Ejecución** (`/comenzar`); **En Ejecución** → **Iniciado** (`/recomenzar`).
- **En Ejecución** ↔ **Suspendido** (`/suspender` y `/reanudar`).
- **En Ejecución** ↔ **Activo**.
- **En Ejecución** → **Finalizado** → estado final.
- Desde **Suspendido**, **En Ejecución** o **Activo** se puede pasar a **Interrumpido** (`/interrumpir`) → estado final.

### Ciclo de vida de la instancia de una actividad

> **Instancia de una actividad:** es la ejecución de una actividad en un caso o instancia de proceso/workflow específica.

Estados y transiciones:

```
(inicio) /iniciar → Iniciada /habilitar → Habilitada /comenzar → En Ejecución → Finalizado → (fin)
                                                                      ↑↓
                                                        /suspender ↑   ↓ /reanudar
                                                                Suspendido
```

### Ítem de Trabajo (Work Item) y Lista de Trabajos (Worklist)

> **Ítem de Trabajo (Work Item):** representa el trabajo a ser realizado (por un participante del workflow) en el contexto de una actividad dentro de una instancia de un proceso/workflow. Representa que una actividad está lista o habilitada para ser ejecutada por un participante específico.

> **Lista de Trabajos (Worklist):** es una lista de ítems de trabajo (recuperados por el WfMS) asociados con un participante del workflow (o con un grupo de participantes que comparte una lista de ítems de trabajo común).

### Relaciones entre los conceptos de workflows

- Un **Proceso de Negocio** (representa lo que *debería* suceder) está **definido en** una **Especificación del Proceso/Workflow** y es **gestionado por** un **BPMS**.
- La **Especificación del Proceso/Workflow** está **compuesta de actividades** y puede incluir **subprocesos**. Las actividades pueden ser:
  - **Actividades manuales.**
  - **Actividades automatizadas.**
  - **Actividades semiautomatizadas.**
- El **BPMS** controla los aspectos automatizables del proceso a través de la **Instancia del Proceso** (representa lo que *está* sucediendo), que es creada y gestionada a partir de la especificación.
- La **Instancia del Proceso** incluye una o más **Instancias de Actividad**, las cuales se representan mediante:
  - **Ítems de Trabajo:** actividades asignadas a un participante del workflow.
  - **Aplicaciones Invocadas:** herramientas/aplicaciones utilizadas para dar soporte a la actividad.

### Ejercicios

- (V/F) Un modelo de proceso de negocio es un workflow (especificación de proceso ejecutable) cuando: las tareas y el flujo de control están definidos; los datos del proceso y de las tareas están definidos; las aplicaciones a invocar están definidas; y las tareas tienen definidos los recursos que las pueden realizar.
- ¿Una aplicación cliente de correo electrónico puede usarse para llevar a cabo una actividad manual, automática o semiautomática?
- Una actividad automática, ¿requiere de un ítem de trabajo?
- Una actividad manual, ¿requiere de una instancia para su ejecución?
- Cuando un ítem de trabajo es ofertado a los recursos, ¿implica que la tarea/actividad está en ejecución?
- El estado de ejecución de un proceso (o instancia), ¿está definido sólo por las actividades que fueron ejecutadas, las que se están ejecutando y las que deben ejecutarse?

---

## 3. Arquitectura Genérica de los BPMS

### Definición de BPMS

> **Business Process Management System (BPMS):** sistema que soporta el diseño, análisis, ejecución y monitoreo de procesos de negocio sobre la base de modelos de procesos explícitos.

- Es una suite o plataforma de software que provee aplicaciones para dar soporte a las etapas del ciclo de vida de la gestión de procesos de negocio.
- Su propósito es **coordinar la automatización** de un proceso de negocio de modo que todas las tareas se realicen en el momento adecuado mediante el recurso adecuado.
- Es un software de **propósito general**.

### Componentes funcionales (visión general)

Alrededor del **Motor de Procesos** se articulan:

- El **Modelo / Especificación de Proceso**, que el motor **interpreta**.
- Los **Casos del Proceso**, que el motor **gestiona**.
- Los **Datos de ejecución**.
- La **asignación de tareas** a recursos humanos (ej.: Vendedor de Ventas, Empleado de Almacén) mediante un **Sistema de Gestión de Tareas**, y a **aplicaciones externas** (ej.: Sistema de Facturación, Sistema ERP).
- Herramientas de **Modelado/Implementación**, de **Monitoreo/Análisis** y de **Administración**.

### Arquitectura de referencia (modelo WfMC)

Componentes principales y sus relaciones:

- **Herramientas de Modelado:** el Analista/Diseñador de Procesos las usa para **generar** el **Modelo del proceso** y el **Modelo de Recursos** (roles y grupos).
- **Servicio de Ejecución (Enactment) de Procesos:** contiene una o más **Máquina(s) de Proceso** que **interpretan** el modelo. La máquina **mantiene** los *Datos de control de instancias* y **usa** los *Datos de las instancias*.
- **Worklist / Manejador de la Worklist:** los participantes del proceso **interactúan vía** el manejador de la worklist.
- **Aplicaciones:** la máquina de proceso las **invoca**; las aplicaciones **manipulan** los *Datos de las aplicaciones* y **actualizan** los *Datos de las instancias*.
- Las **Herramientas de administración y monitoreo** son usadas por el Administrador y los evaluadores.

*(Fuente del modelo: WfMC — Workflow Management Coalition.)*

### Herramientas de Modelado / Implementación

- **Herramienta de Modelado y Especificación de Procesos de Negocio:**
  - Modelado soportado por un lenguaje **visual**.
  - Especificación soportada por un lenguaje **ejecutable**.
- **Herramienta de Análisis de Procesos:** verificación y simulación de procesos.
- **Herramienta para la Definición de Recursos:** clasifica los recursos (roles, unidades organizacionales) y define las relaciones entre tipos de recursos.

### Servicio de Ejecución (Enactment) de Proceso

- Está compuesto de una o varias **máquinas de procesos**.
- **Interpreta** especificaciones de proceso/workflow.
- **Crea y gestiona** las instancias de proceso.
- Mantiene los **datos de control** de las instancias a través de varias máquinas.
- Puede requerir acceso a los datos del modelo de roles/organización.
- Utiliza **datos relevantes** (atributos del proceso).
- **Invoca** al Manejador de la Worklist y a las aplicaciones externas.

### Aplicaciones cliente del BPMS — Manejador de la Lista de Trabajos

Funciones del manejador de la worklist:

- Presenta los ítems de trabajo a ser realizados por una persona.
- Provee propiedades relevantes de cada ítem de trabajo (información del caso).
- Soporta ordenar y seleccionar ítems.
- Provee información del estado de la máquina de proceso.
- Soporta el inicio de una actividad en un caso específico (al seleccionar un ítem).
- Reporta la terminación de una actividad.

Dos tipos de manejador:

- **Estándar:** provisto por el BPMS.
- **Personalizado o integrado:** desarrollado usando las APIs provistas por el BPMS.

### Herramientas de Administración y Control

- Adición, modificación y eliminación de personas.
- Inspección del estado de las instancias de proceso.
- Manipulación del estado de las instancias ante problemas o excepciones.
- Adición y eliminación de especificaciones de proceso.
- Reconfiguración del BPMS.
- Recolección de datos históricos y presentación de indicadores de performance.

### Ventajas de los BPMS

**Reduce la carga de trabajo:**

- Coordina qué actividades deben ejecutarse y en qué orden, asegurando el progreso de las instancias.
- Automatiza la asignación del trabajo: la organización y las personas no tienen que pasarse o asignar el trabajo ni hacer el seguimiento de las tareas; se erradican esas demoras y pasos. El BPMS transporta el trabajo requerido y lo presenta a los usuarios mediante ítems de trabajo, o bien ejecutando aplicaciones (tareas automatizadas).
- Recolecta y gestiona la información relevante para ejecutar cada tarea: pasa la información requerida a cada tarea, de modo que las personas no necesitan recolectarla.

**Integración de sistemas flexible:**

- Posibilita integrar sistemas independientes requeridos para ejecutar las tareas.
- Cumple la función de un *middleware* integrador de aplicaciones.

**Transparencia de ejecución:**

- Provee información de lo que realmente se ejecutó o se está ejecutando.
- Posibilita generar dos tipos de datos: **operacional** (qué casos se están ejecutando y en qué estado) e **histórico** (información de los casos finalizados).

**Cumplimiento de reglas:**

- Asegura que el proceso se ejecute precisamente según la definición del modelo o especificación.
- Las reglas definidas son explícitamente forzadas a cumplirse.

### Ejercicios

- Un modelo de proceso de negocio, ¿es el principal artefacto requerido por un BPMS para soportar la ejecución del proceso?
- Comparando un BPMS con un DBMS, ¿qué características o fundamentos comunes tienen?
- Un BPMS, ¿depende de un DBMS interno para soportar la ejecución de sus procesos?
- Los datos relevantes (atributos) de un proceso/workflow usados para gestionar el flujo de control, ¿son consultados y/o actualizados por el BPMS?
- ¿Qué aplicaciones interactivas debería proveer un BPMS para soportar la ejecución de los procesos/workflows?
- ¿Un BPMS es el encargado de ejecutar la lógica de automatización de las tareas?

---

## 4. Gestión de Recursos en la Automatización de Workflows

### Conceptos: tarea, ítem de trabajo e instancia de tarea

Asignación de tareas a recursos (personas), distinguiendo tres niveles:

- **Tarea:** un paso lógico que puede ejecutarse en diferentes instancias (casos) de un proceso/workflow.
- **Ítem de Trabajo = tarea + caso:** un paso lógico que puede ejecutarse en un caso (instancia). Es ofrecido y/o asignado a recursos (personas).
- **Instancia de Tarea = tarea + caso + recurso:** la ejecución de una actividad en un caso por un único recurso (persona).

Los recursos humanos se clasifican típicamente por:

- **Rol:** clasificación basada en *qué puede hacer* un recurso.
- **Grupo** (departamento, equipo, unidad organizacional): clasificación basada en la estructura de la organización.

> Los **Modelos de Recursos** se definen en forma separada de los modelos de workflows.

### Ejemplo: proceso de Gestión de Demandas/Reclamos

Modelo del proceso (notación tipo BPMN, pool "Gestión de Reclamo"):

```
Inicio → Registrar Reclamo → (AND-split) ─┬─► Contactar Cliente ─┐
                                          └─► Contactar Dpto ─────┴─(AND-join)→ Recolectar
   Información → Evaluar → (XOR-split) ─┬─► Pagar ───────┐
                                       └─► Enviar Carta ─┴─► Archivar → Fin
```

**Modelo de recursos del ejemplo**

Recursos por tipo:

| Tipo de recurso | Recursos |
|---|---|
| Rol: Empleado | Pablo, Roberto, Verónica, Pedro, María |
| Rol: Evaluador | María, Carlos |
| Dpto: Reclamos | Pablo, Roberto, Verónica, Carlos, María |
| Dpto: Finanzas | Verónica, Pedro |

Requisitos de recurso por actividad:

| Actividad | Rol | Unidad organizacional |
|---|---|---|
| Registrar | — | — |
| Contactar_cliente | Empleado | Dpto: Reclamos |
| Contactar_dpto | Empleado | Dpto: Reclamos |
| Recolectar | — | — |
| Evaluar | Evaluador | Dpto: Reclamos |
| Pagar | Empleado | Dpto: Finanzas |
| Enviar carta | Empleado | Dpto: Reclamos |
| Archivar | — | — |

### Ejemplo: ítems de trabajo, instancias y listas de trabajo

Con seis casos (instancias) en ejecución, el BPMS deriva los siguientes artefactos.

**Ítems de Trabajo** (actividades habilitadas, aún sin recurso asignado):

| Caso | Actividad |
|---|---|
| Caso 1 | pagar |
| Caso 3 | evaluar |
| Caso 5 | contactar_cliente |
| Caso 5 | contactar_dpto |

**Instancias de Actividades** (ya en ejecución por un recurso):

| Caso | Actividad | Recurso |
|---|---|---|
| Caso 2 | evaluar | María |
| Caso 4 | contactar_dpto | Pablo |
| Caso 6 | registrar | — |

**Listas de trabajo derivadas** (según rol/unidad de cada persona):

- *Usuario María* (Empleado y Evaluador, Dpto. Reclamos): Caso 3 → evaluar; Caso 5 → contactar_cliente; Caso 5 → contactar_dpto.
- *Usuario Pablo* (Empleado, Dpto. Reclamos): Caso 5 → contactar_cliente; Caso 5 → contactar_dpto.
- *Usuario Pedro* (Empleado, Dpto. Finanzas): Caso 1 → pagar.

Este ejemplo muestra cómo un mismo ítem de trabajo puede ofrecerse a varias personas (las que cumplen el rol y la unidad organizacional requeridos), y cómo, al ser tomado por una persona, se convierte en una instancia de tarea asignada a ese único recurso.

### Ejercicios (Verdadero/Falso, justificar)

- Un ítem de trabajo representa la ejecución de una tarea en un proceso/workflow.
- Un ítem de trabajo sólo puede ser asignado a una única persona.
- Una lista de ítems de trabajo, ¿puede ser compartida por varias personas?
- Un ítem de trabajo es creado para la ejecución de una tarea o actividad automática.
- Un usuario de un proceso o workflow sólo puede ejecutar una tarea a la vez.
- Las tareas de un proceso son ofrecidas y/o asignadas a los usuarios de acuerdo al rol y/o unidad organizacional a la que pertenecen.

---

## Síntesis del apunte

Esta presentación encuadra a los **BPMS** dentro de la familia más amplia de los **Sistemas de Información Orientados a Procesos (SIOP)**, cuya idea central es separar la lógica del proceso de la lógica de las aplicaciones y gestionarla de forma explícita mediante **modelos de procesos**. Sobre esa base se desarrollan tres ejes:

1. **Automatización:** la cadena *modelo → especificación ejecutable → ejecución*, y los conceptos operativos de instancia (caso), instancia de actividad, ítem de trabajo y worklist, junto con sus ciclos de vida.
2. **Arquitectura:** los componentes del BPMS según el modelo de la WfMC (motor/servicio de ejecución, herramientas de modelado, manejador de la worklist, aplicaciones, administración y monitoreo) y las ventajas que aporta (reducción de carga de trabajo, integración flexible, transparencia y cumplimiento de reglas).
3. **Gestión de recursos:** cómo el BPMS distribuye y asigna tareas a personas según roles y unidades organizacionales, ilustrado con el proceso de gestión de reclamos.
