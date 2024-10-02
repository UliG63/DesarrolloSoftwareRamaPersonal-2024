import React from 'react';
import { Link } from 'react-router-dom'; //Importa Link de react-router-dom
import './informacion-menu.css';
import icon1 from '../../assets/user_icon.png';


const InformacionMenu: React.FC = () => {
  return (
    <div className='informacion-menu'>
      <div className='informacion-menu-item'>
        <Link to="https://www.alumnos.frro.utn.edu.ar/loginAlumno.asp?refrescar">        
          <div className='descripcion'>
            <img src={icon1} alt="" />
            <p>Autogestion alumnos</p>
          </div>
        </Link>
      </div>
      <div className='informacion-menu-item'>
        <Link to="https://www.docentes.frro.utn.edu.ar/">   
          <div className='descripcion'>
            <img src={icon1} alt="" />
            <p>Autogestion docentes</p>
          </div>
        </Link>
      </div>
      <div className='informacion-menu-item'>
        <Link to="https://frro.cvg.utn.edu.ar/">         
          <div className='descripcion'>
            <img src={icon1} alt="" />
            <p>CVG</p>
          </div>
        </Link>
      </div>
      
    </div>
  );
};

export default InformacionMenu;