import React from 'react';
import { Link } from 'react-router-dom'; //Importa Link de react-router-dom
import './inicio-menu.css';
import imagenFondo from '../../assets/test.jpg';
import icon1 from '../../assets/gear.png';
import icon2 from '../../assets/gorrito.png';
import icon3 from '../../assets/lupa.png';
import icon4 from '../../assets/titulo.png';
import icon5 from '../../assets/herramientas.png';
import icon6 from '../../assets/libro.png';

const InicioMenu: React.FC = () => {
  return (
    <div className='inicio-menu'>
      <div className='inicio-menu-item'>
        <Link to="/ingenierias">
          <img src={imagenFondo} alt="" />
          <div className='descripcion'>
            <img src={icon1} alt="" />
            <p>Ingenierías</p>
          </div>
        </Link>
      </div>
      <div className='inicio-menu-item'>
        <Link to="/maestrias">
          <img src={imagenFondo} alt="" />
          <div className='descripcion'>
            <img src={icon2} alt="" />
            <p>Maestrías</p>
          </div>
        </Link>
      </div>
      <div className='inicio-menu-item'>
        <Link to="/especializaciones">
          <img src={imagenFondo} alt="" />
          <div className='descripcion'>
            <img src={icon3} alt="" />
            <p>Especializaciones</p>
          </div>
        </Link>
      </div>
      <div className='inicio-menu-item'>
        <Link to="/diplomaturas">
          <img src={imagenFondo} alt="" />
          <div className='descripcion'>
            <img src={icon4} alt="" />
            <p>Diplomaturas</p>
          </div>
        </Link>
      </div>
      <div className='inicio-menu-item'>
        <Link to="/tecnicaturas">
          <img src={imagenFondo} alt="" />
          <div className='descripcion'>
            <img src={icon5} alt="" />
            <p>Tecnicaturas</p>
          </div>
        </Link>
      </div>
      <div className='inicio-menu-item'>
        <Link to="/licenciaturas">
          <img src={imagenFondo} alt="" />
          <div className='descripcion'>
            <img src={icon6} alt="" />
            <p>Licenciaturas</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default InicioMenu;