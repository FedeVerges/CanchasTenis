# **Sistema de reserva de canchas de tenis**

Este es un repositorio para un sistema de reserva de canchas de tenis.

## Funcionalidades

### Plataforma WEB

### Acceso y Seguridad

El sistema deberá permitir administrar distintos tipos de usuarios y perfiles. Se deberá
poder crear, modificar y borrar la información.

Los usuarios deberán contar con un atributo estado (habilitado, suspendido, etc.) que
podrá ser asignado por el administrador.
A los distintos perfiles se desea contar con la posibilidad de asignarles de manera
dinámica las funcionalidades y permisos (Lectura, Escritura y Lectura y Escritura) a cada
una de ellas.
El ingreso se realizará por medio de usuario y clave.

### Reserva de Canchas

El sistema deberá permitir la creación automática de los horarios disponibles para alquiler
de canchas. Se desea contar con la posibilidad de manera dinámica la cantidad de
canchas, inicio y fin del horario disponible y duración de cada turno.
El sistema deberá contemplar la posibilidad de reserva de canchas en una fecha y horario
para la modalidad Single o Dobles e imprimir un comprobante de reserva.
El sistema deberá contemplar la posibilidad de visualizar la grilla de horarios y estados de
canchas en una fecha y quiénes son sus ocupantes.

El perfil de administrador deberá poder reservar uno o más turnos para socios o algún
tipo de evento (clases de tenis, torneos, mantenimiento, etc.).

El perfil de administrador deberá poder administrar los estados de las canchas y los

## Socios

#### Informes

El sistema deberá permitir emitir los siguientes informes, los cuales deberán ser visibles
en pantalla y podrán ser descargados en formatos PDF y Excel.

a. Listado de ocupación de canchas por rango de fechas con datos de Socios que la
ocuparon y horario.

b. Listado de ocupación de canchas por rango de fechas con filtro por Socio, día,
eventos (clase de tenis, torneos, mantenimiento) y con datos de Socios que la
ocuparon y horario.

c. Listado de canchas por estado (ocupado y libre) por rango de fechas con filtro
por Socio, día, eventos (clase de tenis, torneos, mantenimiento) y con datos de
Socios que la ocuparon y horario.

d. Listado de Socios activos en el sistema con sus datos personales y de contacto.
Reglas de Negocio

### Se describen las reglas de negocios mínimas a considerar:

a. La reserva de canchas solo se podrán realizar por socios de la institución.

b. El usuario y clave deberán ser solicitados en la institución de manera personal.

c. La reserva de canchas solo se podrá realizar 24 horas (esto podría ser
configurable) antes del día deseado para realizar la reserva.

d. Un socio solo podrá reservar (o jugar) un turno por día.

e. Para realizar la reserva se deberá ingresar los datos de todos los jugadores que
participan en la reserva.

f.Todos los jugadores deberán ser socios y estar cargados en el sistema.

g. El sistema deberá contemplar el estado de los usuarios en caso de estar
suspendido (por falta de pago, castigo por no cumplir con reserva, etc.) no deberá
permitir la reserva de cancha.

h. Deberá haber un responsable de la reserva que podrá anular la misma.

i.Se deberá considerar el estado de las canchas que podrá ser (activo o inactivo)
por algún motivo, mantenimiento, afectada a torneo, etc. permitiendo o no
realizar reservas en las mismas.

## **Instrucciones**

### **Backend**

 * Posicionarse en el directorio "/Backend".
 * correr el comando 

    ```
    npm run build

    ```
## **Deadlines**

## **Autores**

* De Miguel Nicolas
* Gurruchaga Luciano
* Vergés Federico

Universidad Nacional de San Luis.
