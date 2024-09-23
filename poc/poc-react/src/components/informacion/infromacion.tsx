import React from 'react';
import './informacion.css';
import informacionImg from '../../assets/UTN-Rosario.jpg'

const Informacion: React.FC = () => {
    return (
      <div className='informacion'>
        <div className='informacion-left'>
            <img src={informacionImg} alt="" className='informacionImg'/>
        </div>
        <div className='informacion-right'>
            <h3>HISTORIA</h3>
            <h2>Acerca de la UTN Rosario</h2>
            <p>En Rosario, la Facultad Regional de la Universidad Tecnológica Nacional 
                tiene sus orígenes en 1953 sobre la base de la Escuela Fábrica N° 40 (hoy E.E.T. N° 468) 
                y del Ciclo Técnico (que funcionaba en el actual Colegio Nacional N° 2), dependientes ambos 
                de la Comisión Nacional de Aprendizaje y Orientación Profesional.</p>
            <p>El primer Secretario Técnico fue el Ing. Giordano Marchiori, quien conformó las primeras 
                cátedras e inscribió los primeros alumnos en las carreras de: Ingeniería Mecánica, Ingeniería 
                en Construcciones e Ingeniería Electromecánica. A más de 65 años de aquellos comienzos, seguimos 
                avanzando ofreciendo a la comunidad formación académica de excelencia.</p>
        </div>
      </div>
    );
  };
  
  export default Informacion;