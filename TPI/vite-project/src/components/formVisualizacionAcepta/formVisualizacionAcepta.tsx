import React, { useState, useContext } from 'react';
import './formVisualizacionAcepta.css';
import cross from '../../assets/cross.png';
import { AuthContext } from '../../context/authContext.tsx';
import axios from 'axios';
import ModalMessage from '../modalMessage/modalMessage';
import { ErrorTipo } from '../modalMessage/error.enum.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

interface formVisualizacionAceptaProps {
    idSolicitud: number;
}

const FormVisualizacionAcepta: React.FC<formVisualizacionAceptaProps> = ({ idSolicitud }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    
    const [fechaValidez, setFechaValidez] = useState('');
    const [tipoAcceso, setTipoAcceso] = useState('permanente'); // "permanente" o "porFecha"

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser || !currentUser.id) {
            setTipoError(ErrorTipo.HARD_ERROR);
            setRecargaPagina(false);
            setModalMessage('No se pudo recuperar el usuario loggeado.');
            setShowModal(true);
            return;
        }

        const formData = {
            empleado: currentUser,
            permanente: tipoAcceso === "permanente",
            fecha_hasta: tipoAcceso === "porFecha" ? fechaValidez : null
        };

        try {
            const response = await axios.put(
                `${apiUrl}/api/solicitud_visualizacion/grant/${idSolicitud}`,
                formData
            );
            setIsPopupVisible(false);
            setTipoError(ErrorTipo.SUCCESS);
            setRecargaPagina(true);
            setModalMessage('Solicitud aceptada correctamente. \n' + response.data.id);
            setShowModal(true);
        } catch (error) {
            setTipoError(ErrorTipo.SOFT_ERROR);
            setRecargaPagina(true);
            setModalMessage('Hubo un error al aceptar la solicitud.\n' + error);
            setShowModal(true);
        }
    };

    return (
        <div>
            <button className='aceptar-solicitud-button' onClick={togglePopup}>
                Aceptar
            </button>
            {isPopupVisible && (
                <div>
                    <div className='solicitud-overlay' onClick={togglePopup}></div>
                    <form className='form-aceptar-solicitud' onSubmit={handlePublish}>
                        <button className='close-aceptar-solicitud' onClick={togglePopup}>
                            <img src={cross} alt="" />
                        </button>
                        <h4>Aceptación de Solicitud</h4>

                        <div className='form-tipo-acceso'>
                            <label htmlFor='tipoAcceso'>Tipo de Acceso</label>
                            <select
                                id='tipoAcceso'
                                value={tipoAcceso}
                                onChange={(e) => setTipoAcceso(e.target.value)}
                                required
                            >
                                <option value="permanente">Permanente</option>
                                <option value="porFecha">Por Fecha</option>
                            </select>
                        </div>

                        {tipoAcceso === "porFecha" && (
                            <div className='form-fecha'>
                                <label htmlFor='fechaValidez'>Fecha de Validez</label>
                                <input
                                    type='date'
                                    id='fechaValidez'
                                    value={fechaValidez}
                                    onChange={(e) => setFechaValidez(e.target.value)}
                                    required={tipoAcceso === "porFecha"}
                                />
                            </div>
                        )}

                        <button type="submit" className='button-aceptar-solicitud'>
                            Aceptar
                        </button>
                    </form>
                </div>
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

export default FormVisualizacionAcepta;
