---
asignatura: Sistemas de Gestión
carrera: Ingeniería en Sistemas de Información
institucion: UTN — Facultad Regional Santa Fe
tipo: Apunte
numero_apunte: 5
unidad: 2
titulo_unidad: Gestión de Procesos de Negocio
temas_del_plan:
  - Modelado de procesos de negocio.
  - El lenguaje Business Process Modeling Notation (BPMN).
presentacion_fuente: "Unidad_2_-_04_-_Ejercicios_-_Modelado_de_Procesos_-_SG (2025).pdf"
anio: 2025
---

# Apunte 5 — Ejercicios: Modelado Conceptual de Procesos de Negocio (BPMN)

> **Unidad 2 — Gestión de Procesos de Negocio.** Conjunto de ejercicios / casos de estudio para practicar el **modelado de procesos de negocio con BPMN**, los dos temas del plan analítico (modelado de procesos y el lenguaje BPMN). Cada ejercicio plantea una situación organizacional a modelar; las consignas piden el **diagrama BPMN** y, según el caso, **indicar el tipo de cada tarea** y modelar las **perspectivas organizacional, de información y operacional**. Para los ejercicios con resolución provista, se incluye la **solución de la cátedra** reconstruida fielmente a partir de los archivos `.bpmn`.

> **Nota sobre las figuras.** Las soluciones se reconstruyen desde los archivos `.bpmn` originales (Camunda Modeler), respetando su disposición (pools, lanes, flujos, eventos, tipos de tarea). Se incrustan desde la carpeta `soluciones-bpmn/`, que debe acompañar a este archivo; los diagramas se adaptan al tema claro/oscuro. La notación de cada símbolo está catalogada en el **Apunte 4** y en el glosario de elementos BPMN.

> **Estado de las soluciones provistas.** Hay resolución para los **Ejercicios 1, 2, 3 (sus seis requerimientos) y 4**. El archivo rotulado *"Ejercicio 3-7"* es en realidad **idéntico** al del *Ejercicio 4* (mismo contenido: el proceso de mueblería con las lanes Compras, Dpto Ingeniería, Almacén de Materiales y Ventas); se trata, por tanto, de la solución del Ejercicio 4 con un rótulo erróneo. **No hay solución provista para los Ejercicios 5 y 6.**

---

## Ejercicio 1 — Gestión de envío de productos (minorista de hardware)

**Enunciado.** Un minorista de hardware lleva a cabo el siguiente procedimiento para realizar el envío de productos a sus clientes. El proceso inicia cuando se recibe una solicitud de envío de productos. Luego, mientras que un empleado administrativo decide si es un envío normal o especial, un empleado de depósito puede comenzar a empacar los productos. Si se necesita un envío especial, el empleado administrativo solicita cotizaciones de diferentes compañías de transporte, luego asigna una compañía y se prepara la documentación del envío. Si es un envío normal, se asigna automáticamente la compañía de transporte usada para envíos normales y se prepara la documentación de envío. Luego, para cualquier tipo de envío un empleado de logística debe decidir si se requiere contratar seguros. Si se requiere un seguro por accidente de transporte, un empleado de finanzas contrata el seguro y adjunta la póliza a la documentación del envío. Si además se requiere un seguro de extensión de garantía por solicitud del cliente o política de la empresa para dicho producto, el empleado de finanzas contrata el seguro y adjunta la póliza a la documentación del envío. Puede ocurrir que no se requiera contratar seguros (p. ej., para productos sencillos). Una vez que se decidió el tipo de envío y se empacaron los productos, se debe añadir la documentación al paquete y moverlo a la zona de envío de productos (empleado de depósito). Finalmente se debe enviar el paquete y notificar al cliente (empleado de logística).

**Consignas.** Modelar el proceso con BPMN e indicar el tipo de cada tarea.

**Solución (cátedra).**

![Ejercicio 1 — Gestión de envío de productos](soluciones-bpmn/Unidad_2_-_05_-_Ejercicio_1.svg)

