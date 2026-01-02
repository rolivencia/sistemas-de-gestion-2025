# Sistemas de Gestión de Procesos de Negocio (Business Process Management Systems)

**Asignatura:** Sistemas de Gestión  
**Docente:** Dr. Pablo D. Villarreal  
**Institución:** UTN FRSF - ISI (2025)

---

## Bibliografía

- **LIBRO:** Marlon Dumas, Marcello La Rosa, Jan Mendling, Hajo A. Reijers. *Fundamentals of Business Process Management (2nd Edition)*, Springer-Verlag Berlin Heidelberg, 2018
    - Capítulo 9

- **LIBRO:** Weske, Mathias. *Business Process Management: Concepts, Languages, Architectures*. Springer-Verlag Berlin Heidelberg 2012.
    - Capítulo/Sección 2.4
    - Capítulo/Sección 7.1

---

## Agenda

1. Sistemas de Información Orientados a Procesos (Process-Aware Information Systems)
2. Automatización de Procesos
3. Arquitectura Genérica de los Sistemas de Gestión de Procesos de Negocio/Workflows
4. Gestión de Recursos en la Automatización de Procesos/Workflows

---

## 1. Sistemas de Información Orientados a Procesos (Process-Aware Information Systems)

### Tendencias en Sistemas de Información: (1) De Orientación a Datos a Orientación a Procesos

#### Sistemas de información orientados a datos:

- Métodos orientados a datos dominaron los '70 y los '80
- La TI se enfocó en el almacenamiento, recuperación y presentación de información
- Surgimiento de técnicas de modelado y herramientas robustas (modelo E-R, DBMSs)

#### Resultado:

- Lógica de los procesos de negocio fue definida dentro de las aplicaciones y procedimientos manuales (está implícita)

#### Desventajas:

- Difícil optimizar y adaptar a cambios a los procesos de negocio
- Los procesos de las organizaciones deben ajustarse al sistema de información
- Se introducen ineficiencias, pobre separación de responsabilidades, incapacidad de detectar cuellos de botella, operaciones secuenciales innecesarias, pasos redundantes, etc.

---

### Tendencias en Sistemas de Información: (2) Desde Programación a Integración

- Incremento de aplicaciones específicas del dominio y específicas de las organizaciones
- Necesidad de una vista global en la operación de sistemas de información
- Cambio: desde Programación de Aplicaciones a Integración de Aplicaciones

> **Tendencia hacia la Integración y Orquestación de piezas de software de cada una de las capas, en lugar de la codificación de módulos individuales**

---

### La Idea Principal de los SIOP

La arquitectura de un Sistema de Información Orientado a Procesos separa dos niveles:

- **Gestión de la lógica del proceso:** Manejada por el Process-Aware Information System
- **Ejecución de las actividades:** Realizadas por las Aplicaciones

#### Objetivos:

- Separar la lógica de las aplicaciones de la lógica de los procesos de negocio
- Definir y gestionar en forma explícita la lógica de los procesos

---

### Definición de Sistema de Información Orientado a Procesos

> Un **Sistema de Información Orientado a Procesos** es aquel sistema de software que gestiona y ejecuta procesos, los cuales involucran personas, aplicaciones y/o fuentes de información, sobre la base de **Modelos de Procesos**

---

### Modelo de Proceso

> Un **Modelo (Definición o Especificación) de Proceso** representa la estructura de un proceso, esto es, las posibles actividades y secuencias de actividades del mismo, junto con los recursos que soportan dichas actividades

- Un SIOP interpreta modelos de procesos para llevar a cabo la ejecución de los procesos
- La ejecución implica crear una **instancia de proceso** a partir de un modelo. La instancia es gestionada por el SIOP.
- Una **instancia de proceso** es única y representa un caso o proceso particular.
    - Ejemplo: el proceso de la orden de compra nro. 1546

---

### Beneficios de los SIOP

- **Modelos de procesos sirven como medio de comunicación** entre analistas de negocio e ingenieros en sistemas
- **Modelos de procesos permiten cambiar los procesos de negocio** sin modificar el código de los sistemas que soportan las tareas de los procesos
- **Representación explícita de los procesos:**
    - Permite que los mismos puedan ser ejecutados y automatizados a través de un sistema de información
    - Posibilita un soporte de gestión en el nivel de (re)diseño (Simulación y análisis de los procesos)
    - Permite el control y monitoreo de los procesos

