import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar/navbar";
import Inicio from '../components/inicio/inicio';
import Footer from "../components/footer/footer";
import Title from "../components/tilte/title";
import './visualizacion.css';
import backgroundImg from '../assets/inicio-visualizacion2.jpeg';
import FormVisualizacion from "../components/formVisualizacion/formVisualizacion";
import ModalMessage from "../components/modalMessage/modalMessage";
import { ErrorTipo } from "../components/modalMessage/error.enum";
import { AuthContext } from '../context/authContext.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

interface Solicitud {
    id: number;
    motivo: string;
    estado: string;
    motivo_rechazo: string | null;
    fecha_hasta: string | null;
    permanente: boolean | null
    hechizo:{
        nombre:string;
    }
    empleado: {
        nombre: string;
        apellido: string;
        email: string;
        profesion: string;
        madera_varita: string;
        nucleo_varita: string;
        largo_varita: number;
    } | null;
    mago: {
        nombre: string;
        apellido: string;
        email: string;
        profesion: string;
        madera_varita: string;
        nucleo_varita: string;
        largo_varita: number;
    };
}

export default function VisualizacionPage() {
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { currentUser } = useContext(AuthContext);
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    
    const fetchUserSolicitudes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/solicitud_visualizacion/mago/${currentUser?.id}`);
            setSolicitudes(response.data.data)
        } catch (error) {
            setTipoError(ErrorTipo.HARD_ERROR);
            setRecargaPagina(false);
            setModalMessage('No se pudieron recuperar las Patentes del Usuario\n' + error);
            setShowModal(true);
        }
    }
    useEffect(() => {
        if (currentUser?.id) {
            fetchUserSolicitudes();
        }
    }, [currentUser]);

    return (
        <div>
            <Navbar />
            <Inicio
                title="Solicitudes de Visualización"
                subTitle="En esta sección, puedes solicitar acceso a las instrucciones de hechizos restringidos completando un formulario específico. Este proceso es necesario para acceder a información sobre hechizos que están sujetos a restricciones especiales. También podrás hacer un seguimiento del estado de tus solicitudes realizadas."
                backgroundImage={backgroundImg}
            />
            <FormVisualizacion />
            <Title encabezado="TUS SOLICITUDES" title="Información" subTitle="" />
            <div className="solicitudes-container">
                {solicitudes.map((solicitud) => (
                    <div key={solicitud.id} className="solicitud-card">
                        <h3>{solicitud.hechizo.nombre}</h3>
                        <h6>Información General</h6>
                        <div className="solicitud-info">
                            <p>Usuario: {solicitud.mago.nombre} {solicitud.mago.apellido}</p>
                            <p>Motivo: {solicitud.motivo}</p>
                        </div>
                        <h6>Información de Estado</h6>
                        <div className="solicitud-estado">
                            <p>
                                <span>Estado: </span>
                                <span>{solicitud.estado}</span>
                            </p>
                            {solicitud.empleado && (
                                <p>Empleado Revisor: {solicitud.empleado.nombre} {solicitud.empleado.apellido}</p>
                            )}
                            {solicitud.motivo_rechazo && (
                                <p>Motivo de rechazo: {solicitud.motivo_rechazo}</p>
                            )}
                            {(solicitud.estado == 'aprobada'&& solicitud.permanente) && (
                                <p>Vigencia: Permanente</p>
                            )}
                            {(solicitud.estado == 'aprobada' && solicitud.fecha_hasta) && (
                                <p>Vigencia: {solicitud.fecha_hasta}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <ModalMessage
                    errorType={tipoError}
                    message={modalMessage}
                    reloadOnClose={recargaPagina}
                />
            )}
            <Footer />
        </div>
    );
}