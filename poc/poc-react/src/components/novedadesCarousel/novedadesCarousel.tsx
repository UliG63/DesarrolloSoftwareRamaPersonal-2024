import React, { useRef, useState } from 'react';
import './novedadesCarousel.css';
import novedad1Img from '../../assets/excelInicial.jpeg';
import novedad2Img from '../../assets/desarrolladorFullStack.jpeg';
import novedad3Img from '../../assets/mesasExamen.jpg';
import novedad4Img from '../../assets/uniPublica.jpeg';
import novedad5Img from '../../assets/concurso.jpg';
import nextImg from '../../assets/next.png';
import backImg from '../../assets/back.png';
import cruz from '../../assets/cruzNegra.png'

const Novedades: React.FC = () => {
    const slider = useRef<HTMLUListElement>(null); // Ref para el slider
    const tx = useRef(0); // Ref para la posición de desplazamiento
    const cardWidth = 20; // Ancho de cada card en porcentaje
    const totalCards = 5; // Número total de tarjetas

    // Estado para manejar el popup
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState({
        title: '',
        content: '',
    });

    const articles = [
        {
            title: 'Curso de Excel Inicial',
            content: `Incripcion abierta para anotarse en el curso de excel para principiantes a partir del 01/10/24.
            Solo para estudiantes de la Universidad. No te quedes sin tu puesto! Para mas informacion, contacterse por mail.`,
            img: novedad1Img,
        },
        {
            title: 'Becas TheLab-UTN',
            content: `Curso Desarrollo Fullstack con Angular y NodeJS! 🚀
            🎓 Inicia: 15 de octubre
            💻 Modalidad: 100% online
            📚 Duración: 2 meses
            📅 Inscripciones abiertas en:
            https://www.thelabi.com/becas-thelab`,
            img: novedad2Img,
        },
        {
            title: 'Mesas de Exámenes - Dpto. Ing. en Energía Eléctrica',
            content: `Información importante para los alumnos de la carrera de Ing. en Energía Eléctrica.
            Corrección de fechas de exámen.
            Ternas de Exámenes - Septiembre 2024`,
            img: novedad3Img,
        },
        {
            title: "En defensa de la Universidad Publica",
            content: `Hoy marchamos en todo el país en defensa de la Universidad Pública Argentina.

            La universidad es parte de nuestra historia, de nuestra identidad como nación. Es el presente y el futuro del país.

            Sé parte. En la Facultad Regional Rosario, nos reunimos en la puerta de Zeballos 1341, a las 16 horas.

            Sí a la Ley de Financiamiento Universitario.
            Sí a la recomposición salarial de la paritaria docente y nodocente universitaria.
            Sí a la investigación en ciencia y tecnología.
            Sí al financiamiento para infraestructura en las universidades.
            Sí a la actualización de las becas Progresar y las Manuel Belgrano.
            Sí a la continuidad de las Becas EVC-CIN.

            #UniversidadPúblicaSiempre #UTNMarcha

            #MarchaFederalUniversitaria #UniversidadPúblicaArgentina #ComunidadUTN`,
            img: novedad4Img,
        },
        {
            title: 'Llamado a Concurso Interno de la cátedra de Hidrología y Obras Hidráulicas',
            content: `Se llama a Concurso Interno para un cargo de Auxiliar de Primera en la cátedra de Hidrología y Obras Hidráulicas de la Carrera de Ingeniería Civil.
            Presentar Documentación adjuntando la Carátula del llamado Firmada. El concurso se realiza el día viernes 27 de septiembre 18 hr.
            Caratula de llamado a concurso. `,
            img: novedad5Img,
        },
    ];

    const slideForward = () => {
        if (slider.current) {
            // Calcula el nuevo valor de tx
            const maxOffset = -((totalCards - 2) * cardWidth); // Ajusta el límite para evitar pasar la última tarjeta
            const newTx = tx.current - cardWidth;
            if (newTx >= maxOffset) {
                tx.current = newTx;
                slider.current.style.transform = `translateX(${tx.current}%)`;
            }
        }
    };

    const slideBackward = () => {
        if (slider.current) {
            // Calcula el nuevo valor de tx
            const newTx = tx.current + cardWidth;
            if (newTx <= 0) {
                tx.current = newTx;
                slider.current.style.transform = `translateX(${tx.current}%)`;
            }
        }
    };

    // Función para abrir el popup con el contenido del artículo
    const openPopup = (title: string, content: string) => {
        setPopupContent({ title, content });
        setPopupVisible(true);
    };

    // Función para cerrar el popup
    const closePopup = () => setPopupVisible(false);

    return (
        <div className='articulos'>
            <img src={nextImg} alt="" className='next-btn' onClick={slideForward} />
            <img src={backImg} alt="" className='back-btn' onClick={slideBackward} />
            <div className='slider'>
                <ul ref={slider}>
                    {articles.map((article, index) => (
                        <li key={index}>
                            <div className="slide">
                                <h3 className="slide-title">{article.title}</h3>
                                <img src={article.img} alt="" />
                                <button className="info-btn" onClick={() => openPopup(article.title, article.content)}>+ Información</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Popup Modal */}
            {popupVisible && (
                <div className='popup-overlay'>
                    <div className='popup-content'>
                        <h3>{popupContent.title}</h3>
                        <p>{popupContent.content}</p>
                        <button className="close-button" onClick={closePopup}>
                            <img src={cruz} alt="" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Novedades;