---

### Tipos de Sistemas de Información Orientados a Procesos

#### Sistemas de Información Orientados a Procesos Específicos del Dominio:

- Sistemas ERP
- Sistemas CRM (Customer Relationship Management)
- Sistemas SCM (Supply Chain Management)

#### Sistemas de Información Orientados a Procesos Genéricos (Agnósticos del Dominio):

- Sistemas de Gestión de Procesos de Negocio
- Sistemas de Seguimiento de Tickets

---

### Tecnologías a estudiar en el curso

#### Sistemas de Gestión de Procesos de Negocio / Workflow que soportan:

**Procesos de Persona-a-Aplicación y de Aplicación-a-Aplicación:**
- Tareas humanas e interacción entre personas y tareas automatizadas e interacciones entre aplicaciones
- Soporte para que personas y aplicaciones trabajen en forma integrada

**Procesos estructurados:**
- La ejecución del proceso sigue el modelo de proceso definido a priori

**Procesos intra-organizacionales:**
- Tradicionales. Involucran personas y aplicaciones dentro de una organización

---

### Ejercicios - SIOP

Responda Verdadero o Falso y justifique su respuesta:

1. Un sistema desarrollado para gestionar el procesamiento de expedientes puede ser considerado un SIOP
2. Un Sistema ERP es un SIOP
3. La implementación de un SIOP requiere codificar de manera integrada (en un mismo código) la lógica del flujo de control de las actividades junto con la lógica interna de las actividades
4. Un sistema de gestión de proyectos basado en la técnica PERT/CPM puede ser considerado un SIOP
5. Un proceso que tiene definido todos los posibles caminos de excepción es un proceso débilmente estructurado

---

## 2. Automatización de Procesos

### Flujo de Automatización de Procesos y Workflows

```
Modelo de Proceso → Especificación de Proceso → Ejecución del Proceso
      ↓                      ↓                         ↓
Definido a través de   Definido a través de      Realizada por
      ↓                      ↓                         ↓
Lenguaje de Modelado   Lenguaje de              Sistema de Gestión
de Procesos de         Especificación de        de Procesos de
Negocio                Procesos                 Negocio
```

---

### Especificación de Proceso

> Una **especificación de proceso** (especificación de workflow o modelo ejecutable) es la representación de un proceso de negocio en un formato que puede ser interpretado por un sistema de gestión de procesos de negocio/workflows para dar soporte a la ejecución del proceso.

#### Esta definición o especificación consiste de:

- Tareas y sus relaciones de precedencia
- Flujo de control del proceso (ruteo de las tareas)
- Datos del proceso, cómo se pasan entre las tareas
- Recursos que ejecutan las tareas y cómo se invocan: participantes, aplicaciones de software

---

### Caso/Instancia de Proceso/Workflow

- Un **caso** o **instancia de proceso** hace referencia a la "cosa" (producto, información o servicio) a ser procesada siguiendo la definición del proceso
    - Ejemplo: la orden de compra nro 1024, el reclamo Rec-3468
- Representa una ejecución específica del proceso
- Cada instancia es controlada independientemente y mantiene su propio estado de la ejecución del proceso

#### El estado del caso o instancia está determinado por:

- **Variables de instancia del proceso:** valor que poseen los atributos del proceso que son utilizados para el ruteo de las actividades
- **Condiciones sobre la estructura del proceso:** dependencias entre actividades, actividades ejecutadas y habilitadas

---

### Ciclo de Vida de la Instancia de un Proceso/Workflow

```
                              / interrumpir
           ┌─────────────┐        ┌─────────────┐
           │ Suspendido  │───────→│ Interrumpido│───→●
           └─────────────┘        └─────────────┘
                ↑    │                   ↑
    / suspender │    │ / reanudar        │ / interrumpir
                │    ↓                   │
●───→┌──────────┐  / comenzar  ┌───────────────┐      ┌────────┐
     │ Iniciado │─────────────→│ En Ejecución  │      │ Activo │
     └──────────┘              └───────────────┘      └────────┘
  / iniciar        / recomenzar ↑      │
                                │      │
                                └──────┤
                                       ↓
                               ┌───────────┐
                               │ Finalizado│───→●
                               └───────────┘
```

