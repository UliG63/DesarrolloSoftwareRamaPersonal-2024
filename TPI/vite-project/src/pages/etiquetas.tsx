import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import './etiquetas.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormEtiqueta from "../components/formEtiqueta/formEtiqueta";

interface Etiqueta {
    id: number;
    nombre: string;
    descripcion: string;
}

const EtiquetaPage: React.FC = () => {
    // almacenar la lista de etiquetas
    const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
     // manejar errores en la carga de etiquetas
    const [error, setError] = useState<string | null>(null);
    // controlar si se está editando una etiqueta
    const [isEditing, setIsEditing] = useState(false);
    // almacenar la etiqueta actualmente en edición
    const [currentEtiqueta, setCurrentEtiqueta] = useState<Etiqueta | null>(null);
    const [formData, setFormData] = useState<Etiqueta>({
        id: 0,
        nombre: '',
        descripcion: '',
    });

    useEffect(() => {
        const fetchEtiquetas = async () => {
            try {
                 // obtener las etiquetas de la api
                const response = await axios.get('http://localhost:3000/api/etiqueta');
                setEtiquetas(response.data.data); // almacenar las etiquetas
            } catch (err) {
                setError('Error al cargar las etiquetas.');
                console.error(err);
            }
        };

        fetchEtiquetas();
    }, []);

    const handleEditToggle = (etiqueta: Etiqueta) => {
        setIsEditing(true);
        setCurrentEtiqueta(etiqueta); // establece la etiqueta actual para editar
        setFormData(etiqueta); // carga los datos de la etiqueta en el formulario
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

     // guardar los cambios de una etiqueta
    const handleSaveChanges = async () => {
        if (currentEtiqueta) {
            try {
                await axios.put(`http://localhost:3000/api/etiqueta/${currentEtiqueta.id}`, formData);
                // actualizar la lista de etiquetas en el estado con los cambios
                setEtiquetas((prev) =>
                    prev.map((etiqueta) =>
                        etiqueta.id === currentEtiqueta.id ? { ...etiqueta, ...formData } : etiqueta
                    )
                );
                setIsEditing(false); // desactivar el modo de edición
                setCurrentEtiqueta(null); // limpiar la etiqueta actual
            } catch (error) {
                console.error("Error al actualizar la información:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <FormEtiqueta />
            <div className="etiqueta-page">
                {error ? (
                    <p>{error}</p>
                ) : etiquetas.length > 0 ? (
                    <div className="etiqueta-container">
                        {etiquetas.map((etiqueta) => (
                            <div key={etiqueta.id} className="etiqueta-card">
                                {isEditing && currentEtiqueta?.id === etiqueta.id ? (
                                    <div className="edit-form">
                                        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre"/>
                                        <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} placeholder="Descripción" rows={4}/>
                                        <button onClick={handleSaveChanges} className='save-button'>Guardar</button>
                                        <button onClick={() => { setIsEditing(false); setCurrentEtiqueta(null); }} className='cancel-button'>Cancelar</button>
                                    </div>
                                ) : (
                                    <>
                                        <h3>{etiqueta.nombre}</h3>
                                        <h6>Información de la Etiqueta</h6>
                                        <div className="etiqueta-info">
                                            <p>Descripción: {etiqueta.descripcion}</p>
                                            <button onClick={() => handleEditToggle(etiqueta)} className='edit-button'>Editar</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron etiquetas.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default EtiquetaPage;
