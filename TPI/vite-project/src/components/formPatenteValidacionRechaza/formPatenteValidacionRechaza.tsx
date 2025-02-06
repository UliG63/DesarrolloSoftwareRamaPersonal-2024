import React, { useState } from 'react';
import './formPatenteValidacionRechaza.css';
import cross from '../../assets/cross.png';
import { AuthContext } from '../../context/authContext.tsx';
import { useContext } from 'react';
import axios from 'axios';
import ModalMessage from '../modalMessage/modalMessage';
import { ErrorTipo } from '../modalMessage/error.enum.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

interface formValidacionRechazaProps{
    idPatente: number;
}
function FormPatenteValidacionRechaza ({idPatente}: formValidacionRechazaProps) {

    //Visibilidad de form 
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    //Función para mostrar/ocultar el form
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
        // Verifica que currentUser tenga idMago (En este caso es el empleado)
        if (!currentUser || !currentUser.id) {
            setTipoError(ErrorTipo.HARD_ERROR);
            setRecargaPagina(false);
            setModalMessage('No se pudo recuperar el usuario loggeado.');
            setShowModal(true);
            return;
        }
        //Este es el objeto "Patente con sus respectivas propiedades que le enviare al metodo reject en el back"
        const formData = {
         motivo_rechazo,
         empleado: currentUser 
        };

  
        try {
            // Enviar los datos a la API
            const response = await axios.put(`${apiUrl}/api/patente/reject/${idPatente}`, formData); //Como obtengo la patente actual?
            
            // Restablece el formulario y cierra el popup
            setMotivoRechazo('');
            setIsPopupVisible(false);
            setTipoError(ErrorTipo.SUCCESS);
            setRecargaPagina(true);
            setModalMessage('Patente rechazada correctamente. \n'+response.data);
            setShowModal(true);
        } catch (error) {
            setTipoError(ErrorTipo.SOFT_ERROR);
            setRecargaPagina(true);
            setModalMessage('Hubo un error al rechazar la patente.\n'+error);
            setShowModal(true);
        }
    };

    return(
        <div>
            <button className='rechazar-patente-button' onClick={togglePopup}>
                Rechazar
            </button>
            {isPopupVisible && (
                <div>
                <div className='patente-overlay' onClick={togglePopup}></div>
                <form className='form-rechazo-patente' onSubmit={handleReject}>
                    <button className='close-rechazo-patente' onClick={togglePopup}>
                        <img src={cross} alt="" />
                    </button>
                    <h4>Rechazo de patente</h4>
                    <div>
                        <p>Motivo</p>
                        <input type="text" onChange={(e) => {
                                                                setMotivoRechazo(e.target.value);
                                                            }} 
                         value={motivo_rechazo} required/>
                    </div>                
                    <button type="submit" className='button-rechazar-patente'>Rechazar</button>
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
export default FormPatenteValidacionRechaza;