**Estados:** Iniciado → En Ejecución → Finalizado (con posibilidad de Suspendido/Interrumpido)

**Transiciones:** iniciar, comenzar, recomenzar, suspender, reanudar, interrumpir

---

### Instancia de una Actividad

> Es la ejecución de una actividad en un caso o instancia de proceso/workflow específica

#### Ciclo de Vida de la Instancia de una Actividad

```
                    ┌───────────┐
                    │ Suspendido│───→●
                    └───────────┘
                      ↑      │
          / suspender │      │ / reanudar
                      │      ↓
●───→┌──────────┐  / habilitar  ┌───────────┐  / comenzar  ┌─────────────┐        ┌───────────┐
     │ Iniciada │──────────────→│ Habilitada│─────────────→│ En Ejecución│───────→│ Finalizado│───→●
     └──────────┘               └───────────┘              └─────────────┘        └───────────┘
  / iniciar
```

---

### Ítem de Trabajo (Work Item)

> Representa el trabajo a ser realizado (por un participante del workflow) en el contexto de una actividad dentro de una instancia de un proceso/workflow

- Representa que una actividad está lista o habilitada para ser ejecutada por un participante específico

### Lista de Trabajos (Worklist)

> Es una lista de ítems de trabajo (recuperados por el WfMS) asociados con un participante del workflow (o con un grupo de participantes que comparte una lista de ítems de trabajo común)

---

### Relaciones entre conceptos de workflows

```
                    Proceso de Negocio
                  (representa lo que debería suceder)
                           │
           ┌───────────────┴───────────────┐
           │                               │
     definido en                    gestionado por
           │                               │
           ↓                               ↓
┌──────────────────────┐         ┌─────────────────────────────┐
│  Especificación del  │         │ Sistema de Gestión de       │
│  Proceso/Workflow    │         │ Procesos de Negocio/Workflow│
│(representa lo que    │         │                             │
│ debería suceder)     │         │controla los aspectos        │
└──────────────────────┘         │automatizables del proceso   │
         │                       │de negocio a través de       │
         │ Compuesto de          └─────────────────────────────┘
         │                                    │
         ↓                            Utilizado para crear
┌────────────────┐                    y gestionar una
│   Subproceso   │                            │
└────────────────┘                            ↓
         │                         ┌──────────────────────┐
         │ Incluye                 │ Instancia del Proceso│
         ↓                         │(representa lo que    │
┌────────────────┐                 │ está sucediendo)     │
│  Actividades   │                 └──────────────────────┘
└────────────────┘                            │
         │                            Incluye una o más
    Las cuales pueden ser                     │
         │                                    ↓
    ┌────┴────┬─────────────┐      ┌──────────────────────┐
    │         │             │      │Instancia de Actividad│
    ↓         ↓             ↓      └──────────────────────┘
┌────────┐ ┌───────────┐ ┌─────────────┐      │
│Manuales│ │Automáticas│ │Semiautomát. │  La cual incluye
└────────┘ └───────────┘ └─────────────┘      │
                │               │             ↓
                │               │      ┌──────┴──────┐
         Representadas por      │      │             │
                │               │      ↓             ↓
                │               │ ┌──────────┐ ┌───────────────┐
                └───────────────┤ │Items de  │ │ Aplicaciones  │
                                │ │Trabajo   │ │ Invocadas     │
                                │ │(asignadas│ │(herramientas/ │
                                │ │a un      │ │aplicaciones   │
                                │ │participan│ │utilizadas para│
                                │ │te del wf)│ │dar soporte)   │
                                │ └──────────┘ └───────────────┘
                                │      y/o
                         Representadas por
```

---

### Ejercicios - Automatización

1. (Verdadero o Falso) Un modelo de proceso de negocio es un workflow (especificación de proceso ejecutable) cuando:
    - Las tareas y el flujo de control están definidos
    - Los datos del proceso y las tareas están definidos
    - Las aplicaciones a ser invocadas están definidas
    - Las tareas tienen definidos los recursos que las pueden realizar

2. ¿Una aplicación cliente de correo electrónico, puede ser utilizada para llevar a cabo una actividad manual, automática o semiautomática?

