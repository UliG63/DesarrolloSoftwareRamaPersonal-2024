import React, { useState } from 'react';
import './formPatente.css';
import cross from '../../assets/cross.png';

//Falta todo lo de bdd

const FormPatente: React.FC = () => {
    //Visibilidad de form 
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    //Función para mostrar/ocultar el form
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [restringido, setRestringido] = useState('false');
    const [imagen, setImagen] = useState('');
    
    return(
        <div>
            <button className='plus-patente-button' onClick={togglePopup}>
                + Patente
            </button>
            {isPopupVisible && (
                <div>
                <div className='patente-overlay' onClick={togglePopup}></div>
                <form className='form-patente'>
                    <button className='close-patente' onClick={togglePopup}>
                        <img src={cross} alt="" />
                    </button>
                    <h4>Solicitud de Patente</h4>
                    <div>
                        <p>Nombre</p>
                        <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} required/>
                    </div>
                    <div>
                        <p>Descripción</p>
                        <textarea id="descripcion" onChange={(e) => setDescripcion(e.target.value)} value={descripcion} rows={4} required />
                    </div>
                    <div>
                        <p>Instrucciones</p>
                        <textarea id="instrucciones" onChange={(e) => setInstrucciones(e.target.value)} value={instrucciones} rows={4} required />
                    </div>
                    <div className="restringido-group">
                    <p>Restringido?</p>
                    <div className="restringido-options">
                        <label>
                        <input type="radio" name="restringido" value="true" checked={restringido === 'true'} onChange={(e) => setRestringido(e.target.value)}/>
                        Sí
                        </label>
                        <label>
                        <input type="radio" name="restringido" value="false" checked={restringido === 'false'} onChange={(e) => setRestringido(e.target.value)}/>
                        No
                        </label>
                    </div>
                    <div>
                        <p>Imagen</p>
                        <input type="file" onChange={(e) => setImagen(e.target.value)} value={imagen} required/>
                    </div>
                    </div>
                    <button type="submit" className='button-patente'>Enviar</button>
                </form>
                </div>
            )}
        </div>
    );
}
export default FormPatente;
