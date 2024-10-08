import React, { useContext } from 'react';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import './carrerasTipo.css';
import { CarrerasContext } from '../context/carrerasContext';
import CarreraCard from '../components/carreraCard/carreraCard';
import Inicio from '../components/inicio/inicio';
import fondo from '../assets/test.jpg';

interface CarrerasTipoProps {
  tipo: string;
}

const CarrerasTipo: React.FC<CarrerasTipoProps> = ({ tipo }) => {
  const carrerasContext = useContext(CarrerasContext);

  if (!carrerasContext) {
    return <div>No se encontraron carreras.</div>;
  }

  const { carreras } = carrerasContext;

  //ignora mayúsculas/minúsculas porque me olvidé cómo los había definido
  const carrerasFiltradas = carreras.filter((carrera) =>
    carrera.tipo.toLowerCase() === tipo.toLowerCase()
  );

  //define el subTitle según el tipo de carrera
  let subTitle = '';
  switch (tipo) {
    case 'Licenciatura':
      subTitle = 'Los Ciclos de Licenciatura son trayectorias formativas que se definen a partir de su articulación con carreras de profesorados y tecnicaturas superiores, ampliando sus alcances profesionales a través de una carrera de grado universitario.';
      break;
    case 'Tecnicatura':
      subTitle = 'Las Tecnicaturas Universitarias son carreras cortas que perimiten una rápida salida laboral que de respuesta a necesidades del medio, proporcionando a éste recursos humanos altamente capacitados.';
      break;
    case 'Diplomatura':
      subTitle = 'Las Diplomaturas son cursos organizados en planes de estudio, orientados a la capacitación y perfeccionamiento en un área específica. Pueden requerir título secundario o universitario, y cuentan con reconocimiento oficial de la Universidad.';
      break;
    case 'Ingeniería':
      subTitle = 'Los Ingenieros Tecnológicos se destacan por su creatividad, capacidad de evaluación, y responsabilidad social, desempeñándose en áreas industriales, laboratorios, servicios y proyectos productivos.';
      break;
    case 'Maestría':
      subTitle = 'Las carreras de Maestrías tienen por objeto proporcionar a graduados universitarios el acceso a un avanzado nivel de formación en una disciplina o área interdisciplinaria, profundizando en su desarrollo científico, tecnológico, profesional y/o para la investigación.';
      break;
    case 'Especialización':
      subTitle = 'Las Especializaciones tienen por objeto profundizar el dominio de un tema o área determinada dentro de una profesión o de un campo de aplicación de varias profesiones.';
      break;
  }

  return (
    <div className='carreras-tipo'>
      <Navbar />
      <Inicio title={tipo} subTitle={subTitle} backgroundImage={fondo} />
      <div className='carreras-list'>
        {carrerasFiltradas.length > 0 ? (
          carrerasFiltradas.map((carrera) => (
            <CarreraCard
              key={carrera.nombre}
              nombre={carrera.nombre}
              descripcion={carrera.descripcion}
              horariosCursado={carrera.horariosDictado}
              requisitos={carrera.requisitos}
              imagen={carrera.imagen}
            />
          ))
        ) : (
          <p>No hay carreras disponibles para este tipo.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CarrerasTipo;