Puntos de modelado destacables: paralelismo inicial entre *empacar productos* (Depósito) y *decidir el tipo de envío* (Administración) mediante un **Parallel Gateway (AND)**; **Exclusive Gateway (XOR)** para normal/especial; **Inclusive Gateway (OR)** para la decisión de seguros (ninguno, uno o ambos); evento de inicio y de fin de **mensaje** (solicitud / notificación al cliente), con **pool Cliente** como participante externo.

**Tipos de tarea.**

| Tarea | Tipo |
|---|---|
| Evaluar tipo de envío | User |
| Definir Compañía de Transporte | User |
| Asignar Compañía de Transporte | Service |
| Preparar Documentación | User |
| Definir seguros requeridos | User |
| Contratar Seguro por Accidente de Transporte | User |
| Contratar Seguro de Extensión de Garantía | User |
| Empacar productos | User |
| Mover Paquete a Zona de Envío | User |
| Despachar | User |

---

## Ejercicio 2 — Gestión de órdenes de venta (distribuidora de pinturas)

**Enunciado.** Una empresa de distribución de pinturas utiliza el siguiente procedimiento para la gestión de sus órdenes de ventas. Una orden de venta es creada y registrada por un vendedor de la empresa, usando el Sistema de Ventas, donde guarda información de cada ítem de la orden (producto, cantidad, fecha de entrega) y los datos del cliente que solicita los productos. Cuando la orden es registrada, ésta pasa al estado de "abierta". Luego, en forma automática se verifica la disponibilidad para los ítems de la orden, a través del Sistema de Gestión de Inventario. Si existen productos disponibles, un empleado de finanzas verifica el estado financiero del cliente (usando el Sistema Comercial). Si el cliente es autorizado, se confirma al cliente la aceptación de la orden, que pasa al estado "aceptada"; si no es autorizado, se informa el rechazo y la orden pasa a "rechazada". Luego el proceso finaliza. Si no hay disponibilidad para la cantidad solicitada en algún ítem, también se informa al cliente, la orden pasa a "no disponibilidad" y el proceso finaliza.

Cuando la orden fue aceptada, se procesa. Por un lado, se solicita a depósito que genere un despacho con los ítems: un empleado de depósito genera el remito usando el Sistema de Logística, obtiene los productos del almacén, arma el envío y finalmente lo despacha. Por otro lado, en forma completamente independiente del envío, primero se genera la factura para la orden usando el Sistema Comercial (estado "generada"); luego se envía al cliente (estado "enviada"); finalmente, el cliente paga la factura y se registra con estado "pagada". Si el cliente no abona la factura en un plazo de una semana, se le envía un email de reclamo y se espera por el pago. Por último, cuando el envío se realizó en forma completa y el cliente realizó el pago, la orden es cerrada y el proceso finaliza.

**Consignas.** Modelar el proceso con BPMN; indicar el tipo de cada tarea; modelar la **perspectiva organizacional** (roles/grupos asignados a tareas); modelar la **perspectiva de información** (modelo conceptual de datos asociado a objetos de flujo y a parámetros de entrada/salida de cada tarea); modelar la **perspectiva operacional** (interfaces y operaciones de las aplicaciones invocadas).

**Solución (cátedra).**

![Ejercicio 2 — Gestión de órdenes de venta](soluciones-bpmn/Unidad_2_-_06_-_Ejercicio_2.svg)

Puntos destacables: la **perspectiva organizacional** se modela con las lanes (Vendedor, Sistemas, Comercial/Finanzas, Depósito); la **perspectiva de información** aparece como **objetos de dato con estado** (`Orden [Abierta] / [Aceptada] / [Rechazada] / [No disponibilidad] / [Cerrada]`, `Factura [Generada] / [Enviada] / [Pagada]`); el procesamiento de la orden aceptada usa un **Parallel Gateway (AND)** para las ramas independientes de envío y facturación; el reclamo de pago se modela con un **Event-Based Gateway** entre el evento de mensaje *Pago realizado* y un **timer de 7 días**.

**Tipos de tarea.**

| Tarea | Tipo |
|---|---|
| Definir Orden de Venta | User |
| Verificar disponibilidad de productos | Service |
| Verificar estado financiero | User |
| Cambiar estado de orden | Service |
| Generar Factura | User |
| Registrar factura enviada | Service |
| Registrar pago factura | Service |
| Generar remito | User |
| Armar envío | Manual |
| Despachar productos | User |

