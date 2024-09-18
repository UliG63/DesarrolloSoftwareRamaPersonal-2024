import React, { useState, useContext } from 'react';
import './hechizoCard.css';
import { HechizosContext } from '../../context/hechizosContext';
import infoIcon from '../../assets/information.png';
import cross from '../../assets/crossWhite.png';

const HechizoCard: React.FC = () => {
  //Estado para controlar qué pop-up está abierto
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const { hechizos } = useContext(HechizosContext);

  return (
    <div className='hechizos-cards' id='hechizos-cards'>
      {hechizos.map((hechizo) => (
        <div key={hechizo.idHechizo} className='hechizo-card'>
          <div className='image-container'>
            <img src={hechizo.imagen} alt={hechizo.nombre} className='hechizo-image' />
            {!hechizo.restringido && (
              <button
                className='info-button'
                onClick={() => setIsOpen(hechizo.idHechizo)} //Abre el pop-up para este hechizo
              >
                <img src={infoIcon} alt="Información" />
              </button>
            )}
          </div>
          <div className='hechizo-info'>
            <h2 className='hechizo-name'>{hechizo.nombre}</h2>
            <p className='hechizo-description'>{hechizo.descripcion}</p>
            <p className='hechizo-tipo'>{hechizo.tipoHechizo.nombre}</p>
          </div>
          {/* Hace que el fondo sea oscuro con el pop-up */}
          <div className={`overlay ${isOpen === hechizo.idHechizo ? 'visible' : ''}`}></div>
          {/* Pop-up */}
          <div className={`pop-up ${isOpen === hechizo.idHechizo ? 'visible' : ''}`}>
            <div className='pop-up-content'>
              <button className='close-button' onClick={() => setIsOpen(null)}>
                <img src={cross} alt="" />
              </button>
              <img src={hechizo.imagen} alt={hechizo.nombre} className='hechizo-image' />
              <div className='pop-up-info'>
                <h2>{hechizo.nombre}</h2>
                <h4>Descripción</h4>
                <p>{hechizo.descripcion}</p>
                <h4>Instrucciones</h4>
                <p>{hechizo.instrucciones}</p>
                <h4>Tipo Hechizo</h4>
                <p>{hechizo.tipoHechizo.nombre}</p>
                {/*Quería mostrar las etiquetas, pero me estresé en el intento*/}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export default HechizoCard;
