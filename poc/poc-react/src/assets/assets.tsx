import lic1 from '../assets/lic1.jpg';
import lic2 from '../assets/lic2.png';
import lic3 from '../assets/lic3.jpg';
import lic4 from '../assets/lic4.jpg';
import esp1 from '../assets/esp1.jpg';
import esp2 from '../assets/esp2.jpg';
import esp3 from '../assets/esp3.jpg';
import esp4 from '../assets/esp4.jpg';
import esp5 from '../assets/esp5.jpg';
import mas1 from '../assets/mas1.png';
import mas2 from '../assets/mas2.jpg';
import mas3 from '../assets/mas3.jpg';
import mas4 from '../assets/mas4.jpg';
import mas5 from '../assets/mas5.jpg';
import mas6 from '../assets/mas6.jpg';
import dip1 from '../assets/dip1.jpg';
import tec1 from '../assets/tec1.png';
import tec2 from '../assets/tec2.jpg';
import tec3 from '../assets/tec3.png';
import tec4 from '../assets/tec4.png';
import tec5 from '../assets/tec5.jpg';
import tec6 from '../assets/tec6.png';
import ing1 from '../assets/ing1.jpg';
import ing2 from '../assets/ing2.jpg';
import ing3 from '../assets/ing3.jpg';
import ing4 from '../assets/ing4.jpg';
import ing5 from '../assets/ing5.jpg';

export interface Carrera {
  tipo: string;
  nombre: string;
  descripcion: string;
  requisitos: string;
  horariosDictado: string;
  imagen: string;
}

