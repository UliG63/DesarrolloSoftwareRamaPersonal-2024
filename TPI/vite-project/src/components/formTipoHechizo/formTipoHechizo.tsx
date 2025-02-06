import React, { useState } from 'react';
import axios from 'axios';
import './formTipoHechizo.css';
import cross from '../../assets/cross.png';
import ModalMessage from '../modalMessage/modalMessage';
import { ErrorTipo } from '../modalMessage/error.enum.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

const FormTipoHechizo: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const [nombre, setNombre] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false)
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/api/tipo_hechizo`, {
                nombre,
                caracteristicas,
            });
            
            setNombre('');
            setCaracteristicas('');
            setIsPopupVisible(false);
            setTipoError(ErrorTipo.SUCCESS);
            setRecargaPagina(true);
            setModalMessage('Tipo Hechizo agregado correctamente.\n' + response.data);
            setShowModal(true);
        } catch (error) {
            setTipoError(ErrorTipo.SOFT_ERROR);
            setRecargaPagina(true);
            setModalMessage('Hubo un error al registrar el Tipo Hechizo.\n'+error);
            setShowModal(true);
        }
    };

    return(
        <div>
            <button className='plus-tipoHechizo-button' onClick={togglePopup}>
                + Tipo Hechizo
            </button>
            {isPopupVisible && (
                <div>
                    <div className='tipoHechizo-overlay' onClick={togglePopup}></div>
                    <form className='form-tipoHechizo' onSubmit={handleSubmit}>
                        <button className='close-tipoHechizo' onClick={togglePopup}>
                            <img src={cross} alt="Cerrar" />
                        </button>
                        <h4>Nuevo Tipo Hechizo</h4>
                        <div>
                            <p>Nombre</p>
                            <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} required />
                        </div>
                        <div>
                            <p>Características</p>
                            <textarea id="caracteristicas" onChange={(e) => setCaracteristicas(e.target.value)} value={caracteristicas} rows={4} required />
                        </div>
                        <button type="submit" className='button-tipoHechizo'>Agregar</button>
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

export default FormTipoHechizo;
