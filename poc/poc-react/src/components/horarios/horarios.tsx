import React from 'react';
import './horarios.css';

const Horarios: React.FC = () => {
    return (
      <div className='informacion-horarios'>
        <div className='informacion-horarios-left'>
            <h3>Horarios de atención</h3>
            <h2>Alumnos y público en general</h2>
            <p>Lunes a Jueves - 9:00hs a 12:00hs y de 16:00hs a 19:00hs.</p>
            <h2>Egresados</h2>
            <p>Lunes a Viernes 9:00 a 19:00 hs.</p>
            <p>E. Zeballos 1372 PB - ROSARIO, SANTA FE
              0341 - 4481871</p>
        </div>
      </div>
    );
  };
  
  export default Horarios;