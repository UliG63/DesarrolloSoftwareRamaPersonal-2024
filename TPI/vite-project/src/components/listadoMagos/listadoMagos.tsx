import './listadoMagos.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalMessage from '../modalMessage/modalMessage';
import { ErrorTipo } from '../modalMessage/error.enum.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

interface Mago {
    id: number;
    nombre: string;
    apellido: string;
    profesion: string;
    isEmpleado: boolean;
}

const ListadoMagos: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [magos, setMagos] = useState<Mago[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMago, setCurrentMago] = useState<Mago | null>(null);
    const [formData, setFormData] = useState<Mago>({
        id: 0,
        nombre: '',
        apellido: '',
        profesion: '',
        isEmpleado: false,
    });

    useEffect(() => {
        const fetchMagos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/magos`);
                setMagos(response.data.data);
            } catch (err) {
                setError('Error al cargar los magos.');
                console.error(err);
                setTipoError(ErrorTipo.HARD_ERROR);
                setRecargaPagina(false);
                setModalMessage('No se pudieron recuperar los magos.\n' + err);
                setShowModal(true);
            }
        };

        fetchMagos();
    }, []);

    const handleEditToggle = (mago: Mago) => {
        setIsEditing(true);
        setCurrentMago(mago);
        setFormData(mago);
    };

    const handleSaveChanges = async () => {
        if (currentMago) {
            try {
                await axios.put(`${apiUrl}/api/magos/${currentMago.id}`, formData);
                setMagos((prev) =>
                    prev.map((mago) =>
                        mago.id === currentMago.id ? { ...mago, ...formData } : mago
                    )
                );
                setIsEditing(false);
                setCurrentMago(null);
                setTipoError(ErrorTipo.SUCCESS);
                setRecargaPagina(true);
                setModalMessage('Datos modificados con éxito');
                setShowModal(true);
            } catch (error) {
                setError("Hubo un error al asignar rol de empleado.");
                setTipoError(ErrorTipo.SOFT_ERROR);
                setRecargaPagina(true);
                setModalMessage('Error al actualizar la información:\n' + error);
                setShowModal(true);
            }
        }
    };

    return (
        <div className="list-magos-page">
            {error ? (
                <p>{error}</p>
            ) : magos.length > 0 ? (
                <div className="list-magos-container">
                    {magos.map((mago) => (
                        <div key={mago.id} className="list-mago-card">
                            {isEditing && currentMago?.id === mago.id ? (
                                <div className="edit-form">
                                    <h3>{mago.nombre} {mago.apellido}</h3>
                                    <p>ID: {mago.id}</p>
                                    <p>Profesión: {mago.profesion}</p>
                                    <select
                                        value={formData.isEmpleado ? "si" : "no"}
                                        onChange={(e) =>
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                isEmpleado: e.target.value === "si",
                                            }))
                                        }
                                    >
                                        <option value="no">No</option>
                                        <option value="si">Sí</option>
                                    </select>
                                    <div className="buttons-container">
                                        <button onClick={handleSaveChanges} className='save-button'>Guardar</button>
                                        <button onClick={() => { setIsEditing(false); setCurrentMago(null); }} className='cancel-button'>Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3>{mago.nombre} {mago.apellido}</h3>
                                    <p>ID: {mago.id}</p>
                                    <p>Profesión: {mago.profesion}</p>
                                    <p>Empleado? {mago.isEmpleado ? "Sí" : "No"}</p>
                                    <button onClick={() => handleEditToggle(mago)} className='edit-button'>Editar</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No se encontraron magos</p>
            )}

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

export default ListadoMagos;