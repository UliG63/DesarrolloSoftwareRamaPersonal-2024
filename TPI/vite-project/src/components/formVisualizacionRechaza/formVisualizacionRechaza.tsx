import React, { useState } from 'react';
import './formVisualizacionRechaza.css';
import cross from '../../assets/cross.png';
import { AuthContext } from '../../context/authContext.tsx';
import { useContext } from 'react';
import axios from 'axios';
import ModalMessage from '../modalMessage/modalMessage';
import { ErrorTipo } from '../modalMessage/error.enum.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

interface formVisualizacionRechazaProps{
    idSolicitud: number;
}
function FormVisualizacionRechaza ({idSolicitud}: formVisualizacionRechazaProps) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };
    const { currentUser } = useContext(AuthContext);
    const [motivo_rechazo, setMotivoRechazo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false)
    const [modalMessage, setModalMessage] = useState('');
    
    const handleReject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser || !currentUser.id) {
            setTipoError(ErrorTipo.HARD_ERROR);
            setRecargaPagina(false);
            setModalMessage('No se pudo recuperar el usuario loggeado.');
            setShowModal(true);
            return;
        }
        const formData = {
         motivo_rechazo,
         empleado: currentUser 
        };

        try {
            const response = await axios.put(`${apiUrl}/api/solicitud_visualizacion/reject/${idSolicitud}`, formData);
            setMotivoRechazo('');
            setIsPopupVisible(false);
            setTipoError(ErrorTipo.SUCCESS);
            setRecargaPagina(true);
            setModalMessage('Solicitud rechazada correctamente. \n'+response.data);
            setShowModal(true);
        } catch (error) {
            setTipoError(ErrorTipo.SOFT_ERROR);
            setRecargaPagina(true);
            setModalMessage('Hubo un error al rechazar la solicitud.\n'+error);
            setShowModal(true);
        }
    };

    return(
        <div>
            <button className='rechazar-solicitud-button' onClick={togglePopup}>
                Rechazar
            </button>
            {isPopupVisible && (
                <div>
                <div className='solicitud-overlay' onClick={togglePopup}></div>
                <form className='form-rechazo-solicitud' onSubmit={handleReject}>
                    <button className='close-rechazo-solicitud' onClick={togglePopup}>
                        <img src={cross} alt="" />
                    </button>
                    <h4>Rechazo de solicitud</h4>
                    <div>
                        <p>Motivo</p>
                        <input type="text" onChange={(e) => {
                                                                setMotivoRechazo(e.target.value);
                                                            }} 
                         value={motivo_rechazo} required/>
                    </div>                
                    <button type="submit" className='button-rechazar-solicitud'>Rechazar</button>
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
}
export default FormVisualizacionRechaza;
