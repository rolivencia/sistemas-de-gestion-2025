# Introducción a la Gestión de Procesos de Negocio (Business Process Management)

**Asignatura:** Sistemas de Gestión  
**Docente:** Dr. Pablo D. Villarreal  
**Sistemas de Gestión - ISI - UTN FRSF (2025)**

---

## Bibliografía

- **Marlon Dumas, Marcello La Rosa, Jan Mendling, Hajo A. Reijers.** Fundamentals of Business Process Management, Springer-Verlag Berlin Heidelberg, 2018.
- **Weske, Mathias:** Business Process Management: Concepts, Languages, Architectures. Springer-Verlag Berlin Heidelberg 2012.

---

## Agenda

1. Gestión organizacional tradicional vs Gestión organizacional por procesos
2. Gestión de Procesos de Negocio: Ciclo de Vida
3. Enfoque Metodológico para Implementar la Gestión de Procesos de Negocio

---

# Gestión Organizacional Tradicional

## ¿Cómo describiríamos la estructura de una organización?

El **organigrama** es ampliamente utilizado para representar la estructura y funciones de una organización.

```
                    ┌──────────┐
                    │ Gerencia │
                    └────┬─────┘
                         │
        ┌────────┬───────┼───────┬────────┐
        │        │       │       │        │
   ┌────┴───┐ ┌──┴────┐ ┌┴──────┐ ┌──────┴┐
   │Compras │ │Produc.│ │Logíst.│ │Ventas │
   └────────┘ └───────┘ └───────┘ └───────┘
```

---

## ¿Qué información nos oculta esta forma de visualizar la estructura organizacional?

El organigrama tradicional no muestra:

- **¿Clientes?**
- **¿Productos o Servicios?**
- **¿Recursos requeridos?**
- **¿Procesos y Actividades?**

> *¿Cómo analizamos, definimos, gestionamos estos aspectos?*

---

## Problemas de la Gestión Organizacional Tradicional

Las actividades fluyen horizontalmente a través de las áreas funcionales, pero la estructura jerárquica crea barreras.

### Problemas principales:

1. **Carencia de visibilidad global y conocimiento de las operaciones**
    - Difícil optimizar y adaptarse a cambios
    - Ocultan ineficiencias: pobre separación de responsabilidades, operaciones secuenciales innecesarias, pasos redundantes o innecesarios, cuellos de botella, etc.

2. **Sub-optimización funcional**
    - Cada área optimiza su propio rendimiento sin considerar el impacto global

3. **Pérdida de tiempo e información en las comunicaciones verticales**
    - La información debe subir y bajar por la jerarquía para coordinar entre áreas

---

# Gestión Organizacional por Procesos

## Evolución hacia la gestión por procesos

Nuevas tendencias de Gestión Organizacional en los **'80** y en los **'90** incrementaron el énfasis en analizar y definir la estructura de una organización por medio de los **procesos de negocio**, por ejemplo:

- **Cadena de Valor** (Porter)
- **Gestión de la Calidad de Procesos** (TQM)
- **Reingeniería de Procesos de Negocio** (BPR)

Los procesos atraviesan horizontalmente la estructura organizacional:

```
┌──────────────────────────────────────────────────────────┐
│         Estructura Organizacional (Organigrama)          │
├──────────────────────────────────────────────────────────┤
│ ═══════════════════Proceso A═══════════════════════════► │
│                                                          │
│ ═══════════════════════Proceso B═══════════════════════► │
│                                                          │
│ ══════════════════════════Proceso C════════════════════► │
└──────────────────────────────────────────────────────────┘
```

---

## Definiciones de Proceso de Negocio

### Definición 1:
> *"Un **proceso de negocio** es un conjunto de **actividades** ordenadas e interrelacionadas, que toman uno o más **entradas** y crean una **salida** que es de **valor** al **cliente**, las cuales son realizadas con el propósito de alcanzar una **meta** organizacional de negocio"*

