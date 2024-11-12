import React, { useState } from 'react';
import './formPatenteValidacionRechaza.css';
import cross from '../../assets/cross.png';
import { AuthContext } from '../../context/authContext.tsx';
import { useContext } from 'react';
import axios from 'axios';

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
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleReject = async (e: React.FormEvent) => {
        e.preventDefault();
        // Verifica que currentUser tenga idMago (En este caso es el empleado)
        if (!currentUser || !currentUser.id) {
            console.error('Error: No se pudo obtener el id del empleado actual');
            return;
        }
        //Este es el objeto "Patente con sus respectivas propiedades que le enviare al metodo reject en el back"
        const formData = {
         motivo_rechazo,
         empleado: currentUser 
        };

        console.log('Datos enviados al servidor:', formData);
        try {
            // Enviar los datos a la API
            const response = await axios.put(`http://localhost:3000/api/patente/reject/${idPatente}`, formData); //Como obtengo la patente actual?
            
            console.log('Patente rechazada:', response.data);

            // Restablece el formulario y cierra el popup
            setMotivoRechazo('');
            setIsPopupVisible(false);
            alert('Patente rechazada correctamente');
        } catch (error) {
            setErrorMessage('Hubo un error al rechazar la patente.');
            console.error(error);
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
                                                                console.log(e.target.value);
                                                                setMotivoRechazo(e.target.value);
                                                            }} 
                         value={motivo_rechazo} required/>
                    </div>                
                    <button type="submit" className='button-rechazar-patente'>Rechazar</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </form>
                </div>
            )}
        </div>
    );
}
export default FormPatenteValidacionRechaza;
