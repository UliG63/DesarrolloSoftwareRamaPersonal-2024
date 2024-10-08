import React, { useState } from 'react';
import './carreraCard.css';
import cruz from '../../assets/cruzAzul.png';

interface CarreraCardProps {
  nombre: string;
  descripcion: string;
  horariosCursado: string;
  requisitos: string;
  imagen: string;
}

const CarreraCard: React.FC<CarreraCardProps> = ({ nombre, descripcion, horariosCursado, requisitos, imagen }) => {
  //hook useState -> gestionar la visibilidad de un popup
  const [showPopup, setShowPopup] = useState(false);

  // handlePopup -> función para alternar el estado de showPopup con el botón +Info
  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='carrera-cards'>
      <div className="carrera-card">
        <div className='carrera-card-img'>
          <img src={imagen} alt="" />
          <button className="info-button" onClick={handlePopup}>+Info</button>
        </div>
        <h2>{nombre}</h2>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{nombre}</h3>
            <h6>Descrpción</h6>
            <p>{descripcion}</p>
            <h6>Horarios de Cursado</h6>
            <p>{horariosCursado}</p>
            <h6>Requisitos</h6>
            <p>{requisitos}</p>
            <button className="close-button" onClick={handlePopup}>
                <img src={cruz} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarreraCard;