→ Las actividades son realizadas por los **recursos** (personas, sistemas de software) de la organización

### Definición 2 (Dumas et al. 2013):
> *"Un **proceso de negocio** es una colección de **eventos**, **actividades** y **puntos de decisión** interrelacionados que involucran a varios **actores** y **objetos** y que de forma conjunta llevan a un resultado que proporciona **valor** para al menos un **cliente**"*

---

## Características del Proceso de Negocio

- **Define la estructura del flujo de trabajo** de una organización
    - Conjunto ordenado de actividades atómicas o compuestas (subprocesos) que definen la forma de trabajo de la organización

- **La unidad atómica (indivisible)** de un proceso es una **tarea**

- **Consiste de tareas** que abarcan y cruzan diferentes áreas de una organización, para entregar valor a sus clientes (internos o externos)

- **Puede ser medible** en términos de métricas e indicadores de rendimiento asociados a sus metas de negocio

- **Está basado en casos**
    - Un **caso** es una ejecución específica de un proceso

---

## Elementos de un Proceso de Negocio

| Elemento | Descripción |
|----------|-------------|
| **ACTIVIDAD** | Representa el trabajo a realizar en un proceso |
| **TAREA** | Una o más acciones/pasos indivisibles para entregar un paso de valor al proceso |
| **SUBPROCESO** | Actividad compuesta de varias tareas y que constituye una tarea en proceso padre |
| **EVENTOS** | Cosas que suceden en el curso de un proceso |
| **PUNTOS DE CONTROL DE FLUJO** | Donde el flujo se divide en más caminos o se sincronizan/unen varios caminos. Ej: puntos de decisión, paralelismo, etc. |
| **RECURSOS** | Quienes realizan las tareas. Recursos humanos, sistemas de software, hardware |
| **DATOS** | Objetos que se consumen y se generan en las tareas/eventos/flujos de control. Pueden ser: físicos (producto) o inmaterial (documentos electrónicos) |
| **SALIDAS** | Los objetos que son de valor para el cliente del proceso |
| **PARTICIPANTES EXTERNOS** | Los clientes del proceso y quienes interactúan con el proceso consumiendo o proveyendo información |

---

## Ejemplo de Proceso de Negocio

### Definición del proceso de gestión de orden en un modelo:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Gestión de Orden                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ○──►[Recibir]──►◇──►[Verificar Disponibilidad]──►◇                         │
│      [Orden]    │    [de Items]                   │                         │
│                 │                                  │                         │
│                 └──►[Verificar Tarjeta]──────────►┘                         │
│                     [de Crédito]                                            │
│                            │                                                 │
│                            ▼                                                 │
│                     [Evaluar Orden]                                         │
│                            │                                                 │
│              ┌─────────────┼─────────────┐                                  │
│              │ rechazada   │ aceptada    │                                  │
│              ▼             ▼             │                                  │
│        [Enviar        [Enviar           │                                  │
│        rechazo]      aceptación]        │                                  │
│              │             │             │                                  │
│              │             ▼             │                                  │
│              │      [Solicitar Despacho]│                                  │
│              │      [de Productos]      │                                  │
│              │             │             │                                  │
│              │             ◇◄────────────┘                                  │
│              │             │                                                 │
│              │    ┌────────┼────────┐                                       │
│              │    ▼                 ▼                                       │
│              │ [Recibir          [Generar                                   │
│              │ Notificación]     Factura]                                   │
│              │ [Despacho]            │                                      │
│              │    │            [Enviar                                      │
│              │    │            Factura]                                     │
│              │    │                 │                                       │
│              │    └────────┬────────┘                                       │
│              │             ▼                                                 │
│              └────────►◇──►[Cerrar Orden]──►○                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Casos (Instancias) del proceso de gestión de orden:

| Orden | Estado |
|-------|--------|
| Orden nro 1120 | Cerrada |
| Orden nro 1121 | Rechazada |
| Orden nro 1122 | Aceptada |
| Orden nro 1123 | En evaluación |