3. Una actividad automática, ¿Requiere de un ítem de trabajo?

4. Una actividad manual, ¿Requiere de una instancia para su ejecución?

5. Cuando un ítem de trabajo es ofertado a los recursos, ¿implica que la tarea/actividad está en ejecución?

6. El estado de ejecución de un proceso (o instancia) ¿Está definido sólo por las actividades que fueron ejecutadas, las que se están ejecutando y las que deben ejecutarse?

---

## 3. Arquitectura Genérica de los Sistemas de Gestión de Procesos de Negocio/Workflows

### Sistema de Gestión de Procesos de Negocio

#### Business Process Management System (BPMS)

> Sistema que soporta el diseño, análisis, ejecución y monitoreo de procesos de negocio sobre la base de modelos de procesos explícitos

- Es una suite o plataforma de software que provee aplicaciones de software para dar soporte a las etapas del ciclo de vida de la gestión de procesos de negocio
- Tiene como propósito coordinar la automatización de un proceso de negocio de tal manera que todas las tareas se realicen en el momento adecuado mediante el recurso adecuado
- Es un software de propósito general

---

### Componentes de un BPMS

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ┌─────────────────┐      ┌──────────────────┐    ┌────────────────┐  │
│   │ Herramientas de │      │    Modelo/       │    │ Herramientas   │  │
│   │   Monitoreo     │      │ Especificación   │    │  de Modelado/  │  │
│   │   /Análisis     │      │   de Proceso     │    │Implementación  │  │
│   └─────────────────┘      └────────┬─────────┘    └────────────────┘  │
│                                     │                                   │
│                               interpreta                               │
│                                     │                                   │
│   ┌──────────┐              ┌───────▼────────┐  gestiona  ┌─────────┐ │
│   │ Datos de │              │    Motor de    │───────────→│ Caso del│ │
│   │ ejecución│◄─────────────│    Procesos    │            │ Proceso │ │
│   └──────────┘              └───────┬────────┘            └─────────┘ │
│                                     │                      (múltiples)│
│                               asigna tareas                            │
│                                     │                                   │
│         ┌───────────────────────────┼───────────────────────────┐      │
│         │                           │                           │      │
│         ▼                           ▼                           ▼      │
│   ┌───────────┐            ┌──────────────┐            ┌────────────┐ │
│   │ Vendedor  │            │   Sistema    │            │  Sistema   │ │
│   │ (Ventas)  │            │ Facturación  │            │    ERP     │ │
│   └───────────┘            └──────────────┘            └────────────┘ │
│                                                                        │
│   ┌───────────┐     ┌────────────────────────────────────────────┐    │
│   │ Empleado  │     │            Aplicaciones externas           │    │
│   │ (Almacén) │     └────────────────────────────────────────────┘    │
│   └───────────┘                                                        │
│                                                                        │
│   ┌──────────────────────────┐           ┌─────────────────────────┐  │
│   │Sistema de Gestión Tareas │           │Herramientas Administrac.│  │
│   └──────────────────────────┘           └─────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Arquitectura detallada de un BPMS (Fuente: WfMC)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ┌───────────────────────┐                                               │
│    │Analista/Diseñador     │                                               │
│    │de Procesos            │                    ┌─────────────┐            │
│    └───────────┬───────────┘                    │ Aplicaciones│            │
│                │                                └──────┬──────┘            │
│                │                                       │                    │
│    ┌───────────▼───────────┐                    ┌──────▼──────┐            │
│    │   Herramientas de     │                    │             │            │
│    │      Modelado         │      invoca        │  Manipulan  │            │
│    └───────────┬───────────┘◄───────────────────┤             │            │
│                │ Genera                         └──────┬──────┘            │
│                ▼                                       │                    │
│    ┌────────────────────┐                       ┌──────▼──────┐            │
│    │  Modelo del        │                       │ Datos de las│            │
│    │  proceso           │                       │ aplicaciones│            │
│    └────────┬───────────┘                       └─────────────┘            │
│             │ interpretada por                         ▲                    │
│             │                                          │ actualizan         │
│  ┌──────────┼─────────────────────────────────────────┴────────────────┐   │
│  │          ▼                                                          │   │
│  │  ┌─────────────────┐   mantiene   ┌─────────────────┐              │   │
│  │  │   Máquina(s)    │─────────────→│ Datos de control│              │   │
│  │  │   Proceso       │              │  de instancias  │              │   │
│  │  └────────┬────────┘              └─────────────────┘              │   │
│  │           │                                                         │   │
│  │           │ usa            ┌─────────────────┐                     │   │
│  │           │                │ Datos de las    │                     │   │
│  │  ┌────────▼────────┐       │ instancias      │◄────────────────┐   │   │
│  │  │    Worklist     │       └─────────────────┘                 │   │   │
│  │  └────────┬────────┘              ▲                            │   │   │
│  │           │                       │                            │   │   │
│  │ Servicio de Ejecución de Procesos │                            │   │   │
│  └───────────┼───────────────────────┼────────────────────────────┼───┘   │
│              │ interactúa vía        │                            │       │
│              ▼                       │                            │       │
│    ┌─────────────────────┐           │                    ┌───────┴─────┐ │
│    │   Manejador de      │           │                    │ Aplicaciones│ │
│    │   la Worklist       │───────────┘                    └─────────────┘ │
│    └─────────┬───────────┘                                                │
│              │                                                             │
│    ┌─────────▼───────────┐    ┌───────────────────────────┐              │
│    │   Participantes     │    │  Herramientas             │              │
│    │   del Proceso       │    │  administración y monitoreo│              │
│    └─────────────────────┘    └─────────────┬─────────────┘              │
│                                             │                             │
│  ┌────────────────────┐                     │                             │
│  │ Modelo de Recursos │                     │                             │
│  │ (Roles y Grupos)   │◄────────────────────┘                             │
│  └────────────────────┘         ▲                                         │
│                                 │                                         │
│                    ┌────────────┴────────────┐                            │
│                    │ Administrador           │                            │
│                    │ Evaluadores             │                            │
│                    └─────────────────────────┘                            │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

