# Propuesta TP DSW

## Grupo
### Integrantes
* 49457 - Dorigoni Mauro
* 49453 - Gelmetti Lucia
* 41324 - Gimenez Ulises

### Repositorios
* [full app](https://github.com/Mauro-Dorigoni/DesarrolloSoftware-2024)


## Tema
### Descripción
Nuestro proyecto está ambientado en el mundo mágico de Harry Potter, 
la página cumpliría el rol de ser la oficial del Ministerio de Magia. Un mago puede darse de alta
para visualizar la base de datos de hechizos del ministerio. A su vez, puede solicitar patentar
un hechizo de su propia creacion (que sera o no aprobada por un empleado del ministerio).
Existen hechizos restringidos al publico general, un mago puede solicitar visualizar informacion sobre
ellos (y un empleado puede permitirselo o no).
Los hechizos corresponden a un tipo, y se les otorga etiquetas para definir su grado de dificultad y
caracteristicas.

### Modelo

![](https://github.com/Mauro-Dorigoni/DesarrolloSoftware-2024/blob/main/DER%20Patentar%20un%20Hechizo.jpg)

## Alcance Funcional 

### Alcance Mínimo

Regularidad:

|Req| Detalle                                                                                                                                                                                                                                                                                                 |
|:-|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|CRUD simple| 1. CRUD Mago<br>2. CRUD Empleado<br>3. CRUD TipoHechizo<br/> 4. CRUD Etiquetas|
|CRUD dependiente| 1. CRUD Dispositivo {depende de} CRUD Tipo Dispositivo y CRUD Cliente<br>2. CRUD Solicitud Reparacion {depende de} CRUD Dispositivo                                                                                                                                                                     |
|Listado<br>+<br>detalle| 1. Listado de dispositivos de cliente, muestra marca y modelo => detalle CRUD Dispositivo<br> 2. Listado de trabajos realizados filtrado por rango de fecha, muestra datos del dispositivo, fecha inicio y fin, nombre del cliente, practicas realizadas => detalle muestra datos completos del trabajo |
|CUU/Epic| 1. Registrar una solicitud de reparación<br>2. Registro del cliente<br/> 3. Confirmación de solicitud.                                                                                                                                                                                                  |


Adicionales para Aprobación

|Req| Detalle                                                                                  |
|:-|:-----------------------------------------------------------------------------------------|
|CRUD | 1. CRUD Componentes<br>2. CRUD Precio<br>                                                |
|CUU/Epic| 1. Registrar nuevo componente<br>2. Registrar fin de trabajo<br>3. Registrar dispositivo |


### Alcance Adicional Voluntario

*Nota*: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

|Req| Detalle                                                  |
|:-|:---------------------------------------------------------|
|Listados | 1. Listado histórico de practicas por tecnico            |
|CUU/Epic| 1. Cancelación de solicitud <br> 2. Registro de tecnicos |
|Otros| 1. Notificacion de trabajo realizado                     |