---

## Beneficios de la Gestión por Procesos

### ¿Por qué gestionar procesos?

La gestión por procesos proporciona beneficios progresivos:

1. **Incrementa la eficiencia operacional**
    - Eliminación de actividades redundantes y optimización del flujo de trabajo

2. **Adaptación rápida a cambios**
    - Mayor agilidad para responder a cambios del mercado o regulatorios

3. **Visibilidad global de las operaciones, mejor control**
    - Permite monitorear y controlar todas las actividades de la organización

4. **Mejora la comunicación, productividad y calidad**
    - Claridad en roles y responsabilidades

5. **Reducción de costos, asignación eficiente de recursos**
    - Optimización del uso de recursos humanos y materiales

---

# Gestión de Procesos de Negocio (BPM)

## ¿Qué es BPM (Business Process Management)?

- Es una **estrategia de mejoramiento continuo** de los procesos de una organización

- La aplicación de **métodos, técnicas y software** al diseño, ejecución, control y análisis de procesos de negocio que involucran personas, organizaciones, aplicaciones, documentos y otras fuentes de información

→ **Objetivo:** mejorar la eficiencia y rendimiento de una organización

### Fundamento esencial:
> **Representación explícita de los procesos de negocio.** Esto posibilita: analizar, redefinir, mejorar y ejecutar los procesos.

---

## Gestión de Procesos de Negocio: Ciclo de Vida

```
         ┌───────────────┐
         │  Evaluación   │ ← Evaluación de la situación existente
         │               │   • Análisis de resultados de monitoreo
         │               │   • Análisis de los casos
         │               │   • Evaluar resultados vs metas de negocio
         │               │   • Explicitar cada proceso actual 
         │               │     ("As-is process") en un modelo
         └───────┬───────┘
                 │
                 ▼
         ┌───────────────┐
         │  (Re)diseño   │ → Diseño de la situación futura
         │               │   • Re/diseño o mejora de los procesos
         │               │     → "To-be processes"
         │               │   • Incorporar puntos de mejora y/o 
         │               │     innovación en modelos de procesos
         │               │   • Verificación y Validación
         └───────┬───────┘
                 │
                 ▼
      ┌──────────────────────┐
      │   Implementación     │ → Tecnologías de Información para
      │                      │   la gestión de procesos
      │                      │   • Desarrollo de un sistema de 
      │                      │     información
      │                      │   • Configuración de un Sistema de
      │                      │     Gestión de Procesos de Negocio
      └──────────┬───────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Ejecución   │ → Ejecución (gestión) de los casos
         │               │   de los procesos
         │               │   • Acuerdo a un modelo de proceso
         │               │   • Monitoreo para evaluar estados
         │               │   • Recolección de información de gestión
         └───────┬───────┘
                 │
                 └──────────► (vuelve a Evaluación)

            [PROCESOS en el centro del ciclo]
```

---

## Ciclo de Vida BPM - Modelo de Dumas et al.

El ciclo de vida según Dumas et al. (2013) incluye las siguientes fases y artefactos:

### Fases del Ciclo:

1. **Process identification** (Identificación de procesos)
    - Salida: *Process architecture* (Arquitectura de procesos)

2. **Process discovery** (Descubrimiento de procesos)
    - Salida: *As-is process model* (Modelo del proceso actual)

3. **Process analysis** (Análisis de procesos)
    - Salida: *Insights on weaknesses and their impact* (Perspectivas sobre debilidades y su impacto)

4. **Process redesign** (Rediseño de procesos)
    - Salida: *To-be process model* (Modelo del proceso futuro)

5. **Process implementation** (Implementación de procesos)
    - Salida: *Executable process model* (Modelo de proceso ejecutable)

6. **Process monitoring and controlling** (Monitoreo y control de procesos)
    - Salida: *Conformance and performance insights* (Perspectivas de conformidad y rendimiento)

El ciclo es **continuo** y vuelve a comenzar desde el monitoreo hacia el descubrimiento.