---

### Herramientas de Modelado/Implementación de Procesos

Incluyen:

#### Herramienta para el Modelado y Especificación de Procesos de Negocio
- Modelado soportado por un lenguaje visual
- Especificación soportada por un lenguaje ejecutable

#### Herramienta de Análisis de Procesos
- Verificación y Simulación de Procesos

#### Herramienta para la Definición de Recursos
- Clasifica los recursos (roles, unidades organizacionales)
- Relaciones entre los tipos de recursos

---

### Servicio de Ejecución (Enactment) de Proceso

- Compuesto de una o varias máquinas de procesos
- Interpreta especificaciones de proceso/workflow
- Crea y gestiona las instancias de proceso
- Mantiene datos de control de las instancias de proceso a través de varias máquinas
- Puede requerir acceso a los datos del modelo de roles/organización
- Utiliza datos relevantes (atributos del proceso)
- Invoca al Manejador de la Worklist y a Aplicaciones externas

---

### Aplicaciones Clientes del BPMS

#### Manejador de la Lista de Trabajos:

- Presenta los ítems de trabajo a ser llevados a cabo por una persona
- Provee propiedades relevantes a un ítem de trabajo (información del caso)
- Soporte para ordenar, seleccionar ítems
- Provee información del estado de la máquina de proceso
- Soporta el inicio de una actividad en un caso específico (selección de un ítem)
- Reporta la terminación de una actividad

#### Dos tipos:

- **Manejador Estándar:** provisto por el BPMS
- **Manejador Personalizado o Integrado:** desarrollado usando las APIs provistas por el BPMS

---

### Herramientas de Administración y Control

- Adición, modificación y eliminación de personas
- Inspección del estado de las instancias de proceso
- Manipulación del estado de las instancias de proceso ante problemas o excepciones
- Adición y eliminación de especificaciones de proceso
- Reconfiguración del BPMS
- Recolección de datos históricos y presentación de indicadores de performance

---

### Ventajas de los BPMS

#### Reduce la carga de trabajo

**Coordina qué actividades deben ser ejecutadas y en qué orden:**
- Asegura el progreso de las instancias de los procesos

**Automatiza la asignación del trabajo a ser realizado:**
- La organización y las personas no tienen que encargarse de pasarse o asignar el trabajo requerido en un proceso o hacer el seguimiento de las tareas a ejecutar. Se erradican estas demoras y pasos
- Se encarga de transportar el trabajo requerido y presentarlo a los usuarios a través de ítems de trabajo o bien ejecutando aplicaciones (tareas automatizadas)

