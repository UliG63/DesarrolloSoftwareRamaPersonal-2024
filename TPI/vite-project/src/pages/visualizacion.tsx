import React, { useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Inicio from '../components/inicio/inicio';
import Footer from "../components/footer/footer";
import Title from "../components/tilte/title";
import './visualizacion.css';
import backgroundImg from '../assets/inicio-visualizacion2.jpeg';
import FormVisualizacion from "../components/formVisualizacion/formVisualizacion";
import ModalMessage from "../components/modalMessage/modalMessage";
import { ErrorTipo } from "../components/modalMessage/error.enum";

interface Solicitud {
    id: number;
    nombreHechizo: string;
    usuario: string;
    fecha: string;
    motivo: string;
    estado: string;
    empleadoRevisor?: string;
    motivoRechazo?: string;
}

export default function VisualizacionPage() {
    const [showModal, setShowModal] = useState(false);
    const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
    const [recargaPagina, setRecargaPagina] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    //valores de test
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
        {
            id: 1,
            nombreHechizo: "Hechizo de Invisibilidad",
            usuario: "Harry Potter",
            fecha: "10/10/2023",
            motivo: "Necesito aprender este hechizo para una misión importante.",
            estado: "Pendiente",
            empleadoRevisor: "Albus Dumbledore",
            motivoRechazo: ""
        },
        {
            id: 2,
            nombreHechizo: "Hechizo de Levitación",
            usuario: "Hermione Granger",
            fecha: "12/10/2023",
            motivo: "Investigación académica sobre hechizos avanzados.",
            estado: "Aprobado",
            empleadoRevisor: "Minerva McGonagall",
            motivoRechazo: ""
        },
        {
            id: 3,
            nombreHechizo: "Hechizo de Protección",
            usuario: "Ron Weasley",
            fecha: "15/10/2023",
            motivo: "Preparación para la defensa contra las artes oscuras.",
            estado: "Rechazado",
            empleadoRevisor: "Severus Snape",
            motivoRechazo: "Falta de justificación válida."
        }
    ]);

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
                        <h3>{solicitud.nombreHechizo}</h3>
                        <h6>Información General</h6>
                        <div className="solicitud-info">
                            <p>Usuario: {solicitud.usuario}</p>
                            <p>Fecha: {solicitud.fecha}</p>
                            <p>Motivo: {solicitud.motivo}</p>
                        </div>
                        <h6>Información de Estado</h6>
                        <div className="solicitud-estado">
                            <p>
                                <span>Estado: </span>
                                <span>{solicitud.estado}</span>
                            </p>
                            {solicitud.empleadoRevisor && (
                                <p>Empleado Revisor: {solicitud.empleadoRevisor}</p>
                            )}
                            {solicitud.motivoRechazo && (
                                <p>Motivo de rechazo: {solicitud.motivoRechazo}</p>
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