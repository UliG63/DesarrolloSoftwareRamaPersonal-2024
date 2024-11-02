import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import './instituciones.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormInstitucion from "../components/formInstituciones/formInstituciones";

interface Institucion {
    id: number;
    nombre: string;
    ciudad: string;
    pais: string;
}

const InstitucionesPage: React.FC = () => {
    const [instituciones, setInstituciones] = useState<Institucion[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentInstitucion, setCurrentInstitucion] = useState<Institucion | null>(null);
    const [formData, setFormData] = useState<Institucion>({
        id: 0,
        nombre: '',
        ciudad: '',
        pais: '',
    });

    useEffect(() => {
        const fetchInstituciones = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/institucion');
                setInstituciones(response.data.data);
            } catch (err) {
                setError('Error al cargar las instituciones');
                console.error(err);
            }
        };

        fetchInstituciones();
    }, []);

    const handleEditToggle = (institucion: Institucion) => {
        setIsEditing(true);
        setCurrentInstitucion(institucion);
        setFormData(institucion);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        if (currentInstitucion) {
            try {
                await axios.put(`http://localhost:3000/api/institucion/${currentInstitucion.id}`, formData);
                setInstituciones((prev) => 
                    prev.map((institucion) => 
                        institucion.id === currentInstitucion.id ? { ...institucion, ...formData } : institucion
                    )
                );
                setIsEditing(false);
                setCurrentInstitucion(null);
            } catch (error) {
                console.error("Error al actualizar la información:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <FormInstitucion />
            <div className="instituciones-page">
                {error ? (
                    <p>{error}</p>
                ) : instituciones.length > 0 ? (
                    <div className="instituciones-container">
                        {instituciones.map((institucion) => (
                            <div key={institucion.id} className="institucion-card">
                                {isEditing && currentInstitucion?.id === institucion.id ? (
                                    <div className="edit-form">
                                        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
                                        <input type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} placeholder="Ciudad" />
                                        <input type="text" name="pais" value={formData.pais} onChange={handleInputChange} placeholder="País" />
                                        <button onClick={handleSaveChanges} className='save-button'>Guardar</button>
                                        <button onClick={() => { setIsEditing(false); setCurrentInstitucion(null); }} className='cancel-button'>Cancelar</button>
                                    </div>
                                ) : (
                                    <>
                                        <h3>{institucion.nombre}</h3>
                                        <h6>Información de la Institución</h6>
                                        <div className="institucion-info">
                                            <p>Ciudad: {institucion.ciudad}</p>
                                            <p>País: {institucion.pais}</p>
                                            <button onClick={() => handleEditToggle(institucion)} className='edit-button'>Editar</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron instituciones</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default InstitucionesPage;
