---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 30
unidad: 2
titulo_unidad: Gestión de Procesos de Negocio
temas_del_plan:
  - Modelado de procesos de negocio.
  - El lenguaje Business Process Modeling Notation (BPMN).
  - "Gestión de Workflows: gestión de recursos, distribución y asignación de tareas."
presentacion_fuente: "TP_1_-_Modelado_de_Procesos_-_2025.pdf"
anio: 2025
---

# Apunte 30 — Trabajo Práctico 1: Modelado Conceptual de Procesos de Negocio (Selección de Personal)

> **Unidad 2 — Gestión de Procesos de Negocio.** Enunciado del **Trabajo Práctico 1** (entregable y grupal, ciclo 2025) de la cátedra: modelar el proceso **AS-IS** de **selección de personal** del área de R&D de una empresa de software, usando **BPMN** y la herramienta **Camunda**. Aborda los temas del plan de **modelado de procesos de negocio** y el **lenguaje BPMN**, e incorpora las perspectivas **organizacional** (roles y grupos) y **de información** (entradas/salidas por tarea). Este apunte **transcribe y encuadra la consigna para referencia**; **no desarrolla la solución** (las actividades quedan para una resolución posterior, a pedido).

---

## 1. Qué es este apunte

Deja registrado, dentro del vault, el **enunciado del TP 1** para consulta. **No incluye resolución**: las cuatro actividades de modelado (BPMN con Camunda, tipos de tarea, perspectiva organizacional y perspectiva de información) se desarrollarán por separado si se solicita.

A diferencia del **Apunte 29** (Práctica Bonita, gestión de órdenes de venta), aquí el proceso es **otro** —**selección de personal (AS-IS)**— y la herramienta pedida es **Camunda** (no Bonita). No existe un ejercicio equivalente con solución de cátedra en el proyecto, por lo que el modelado se construye desde cero a partir de este enunciado (ver §3).

---

## 2. Enunciado

### 2.1. Contexto

Una empresa de desarrollo de software realiza actividades de **selección de personal** para cubrir posiciones o atender requerimientos de nuevas posiciones. Actualmente **no cuenta con documentación formal** de cómo se ejecutan esos procesos. Por eso encarga generar el **modelo del proceso de negocio de selección de personal para el área de R&D** (Research and Development): es decir, el **modelo AS-IS** (cómo es el proceso actualmente).

### 2.2. Descripción del proceso

**Definición del puesto y del perfil.** La selección comienza en el sector de **gerencia general**, donde se define el **nombre del puesto**, el **rango salarial**, la **cantidad de vacantes** a buscar, la **prioridad**, la **fecha estimada de inicio** y una **breve descripción** del puesto. Esta información se comunica al sector de **recursos humanos (RRHH)**, que **verifica** la información recibida. Si existe información **faltante y/o no comprensible**, RRHH solicita a la gerencia que la complete. Cuando la información está completa, el área de **R&D** agrega las **características técnicas requeridas y deseables** del puesto. Con esa información, RRHH **especifica el perfil** de la búsqueda laboral. En base a la **prioridad**, se define la **cantidad de entrevistadores** y los **medios de comunicación** que se usarán para la recepción de solicitudes.

**Recepción de solicitudes y ranking.** Se **espera la recepción de solicitudes durante 3 semanas**. Al cumplirse el plazo, se obtiene la **lista de potenciales candidatos** (postulaciones recibidas). Por cada potencial candidato, primero se verifica si cumple las características técnicas **requeridas** (requisito indispensable) y luego, como plus, las **deseables**. Según el **porcentaje de cobertura de las deseables**, el candidato queda **rankeado**:

| Ranking | Cobertura de características deseables |
|---|---|
| **Excelente** | cumple todo lo deseable (100%) |
| **Muy Bueno** | entre 80% y 99% |
| **Bueno** | entre 60% y 79% |
| **Regular** | entre 0% y 59% |

**Primer contacto.** RRHH hace un **primer contacto** para saber si el potencial candidato **sigue interesado** en la vacante: si responde **afirmativamente**, se lo añade a la **lista de candidatos**; si responde **negativamente**, se **descarta** su postulación. Si **no responde en una semana**, también se **descarta** la postulación.

**Procedimiento de entrevista.** RRHH entrevista a **cada candidato**, comenzando por los de **mejor ranking** y continuando en **orden descendente**, **hasta cubrir las vacantes o haber entrevistado a todos** los candidatos. El procedimiento por candidato es:

1. **Entrevista de RRHH** para conocer al candidato y su personalidad, y determinar si es **seleccionado**.
2. Si **RRHH lo selecciona**, se le solicita que deje un **punto de contacto (PdC)**: una persona con la que haya trabajado en el pasado. El entrevistador de RRHH **agenda una reunión con el PdC** para obtener **referencias**. Finalizada la reunión, se **validan las referencias**:
   - Si las referencias son **buenas**, se continúa con la **entrevista técnica**.
   - Si **no**, se **finaliza** el proceso de entrevista del candidato y se le comunica que **no fue seleccionado**.
