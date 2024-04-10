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

![](https://github.com/Mauro-Dorigoni/DesarrolloSoftware-2024/blob/main/assets/media/DER_TP_IntegradorDS_HP.jpg)

## Alcance Funcional 

### Alcance Mínimo

Regularidad:

|Req| Detalle                                                                                                                                                                                                                                                                                                 |
|:-|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|CRUD simple| 1. CRUD Mago<br>2. CRUD Empleado<br>3. CRUD TipoHechizo<br/>|
|CRUD dependiente| 1. CRUD Patente {depende de} CRUD Mago<br>2. CRUD Hechizo {depende de} CRUD Patente y CRUD TipoHechizo <br>|3.CRUD SolicitudPermisoVisualizacion {depende de} CRUD Mago y CRUD Hechizo<br>|                                                                                                                                                                |
|Listado<br>+<br>detalle| 1. Listado de todos los hechizos con filtro (etiquetas/palabra clave/tipo) => detalle CRUD Hechizo<br> 2. Listado de patentes con filtro (aprobada/rechazada/fecha/mago/etc.) => detalle CRUD Patente |
|CUU/Epic| 1. Patentar un nuevo hechizo<br>2. Aprobar la patente de un nuevo hechizo<br>3. Solicitar permisos de visualizacion|.                                                                                                                                                                                                  |


Adicionales para Aprobación

|Req| Detalle                                                                                  |
|:-|:-----------------------------------------------------------------------------------------|
|CRUD | 1. CRUD Etiquetas<br>                                               |
|CUU/Epic| 1. Otorgar permiso de visualizacion de hechizos restringidos|


### Alcance Adicional Voluntario

*Nota*: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

|Req| Detalle                                                  |
|:-|:---------------------------------------------------------|
|Listados | 1. Listado de todos los hechizos en BD <br> 2. Listado filtrado de solicitudes            |
|CUU/Epic| 1. Cancelación de solicitud|
|Otros| 1. Notificacion de solicitud aceptada                     |