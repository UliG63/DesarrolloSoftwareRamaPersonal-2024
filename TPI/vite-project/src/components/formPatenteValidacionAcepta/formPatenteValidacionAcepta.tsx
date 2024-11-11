import React, { useState } from 'react';
import './formPatenteValidacionAcepta.css';
import cross from '../../assets/cross.png';
import { AuthContext } from '../../context/authContext.tsx';
import { useContext } from 'react';
import axios from 'axios';

interface Etiqueta {
    id: number;
    nombre: string;
    descripcion: string;
}


interface TipoHechizo {
    id: number;
    nombre: string;
    caracteristicas: string;
}

const FormPatente: React.FC = () => {
    //Visibilidad de form 
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    //Función para mostrar/ocultar el form
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };
    const { currentUser } = useContext(AuthContext);
    const [motivoRechazo, setMotivoRechazo] = useState<string | null>('');
    const [tipoHechizo, setTipoHechizo] = useState<TipoHechizo | null>( );
    const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
    
    //const [imagen, setImagen] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            // Verifica que currentUser tenga idMago
        if (!currentUser || !currentUser.id) {
            console.error('Error: No se pudo obtener el id del Mago');
            return;
        }
        const formData = {
            motivoRechazo,
            tipoHechizo,
            etiquetas,
            idMago: currentUser.id
        };
        console.log(formData);
        try {
            // Enviar los datos a la API
            const response = await axios.post('http://localhost:3000/api/patente/', formData);
            
            console.log('Patente agregada:', response.data);

            // Restablece el formulario y cierra el popup
            setMotivoRechazo('');
            setTipoHechizo(null);
            setEtiquetas([]);
            setIsPopupVisible(false);
            alert('Registro de Patente exitoso');
        } catch (error) {
            setErrorMessage('Hubo un error al dar de alta la patente.');
            console.error(error);
        }
    };

    return(
        <div>
            <button className='plus-patente-button' onClick={togglePopup}>
                + Patente
            </button>
            {isPopupVisible && (
                <div>
                <div className='patente-overlay' onClick={togglePopup}></div>
                <form className='form-patente' onSubmit={handleSubmit}>
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
                    <button type="submit" className='button-patente'>Enviar</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </form>
                </div>
            )}
        </div>
    );
}
export default FormPatente;
