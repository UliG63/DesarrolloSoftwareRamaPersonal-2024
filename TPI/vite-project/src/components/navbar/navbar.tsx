import React, { useState } from 'react';
import { Link } from 'react-router-dom'; //Importa Link de react-router-dom
import './navbar.css';
import logo from '../../assets/logo.jpg';
import usuario from '../../assets/usuario.png';
import menuIcon from '../../assets/menu.png';
import menuCross from '../../assets/cross.png';

const Navbar: React.FC = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className='container'>
      <img src={logo} alt="" className='logo' />
      <div className='menu-items' onClick={handleClick}>
        <img src={clicked ? menuCross : menuIcon} alt="Menu Icon" className='menu-icon' />
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/hechizos">Hechizos</Link></li>
        <li><Link to="/patentes">Patentes</Link></li>
        <li><Link to="/visualizacion">Visualización</Link></li>
        <li>
          <Link to="/user">
            <img src={usuario} alt="" className='usuario'/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
