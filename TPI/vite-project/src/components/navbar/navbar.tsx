import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo.jpg';
import usuario from '../../assets/usuario.png';
import menuIcon from '../../assets/menu.png';
import menuCross from '../../assets/cross.png';
import { AuthContext } from '../../context/authContext';

// siendo completamente honesta, hice responsive, pero no me gustó como me quedó el dropdown, posiblemente lo cambie

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  //menuOpen -> gestionar la visibilidad del menú al hacer responsive
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  return (
    <nav className='container'>
      <Link to="/">
        <img src={logo} alt="Logo" className='logo' />
      </Link>
      <div className='menu-icon' onClick={toggleMenu}>
        <img src={menuOpen ? menuCross : menuIcon} alt="Menu Icon"/>
      </div>
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/">Inicio</Link></li>

        {/*si es empleado le muestra un dropdown con hover*/}
        {currentUser?.isEmpleado ? (
          <li className="dropdown">
            <span>Hechizos</span>
            <ul className="dropdown-menu">
              <li><Link to="/hechizos">Hechizos</Link></li>
              <li><Link to="/tipo_hechizo">Tipo de Hechizo</Link></li>
              <li><Link to="/etiquetas">Etiquetas</Link></li>
            </ul>
          </li>
        ) : (
          <li><Link to="/hechizos">Hechizos</Link></li>
        )}

        <li><Link to="/patentes">Patentes</Link></li>
        <li><Link to="/visualizacion">Visualización</Link></li>

        {/*sólo aparecen para empleados, la validación se hace en app.tsx*/}
        {currentUser?.isEmpleado && (
          <>
            <li><Link to="/instituciones">Instituciones</Link></li>
            <li><Link to="/magos">Magos</Link></li>
          </>
        )}

        <li>
          <Link to="/user">
            <img src={usuario} alt="Usuario" className='usuario'/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
