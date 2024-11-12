import React, { useState, useEffect, useContext } from 'react';
import './formPatenteValidacionAcepta.css';
import cross from '../../assets/cross.png';
import { AuthContext } from '../../context/authContext.tsx';
import axios from 'axios';

interface Etiqueta {
    id: number;
    nombre: string;
    descripcion: string;
}

interface TipoHechizo {
    id: number;
    nombre: string;
    caracteristicas: string;
}

interface formValidacionAceptaProps {
    idPatente: number;
}

function FormPatenteValidacionAcepta({ idPatente }: formValidacionAceptaProps) {

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [TipoHechizo, setTipoHechizo] = useState<TipoHechizo[]>([]);
    const [Etiqueta, setEtiqueta] = useState<Etiqueta[]>([]);
    const [selectedEtiquetas, setSelectedEtiquetas] = useState<Etiqueta[]>([]); // Etiquetas seleccionadas
    const [restringido, setRestringido] = useState<boolean>(false); // Para manejar restringido (Sí/No)
    const [selectedTipoHechizo, setSelectedTipoHechizo] = useState<number | null>(null); // Estado para tipo de hechizo seleccionado

    // Mostrar/ocultar formulario
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    // Fetch para obtener los tipos de hechizos
    useEffect(() => {
        fetchTipoHechizo();
        fetchEtiqueta();
    }, []);

    const fetchTipoHechizo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/tipo_hechizo`);
            setTipoHechizo(response.data.data);
        } catch (error) {
            console.error('Error al cargar los tipos de hechizo', error);
        }
    };

    const fetchEtiqueta = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/etiqueta`);
            setEtiqueta(response.data.data);
        } catch (error) {
            console.error('Error al cargar las etiquetas', error);
        }
    };

    // Función para manejar la selección de etiquetas
    const handleSelectEtiqueta = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value, 10);
        const selectedEtiqueta = Etiqueta.find(etiqueta => etiqueta.id === selectedId);

        if (selectedEtiqueta) {
            setSelectedEtiquetas([...selectedEtiquetas, selectedEtiqueta]);
            setEtiqueta(Etiqueta.filter(etiqueta => etiqueta.id !== selectedId)); // Eliminar del dropdown
        }
    };

    // Función para eliminar una etiqueta seleccionada
    const handleRemoveEtiqueta = (id: number) => {
        const etiquetaToRemove = selectedEtiquetas.find(etiqueta => etiqueta.id === id);

        if (etiquetaToRemove) {
            setSelectedEtiquetas(selectedEtiquetas.filter(etiqueta => etiqueta.id !== id));
            setEtiqueta([...Etiqueta, etiquetaToRemove]); // Volver a agregar al dropdown
        }
    };

    // Función para manejar la publicación de la patente
    const handleReject = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser || !currentUser.id) {
            console.error('Error: No se pudo obtener el id del empleado actual');
            return;
        }

        // Solo enviamos el tipo de hechizo seleccionado
        const formData = {
            tipoHechizo: selectedTipoHechizo, // Solo el tipo de hechizo seleccionado
            Etiquetas: selectedEtiquetas,
            restringido,
            empleado: currentUser
        };

        try {
            const response = await axios.put(`http://localhost:3000/api/patente/publish/${idPatente}`, formData);
            console.log('Patente publicada:', response.data);
            setIsPopupVisible(false);
            alert('Patente publicada correctamente');
        } catch (error) {
            setErrorMessage('Hubo un error al publicar la patente.');
            console.error(error);
        }
    };

    return (
        <div>
            <button className='rechazar-patente-button' onClick={togglePopup}>
                Publicar
            </button>
            {isPopupVisible && (
                <div>
                    <div className='patente-overlay' onClick={togglePopup}></div>
                    <form className='form-rechazo-patente' onSubmit={handleReject}>
                        <button className='close-rechazo-patente' onClick={togglePopup}>
                            <img src={cross} alt="" />
                        </button>
                        <h4>Publicacion de Patente</h4>
                        
                        {/* Tipo de Hechizo */}
                        <div>
                            <p>Tipo de Hechizo</p>
                            <select
                                required
                                onChange={(e) => setSelectedTipoHechizo(parseInt(e.target.value, 10))}
                                value={selectedTipoHechizo ?? ""}
                            >
                                <option value="" disabled>Seleccionar tipo de hechizo</option>
                                {TipoHechizo.map(hechizo => (
                                    <option key={hechizo.id} value={hechizo.id}>
                                        {hechizo.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Etiquetas */}
                        <div>
                            <p>Etiquetas</p>
                            <div>
                                {selectedEtiquetas.map(etiqueta => (
                                    <span className='etiqueta-seleccionada' key={etiqueta.id}>
                                        {etiqueta.nombre}
                                        <button type="button" onClick={() => handleRemoveEtiqueta(etiqueta.id)}>
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <select onChange={handleSelectEtiqueta} value="">
                                <option value="" disabled>Seleccionar etiqueta</option>
                                {Etiqueta.map(etiqueta => (
                                    <option key={etiqueta.id} value={etiqueta.id}>
                                        {etiqueta.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Restringir Visualización */}
                        <div>
                            <p>Restringir Visualización?</p>
                            <select value={restringido ? "si" : "no"} onChange={e => setRestringido(e.target.value === "si")}>
                                <option value="no">No</option>
                                <option value="si">Sí</option>
                            </select>
                        </div>

                        <button type="submit" className='button-rechazar-patente'>Publicar</button>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default FormPatenteValidacionAcepta;





