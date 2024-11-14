# Propuesta TP DSW

## Grupo

### Integrantes

- 49457 - Dorigoni Mauro
- 49453 - Gelmetti Lucia
- 41324 - Gimenez Ulises

### Repositorios

- [full app](https://github.com/Mauro-Dorigoni/DesarrolloSoftware-2024)

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

![](https://github.com/Mauro-Dorigoni/DesarrolloSoftware-2024/blob/main/assets/media/DER_TP_IntegradorDS_HP.jpeg)

## Alcance Funcional

### Alcance Mínimo

| Req      | Detalle                                                      |
| :------- | :----------------------------------------------------------- |
| **CRUD simple**          | 1. CRUD TipoHechizo <br> 2. CRUD Institucion <br> 3. CRUD Etiquetas |
| **CRUD dependiente**     | 1. CRUD Mago {depende de} CRUD Institucion <br> 2. CRUD Empleado {depende de} CRUD Institucion |
| **Listado + detalle**    | 1. Listado de todos los hechizos (etiquetas, tipo de hechizo, mago que lo patentó) con filtro (etiquetas/tipo de hechizo) => detalle CRUD Hechizo <br> 2. Listado de patentes con filtro (pendientes) => detalle CRUD Patente <br> 3. Listado de magos => detalle CRUD Mago, CRUD Institucion |
| **CUU/Epic**             | 1. Patentar un nuevo hechizo <br> 2. Aprobar la patente de un nuevo hechizo <br> 3. Rechazar patente |


Adicionales para Aprobación

| Req      | Detalle                                                      |
| :------- | :----------------------------------------------------------- |
| CRUD     | 1. CRUD Articulos |
| CUU/Epic | 1. Solicitar/Otorgar permiso de visualizacion de hechizos restringidos |

### Alcance Adicional Voluntario

_Nota_: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

| Req      | Detalle                                                                        |
| :------- | :----------------------------------------------------------------------------- |
| Listados | 1. Listado de todos los hechizos en BD <br> 2. Listado filtrado de solicitudes |
| CUU/Epic | 1. Cancelación de solicitud                                                    |
| Otros    | 1. Notificacion de solicitud aceptada                                          |
