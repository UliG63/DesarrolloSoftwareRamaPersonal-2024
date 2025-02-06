import React, { useState } from 'react';
import axios from 'axios';
import './formEtiqueta.css';
import cross from '../../assets/cross.png';
import ModalMessage from '../modalMessage/modalMessage.tsx';
import { ErrorTipo } from '../modalMessage/error.enum.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

const FormEtiqueta: React.FC = () => {
    // manejo de la visibilidad de form 
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false)
    const [modalMessage, setModalMessage] = useState('');

    // mostrar/ocultar el form
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // enviar los datos a la API
            const response = await axios.post(`${apiUrl}/api/etiqueta`, {
                nombre,
                descripcion,
            });
            // restablecer el formulario y cerrar el popup
            setNombre('');
            setDescripcion('');
            setIsPopupVisible(false);

            setTipoError(ErrorTipo.SUCCESS);
            setRecargaPagina(true);
            setModalMessage('Etiqueta registrada. \n'+response.data.nombre);
            setShowModal(true);
        } catch (error) {
            setTipoError(ErrorTipo.SOFT_ERROR);
            setRecargaPagina(true);
            setModalMessage('Hubo un error al dar de alta la etiqueta.\n'+error);
            setShowModal(true);
        }
    };

    return(
        <div>
            <button className='plus-etiqueta-button' onClick={togglePopup}>
                + Etiqueta
            </button>
            {isPopupVisible && (
                <div>
                    <div className='etiqueta-overlay' onClick={togglePopup}></div>
                    <form className='form-etiqueta' onSubmit={handleSubmit}>
                        <button className='close-etiqueta' onClick={togglePopup}>
                            <img src={cross} alt="Cerrar" />
                        </button>
                        <h4>Nueva Etiqueta</h4>
                        <div>
                            <p>Nombre</p>
                            <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} required />
                        </div>
                        <div>
                            <p>Descripción</p>
                            <textarea id="descripcion" onChange={(e) => setDescripcion(e.target.value)} value={descripcion} rows={4} required />
                        </div>
                        <button type="submit" className='button-etiqueta'>Agregar</button>
                    </form>
                </div>
            )}
            {showModal && (
                <ModalMessage
                    errorType={tipoError}
                    message={modalMessage}
                    reloadOnClose={recargaPagina} // Recargar la página al cerrar
                />
            )}
        </div>
    );
}

export default FormEtiqueta;