---

## Ejercicio 3 — Variantes sobre el proceso de órdenes de venta

**Enunciado.** Considere el modelo del Ejercicio 2 y modifíquelo según estos nuevos requerimientos:

1. Posibilitar que se gestionen **múltiples envíos** para una misma orden (despacho parcial en varios envíos, no en uno solo). La cantidad de envíos se define al crear la orden.
2. En cualquier momento el cliente puede **cancelar la orden**, siempre que el estado sea **previo a "aceptada"**.
3. En cualquier momento el cliente puede **cancelar la orden**, siempre y cuando **no se haya generado un envío** (es decir, no se haya generado un remito).
4. Si luego de aceptada la orden **no se ha generado un remito y han transcurrido 30 días**, también se debe **cancelar** la orden y notificar al cliente la causa.
5. Si luego de aceptada la orden **no se ha generado un remito y han transcurrido 15 días**, se debe **notificar** al cliente que el envío está en progreso, y el proceso **debe continuar**.
6. En cualquiera de los casos de cancelación anteriores, determinar si existen actividades que **requieren compensación** y definir las **tareas de compensación** que posibiliten una correcta finalización del estado del proceso ante una cancelación.

**Soluciones (cátedra), por requerimiento.**

### 3.1 — Requerimiento 1: múltiples envíos (despacho parcial)

El procesamiento del despacho pasa a ser un **subproceso con marcador de múltiple instancia** (`loopCardinality = orden.nroDespachos`, `behavior = ALL`), de modo que se repite por cada envío parcial definido al crear la orden.

![Ejercicio 3-1](soluciones-bpmn/Unidad_2_-_07_-_Ejercicio_3-1.svg)

### 3.2 — Requerimiento 2: cancelación previa a "aceptada"

![Ejercicio 3-2](soluciones-bpmn/Unidad_2_-_08_-_Ejercicio_3-2.svg)

### 3.3 y 3.4 — Requerimientos 3 y 4: cancelación sin remito y timeout de 30 días

Se incorporan el camino de **cancelación mientras no exista remito** y un **evento de tiempo (30 días)** que dispara la cancelación con notificación al cliente.

![Ejercicio 3-3 y 3-4](soluciones-bpmn/Unidad_2_-_09_-_Ejercicio_3-3_y_3-4.svg)

### 3.5 — Requerimiento 5: notificación a los 15 días (no interruptivo)

Un **evento de tiempo de 15 días** notifica al cliente que el envío está en progreso **sin interrumpir** el proceso, que continúa su curso.

![Ejercicio 3-5](soluciones-bpmn/Unidad_2_-_10_-_Ejercicio_3-5.svg)

### 3.6 — Requerimiento 6: compensaciones

Se definen **eventos y tareas de compensación** (marcador `C1`) para revertir actividades ya finalizadas (p. ej., *Cancelar orden*, *Reembolsar pago*) cuando se produce una cancelación, dejando el proceso en un estado consistente.

![Ejercicio 3-6](soluciones-bpmn/Unidad_2_-_11_-_Ejercicio_3-6.svg)

> Las tareas base son las mismas del Ejercicio 2; cada variante agrega elementos de control (subproceso de múltiple instancia, *boundary events* de mensaje/timer, eventos de señal, manejadores de compensación) sin cambiar la naturaleza de las tareas originales.

---

## Ejercicio 4 — Gestión de órdenes de muebles a medida

**Enunciado.** Una empresa que fabrica muebles a medida desea gestionar su proceso de gestión de órdenes. La gestión comienza cuando el departamento de ventas recibe un pedido de un mueble a medida, a partir del cual se crea una orden. El producto y las partes requeridas se definen en la orden, esto es, la lista de partes (Bill of Materials – BOM). Luego, un miembro del departamento de ventas evalúa la orden y puede rechazarla o aceptarla. Todas estas tareas las realiza un vendedor del depto. de Ventas, usando el sistema de ventas. Si la orden es rechazada, el proceso finaliza. Si es aceptada, el almacén de materiales y el departamento de ingeniería realizan tareas independientes.

