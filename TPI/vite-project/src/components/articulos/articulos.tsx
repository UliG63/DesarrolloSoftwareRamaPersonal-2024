import React, { useRef } from 'react';
import './articulos.css';
import nextImg from '../../assets/next.png'
import backImg from '../../assets/back.png'
import articulo1Img from '../../assets/animagus.jpeg'
import articulo2Img from '../../assets/imperdonables.jpeg'
import articulo3Img from '../../assets/quidditch.jpeg'
import articulo4Img from '../../assets/shop.jpeg'
import articulo5Img from '../../assets/patronus.jpeg'

const Articulos: React.FC = () => {
    const slider = useRef<HTMLUListElement>(null); //Ref para el slider
    const tx = useRef(0); //Ref para la posición de desplazamiento
    const cardWidth = 20; //Ancho de cada card en porcentaje
    const totalCards = 5; //Número total de tarjetas

    const slideForward = () => {
        if (slider.current) {
            //Calcula el nuevo valor de tx
            const maxOffset = -((totalCards - 2) * cardWidth); //Ajusta el límite para evitar pasar la última tarjeta
            const newTx = tx.current - cardWidth;
            if (newTx >= maxOffset) {
                tx.current = newTx;
                slider.current.style.transform = `translateX(${tx.current}%)`;
            }
        }
    };

    const slideBackward = () => {
        if (slider.current) {
            //Calcula el nuevo valor de tx
            const newTx = tx.current + cardWidth;
            if (newTx <= 0) {
                tx.current = newTx;
                slider.current.style.transform = `translateX(${tx.current}%)`;
            }
        }
    };
    
    return (
        <div className='articulos'>
            <img src={nextImg} alt="" className='next-btn' onClick={slideForward}/>
            <img src={backImg} alt="" className='back-btn' onClick={slideBackward}/>
            <div className='slider'>
                <ul ref={slider}>
                    <li>
                        <div className="slide">
                            <img src={articulo1Img} alt="" />
                            <div className="articulo-info">
                                <div>
                                    <h3>Todo sobre los Animagos: Transformaciones y Regulaciones</h3>
                                    <p>Sumérgete en el fascinante mundo de los Animagos, magos y brujas 
                                        que tienen la habilidad de transformarse en animales. Este artículo 
                                        explora cómo se logra esta transformación, las regulaciones que la 
                                        rodean y algunos de los animagos más conocidos en la historia mágica.</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <img src={articulo2Img} alt="" />
                            <div className="articulo-info">
                                <div>
                                    <h3>Historia de los Maleficios Imperdonables: Orígenes y Consecuencias</h3>
                                    <p>Un recorrido por la historia de los maleficios imperdonables, los 
                                        hechizos más oscuros y prohibidos en la magia. Descubre cómo surgieron, 
                                        sus efectos devastadores y las consecuencias legales y éticas de su uso 
                                        en el mundo mágico.</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <img src={articulo3Img} alt="" />
                            <div className="articulo-info">
                                <div>
                                    <h3>Quidditch: Reglas, Equipos y La Emoción del Juego</h3>
                                    <p>Todo lo que necesitas saber sobre el Quidditch, el deporte mágico 
                                        más emocionante. Desde las reglas básicas hasta los equipos más 
                                        destacados y las estrategias en el campo, este artículo te ofrece 
                                        una visión completa de este popular deporte mágico.</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <img src={articulo4Img} alt="" />
                            <div className="articulo-info">
                                <div>
                                    <h3>Weasleys' Wizard Wheezes: La Tienda de Bromas Mágicas</h3>
                                    <p>Explora la famosa tienda Weasleys' Wizard Wheezes, conocida por 
                                        sus innovadoras y divertidas bromas mágicas. Conoce los productos 
                                        más populares y cómo los gemelos Weasley han revolucionado el 
                                        mercado de los artículos mágicos con su creatividad y humor.</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <img src={articulo5Img} alt="" />
                            <div className="articulo-info">
                                <div>
                                    <h3>El Significado de los Animales Patronus: Más Allá del Hechizo</h3>
                                    <p>Descubre el profundo significado detrás de los animales Patronus. 
                                        Aprende cómo el tipo de Patronus que conjuras puede reflejar aspectos 
                                        profundos de tu personalidad y cómo estos guardianes mágicos protegen 
                                        contra las criaturas oscuras.</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
  };
  
  export default Articulos;