**Recolecta y maneja la información relevante para ejecutar cada tarea:**
- Se encarga de pasar la información requerida a cada tarea
- Las personas no necesitan recolectar la información

---

#### Integración de sistemas flexibles
- Posibilita la integración de sistemas independientes, requeridos para la ejecución de tareas de los procesos
- Permite cumplir con la función de un middleware integrador de aplicaciones

#### Transparencia de Ejecución
- Provee información de lo que realmente se ejecutó o se está ejecutando
- Posibilita generar dos tipos de datos:
    - **Operacional:** qué casos se están ejecutando, en qué estado se encuentran
    - **Histórico:** información de los casos finalizados

#### Cumplimiento de Reglas
- Asegura que el proceso sea ejecutado precisamente según la definición del modelo o especificación del proceso
- Las reglas definidas son explícitamente forzadas a ser cumplidas

---

### Ejercicios - Arquitectura BPMS

1. Un modelo de proceso de negocio, ¿Es el principal artefacto requerido por un BPMS para soportar la ejecución del proceso?

2. Comparando un BPMS con un DBMS ¿Qué características o fundamentos comunes tienen?

3. Un BPMS, ¿depende de un DBMS interno para soportar la ejecución de sus procesos?

4. Los datos relevantes (atributos) de un proceso/workflow, utilizados para gestionar el flujo de control del workflow ¿Son consultados y/o actualizados por el BPMS?

5. ¿Qué aplicaciones interactivas debería proveer un BPMS para soportar la ejecución de los procesos/workflows?

6. ¿Un BPMS es el encargado de ejecutar la lógica de automatización de las tareas?

---

## 4. Gestión de Recursos en la Automatización de Procesos/Workflows

### Asignación de tareas a recursos (Personas)

#### Tarea
Un paso lógico que puede ser ejecutado en diferentes instancias (casos) de un proceso/workflow

#### Ítem de Trabajo = tarea + caso
Un paso lógico que puede ser ejecutado en un caso (instancia) de un proceso/workflow. Es ofrecido y/o asignado a recursos (personas)

#### Instancia de Tarea = tarea + caso + recurso
La ejecución de una actividad en un caso (instancia) de un proceso/workflow por un único recurso (persona)

---

### Clasificación de Recursos Humanos

Los recursos humanos se clasifican típicamente por:

- **Rol:** clasificación basada en qué puede hacer un recurso
- **Grupo** (departamento, equipo, unidad organizacional): clasificación basada en la estructura de la organización

> **Modelos de Recursos** son definidos en forma separada de los modelos de workflows

---

### Ejemplo: Proceso de Negocio de Gestión de Demandas/Reclamos

#### Diagrama del proceso (BPMN):

```
                                    ┌───────────────┐
                               ┌───→│   Contactar   │───┐
                               │    │    Cliente    │   │
                               │    └───────────────┘   │
┌───────┐   ┌───────────┐    ┌─┴─┐                     ┌─┴─┐   ┌──────────┐   ┌────────┐         ┌─────────┐   ┌─────┐
│ Inicio│──→│ Registrar │───→│ + │                     │ + │──→│Recolectar│──→│ Evaluar│──►◇──┬──→│  Pagar  │──┐│     │
└───────┘   │  Reclamo  │    └─┬─┘                     └─┬─┘   │Información│  └────────┘   │  └─────────┘  ││ Fin │
            └───────────┘      │    ┌───────────────┐   │     └──────────┘              │               ││     │
                               │    │   Contactar   │   │                               │  ┌─────────┐  │└──┬──┘
                               └───→│     Dpto      │───┘                               └─→│ Enviar  │──┘   │
                                    └───────────────┘                                      │  Carta  │      │
                                                                                           └────┬────┘      │
                                                                                                │  ┌────────┴┐
                                                                                                └─→│ Archivar│─→●
                                                                                                   └─────────┘
```

---

### Modelo de Recursos del Ejemplo

| Tipo de Recurso | Recursos |
|-----------------|----------|
| **Rol: Empleado** | Pablo, Roberto, Verónica, Pedro, María |
| **Rol: Evaluador** | María, Carlos |
| **Dpto: Reclamos** | Pablo, Roberto, Verónica, Carlos, María |
| **Dpto: Finanzas** | Verónica, Pedro |

