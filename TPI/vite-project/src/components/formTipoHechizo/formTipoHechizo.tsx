import React, { useState } from 'react';
import axios from 'axios';
import './formTipoHechizo.css';
import cross from '../../assets/cross.png';

const FormTipoHechizo: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const [nombre, setNombre] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/tipo_hechizo', {
                nombre,
                caracteristicas,
            });
            
            console.log('Tipo Hechizo agregado:', response.data);

            setNombre('');
            setCaracteristicas('');
            setIsPopupVisible(false);
        } catch (error) {
            setErrorMessage('Hubo un error al agregar el tipo hechizo.');
            console.error(error);
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
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default FormTipoHechizo;
