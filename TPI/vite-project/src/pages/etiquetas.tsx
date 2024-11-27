import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import './etiquetas.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormEtiqueta from "../components/formEtiqueta/formEtiqueta";
import deleteIcon from "../assets/basura.png";
import ModalMessage from "../components/modalMessage/modalMessage.tsx";
import { ErrorTipo } from "../components/modalMessage/error.enum.tsx";

interface Etiqueta {
    id: number;
    nombre: string;
    descripcion: string;
}

const EtiquetaPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false)
    const [modalMessage, setModalMessage] = useState('');
    const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEtiqueta, setCurrentEtiqueta] = useState<Etiqueta | null>(null);
    const [formData, setFormData] = useState<Etiqueta>({
        id: 0,
        nombre: '',
        descripcion: '',
    });

    useEffect(() => {
        const fetchEtiquetas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/etiqueta');
                setEtiquetas(response.data.data);
            } catch (err) {
                setError('No se pudieron recuperar las etiquetas.');
                setTipoError(ErrorTipo.HARD_ERROR);
                setRecargaPagina(false);
                setModalMessage('No se pudieron recuperar las etiquetas.\n'+err);
                setShowModal(true);
            }
        };

        fetchEtiquetas();
    }, []);

    const handleEditToggle = (etiqueta: Etiqueta) => {
        setIsEditing(true);
        setCurrentEtiqueta(etiqueta);
        setFormData(etiqueta);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        if (currentEtiqueta) {
            try {
                await axios.put(`http://localhost:3000/api/etiqueta/${currentEtiqueta.id}`, formData);
                setEtiquetas((prev) =>
                    prev.map((etiqueta) =>
                        etiqueta.id === currentEtiqueta.id ? { ...etiqueta, ...formData } : etiqueta
                    )
                );
                setIsEditing(false);
                setCurrentEtiqueta(null);
                setTipoError(ErrorTipo.SUCCESS);
                setRecargaPagina(true);
                setModalMessage('Datos modificados con exito');
                setShowModal(true);
            } catch (error) {
                setError("Hubo un error al intentar modificar la etiqueta.");
                setTipoError(ErrorTipo.SOFT_ERROR);
                setRecargaPagina(true);
                setModalMessage('Error al actualizar la información:\n'+error);
                setShowModal(true);
            }
        }
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que querés eliminar esta etiqueta?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/etiqueta/${id}`);
                setEtiquetas((prev) => prev.filter((etiqueta) => etiqueta.id !== id));
                setTipoError(ErrorTipo.SUCCESS);
                setRecargaPagina(true);
                setModalMessage('Etiqueta eliminada con exito.');
                setShowModal(true);
            } catch (error) {
                setError("Hubo un error al intentar eliminar la etiqueta.");
                setTipoError(ErrorTipo.SOFT_ERROR);
                setRecargaPagina(true);
                setModalMessage('Error al eliminar la etiqueta:\n'+error);
                setShowModal(true);
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
                                            <button onClick={() => handleDelete(etiqueta.id)} className="delete-button">
                                                <img src={deleteIcon} alt="Eliminar" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron etiquetas.</p>
                )}
                {showModal && (
                    <ModalMessage
                        errorType={tipoError}
                        message={modalMessage}
                        reloadOnClose={recargaPagina} 
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default EtiquetaPage;
