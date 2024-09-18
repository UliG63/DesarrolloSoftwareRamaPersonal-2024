import React from 'react';
import './informacion.css';
import informacionImg from '../../assets/empleados.jpeg'

const Informacion: React.FC = () => {
    return (
      <div className='informacion'>
        <div className='informacion-left'>
            <img src={informacionImg} alt="" className='informacionImg'/>
        </div>
        <div className='informacion-right'>
            <h3>ESTRUCTURA</h3>
            <h2>Acerca del Ministerio</h2>
            <p>El Ministerio de Magia, con sede en los profundos sótanos 
                de Londres, es la entidad gubernamental encargada de la 
                regulación y supervisión de todos los aspectos del mundo 
                mágico en el Reino Unido. Este organismo central es responsable 
                de mantener la seguridad, la ley y el orden en la comunidad 
                mágica, asegurando una coexistencia armoniosa con el mundo no 
                mágico.</p>
            <p>La escuela oficial para jóvenes magos es Hogwarts, ubicada en 
                Escocia, donde se forman las futuras generaciones de hechiceros 
                y brujas. Para el cuidado de la salud mágica, el hospital de 
                referencia es San Mungo, conocido por su excelencia en el 
                tratamiento de enfermedades y lesiones mágicas. En cuestiones 
                legales, el Wizengamot actúa como el tribunal de justicia supremo, 
                encargándose de la resolución de casos legales y juicios importantes. 
                Además, el diario oficial del Ministerio es El Profeta, que proporciona 
                noticias y actualizaciones sobre el mundo mágico.</p>
        </div>
      </div>
    );
  };
  
  export default Informacion;