import React from 'react';
import { Link } from 'react-router-dom'; //Importa Link de react-router-dom
import './inicio-menu.css';
import item1 from '../../assets/hechizos.jpeg';
import item2 from '../../assets/patente.jpeg';
import item3 from '../../assets/restricted.jpeg';
import icon1 from '../../assets/magic-wand.png';
import icon2 from '../../assets/unlock.png';
import icon3 from '../../assets/icons8-diploma-50.png';

//Habría que al hacer responsive tener que hacer doble click sobre las imágenes, pero bueno, próximamente

const InicioMenu: React.FC = () => {
  return (
    <div className='inicio-menu'>
      <div className='inicio-menu-item'>
        <Link to="/hechizos"> {/*Link para Hechizos*/}
          <img src={item1} alt="" />
          <div className='descripcion'>
            <img src={icon1} alt="" />
            <p>Hechizos</p>
          </div>
        </Link>
      </div>
      <div className='inicio-menu-item'>
        <Link to="/patentes"> {/*Link para Patentes*/}
          <img src={item2} alt="" />
          <div className='descripcion'>
            <img src={icon3} alt="" />
            <p>Patentes</p>
          </div>
        </Link>
      </div>
      <div className='inicio-menu-item'>
        <Link to="/visualizacion"> {/*Link para Visualización*/}
          <img src={item3} alt="" />
          <div className='descripcion'>
            <img src={icon2} alt="" />
            <p>Visualización</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default InicioMenu;
