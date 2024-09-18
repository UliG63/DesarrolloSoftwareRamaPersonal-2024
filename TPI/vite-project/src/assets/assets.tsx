import hechizo1 from '../assets/hechizo1.jpeg';
import hechizo2 from '../assets/hechizo2.jpeg';
import hechizo3 from '../assets/hechizo3.jpeg';
import hechizo4 from '../assets/hechizo4.jpeg';
import hechizo5 from '../assets/hechizo5.jpeg';
import hechizo6 from '../assets/hechizo6.2.jpeg';
import hechizo7 from '../assets/hechizo7.jpeg';
import hechizo8 from '../assets/hechizo8.jpeg';

export interface Etiqueta {
    idEtiqueta: number;
    nombre: string;
    descripcion: string;
  }
  
  export interface TipoHechizo {
    idTipoHechizo: number;
    nombre: string;
    caracteristicas: string;
    notas: string;
  }
  
  export interface Hechizo {
    idHechizo: number;
    patente: number;
    tipoHechizo: TipoHechizo;
    imagen: string; // Agregar propiedad para la imagen
    nombre: string;
    descripcion: string;
    instrucciones: string;
    restringido: boolean;
    etiquetas: Etiqueta[];
  }
  
  // Definir los tipos de hechizos
  const tiposHechizo: TipoHechizo[] = [
    {
        idTipoHechizo: 1,
        nombre: 'Encantamiento',
        caracteristicas: 'Estos hechizos alteran las propiedades de sus objetivos, como sus comportamientos y propiedades. No alteran la esencia de las propiedades de quien lo sufre, sólo aumentan o cambian sus propiedades.',
        notas: 'Estos hechizos alteran las propiedades de sus objetivos, como sus comportamientos y propiedades. No alteran la esencia de las propiedades de quien lo sufre, sólo aumentan o cambian sus propiedades. Cuando son lanzados por un practicante experimentado, los encantamientos suelen tener efectos de muy larga duración.',
      },
      {
        idTipoHechizo: 2,
        nombre: 'Embrujo',
        caracteristicas: 'También conocidos como "mal de ojo", tienen una ligera connotación de magia oscura. Son hechizos cuyos efectos son irritantes, pero divertidos, y que generan inconvenientes menores al objetivo.',
        notas: 'Son hechizos cuyos efectos son irritantes, pero divertidos, y que generan inconvenientes menores al objetivo. Los embrujos sólo duran mientras el lanzador mantenga el contacto ocular con el objetivo.',
      },
      {
        idTipoHechizo: 3,
        nombre: 'Maleficio',
        caracteristicas: 'Afectan al objetivo de manera negativa; tiene una connotación de magia oscura, ligeramente peor que un "mal de ojo". Genera grandes inconvenientes a la víctima.',
        notas: 'Tiene una connotación de magia oscura, ligeramente peor que un "mal de ojo". Genera grandes inconvenientes a la víctima.',
      },
      {
        idTipoHechizo: 4,
        nombre: 'Maldición',
        caracteristicas: 'Se reservan para los peores tipos de magia oscura, con la intención de afectar al objetivo de manera sumamente negativa.',
        notas: 'La mayoría de las maldiciones dejan secuelas que no se pueden revertir.',
      },
      {
        idTipoHechizo: 5,
        nombre: 'Contrahechizo',
        caracteristicas: 'Inhibición o finalización del efecto de otro hechizo.',
        notas: 'Existen seis tipos conocidos: Contraembrujos, contrahechizos, contraencantamientos, destransformaciones, antiembrujos y contrahechizos sin diferenciación. Mientras que la nomenclatura es compleja, todos ellos tienen en común la inhibición de otro hechizo.',
      },
      {
        idTipoHechizo: 6,
        nombre: 'Hechizo de curación',
        caracteristicas: 'Mejora la condición de los seres vivos.',
        notas: 'Existen varios tipos y efectos, todos ellos destinados a sanar o curar a los seres vivos.',
      },
      {
        idTipoHechizo: 7,
        nombre: 'Transformación',
        caracteristicas: 'También conocidos como hechizos de transfiguración, alteran la forma o apariencia del objetivo.',
        notas: 'También conocidos como hechizos de transfiguración, alteran la forma o apariencia del objetivo. Los hechizos de este grupo pueden separarse en verdaderos hechizos de transfiguración (donde un objeto existente es alterado), y conjuraciones, donde el objeto conjurado es aparentemente transformado de la nada.',
      },
  ];
  
  // Definir las etiquetas
  const etiquetas: Etiqueta[] = [
    { idEtiqueta: 1, nombre: 'Básico', descripcion: 'Estos hechizos son los más fáciles de aprender y ejecutar. Se enseñan en los primeros años en Hogwarts y no requieren mucho poder mágico ni concentración.' },
    { idEtiqueta: 2, nombre: 'Intermedio', descripcion: 'Estos hechizos requieren más práctica y habilidad que los básicos. Se enseñan en los cursos intermedios en Hogwarts y pueden tener efectos más complejos.'},
    { idEtiqueta: 3, nombre: 'Avanzado', descripcion: 'Los hechizos avanzados son difíciles de dominar y suelen ser enseñados en los últimos años de Hogwarts. Requieren una comprensión profunda de la magia y una gran concentración.'},
    { idEtiqueta: 4, nombre: 'Experto', descripcion: 'Estos hechizos son extremadamente difíciles y solo los magos y brujas más talentosos pueden ejecutarlos correctamente. Su enseñanza es rara y suelen necesitarse años de práctica.'},
    { idEtiqueta: 5, nombre: 'Prohibido', descripcion: 'Los hechizos prohibidos son extremadamente peligrosos y están regulados por el Ministerio de Magia. Su uso es ilegal y se enseñan solo en circunstancias especiales o bajo supervisión estricta.'},
    { idEtiqueta: 6, nombre: 'Legendario', descripcion: 'Estos hechizos son extremadamente raros y se encuentran en el límite de la magia conocida. Requieren una destreza mágica increíble y a menudo están envueltos en mitos y leyendas. Pocos magos en la historia han sido capaces de realizarlos.'},
    { idEtiqueta: 7, nombre: 'Ofensivo', descripcion: 'Diseñados para atacar o dañar.'},
    { idEtiqueta: 8, nombre: 'Defensivo', descripcion: 'Utilizados para protegerse o defenderse.'},
    { idEtiqueta: 9, nombre: 'Utilitario', descripcion: 'Hechizos prácticos para el día a día o tareas específicas.'},
    { idEtiqueta: 10, nombre: 'Temporal', descripcion: 'El hechizo tiene un efecto limitado en el tiempo.'},
    { idEtiqueta: 11, nombre: 'Permanente', descripcion: 'El hechizo tiene un efecto duradero o permanente.'},
    { idEtiqueta: 12, nombre: 'Transformador', descripcion: 'Cambia la forma o la naturaleza de algo.'},
    { idEtiqueta: 13, nombre: 'Verbal', descripcion: 'Requieren que el lanzador pronuncie las palabras mágicas en voz alta para que el hechizo se active.'},
    { idEtiqueta: 14, nombre: 'No Verbal', descripcion: 'No requieren que el lanzador pronuncie las palabras mágicas en voz alta.'},
  ];
  
  // Definir los hechizos
  export const hechizos: Hechizo[] = [
    {
      idHechizo: 1,
      patente: 1,
      tipoHechizo: tiposHechizo[5],
      imagen: hechizo1,
      nombre: 'Finite Incantatem',
      descripcion: 'Luz Roja. Cesa todos los efectos de los hechizos.',
      instrucciones: 'El movimiento de la varita es rápido y preciso, dibujando una forma de escudo.',
      restringido: false,
      etiquetas: [
        etiquetas[2], 
        etiquetas[9],
        etiquetas[11],
        etiquetas[13], 
        etiquetas[14],
      ],
    },
    {
      idHechizo: 2,
      patente: 2,
      tipoHechizo: tiposHechizo[1],
      imagen: hechizo2,
      nombre: 'Expecto Patronum',
      descripcion: 'Luz Plateada. Conjura un espíritu guardián mágico.',
      instrucciones: 'Realiza un movimiento circular en sentido horario (derecha) con la varita, comenzando desde la parte inferior del círculo. Requiere utilizar la felicidad para poder conjurarlo.',
      restringido: false,
      etiquetas: [
        etiquetas[3],
        etiquetas[8],
        etiquetas[10], 
        etiquetas[13], 
      ],
    },
    {
        idHechizo: 3,
        patente: 3,
        tipoHechizo: tiposHechizo[4],
        imagen: hechizo3,
        nombre: 'Sectumsempra',
        descripcion: 'Luz Blanca. Hace profundos cortes en el objetivo.',
        instrucciones: 'Realizar movimientos cortantes y bruscos con la varita.',
        restringido: true,
        etiquetas: [
          etiquetas[5],
          etiquetas[7],
          etiquetas[11], 
          etiquetas[14], 
        ],
      },
    {
        idHechizo: 4,
        patente: 4,
        tipoHechizo: tiposHechizo[1],
        imagen: hechizo4,
        nombre: 'Wingardium Leviosa',
        descripcion: 'Sin Luz. Hace que los objetos leviten.',
        instrucciones: 'Realiza una curva suave y ascendente hacia la derecha. Luego, lleva la varita hacia abajo en una curva y termina el movimiento con un pequeño giro hacia arriba.',
        restringido: false,
        etiquetas: [
          etiquetas[1], 
          etiquetas[9],
          etiquetas[10],
          etiquetas[13],
        ],
    },
    {
        idHechizo: 5,
        patente: 5,
        tipoHechizo: tiposHechizo[1],
        imagen: hechizo5,
        nombre: 'Obliviate',
        descripcion: 'Luz Verde. Borra recuerdos de la memoria del objetivo.',
        instrucciones: 'Movimiento curvo, circular, que se asemeja a la forma de un cerebro.',
        restringido: false,
        etiquetas: [
          etiquetas[5], 
          etiquetas[7],
          etiquetas[11],
          etiquetas[13],
        ],
    },
    {
        idHechizo: 6,
        patente: 6,
        tipoHechizo: tiposHechizo[4],
        imagen: hechizo6,
        nombre: 'Imperio',
        descripcion: 'Sin Luz o Luz Amarilla Verdosa. Control total sobre la persona.',
        instrucciones: 'Apuntar la varita al objetivo, trazar un 4 de abajo hacia arriba. Se debe comunicar lo que tiene que realizar.',
        restringido: true,
        etiquetas: [
          etiquetas[5],
          etiquetas[7],
          etiquetas[10],
          etiquetas[13],
        ],
    },
    {
        idHechizo: 7,
        patente: 7,
        tipoHechizo: tiposHechizo[1],
        imagen: hechizo7,
        nombre: 'Expelliarmus',
        descripcion: 'Luz Roja. Desarma al oponente.',
        instrucciones: 'Dirige la varita hacia el objetivo con un movimiento rápido y firme hacia adelante, como si empujaras la energía hacia fuera.',
        restringido: false,
        etiquetas: [
          etiquetas[2],
          etiquetas[7],
          etiquetas[11],
          etiquetas[13],
          etiquetas[14],
        ],
    },
    {
        idHechizo: 8,
        patente: 8,
        tipoHechizo: tiposHechizo[1],
        imagen: hechizo8,
        nombre: 'Alohomora',
        descripcion: 'Sin Luz. Desbloquea puertas y cerraduras.',
        instrucciones: 'Haz un movimiento rápido en forma de "S" con la varita, comenzando desde la parte superior izquierda hacia la parte inferior derecha.',
        restringido: false,
        etiquetas: [
            etiquetas[1],
            etiquetas[9],
            etiquetas[11],
            etiquetas[13],
            etiquetas[14],
        ],
    },
  ];
  