---

### Asignación de Recursos a Actividades

| Actividad | Rol | Unidad Organizacional |
|-----------|-----|----------------------|
| Registrar | - | - |
| Contactar_cliente | Empleado | Dpto: Reclamos |
| Contactar_dpto | Empleado | Dpto: Reclamos |
| Recolectar | - | - |
| Evaluar | Evaluador | Dpto: Reclamos |
| Pagar | Empleado | Dpto: Finanzas |
| Enviar carta | Empleado | Dpto: Reclamos |
| Archivar | - | - |

---

### Estado de Ejecución de Instancias

Instancias (Casos) en ejecución del proceso *gestión de reclamos* gestionados por un BPMS:

- **Caso 6:** En actividad "Registrar Reclamo"
- **Caso 5:** En actividades paralelas "Contactar Cliente" y "Contactar Dpto"
- **Caso 4:** En actividad "Contactar Dpto" (ya completó una rama del paralelo)
- **Caso 3:** En actividad "Evaluar"
- **Caso 2:** En actividad "Evaluar"
- **Caso 1:** En actividad "Pagar"

---

### Ítems de Trabajo e Instancias de Actividades

#### Ítems de Trabajo (pendientes de asignación/ejecución)

| Caso | Actividad |
|------|-----------|
| Caso 1 | pagar |
| Caso 3 | evaluar |
| Caso 5 | contactar_cliente |
| Caso 5 | contactar_dpto |

#### Instancias de Actividades (en ejecución)

| Caso | Actividad | Recurso |
|------|-----------|---------|
| Caso 2 | evaluar | María |
| Caso 4 | contactar_dpto | Pablo |
| Caso 6 | registrar | - |

---

### Listas de Trabajo por Usuario

#### Lista de Trabajo - Usuario: María

| Caso | Actividades Pendientes |
|------|------------------------|
| Caso 3 | evaluar |
| Caso 5 | contactar_cliente |
| Caso 5 | contactar_dpto |

#### Lista de Trabajo - Usuario: Pablo

| Caso | Actividades Pendientes |
|------|------------------------|
| Caso 5 | contactar_cliente |
| Caso 5 | contactar_dpto |

#### Lista de Trabajo - Usuario: Pedro

| Caso | Actividades Pendientes |
|------|------------------------|
| Caso 1 | pagar |

---

### Ejercicios - Gestión de Recursos

Responda Verdadero o Falso y justifique su respuesta:

1. Un ítem de trabajo representa la ejecución de una tarea en un proceso/workflow
2. Un ítem de trabajo sólo puede ser asignado a una única persona
3. Una lista de ítems de trabajo, ¿Puede ser compartida por varias personas?
4. Un ítem de trabajo es creado para la ejecución de una tarea o actividad automática
5. Un usuario de un proceso o workflow sólo puede ejecutar una tarea a la vez
6. Las tareas de un proceso son ofrecidas y/o asignadas a los usuarios de un proceso de acuerdo al rol y/o unidad organizacional a la que pertenece

---

## Glosario de Términos Clave

| Término | Definición |
|---------|------------|
| **SIOP** | Sistema de Información Orientado a Procesos |
| **BPMS** | Business Process Management System - Sistema de Gestión de Procesos de Negocio |
| **Workflow** | Flujo de trabajo; automatización de un proceso de negocio |
| **Instancia de Proceso** | Ejecución específica de un proceso (caso) |
| **Modelo de Proceso** | Representación de la estructura de un proceso |
| **Especificación de Proceso** | Modelo ejecutable interpretable por un BPMS |
| **Ítem de Trabajo** | Tarea + Caso; trabajo pendiente asignado a recursos |
| **Worklist** | Lista de ítems de trabajo de un participante |
| **Motor de Procesos** | Componente del BPMS que interpreta y ejecuta procesos |
| **Rol** | Clasificación de recursos basada en capacidades |
| **Grupo/Unidad Organizacional** | Clasificación de recursos basada en estructura organizacional |

---

*Documento generado para estudio de la cátedra Sistemas de Gestión - ISI - UTN FRSF (2025)*