---

## Características de BPM

- **Estructura organizacional centrada en procesos**
    - A través del análisis, re/diseño y mejora continua de los procesos de negocio una organización puede alcanzar eficiencia, reducir costos, mejorar sus beneficios y adaptarse rápidamente a cambios, alineando los procesos con las estrategias y metas de la organización

- **Estrategia de mejoramiento continua de procesos**

- **Alineación de los procesos de negocio con metas y estrategias de la organización**

- **Alineación de los sistemas de información con los procesos**

- **Definición de mecanismos de medición de procesos** que se alineen con las metas de la organización

- **Ejecución, Control y Análisis de los procesos de negocio**

- **No implica sólo un proyecto de desarrollo de software o de IT**

---

## Ciclo de Vida BPM y Herramientas de Software

Las herramientas y sistemas que soportan las etapas de la gestión de procesos de negocio pueden formar parte de un mismo Sistema de Gestión de Procesos de Negocio o ser aplicaciones separadas.

| Etapa del Ciclo | Herramientas de Software |
|-----------------|--------------------------|
| **Diagnóstico** | Herramientas de Process Mining |
| | Herramientas de Monitoreo y Control |
| **Análisis & (Re)diseño** | Herramientas de Análisis y/o Simulación de Procesos |
| | Herramientas de Modelado y Especificación de Procesos de Negocio |
| **Implementación** | Herramientas de Modelado y Especificación de Procesos de Negocio |
| **Ejecución** | Servicio de Ejecución del BPMS |
| | Herramientas de Monitoreo y Control |

---

# Enfoque de Implementación de BPM

## Niveles de Implementación

La implementación de BPM se realiza en tres niveles:

```
        ┌─────────────────────┐
       /  Nivel              /│
      /   Organizacional    / │ ──► Definir Mapa de Procesos
     /                     /  │     Alineación de Procesos con Metas
    └─────────────────────┘   │     Estratégicas y de Negocio
           │                  │
           ▼                  │
    ┌─────────────────────┐   │
   /   Nivel de          /│   │ ──► Rediseño o mejora de procesos
  /    Proceso          / │   │
 /                     /  │   │
└─────────────────────┘   │   │
           │              │   │
           ▼              │   │
    ┌─────────────────────┐   │
   /   Nivel de          /│   │ ──► Proyectos de Implementación
  /   Implementación    / │   │     de Sistemas de Información
 /                     /  │   │     orientados a procesos
└─────────────────────┘   │   │
```

---

## Indicadores de Rendimiento de Procesos (KPIs)

Los KPIs de procesos se agrupan en tres dimensiones principales:

### Costo
- **Costo de ejecución:** Costo total de ejecutar el proceso
- **Utilización de recursos:** Porcentaje de uso de los recursos disponibles
- **Desperdicio/despilfarro:** Recursos consumidos sin agregar valor

### Tiempo
- **Tiempo de ciclo promedio:** Tiempo total desde el inicio hasta el fin del proceso
- **Tiempos de espera:** Tiempo que los casos pasan esperando ser procesados
- **Tiempos de procesamiento:** Tiempo efectivo de trabajo en cada actividad

### Calidad
- **Tasa de errores:** Porcentaje de casos con errores o defectos
- **Violaciones de acuerdos de nivel de servicio:** Incumplimientos de SLAs
- **Feedback del Cliente:** Satisfacción y retroalimentación del cliente

---

## Identificación de Procesos

### Definir Mapa o Arquitectura de Procesos

**Enfoques para identificar procesos:**

1. **Basado en la cadena de valor**
    - Identificar procesos primarios que agregan valor directamente al cliente
    - Identificar procesos de soporte que habilitan los procesos primarios

2. **Basado en modelos de referencia**
    - Utilizar frameworks estándar de la industria (SCOR, APQC, eTOM, etc.)
    - Adaptar los procesos de referencia a la organización específica

