import React, { useState } from 'react';
import axios from 'axios';
import './formInstituciones.css';
import cross from '../../assets/cross.png';

const FormInstitucion: React.FC = () => {
    // Visibilidad de form 
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // Función para mostrar/ocultar el form
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Enviar los datos a la API
            const response = await axios.post('http://localhost:3000/api/institucion', {
                nombre,
                pais,
                ciudad
            });
            
            console.log('Institución agregada:', response.data);

            // Restablece el formulario y cierra el popup
            setNombre('');
            setPais('');
            setCiudad('');
            setIsPopupVisible(false);
        } catch (error) {
            setErrorMessage('Hubo un error al agregar la institución.');
            console.error(error);
        }
    };

    return(
        <div>
            <button className='plus-institucion-button' onClick={togglePopup}>
                + Institución
            </button>
            {isPopupVisible && (
                <div>
                    <div className='institucion-overlay' onClick={togglePopup}></div>
                    <form className='form-institucion' onSubmit={handleSubmit}>
                        <button className='close-institucion' onClick={togglePopup}>
                            <img src={cross} alt="Cerrar" />
                        </button>
                        <h4>Nueva Institución</h4>
                        <div>
                            <p>Nombre</p>
                            <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} required />
                        </div>
                        <div>
                            <p>País</p>
                            <input type="text" onChange={(e) => setPais(e.target.value)} value={pais} required />
                        </div>
                        <div>
                            <p>Ciudad</p>
                            <input type="text" onChange={(e) => setCiudad(e.target.value)} value={ciudad} required />
                        </div>
                        <button type="submit" className='button-institucion'>Agregar</button>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default FormInstitucion;
