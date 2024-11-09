import Navbar from "../components/navbar/navbar";
import Inicio from '../components/inicio/inicio';
import Footer from "../components/footer/footer";
import backgroundImg from '../assets/inicio-patentes.jpeg';
import FormPatente from "../components/formPatente/formPatente";
import { AuthContext } from "../context/authContext.tsx";
import { useContext, useEffect } from 'react';
import axios from 'axios';
import React, { useState } from 'react';
import './patentes.css';
import Title from "../components/tilte/title.tsx";

interface Patente {
    id: number;
    fechaCreacion: Date;
    nombre: string;
    descripcion: string;
    estado: string;
    motivoRechazo: string | null; // Puede ser null
    instrucciones: string;
    empleado: {
        nombre: string;
        apellido: string;
        email: string;
        profesion: string;
        madera_varita: string;
        nucleo_varita: string;
        largo_varita: number;
    } | null;  // Puede ser null
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

const PatentesPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [Patente, setPatentes] = useState<Patente[]>([]);
    const { currentUser } = useContext(AuthContext);

    const fetchUserPatentes = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/patente/${currentUser?.id}`);
            console.log('Patentes recibidas:', response.data);
            setPatentes(response.data.data);
        } catch (error) {
            setError('Error al cargar las patentes del usuario');
            console.error(error);
        }
    };

    useEffect(() => {
        if (currentUser?.id) {
            fetchUserPatentes();
        }
    }, [currentUser]);

    useEffect(() => {
        console.log('Patentes cargadas:', Patente);
    }, [Patente]);

    return (
        <div>
            <Navbar />
            <Inicio
                title="Solicitudes de Patentes"
                subTitle="Aquí puedes gestionar todas tus solicitudes de patentes de hechizos. En esta sección, podrás ver el estado actual de tus patentes solicitadas, hacer un seguimiento del progreso y revisar cualquier actualización importante. Además, si tienes nuevas ideas para hechizos, puedes solicitar nuevas patentes fácilmente. Explora nuestras opciones y lleva tus invenciones mágicas al siguiente nivel."
                backgroundImage={backgroundImg}
            />
            
            <FormPatente /> 
            <Title 
                encabezado='TUS PATENTES' 
                title='Información' 
                subTitle='' 
            />
            {/* Mostrar las patentes del usuario en tarjetas */}
            <div className="patentes-container">
                {Patente.length > 0 ? (
                    Patente.map((patente) => (
                        <div key={patente.id} className="patentes-card">
                             <h3>{patente.nombre}</h3>
                                <h6>Información General</h6>
                                <div className='personal-info'>
                                <p>Usuario: {patente.mago.nombre} {patente.mago.apellido}</p>
                                <p>ID Patente: {patente.id}</p>
                                <p>Fecha: {new Date(patente.fechaCreacion).toLocaleDateString()}</p>
                                <p>Descripcion: {patente.descripcion}</p>
                                <p>Instrucciones: {patente.instrucciones}</p>
                                </div>
                                <h6>Información de Estado</h6>
                                <div className='user-varita'>
                                    <p>Estado: {patente.estado}</p>
                                    {patente.empleado ? (
                                        <p>Empleado Revisor: {patente.empleado.nombre} {patente.empleado.apellido}</p>
                                    ) : (
                                        <p>Empleado Revisor: No asignado</p>
                                    )}
                                    <p>Motivo de rechazo: {patente.motivoRechazo || 'N/A'}</p>
                                </div>
                        </div>
                    ))
                ) : (
                    <p>No tienes patentes registradas.</p>
                )}
            </div>
            {error && <div className="error-message">{error}</div>}  {/* Mostrar el error */}
            <Footer />
        </div>
    );
};

export default PatentesPage;