Por un lado, un empleado del almacén de materiales analiza las partes requeridas según la BOM y genera una lista con las necesidades de cada parte. Luego se procesa esa lista para la posterior construcción del mueble: se procesa cada parte, lo que consiste primero en verificar (según la cantidad requerida) si existe disponibilidad en inventario, en forma automática consultando el sistema de gestión de inventario. Si hay disponibilidad, la cantidad requerida se reserva automáticamente con dicho sistema. Si no está disponible la cantidad solicitada, se realiza una compra a un proveedor; la compra la realiza una persona del depto. de Compras, que la registra en el sistema de compras; cuando se realiza la compra, luego se reserva la cantidad requerida una vez que arriban los materiales desde el proveedor.

Por otro lado, al mismo tiempo que se analiza y procesa la lista de materiales, el departamento de ingeniería prepara la producción del mueble (limpieza de equipos, etc.). Si el almacén de materiales ha reservado todas las partes solicitadas y la actividad de preparación ha finalizado, entonces se realiza la fabricación del mueble; el comienzo y fin de la fabricación se registra en el sistema de producción. Después, el departamento de ventas despacha el producto al cliente y el proceso finaliza.

**Consignas.** Modelar el proceso con BPMN; indicar el tipo de cada tarea; modelar la **perspectiva organizacional** (roles/grupos asignados a tareas).

**Solución (cátedra).**

![Ejercicio 4 — Gestión de órdenes de muebles a medida](soluciones-bpmn/Unidad_2_-_13_-_Ejercicio_4.svg)

Puntos destacables: tras *Evaluar Orden*, un **Parallel Gateway (AND)** abre las ramas independientes de Almacén de Materiales e Ingeniería; el procesamiento de partes es un **subproceso de múltiple instancia** (`loopCardinality = NroPartes`, `behavior = ALL`) con un **XOR** según disponibilidad en inventario y un **evento intermedio de mensaje** (*Productos Recibidos*) para el arribo desde el proveedor; un segundo **AND** sincroniza la reserva de partes con la preparación de producción antes de *Fabricar*.

> En el archivo original, la lane de ventas figura con el texto truncado *"Vendedor (Dpto Ventas="* y el pool conserva el nombre *"Gestión de Orden de Venta"* (heredado de una copia del Ejercicio 2/3). Se respeta el contenido tal como fue provisto.

**Tipos de tarea.**

| Tarea | Tipo |
|---|---|
| Crear Orden | User |
| Evaluar Orden | User |
| Generar Necesidades de las partes | User |
| Procesamiento de Parte | Subproceso (múltiple instancia) |
| Verificar existencia en inventario | Service |
| Reservar Parte | Service |
| (Compras) Comprar requerimientos de Parte | User |
| Preparar producción | User |
| Fabricar | User |
| Despachar Producto | User |

---

## Ejercicio 5 — Gestión de solicitudes de reembolso de gastos

> **Sin solución provista en el material.** Solo se transcribe el enunciado para su resolución.

**Enunciado.** Una empresa desea diseñar el proceso de negocio que representa la gestión de solicitudes de reembolsos de gastos de los empleados (p. ej., viáticos, compra de materiales de oficina por empleados de ventas, etc.). En un día normal existe una gran cantidad de reembolsos a procesar.

El proceso comienza cuando un reporte de gastos es recibido. Una nueva cuenta bancaria debe ser creada para un empleado si éste no tiene una cuenta previa. El reporte luego es verificado respecto a los datos (si fueron cargados correctamente y si fue correctamente clasificado por el empleado). Si la verificación indica que los datos no son correctos, se notifica al empleado por email y el proceso finaliza. Si la verificación es correcta, se analiza la suma del reembolso. Si la suma es **mayor o igual a $300**, un supervisor evalúa y aprueba el reembolso; en caso de rechazo, el empleado recibe una notificación de rechazo por email; en caso de aceptación, se reembolsan los gastos automáticamente mediante un depósito en la cuenta bancaria del empleado y se le notifica por email. Si la suma es **menor a $300**, se aprueba automáticamente, se reembolsa automáticamente con un depósito en la cuenta del empleado y se le notifica por email.

