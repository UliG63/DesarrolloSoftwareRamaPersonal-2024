import React from 'react';
import './inicio.css';

interface InicioProps {
  title: string;
  subTitle: string;
  backgroundImage: string;
  fullHeight?: boolean; // Variable para controlar el alto
}

const Inicio: React.FC<InicioProps> = ({ title, subTitle, backgroundImage, fullHeight = false }) => {
  return (
    <div 
      className={`inicio container ${fullHeight ? 'full-height' : 'partial-height'}`}
      style={{ 
        backgroundImage: `linear-gradient(rgba(32, 30, 67, 0.7), rgba(32, 30, 67, 0.7)), url(${backgroundImage})`
      }}
    >
      <div className='inicio-text'>
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
    </div>
  );
};

export default Inicio;
