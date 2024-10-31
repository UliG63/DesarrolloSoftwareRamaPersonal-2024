import React, { useState } from 'react';
import axios from 'axios';
import './formEtiqueta.css';
import cross from '../../assets/cross.png';

const FormEtiqueta: React.FC = () => {
    // manejo de la visibilidad de form 
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // mostrar/ocultar el form
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // enviar los datos a la API
            const response = await axios.post('http://localhost:3000/api/etiqueta', {
                nombre,
                descripcion,
            });
            
            console.log('Etiqueta agregada:', response.data);

            // restablecer el formulario y cerrar el popup
            setNombre('');
            setDescripcion('');
            setIsPopupVisible(false);
        } catch (error) {
            setErrorMessage('Hubo un error al agregar la etiqueta.');
            console.error(error);
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
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default FormEtiqueta;
