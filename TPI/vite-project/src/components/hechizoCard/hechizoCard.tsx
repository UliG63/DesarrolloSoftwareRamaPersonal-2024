import React, { useState} from 'react';
import './hechizoCard.css';
import infoIcon from '../../assets/information.png';
import cross from '../../assets/crossWhite.png';
import axios from 'axios';
import { useEffect } from 'react';

interface Hechizo {
  idHechizo: number;
  nombre: string;
  descripcion: string;
  instrucciones: string;
  restringido: boolean;
  patente: {
    mago: {
        nombreM: string;
        apellido: string;
        email: string;
        profesion: string;
        madera_varita: string;
        nucleo_varita: string;
        largo_varita: number;
    };
    tipoHechizo: {
      nombreTH:string;
      caracteristicas: string;
    };
    etiquetas: {
      nombreE: string;
      descripcionE: string;
    }[];
  }
}

const HechizoCard: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [hechizos, setHechizos] = useState<Hechizo[]>([]);
  const fetchHechizos = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/hechizo`);
        console.log('Hechizos recibidos:', response.data);
        setHechizos(response.data.data);
    } catch (error) {
        setError('Error al cargar los hechizos');
        console.error(error);
    }
  };

  useEffect(() => {
    fetchHechizos();
  },);
  useEffect(() => {
    console.log('Hechizos:', hechizos);
  }, [hechizos]);



  return (
    <div className='hechizos-cards' id='hechizos-cards'>
      {hechizos.map((hechizo) => (
        <div key={hechizo.idHechizo} className='hechizo-card'>
          <div className='image-container'>
            <img src='../../assets/hechizo1.jpeg' alt={hechizo.nombre} className='hechizo-image' />
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
            <p className='hechizo-tipo'>
              {hechizo.patente?.tipoHechizo?.nombreTH || 'Tipo no disponible'}
            </p>
          </div>
          {/* Hace que el fondo sea oscuro con el pop-up */}
          <div className={`overlay ${isOpen === hechizo.idHechizo ? 'visible' : ''}`}></div>
          {/* Pop-up */}
          <div className={`pop-up ${isOpen === hechizo.idHechizo ? 'visible' : ''}`}>
            <div className='pop-up-content'>
              <button className='close-button' onClick={() => setIsOpen(null)}>
                <img src={cross} alt="" />
              </button>
              <img src='../../assets/hechizo1.png' alt={hechizo.nombre} className='hechizo-image' />
              <div className='pop-up-info'>
                <h2>{hechizo.nombre}</h2>
                <h4>Descripción</h4>
                <p>{hechizo.descripcion}</p>
                <h4>Instrucciones</h4>
                <p>{hechizo.instrucciones}</p>
                <h4>Tipo Hechizo</h4>
                <p>{hechizo.patente?.tipoHechizo?.nombreTH || 'Tipo no disponible'}</p>
                {/*Quería mostrar las etiquetas, pero me estresé en el intento*/}
              </div>
            </div>
          </div>
        </div>
      ))}
      {error && <div className="error-message">{error}</div>}  {/* Mostrar el error */}
    </div>
  );
};



export default HechizoCard;
