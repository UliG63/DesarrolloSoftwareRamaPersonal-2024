import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo-utn.png';
import ampliar from '../../assets/ampliar.png';
import contraer from '../../assets/contraer.png';

const Navbar: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
            <img src={logo} alt="" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li>
          <div className="carreras-menu" onClick={toggleDropdown}>
            Carreras 
            <img src={dropdownVisible ? contraer : ampliar} alt="Toggle icon" className="toggle-icon" />
          </div>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li><Link to="/ingenierias">Ingenierías</Link></li>
              <li><Link to="/maestrias">Maestrías</Link></li>
              <li><Link to="/especializaciones">Especializaciones</Link></li>
              <li><Link to="/diplomaturas">Diplomaturas</Link></li>
              <li><Link to="/tecnicaturas">Tecnicaturas</Link></li>
              <li><Link to="/licenciaturas">Licenciaturas</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/novedades">Novedades</Link></li>
        <li><Link to="/informacion">Información</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