Si pasados **7 días** no ha ocurrido aún la verificación del reporte recibido, se debe enviar al empleado un email indicando que la aprobación del reembolso está en progreso. Si la aprobación no finalizó en **31 días**, se cancela el reembolso, el empleado recibe un email de cancelación y debe hacer una nueva solicitud.

**Consigna.** Modelar el proceso de negocio usando BPMN.

---

## Ejercicio 6 — Gestión de créditos de consumo (entidad financiera)

> **Sin solución provista en el material.** Solo se transcribe el enunciado para su resolución.

**Enunciado.** Una entidad financiera que ofrece créditos de consumo desea redefinir la operatoria de la gestión de créditos. Los créditos se ofrecen a un plazo máximo de 5 años. Según el monto, se realiza un **único desembolso** cuando el monto es menor o igual a $1.000.000, o **en varias cuotas** cuando es mayor a $1.000.000; la cantidad de cuotas la define el gerente de préstamos.

La gestión de un crédito consiste primero en **procesar la solicitud** y luego **gestionar los desembolsos** de las cuotas. La solicitud comienza con la registración por parte de un empleado de la entidad ante el interés de un cliente, incluyendo la presentación de la solicitud y la documentación requerida. Luego se realiza una **verificación del estado financiero** del cliente: si es aceptable, se continúa; de lo contrario la solicitud es rechazada y el proceso finaliza. Al registrarse la solicitud es posible que el cliente no presente todos los documentos; no es posible continuar hasta tenerlos completos. Por lo tanto, luego de verificar el estado financiero, si el cliente no presentó todos los documentos, se lo notifica y se espera la recepción de los pendientes. El cliente tiene **5 días** para presentar la documentación; pasado el plazo, un empleado lo contacta telefónicamente para preguntarle si desea continuar: si no, el proceso finaliza; si continúa, se espera nuevamente la documentación en los próximos 5 días.

Cuando se reciben los documentos, un evaluador de créditos realiza el **estudio del crédito** (monto, destino, garantías, si ya es cliente, antecedentes con la entidad u otras). El estudio resulta en la evaluación de la solicitud, **aprobada o rechazada**; si se rechaza, se informa al cliente y el proceso finaliza. Si se aprueba, el gerente determina la **cantidad de cuotas** y las **fechas de desembolso**. La primera cuota se desembolsa inmediatamente después de definir la cantidad de desembolsos; los siguientes se realizan según el cronograma (p. ej., cada dos meses). Cada desembolso se realiza en una cuenta bancaria del solicitante. El cliente puede **cancelar** la gestión del crédito en cualquier momento, siempre que **no se haya realizado un desembolso**.

**Consignas.** Modelar el proceso con BPMN; indicar para cada tarea su tipo (service, user, send, etc.); indicar los roles o unidades organizacionales que realizan las tareas.

---

## Notas de resolución (transversales a los ejercicios)

- **Tipos de tarea.** *User* cuando una persona la ejecuta asistida por una aplicación gestionada por el BPMS; *Service* cuando es un servicio automatizado de una aplicación (p. ej., consultar/actualizar un sistema de inventario, comercial o de logística); *Manual* cuando no hay asistencia de software (p. ej., *armar envío* físicamente); *Send/Receive* para el intercambio de mensajes con participantes externos.
- **Perspectiva organizacional.** Se modela con **lanes** (roles o unidades) dentro del **pool** de la organización; los participantes externos (Cliente, Proveedor) se representan como pools separados conectados por **flujos de mensaje**.
- **Perspectiva de información.** Se modela con **objetos de dato** asociados a las tareas (entradas/salidas) y, cuando interesa el ciclo de vida, con **estados** del objeto (p. ej., `Orden [Aceptada]`). La estructura detallada de esos datos se complementa fuera de BPMN (modelo conceptual / UML).
- **Perspectiva operacional.** Se documenta indicando las **interfaces y operaciones** que deben proveer las aplicaciones invocadas por las tareas *Service* (atributos `Implementation` / `operationRef` de la tarea), que en BPMN no se dibujan y se complementan con UML.
- **Excepciones, timeouts y cancelaciones.** Se resuelven con **eventos de tiempo** (interruptivos o no), **event-based gateways**, **subprocesos de evento** y **compensaciones**, tal como se detalla en el Apunte 4.