export const carreras: Carrera[] = [
  {
    tipo: "Licenciatura",
    nombre: "Licenciatura en Tecnologías Inclusivas en Educación",
    descripcion: "El Licenciado en Tecnologías Inclusivas en Educación está capacitado para diseñar, intervenir y evaluar procesos de enseñanza y aprendizaje en el contexto de la educación inclusiva. Su formación le permite elaborar propuestas curriculares que promueven la inclusión educativa y ofrecer asesoramiento pedagógico y tecnológico a instituciones de todos los niveles del sistema educativo, desde inicial hasta superior.",
    requisitos: "Ser profesor/a en diferentes disciplinas, con títulos otorgados por Instituciones de Nivel Superior, con planes de estudio de 3 o más años de duración.",
    horariosDictado: "Modalidad 100% a distancia",
    imagen: lic1
  },
  {
    tipo: "Licenciatura",
    nombre: "Licenciatura en Higiene y Seguridad en el Trabajo",
    descripcion: "Esta carrera forma profesionales en la prevención y control de riesgos laborales, garantizando la integridad psicofísica de los trabajadores y el ambiente de trabajo. Los egresados adquirirán conocimientos técnicos y legales que les permitirán resolver problemas en la gestión de la higiene y seguridad, así como desarrollar planes de mejora en las condiciones laborales.",
    requisitos: "Poseer título de técnico superior en Higiene y Seguridad en el Trabajo u otro equivalente.",
    horariosDictado: "Martes a Viernes de 18:30 a 23:00",
    imagen: lic2
  },
  {
    tipo: "Licenciatura",
    nombre: "Licenciatura en Comercialización",
    descripcion: "El título de Licenciado en Comercialización otorga a los profesionales conocimientos y aptitudes para la conducción de procesos comerciales, tanto en la fase operativa como en la de planeamiento. También brinda la capacidad necesaria para asesorar empresas ya sean de tipo industrial o de servicios, en todos los procesos que implican comercialización de bienes y servicios y en el desarrollo y puesta en marcha de negocios.",
    requisitos: "Poseer título de Técnico Superior en Comercialización u otro equivalente en el mismo campo disciplinar.",
    horariosDictado: "Lunes a Viernes de 18:30 a 22:30 (30% Virtual - 70% Presencial)",
    imagen: lic3
  },
  {
    tipo: "Licenciatura",
    nombre: "Licenciatura en Tecnología Médica",
    descripcion: "La Licenciatura en Tecnología Médica es una carrera que forma profesionales con capacidad de gestionar con actitud ética, discernimiento crítico, creatividad y conocimientos técnicos y científicos, las aplicaciones clínicas de la tecnología médica. Se dicta en convenio con el Instituto Superior de Tecnología Médica",
    requisitos: "Poseer título de Técnico Radiólogo o equivalente en la rama del diagnóstico por imágenes.",
    horariosDictado: "Sábados de 8:00 a 13:00",
    imagen: lic4
  },
  {
    tipo: "Especialización",
    nombre: "Especialización en Docencia Universitaria",
    descripcion: "La Especialización en Docencia Universitaria promueve una formación orientada en la construcción de nuevos saberes y diseño de herramientas y estrategias didácticas, sociales y tecnológicas que les permitan al docente actual intervenir adecuadamente en los aconteceres propios de la enseñanza y el aprendizaje universitarios en los diferentes campos específicos.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Miércoles de 18:00 a 23:00",
    imagen: esp1
  },
  {
    tipo: "Especialización",
    nombre: "Especialización en Ingeniería Ambiental",
    descripcion: "El Especialista en Ingeniería Ambiental está preparado para formular programas de gestión ambiental, realizar diagnósticos y auditorías, y definir políticas que prevengan y controlen impactos negativos en el entorno. Su formación le permite elaborar modelos de gestión de acuerdo con normativas nacionales e internacionales, planificar sistemas de residuos y dirigir proyectos de investigación, contribuyendo a la sostenibilidad y el manejo responsable de los recursos naturales.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Modalidad mixta (Presencial-Virtual). Viernes de 18:00 a 22:00 y Sábados de 8:00 a 12:00",
    imagen: esp2
  },
  {
    tipo: "Especialización",
    nombre: "Especialización en Ingeniería en Calidad",
    descripcion: "La Especialización en Ingeniería en Calidad capacita a los profesionales para analizar riesgos, innovar en mejoras y aplicar herramientas de gestión adecuadas. Los egresados diseñan indicadores de eficacia y eficiencia, realizan diagnósticos e implementan modelos de gestión de calidad. Además, llevan a cabo auditorías en organizaciones y lideran equipos con un enfoque en la mejora continua y el cambio cultural.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Viernes de 18:30 a 22:30 y Sábados de 8:30 a 12:30",
    imagen: esp3
  },
  {
    tipo: "Especialización",
    nombre: "Especialización en Ingeniería Gerencial",
    descripcion: "El Especialista en Ingeniería Gerencial está preparado para desempeñar funciones ejecutivas en planificación, gestión y control de procesos en organizaciones. Los egresados adquieren competencias para administrar negocios nacionales e internacionales, actualizándose en prácticas profesionales y fortaleciendo sus aptitudes para enfrentar los desafíos del entorno empresarial. Además, desarrollan una conciencia ética en responsabilidad social, integrando valores humanistas en su enfoque gerencial.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Modalidad mixta (Presencial-Virtual). Días de cursado a confirmar según disponibilidad del grupo.",
    imagen: esp4
  },
  {
    tipo: "Especialización",
    nombre: "Especialización en Tecnología de los Alimentos",
    descripcion: "El Especialista en Tecnología de los Alimentos, con una sólida formación teórica y práctica, está capacitado para analizar, evaluar y diseñar procesos relacionados con el manejo de alimentos. Esto incluye el desarrollo e innovación de productos, así como la toma de decisiones estratégicas en la industria alimentaria, garantizando la excelencia en su actuación.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Modalidad mixta (Presencial-Virtual). A confirmar según disponibilidad del grupo.",
    imagen: esp5
  },
  {
    tipo: "Maestría",
    nombre: "Maestría en Minería de Datos",
    descripcion: "La Maestría en Minería de Datos tiene como objetivo formar profesionales altamente capacitados en los fundamentos y aplicaciones prácticas de la minería de datos y el descubrimiento del conocimiento. Se enfoca en la investigación, desarrollo y transferencia tecnológica en el análisis de datos, así como en la generación de recursos humanos para el ámbito universitario. Además, busca conceptualizar modelos representativos y gestionar eficazmente el ciclo de trabajo de las Ciencias de Datos y la Gestión del Conocimiento dentro de las organizaciones.",
    requisitos: "Poseer título de grado o de nivel terciario de 4 años de duración.",
    horariosDictado: "Viernes de 18:30 a 22:30 y Sábados de 9:00 a 12:00",
    imagen: mas1
  },
  {
    tipo: "Maestría",
    nombre: "Maestría en Ingeniería en Calidad",
    descripcion: "La Maestría en Ingeniería en Calidad proporciona una sólida formación teórica y metodológica, habilitando a los graduados para diseñar, implementar, auditar y evaluar sistemas de gestión. Los egresados están capacitados para abordar los desafíos de la innovación tecnológica, desarrollar metodologías de análisis que mejoren la eficacia organizacional y gestionar planes de mejora de procesos. También pueden intervenir en la certificación de productos y sistemas, investigar en el área y formar recursos humanos para la docencia. Además, tienen habilidades para liderar proyectos interdisciplinarios, coordinando la información y gestionando cambios culturales necesarios para alcanzar los objetivos.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Viernes de 18:00 a 23:00 y Sábados de 8:00 a 13:00",
    imagen: mas2
  },
  {
    tipo: "Maestría",
    nombre: "Maestría en Docencia Universitaria",
    descripcion: "La Maestría en Docencia Universitaria promueve la comprensión de la complejidad del ámbito de la educación universitaria, poniendo el énfasis en una formación docente sustentada desde la perspectiva de la interdisciplinariedad, caracterizada por la articulación teoría -práctica y la promoción de la investigación.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Miércoles de 19:00 a 23:00",
    imagen: mas3
  },
  {
    tipo: "Maestría",
    nombre: "Maestría en Administración de Negocios",
    descripcion: "La Maestría en Administración de Negocios ofrece una formación teórica y metodológica sólida, preparando a los graduados para enfrentar ambientes complejos y diversos. Los egresados desarrollan competencias en planificación, organización, gestión y control de organizaciones comerciales y productivas. Están capacitados para implantar soluciones innovadoras y gestionar cambios que aborden problemas de dirección y desarrollo organizacional. Además, pueden trabajar en equipos interdisciplinarios, participar en proyectos de investigación y formar a otros en el área, siempre con un fuerte compromiso ético, ambiental y social hacia la comunidad.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Martes y Jueves de 19:00 a 23:00",
    imagen: mas4
  },
  {
    tipo: "Maestría",
    nombre: "Maestría en Ingeniería Ambiental",
    descripcion: "La Maestría en Ingeniería Ambiental forma profesionales capacitados para gestionar programas ambientales, realizar diagnósticos y auditorías, y definir políticas que mitiguen impactos negativos. Los egresados diseñan modelos de gestión según normas nacionales e internacionales, establecen estándares de calidad, y lideran proyectos en contextos diversos. Su enfoque ético y sostenible les permite trabajar en equipos multidisciplinarios, aplicando metodologías de modelización ambiental y promoviendo la transferencia de tecnología.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Viernes de 18:00 a 22:00 y Sábados de 8:00 a 12:00",
    imagen: mas5
  },
  {
    tipo: "Maestría",
    nombre: "Maestría en Tecnología de los Alimentos",
    descripcion: "El Magister en Tecnología de los Alimentos, con base en una sólida formación integrada en las áreas científicas y tecnológicas, estará capacitado para el análisis, evaluación, diseño, desarrollo, planificación e implementación de toda actividad relacionada con el manejo de alimentos, ya sea de procesamiento o de servicios, lo que le permitirá lograr una excelencia en su accionar para actuar.",
    requisitos: "Poseer título de grado.",
    horariosDictado: "Lunes y Viernes de 19:00 a 23:00",
    imagen: mas6
  },
  {
    tipo: "Tecnicatura",
    nombre: "Tecnicatura en Saneamiento y Producción de Agua Potable",
    descripcion: "La carrera forma profesionales capacitados para operar y mantener sistemas de tratamiento de agua, tomar muestras para el control de calidad, colaborar en proyectos de conservación de recursos hídricos, aplicar tecnologías de monitoreo y participar en la gestión de proyectos relacionados con el saneamiento y el agua potable.",
    requisitos: "Exclusivo para personal de Aguas Santafesinas SA",
    horariosDictado: "Lunes a Viernes de 18:30 a 22:30",
    imagen: tec1
  },
  {
    tipo: "Tecnicatura",
    nombre: "Tecnicatura Universitaria en Programación",
    descripcion: "Esta carrera forma técnicos con habilidades para operar y programar computadoras, desarrollar software utilizando diversos lenguajes y metodologías, y gestionar sistemas informáticos y redes. Los graduados serán capaces de analizar e implementar soluciones eficientes en el ámbito de la programación.",
    requisitos: "Haber terminado de cursar los estudios correspondientes al nivel secundario.",
    horariosDictado: "Lunes a Viernes (Turno Mañana: 8:00 a 12:00 - Turno Tarde: 13:00 a 17:00 - Truno Noche: 18:00 a 22:00)",
    imagen: tec2
  },
  {
    tipo: "Tecnicatura",
    nombre: "Tecnicatura Universitaria en Mantenimiento Industrial",
    descripcion: "Esta carrera capacita a técnicos para asistir en el mantenimiento industrial, supervisar actividades en diferentes talleres, colaborar en la planificación de programas de mantenimiento, calcular costos y participar en la elaboración de manuales de calidad. Los graduados estarán preparados para realizar mantenimiento en diversas industrias y colaborar con el área de Seguridad Industrial.",
    requisitos: "Poseer Título Secundario o estar terminando de cursar el 5° o 6° año.",
    horariosDictado: "Lunes a Viernes de 18:30 a 22:30",
    imagen: tec3
  },
  {
    tipo: "Tecnicatura",
    nombre: "Tecnicatura Universitaria en Administración",
    descripcion: "El perfil del Técnico Universitario en Administración combina una sólida formación básica y tecnológica con un dominio de técnicas administrativas y contables, además de un conocimiento profundo de los marcos normativos. Esta carrera prepara a los estudiantes para desarrollar habilidades generales y profesionales, abarcando funciones proyectuales, de supervisión y trabajo coordinado dentro del sector administrativo.",
    requisitos: "Poseer título secundario o estar cursando el 5° o 6° año.",
    horariosDictado: "Lunes a Viernes: 18:30 a 23:00 (30% Virtual - 70% Presencial)",
    imagen: tec5
  },
  {
    tipo: "Tecnicatura",
    nombre: "Tecnicatura Universitaria en Seguridad Vial",
    descripcion: "El egresado de esta carrera estará capacitado para integrarse en equipos interdisciplinarios de Seguridad Vial, gestionando tareas de control y prevención. Tendrá habilidades para interpretar estadísticas y aplicar normas preventivas, además de colaborar con autoridades en el control vehicular y de sistemas viales, garantizando así la implementación efectiva de procesos de seguridad.",
    requisitos: "Poseer título secundario o estar terminado de cursar el 5° o 6° año.",
    horariosDictado: "Lunes a Viernes de 18:30 a 22:30 (30% Virtual - 70% Presencial)",
    imagen: tec4
  },
  {
    tipo: "Tecnicatura",
    nombre: "Tecnicatura Universitaria en Higiene y Seguridad en el Trabajo",
    descripcion: "El Técnico Universitario en Higiene y Seguridad en el Trabajo está preparado para planificar, organizar y evaluar aspectos de higiene y seguridad en entornos laborales. Su formación incluye la capacidad de analizar y controlar riesgos, asesorar en políticas de seguridad laboral e implementar programas de capacitación. También se enfoca en la administración de personal, la colaboración en el diseño ergonómico de equipos e instalaciones, y la auditoría del cumplimiento de normativas vigentes en seguridad e higiene.",
    requisitos: "Poseer Título Secundario o constancia de haber finalizado de cursar el 5° año.",
    horariosDictado: "Lunes a Viernes de 18:30 a 23:00 - Presencial",
    imagen: tec6
  },
  {
    tipo: "Diplomatura",
    nombre: "Diplomatura Universitaria en Gestión y Planificación Educativa",
    descripcion: "Esta carrera tiene como objetivo formar profesionales en gestión educativa, capaces de liderar proyectos de mejora institucional, consolidar equipos interdisciplinarios, capacitar docentes en investigación educativa, y gestionar la organización y evaluación de programas educativos en instituciones formales.",
    requisitos: "Poseer antecedentes docentes o de gestión en cualquiera de los niveles del sistema educativo.",
    horariosDictado: "Dos encuentros presenciales mensuales por cada seminario (días y horarios a definir según disponibilidad del grupo). Los encuentros presenciales podrán cursarse en la modalidad de videoconferencia.",
    imagen: dip1
  },
  {
    tipo: "Ingeniería",
    nombre: "Ingeniería Civil",
    descripcion: "El Ingeniero Civil resuelve problemas de infraestructura vital para la producción de bienes y servicios, incluyendo edificios, puentes, carreteras y sistemas de riego. Su trabajo abarca el diseño, construcción, mantenimiento y modernización de obras, considerando aspectos técnicos y económicos. También realiza estudios de factibilidad, trabajos topográficos y planificación de recursos hídricos, además de abordar temas de ingeniería legal y ambiental.",
    requisitos: "Poseer Título Secundario o constancia de haber finalizado de cursar el 5° año.",
    horariosDictado: "Lunes a Viernes (Turno Tarde: 13:00 a 17:00 - Truno Noche: 18:00 a 00:00)",
    imagen: ing5
  },
  {
    tipo: "Ingeniería",
    nombre: "Ingeniería Eléctrica",
    descripcion: "El Ingeniero Electricista está capacitado para analizar, diseñar, y mantener sistemas de generación, transporte y distribución de la energía eléctrica así como también para gestionar y organizar los recursos materiales y humanos disponibles. El manejo de la energía eléctrica requiere la máxima confiabilidad y eficiencia de modo que resulten seguros los servicios que la proveen y las instalaciones y máquinas que la utilizan.",
    requisitos: "Poseer Título Secundario o constancia de haber finalizado de cursar el 5° año.",
    horariosDictado: "Lunes a Viernes (Turno Tarde: 13:00 a 17:00 - Truno Noche: 18:00 a 00:00)",
    imagen: ing1
  },
  {
    tipo: "Ingeniería",
    nombre: "Ingeniería Química",
    descripcion: "Como Ingeniero Químico, estarás capacitado para desarrollar proyectos industriales y brindar asistencia técnica en plantas. Podrás realizar estudios de factibilidad, diseño, construcción y operación de procesos industriales, así como gestionar equipos e instalaciones complementarias. Tu campo de acción abarca diversas industrias, como saneamiento, alimentos, petróleo, energía nuclear y farmacéutica.",
    requisitos: "Poseer Título Secundario o constancia de haber finalizado de cursar el 5° año.",
    horariosDictado: "Lunes a Viernes (Turno Mañana: 7:00 a 13:00 - Turno Tarde: 13:00 a 17:00 - Truno Noche: 18:00 a 00:00)",
    imagen: ing2
  },
  {
    tipo: "Ingeniería",
    nombre: "Ingeniería Mecánica",
    descripcion: "El profesional en Ingeniería Mecánica de la UTN se forma con aptitudes y habilidades fundamentadas en el conocimiento científico y tecnológico. Esta formación le permite interpretar y desarrollar nuevas tecnologías con una visión innovadora y emprendedora. Además, está capacitado para identificar y resolver problemas de manera sistémica, siempre guiado por la ética y considerando aspectos biológicos, culturales, políticos, económicos y ambientales en su labor.",
    requisitos: "Poseer Título Secundario o constancia de haber finalizado de cursar el 5° año.",
    horariosDictado: "Lunes a Viernes (Turno Tarde: 13:00 a 17:00 - Truno Noche: 18:00 a 00:00)",
    imagen: ing4
  },
  {
    tipo: "Ingeniería",
    nombre: "Ingeniería en Sistemas",
    descripcion: "El Ingeniero en Sistemas está capacitado para planear, desarrollar, dirigir y controlar sistemas de información, así como también administrar recursos humanos, físicos y de aplicación que intervienen  en la implementación de proyectos. Posee además una formación que lo  habilita como investigador.",
    requisitos: "Poseer Título Secundario o constancia de haber finalizado de cursar el 5° año.",
    horariosDictado: "Lunes a Viernes (Turno Mañana: 7:00 a 13:00 - Turno Tarde: 13:00 a 17:00 - Truno Noche: 18:00 a 00:00)",
    imagen: ing3
  }
];
