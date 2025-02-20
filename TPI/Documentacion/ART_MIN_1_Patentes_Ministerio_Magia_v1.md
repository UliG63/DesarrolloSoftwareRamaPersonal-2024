**ART MIN \- Minuta Reunión 1**  
Desarrollo de Software

**Tema:** Visión general del proceso y reglamentación de la gestión de patentamiento

**Fecha:** 06/06/2024

**Participantes:** Analista de Requerimientos, Miembros del Ministerio de la Magia (MM)

***Detalle de minuta***

***Introducción***  
La organización objeto de nuestro trabajo es el Ministerio de la Magia. Su equipo directivo nos encargó desarrollar un sistema web que permita agilizar la gestión del patentamiento de hechizos.

***Descripción del negocio***

El proceso de negocio actual es el siguiente:

Un mago asiste al Ministerio de manera física a las oficinas de Patentamiento del Ministerio, donde se le da turno (no siempre el mismo día) para que presente la documentación necesaria para patentar su nuevo Hechizo. Una vez presentada la documentación, responsables dentro de la oficina de Patentamiento (RP) revisarán la invención y determinarán si se otorga la patente de manera efectiva o no (basándose, entre otras cosas, en el mérito inventivo de esta). Tanto si la patente es rechazada o publicada, el resultado de este proceso se le notifica al Mago a través de correspondencia por lechuza.

Si la patente es otorgada de manera efectiva, el RP deberá decidir a qué tipo corresponde el hechizo, y si este cuenta con un nivel de peligrosidad suficiente como para considerarse restringido. Si no es restringido, los datos de la patente se envían a la Biblioteca del Ministerio para que los usuarios puedan aprender el nuevo Hechizo. Si es restringido, sólo se publica un concepto del hechizo pero no sus instrucciones. 

El MM pretende que el nuevo sistema se encargue del proceso de ingesta de los datos de posibles nuevas patentes por parte de los Magos, ahorrandoles a estos el viaje al Ministerio. Además, MM desea digitalizar la actividad de las revisión y publicación de esta, dedicando una sección del sistema al repositorio de nuevos hechizos y sus detalles. 

Para el MM es imperativo que se protejan los datos sensibles de hechizos considerados restringidos, impidiendo su visualización a los usuarios regulares (exceptuando al Mago que lo patentó y a los empleados del Ministerio). El MM desea implementar una nueva funcionalidad a través de la cual un Mago pueda solicitar visualizar los datos de un hechizo restringido, indicando el motivo, y que esta pueda ser aceptada o rechazada por un RP.

Al MM también le gustaría implementar un sistema de “etiquetas” que se le asignen a los hechizos, que indiquen características generales de estos para así facilitar la búsqueda en el repositorio.

El nuevo sistema será dedicado solo a los usuarios registrados del Ministerio, implementando un módulo de autenticación. Los Magos deberán registrar los datos de su varita y la Institución Académica en la que estudian o estudiaron.

Historial de Versiones

| Fecha | Versión | Autor | Descripción |
| :---- | ----- | :---- | :---- |
| 24/03/2023 | 1.1 | Mauro Dorigoni | Versión Inicial |
| 28/03/2023 | 1.2 | Lucia Gelmetti Mauro Dorigoni Ulises Gimenez | Revisión, corrección de redacción |

