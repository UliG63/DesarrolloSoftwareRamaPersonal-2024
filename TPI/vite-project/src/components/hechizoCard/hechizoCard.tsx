import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './hechizoCard.css';
import infoIcon from "../../assets/information.png";
import searchIcon from "../../assets/icons8-búsqueda-50.png";
import warningCon from "../../assets/icons8-error-50.png";
import cross from "../../assets/crossWhite.png";
import imgHechizo1 from '../../assets/hechizo1.jpeg';
import { AuthContext } from '../../context/authContext.tsx';
import ModalMessage from '../modalMessage/modalMessage';
import { ErrorTipo } from '../modalMessage/error.enum.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

interface Hechizo {
  id: number;
  nombre: string;
  descripcion: string;
  instrucciones: string;
  restringido: boolean;
  patente: {
    imagen: string;
    tipo_hechizo: {
      nombre: string;
      caracteristicas: string;
    };
    mago: {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
      profesion: string;
      madera_varita: string;
      nucleo_varita: string;
      largo_varita: number;
    };
    etiquetas: {
      nombre: string;
      descripcion: string;
    }[];
  };
}

const HechizoCard: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [hechizos, setHechizos] = useState<Hechizo[]>([]);
  const [hechizosPermitidos, setHechizosPermitidos] = useState(new Set());
  const [filteredHechizos, setFilteredHechizos] = useState<Hechizo[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<{ label: string; value: string } | null>(null);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState<{ label: string; value: string } | null>(null);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
  const [recargaPagina, setRecargaPagina] = useState(false)
  const [modalMessage, setModalMessage] = useState('');

  if (!currentUser) {
    setTipoError(ErrorTipo.HARD_ERROR);
    setRecargaPagina(false);
    setModalMessage('No se pudo recuperar el usuario loggeado.');
    setShowModal(true);
  }
  const fetchHechizos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/hechizo/all/${currentUser?.id}`);
      //manejo por si no hay hechizos cargados o si no se puede recuperar de la API
      const data = response.data.data || []; 
      setHechizos(data);
      setFilteredHechizos(data);
      setError(null);
    } catch (error) {
      setError('No se pudieron recuperar los hechizos');
      setHechizos([]);
      setFilteredHechizos([]);
      setTipoError(ErrorTipo.HARD_ERROR);
      setRecargaPagina(false);
      setModalMessage('No se pudieron recuperar los hechizos');
      setShowModal(true);
    }
  };
  
  useEffect(() => {
    fetchHechizos();
  }, []);

  //Traigo los ids de los hechizos para los cuales tiene permiso de visualizacion el usuario
  const fetchHechizosPermitidos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/hechizo/permitidos/${currentUser?.id}`);
      const idsPermitidos = new Set(response.data.data.map((h: { id: number }) => h.id)); 
      setHechizosPermitidos(idsPermitidos);
    } catch (error) {
      console.error("Error al recuperar hechizos permitidos", error);
      setHechizosPermitidos(new Set()); // Para no romper todo
      setError('No se pudieron recuperar los hechizos permitidos para el usuario');
      setTipoError(ErrorTipo.HARD_ERROR);
      setRecargaPagina(false);
      setModalMessage('No se pudieron recuperar los hechizos permitidos para el usuario');
      setShowModal(true);
    }
  };
  useEffect(() => {
    if (currentUser?.id) {
      fetchHechizosPermitidos();
    }
  }, [currentUser]);

  //Logica de Busqueda
  const handleSearch = () => {
    const searchInput = document.querySelector("input[type='search']") as HTMLInputElement;
    const query = searchInput?.value.toLowerCase();
    if (query && query !== '') {
      const filteredResults = hechizos.filter(hechizo =>
        hechizo.nombre.toLowerCase().includes(query) || hechizo.descripcion.toLowerCase().includes(query)
      );
      setFilteredHechizos(filteredResults);
    } else {
      setFilteredHechizos(hechizos); // Si no hay búsqueda, mostrar todos los hechizos
    }
  };

  // Manejar la búsqueda cuando presionamos "Enter"
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); // Llama a handleSearch cuando se presiona Enter
    }
  };

  //Logica de Filtrado
  const tiposUnicos: string[] = [...new Set(hechizos.map(hechizo => hechizo.patente?.tipo_hechizo?.nombre || ''))];
  const tiposOptions = [{ label: 'Todos', value: '' }, ...tiposUnicos.map((tipo: string) => ({ label: tipo, value: tipo }))];

  const etiquetasUnicas: string[] = [
    ...new Set(hechizos.flatMap(hechizo => hechizo.patente?.etiquetas?.map(etiqueta => etiqueta.nombre) || [])),
  ];
  const etiquetasOptions = [{ label: 'Todos', value: '' }, ...etiquetasUnicas.map((etiqueta: string) => ({ label: etiqueta, value: etiqueta }))];

  const handleFilterChange = () => {
    let filtered = filteredHechizos
    if (selectedTipo && selectedTipo.value !== '') {
      filtered = filtered.filter(hechizo => hechizo.patente?.tipo_hechizo?.nombre === selectedTipo.value);
    }

    if (selectedEtiqueta && selectedEtiqueta.value !== '') {
      filtered = filtered.filter(hechizo =>
        hechizo.patente?.etiquetas?.some(etiqueta => etiqueta.nombre === selectedEtiqueta.value)
      );
    }

    setFilteredHechizos(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedTipo, selectedEtiqueta]);

  const getImageSrc = (hechizo: Hechizo) => {
    // Verifica si la patente tiene una imagen y si no, retorna la imagen por defecto
    const imageURL =  hechizo.patente?.imagen ? `${apiUrl}/uploads/${hechizo.patente.imagen}` : imgHechizo1;
    return imageURL
  };

  return (
    <div className='hechizos-cards-container'>
      <div className="search-container">
        <input type="search" placeholder="Buscar por nombre, descripción..."  onKeyDown={handleKeyPress}/>
        <button className="search-icon" onClick={handleSearch}>
          <img src={searchIcon} alt="Buscar" />
        </button>
    </div>
      <div className='filtros-container'>
        <Select
          className="select-dropdown"
          options={tiposOptions}
          value={selectedTipo}
          onChange={setSelectedTipo}
          placeholder="Filtrar por tipo de hechizo"
          isClearable
        />
        <Select
          className="select-dropdown"
          options={etiquetasOptions}
          value={selectedEtiqueta}
          onChange={setSelectedEtiqueta}
          placeholder="Filtrar por etiqueta"
          isClearable
        />
      </div>

      <div className='hechizos-cards' id='hechizos-cards'>
        {error && <div className="error-message">{error}</div>} {/* Mostrar error */}
        {!error && filteredHechizos.length === 0 && (
          <div className="empty-message">No se encontraron hechizos.</div>
        )}
        {!error &&
          filteredHechizos.map((hechizo) => (
            <div key={hechizo.id} className='hechizo-card'>
              <div className='image-container'>
                <img src={getImageSrc(hechizo)} alt={hechizo.nombre || 'Hechizo'} className='hechizo-image' />
                {hechizosPermitidos.has(hechizo.id) ? (
                  <button
                    className='info-button'
                    onClick={() => setIsOpen(isOpen === hechizo.id ? null : hechizo.id)}
                  >
                    <img src={infoIcon} alt="Información" />
                  </button>
                ) : (
                  <div className='tooltip-container'>
                    <button className='warning-button'>
                      <img src={warningCon} alt="Información restringida" />
                    </button>
                    <span className='tooltip-text'>Este hechizo se considera peligroso y el acceso a su información está restringido.</span>
                  </div>
                )}
              </div>
              <div className='hechizo-info'>
                <h2 className='hechizo-name'>{hechizo.nombre}</h2>
                <p className='hechizo-description'>{hechizo.descripcion}</p>
                <p className='hechizo-tipo'>{hechizo.patente?.tipo_hechizo?.nombre}</p>
              </div>
              {isOpen === hechizo.id && (
                <>
                  <div className={`overlay visible`}></div>
                  <div className={`pop-up visible`}>
                    <div className='pop-up-content'>
                      <button className='close-button' onClick={() => setIsOpen(null)}>
                        <img src={cross} alt="Cerrar" />
                      </button>
                      <img src={getImageSrc(hechizo)} alt={hechizo.nombre} className='hechizo-image' />
                      <div className='pop-up-info'>
                        <h2>{hechizo.nombre}</h2>
                        <h4>Descripción</h4>
                        <p>{hechizo.descripcion}</p>
                        <h4>Instrucciones</h4>
                        <p>{hechizo.instrucciones}</p>
                        <h4>Tipo Hechizo</h4>
                        <p>{hechizo.patente?.tipo_hechizo?.nombre}</p>
                        <h4>Etiquetas</h4>
                        <div className='hechizo-etiquetas'>
                          {hechizo.patente?.etiquetas?.map(etiqueta => (
                            <span key={etiqueta.nombre} className='etiqueta-box'>
                              {etiqueta.nombre}
                            </span>
                          ))}
                        </div>
                        <p>Patentado por: {hechizo.patente?.mago?.nombre} {hechizo.patente?.mago?.apellido}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
      {showModal && (
        <ModalMessage
            errorType={tipoError}
            message={modalMessage}
            reloadOnClose={recargaPagina} 
        />
      )}
    </div>
  );
};

export default HechizoCard;