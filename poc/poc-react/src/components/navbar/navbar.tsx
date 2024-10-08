import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo-utn.png';
import ampliar from '../../assets/ampliar.png';
import contraer from '../../assets/contraer.png';
import menuIcon from '../../assets/menuNegro.png';
import menuCross from '../../assets/cruzNegra.png';

const Navbar: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //dropdownVisible -> gestionar la visibilidad del submenú de carreras
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  //menuOpen -> gestionar la visibilidad del menú al hacer responsive
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  //cuando redirige que se cierre el menú
  const closeMenu = () => {
    setMenuOpen(false); //cierra el menú completo
    setDropdownVisible(false); //cierra también el dropdown si está abierto
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <img src={menuOpen ? menuCross : menuIcon} alt="Menu icon" />
      </div>
      {/*open cuando el menú está abierto*/}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
        <li>
          <div className="carreras-menu" onClick={toggleDropdown}>
            Carreras
            <img src={dropdownVisible ? contraer : ampliar} alt="Toggle icon" className="toggle-icon" />
          </div>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li><Link to="/ingenierias" onClick={closeMenu}>Ingenierías</Link></li>
              <li><Link to="/maestrias" onClick={closeMenu}>Maestrías</Link></li>
              <li><Link to="/especializaciones" onClick={closeMenu}>Especializaciones</Link></li>
              <li><Link to="/diplomaturas" onClick={closeMenu}>Diplomaturas</Link></li>
              <li><Link to="/tecnicaturas" onClick={closeMenu}>Tecnicaturas</Link></li>
              <li><Link to="/licenciaturas" onClick={closeMenu}>Licenciaturas</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/novedades" onClick={closeMenu}>Novedades</Link></li>
        <li><Link to="/informacion" onClick={closeMenu}>Información</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
