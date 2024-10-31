import React, { useState } from 'react';
import './formVisualizacion.css';
import cross from '../../assets/cross.png';

//falta todo lo de bdd

const FormVisualizacion: React.FC = () => {
     const [isPopupVisible, setIsPopupVisible] = useState(false);

     const togglePopup = () => {
         setIsPopupVisible(!isPopupVisible);
     };

    const [hechizo, setHechizo] = useState('');
    const [motivo, setMotivo] = useState('');
    
    return(
        <div>
            <button className='plus-visualizacion-button' onClick={togglePopup}>
                + Solicitud
            </button>
            {isPopupVisible && (
                <div>
                <div className='visualizacion-overlay' onClick={togglePopup}></div>
                <form className='form-visualizacion'>
                    <button className='close-visualizacion' onClick={togglePopup}>
                        <img src={cross} alt="" />
                    </button>
                    <h4>Solicitud de Visualización</h4>
                    <div className="form-visualizacion-group">
                        <p>Hechizo</p>
                        <select id="hechizo" onChange={(e) => setHechizo(e.target.value)} value={hechizo} required>
                            <option value="">Selecciona un hechizo</option>
                            <option value="Imperio">Imperio</option>
                            <option value="Sectumsempra">Sectumsempra</option>
                        </select>
                    </div>
                    <div>
                        <p>Motivo</p>
                        <textarea id="motivo" onChange={(e) => setMotivo(e.target.value)} value={motivo} rows={4} required />
                    </div>
                    <button type="submit" className='button-visualizacion'>Enviar</button>
                </form>
                </div>
            )}
        </div>
    );
}
export default FormVisualizacion;