3. **Entrevista técnica**, coordinada desde el sector de **IT**: se envía un **desafío técnico** al candidato y se le otorgan **3 días** para enviar una solución. Si pasan los 3 días **sin solución**, se **termina** el proceso de entrevista. Si **envía** una solución, IT la **evalúa** y la califica como:
   - **Satisfactoria** (de acuerdo con las expectativas del área).
   - **Aceptable** (soluciona el problema, pero no cumple o cumple parcialmente las expectativas).
   - **Inaceptable** (no soluciona el problema ni cumple las expectativas).
4. Una vez calificada la solución, se realiza una **reunión de devolución** con el candidato. De ella surge el **estado final** de la postulación:
   - Si la solución fue **Satisfactoria** → se **ofrece el puesto** y se otorgan **2 días** para obtener respuesta.
   - Si la solución fue **Aceptable** y las **respuestas del candidato en la reunión** fueron aceptables → se **ofrece el puesto** y se otorgan **2 días** para obtener respuesta.
   - Si la solución fue **Inaceptable** → **no** se ofrece el puesto.

**Cierre por candidato.** Si la respuesta del candidato es **afirmativa**, se **cubre una vacante** (se reduce en uno el número de vacantes disponibles para el puesto). Si es **negativa**, se **agradece** la participación y **no** se actualiza el número de vacantes disponibles.

### 2.3. Clasificaciones y eventos de tiempo (resumen del enunciado)

| Elemento | Valores / plazos |
|---|---|
| **Ranking del candidato** | Excelente · Muy Bueno · Bueno · Regular |
| **Calificación de la solución técnica** | Satisfactoria · Aceptable · Inaceptable |
| **Plazo de recepción de solicitudes** | 3 semanas |
| **Plazo del primer contacto (sin respuesta → descarte)** | 1 semana |
| **Plazo del desafío técnico (sin solución → fin de entrevista)** | 3 días |
| **Plazo de respuesta a la oferta de puesto** | 2 días |

> El proceso incluye un **recorrido por candidato** (en orden de ranking) con **condición de corte** (vacantes cubiertas **o** candidatos agotados) y varios **eventos de tiempo** (esperas y vencimientos). La teoría de estos patrones —bucles/múltiple instancia, temporizadores, eventos intermedios— está en los Apuntes 4, 5 y 6.

### 2.4. Actividades solicitadas

1. **Modelar** el proceso de negocio usando **BPMN** y la herramienta de modelado **Camunda**.
2. Para las tareas del proceso, **indicar su tipo**.
3. Modelar la **perspectiva organizacional**: definir los **roles y grupos** del proceso y **asignarlos** a las tareas correspondientes.
4. Definir la **perspectiva de información**: para cada tarea, definir las **entradas y salidas** de información correspondientes.

### 2.5. Condiciones de entrega

- Entregar el/los **archivo/s del modelado BPMN** en la tarea correspondiente del campus.
- **Formato del nombre:** `TP1-G[Número de Grupo]-[Apellido1, Apellido2, Apellido3]`.

---

## 3. Relación con el resto del proyecto

**Tercer material práctico de modelado de la Unidad 2.** Junto con el **Apunte 5** (ejercicios de BPMN, con soluciones de cátedra reconstruidas desde Camunda) y el **Apunte 29** (Práctica Bonita), este TP completa el frente de **modelado conceptual de procesos**. A diferencia de aquellos:

- El **proceso es distinto** (selección de personal AS-IS), sin ejercicio equivalente ni solución de cátedra en el proyecto: el modelo se construye desde el enunciado.
- La **herramienta** pedida es **Camunda** (igual que los `.bpmn` de origen del Apunte 5), no **Bonita** (Apunte 29).
- Las consignas de perspectiva son **organizacional** y **de información**; **no** pide la perspectiva operacional ni contratos.

**Dónde está la teoría de cada consigna del TP:**

| Consigna del TP | Apunte(s) de referencia |
|---|---|
| Modelado BPMN, elementos, **tipos de tarea** y herramienta (Camunda) | **Apunte 4** (catálogo BPMN y tipos de tarea) y notas transversales del **Apunte 5** |
| **Perspectiva organizacional** (roles, grupos / unidades organizacionales, asignación de tareas) | **Apunte 2 (BPMS)** |
| **Perspectiva de información** (entradas/salidas de cada tarea; objetos de dato y su ciclo de estados) | **Apunte 4** (perspectiva de datos) y notas del **Apunte 5** |
| **Patrones** del proceso (bucle por candidato con corte, temporizadores, eventos intermedios) | **Apuntes 4, 5 y 6** |

---

## 4. Nota de incorporación

- El apunte se incorpora **para referencia**, **sin resolución** (a pedido): transcribe el enunciado, sus actividades y las condiciones de entrega, y lo encuadra con el material existente.
- La **fuente** es el **PDF del enunciado del práctico** (consigna del TP, no una diapositiva de teoría); se conserva el nombre original del archivo de cátedra en `presentacion_fuente`.
- Sin anomalías de extracción en el PDF fuente.
