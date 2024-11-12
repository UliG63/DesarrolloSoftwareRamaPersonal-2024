import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Importación de react-select
import axios from 'axios';
import './hechizoCard.css';
import infoIcon from "../../assets/information.png";
import cross from "../../assets/crossWhite.png";
import imgHechizo1 from '../../assets/hechizo1.jpeg';

interface Hechizo {
  idHechizo: number;
  nombre: string;
  descripcion: string;
  instrucciones: string;
  restringido: boolean;
  patente: {
    tipo_hechizo: {
      nombre: string;
      caracteristicas: string;
    };
    mago: {
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
  const [hechizos, setHechizos] = useState<Hechizo[]>([]);
  const [filteredHechizos, setFilteredHechizos] = useState<Hechizo[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<{ label: string; value: string } | null>(null);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState<{ label: string; value: string } | null>(null);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHechizos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/hechizo`);
      setHechizos(response.data.data);
      setFilteredHechizos(response.data.data); // Inicialmente todos los hechizos
    } catch (error) {
      setError('Error al cargar los hechizos');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHechizos();
  }, []);

  // Crear opciones únicas de tipo de hechizo
  const tiposUnicos: string[] = [...new Set(hechizos.map(hechizo => hechizo.patente.tipo_hechizo.nombre))];
  const tiposOptions = [{ label: 'Todos', value: '' }, ...tiposUnicos.map((tipo: string) => ({ label: tipo, value: tipo }))];

  // Crear opciones únicas de etiquetas
  const etiquetasUnicas: string[] = [
    ...new Set(hechizos.flatMap(hechizo => hechizo.patente.etiquetas.map(etiqueta => etiqueta.nombre))),
  ];
  const etiquetasOptions = [{ label: 'Todos', value: '' }, ...etiquetasUnicas.map((etiqueta: string) => ({ label: etiqueta, value: etiqueta }))];

  // Función de filtrado
  const handleFilterChange = () => {
    let filtered = hechizos;

    if (selectedTipo && selectedTipo.value !== '') {
      filtered = filtered.filter(hechizo => hechizo.patente.tipo_hechizo.nombre === selectedTipo.value);
    }

    if (selectedEtiqueta && selectedEtiqueta.value !== '') {
      filtered = filtered.filter(hechizo =>
        hechizo.patente.etiquetas.some(etiqueta => etiqueta.nombre === selectedEtiqueta.value)
      );
    }

    setFilteredHechizos(filtered);
  };

  // Monitorear cambios en los filtros
  useEffect(() => {
    handleFilterChange();
  }, [selectedTipo, selectedEtiqueta]);

  return (
    <div className='hechizos-cards-container'>
      {/* Contenedor para los filtros */}
      <h4>Opciones de Filtro</h4>
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

      {/* Listado de hechizos */}
      <div className='hechizos-cards' id='hechizos-cards'>
        {filteredHechizos.map((hechizo) => (
          <div key={hechizo.idHechizo} className='hechizo-card'>
            <div className='image-container'>
              <img src={imgHechizo1} alt={hechizo.nombre} className='hechizo-image' />
              {!hechizo.restringido && (
                <button
                  className='info-button'
                  onClick={() => setIsOpen(hechizo.idHechizo)} // Abre el pop-up para este hechizo
                >
                  <img src={infoIcon} alt="Información" />
                </button>
              )}
            </div>
            <div className='hechizo-info'>
              <h2 className='hechizo-name'>{hechizo.nombre}</h2>
              <p className='hechizo-description'>{hechizo.descripcion}</p>
              <p className='hechizo-tipo'>{hechizo.patente.tipo_hechizo.nombre}</p>
            </div>

            {/* Pop-up con la información del hechizo */}
            <div className={`overlay ${isOpen === hechizo.idHechizo ? 'visible' : ''}`}></div>
            <div className={`pop-up ${isOpen === hechizo.idHechizo ? 'visible' : ''}`}>
              <div className='pop-up-content'>
                <button className='close-button' onClick={() => setIsOpen(null)}>
                  <img src={cross} alt="Cerrar" />
                </button>
                <img src={imgHechizo1} alt={hechizo.nombre} className='hechizo-image' />
                <div className='pop-up-info'>
                  <h2>{hechizo.nombre}</h2>
                  <h4>Descripción</h4>
                  <p>{hechizo.descripcion}</p>
                  <h4>Instrucciones</h4>
                  <p>{hechizo.instrucciones}</p>
                  <h4>Tipo Hechizo</h4>
                  <p>{hechizo.patente.tipo_hechizo.nombre}</p>

                  <h4>Etiquetas</h4>
                  <div className='hechizo-etiquetas'>
                    {hechizo.patente.etiquetas.map(etiqueta => (
                      <span key={etiqueta.nombre} className='etiqueta-box'>
                        {etiqueta.nombre}
                      </span>
                    ))}
                  </div>

                  <p>Patentado por: {hechizo.patente.mago.nombre} {hechizo.patente.mago.apellido}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {error && <div className="error-message">{error}</div>} {/* Mostrar el error si ocurre */}
      </div>
    </div>
  );
};

export default HechizoCard;