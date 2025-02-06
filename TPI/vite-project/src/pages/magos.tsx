import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import './magos.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalMessage from "../components/modalMessage/modalMessage.tsx";
import { ErrorTipo } from "../components/modalMessage/error.enum.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

interface Mago {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    profesion: string;
    madera_varita: string;
    nucleo_varita: string;
    largo_varita: number;
    institucion: {
        nombre: string;
    };
}

const MagosPage: React.FC = () => {
    const [magos, setMagos] = useState<Mago[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false)
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchMagos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/magos`);
                setMagos(response.data.data);
            } catch (err) {
                setError('Error al cargar los magos');
                setTipoError(ErrorTipo.HARD_ERROR);
                setRecargaPagina(false);
                setModalMessage('Error al cargas los magos\n'+err);
                setShowModal(true);
                
            }
        };

        fetchMagos();
    }, []);

    return (
        <>
            <Navbar />
            <div className="magos-page">
                {error ? (
                    <p>{error}</p>
                ) : magos.length > 0 ? (
                    <div className="magos-container">
                        {magos.map((mago) => (
                            <div key={mago.id} className="mago-card">
                                <h3>{mago.nombre} {mago.apellido}</h3>
                                <h6>Información Personal</h6>
                                <div className='personal-info'>
                                    <p>Email: {mago.email}</p>
                                    <p>Profesión: {mago.profesion}</p>
                                    <p>Institución: {mago.institucion.nombre}</p>
                                </div>
                                <h6>Información de la Varita</h6>
                                <div className='user-varita'>
                                    <p>Madera: {mago.madera_varita}</p>
                                    <p>Núcleo: {mago.nucleo_varita}</p>
                                    <p>Largo: {mago.largo_varita} cm</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron magos</p>
                )}
                {showModal && (
                    <ModalMessage
                        errorType={tipoError}
                        message={modalMessage}
                        reloadOnClose={recargaPagina} 
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default MagosPage;