3. **Procesos de soporte, gerenciales y operativos**
    - **Procesos operativos:** Generan valor directo al cliente
    - **Procesos de soporte:** Proveen recursos y servicios internos
    - **Procesos gerenciales:** Planificación, control y mejora

---

## Rediseño o Mejora de un Proceso

El proceso de mejora sigue tres pasos fundamentales:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   Medidas de rendimiento              Medidas de rendimiento                │
│   del proceso existente               deseadas del proceso                  │
│           │                           rediseñado o modificado               │
│           │                                      │                          │
│           ▼                                      ▼                          │
│   ┌───────────────┐                     ┌───────────────┐                   │
│   │  As-Is Process│                     │ To-be Process │                   │
│   │   (Proceso    │ ══════════════════► │   (Proceso    │                   │
│   │   Existente)  │                     │ Rediseñado o  │                   │
│   │               │                     │   Mejorado)   │                   │
│   └───────────────┘                     └───────────────┘                   │
│           │                                      │                          │
│           │                                      │                          │
│   ┌───────┴───────┐                     ┌───────┴───────┐                   │
│   │   Análisis    │                     │  Re/diseño    │                   │
│   │ del Proceso   │                     │ del Proceso   │                   │
│   └───────────────┘                     └───────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Pasos:

1. **Definir el As-Is** (Cómo es hoy) el proceso
2. **Determinar necesidades de cambios** (Análisis del proceso)
3. **Definir cómo debería ser el proceso** (Re/diseño del proceso)

---

## Ejercicios de Comprensión

### Preguntas de clasificación:

1. *"La creación y carga del formulario de una orden de venta"* ¿Es un proceso de negocio o una actividad?

2. *"La evaluación de la gestión de las órdenes de ventas"* ¿Es un proceso de negocio o una actividad?

3. *"La gestión de una orden de venta"* ¿Es un proceso de negocio o una actividad?

4. *"La generación del plan de órdenes de compras a partir de un sistema MRP"* ¿Es un proceso de negocio o una actividad?

### Responda Verdadero o Falso, y por qué:

1. Un proceso de negocio expresa tareas, eventos, flujos de control, y recursos.

2. La gestión por procesos implica una vista horizontal y vertical de la estructura de la organización.

3. La gestión de procesos de negocio tiene como principal objetivo la automatización de los procesos de negocio.

4. La gestión de procesos de negocio tiene como principal objetivo la medición de los procesos de negocio.

---

## Resumen de Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **Proceso de Negocio** | Conjunto de actividades ordenadas que crean valor para el cliente |
| **Tarea** | Unidad atómica (indivisible) de trabajo en un proceso |
| **Caso/Instancia** | Una ejecución específica de un proceso |
| **BPM** | Estrategia de mejoramiento continuo de procesos |
| **As-Is Process** | Modelo del proceso tal como existe actualmente |
| **To-Be Process** | Modelo del proceso mejorado o rediseñado |
| **KPI** | Indicador clave de rendimiento del proceso |
| **BPMS** | Sistema de Gestión de Procesos de Negocio (software) |

---

## Comparativa: Gestión Tradicional vs Gestión por Procesos

| Aspecto | Gestión Tradicional | Gestión por Procesos |
|---------|---------------------|---------------------|
| **Estructura** | Jerárquica vertical | Horizontal/transversal |
| **Foco** | Funciones/departamentos | Procesos de negocio |
| **Visibilidad** | Local (por área) | Global (end-to-end) |
| **Optimización** | Sub-optimización funcional | Optimización global |
| **Adaptabilidad** | Lenta | Rápida |
| **Responsabilidad** | Por función | Por proceso |
| **Medición** | Por área funcional | Por proceso completo |
| **Cliente** | Oculto en la estructura | Centro del proceso |

---

*Documento generado a partir de las diapositivas del curso Sistemas de Gestión - ISI - UTN-FRSF (2025)*
*Tema: Introducción a la Gestión de Procesos de Negocio (Business Process Management)*