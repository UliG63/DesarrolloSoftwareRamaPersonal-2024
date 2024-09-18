import React from 'react';
import './title.css';

interface TitleProps {
  encabezado: string;
  title: string;
  subTitle: string;
}

const Title: React.FC<TitleProps> = ({ encabezado, title, subTitle }) => {
  return (
    <div className='title'>
      <h3>{encabezado}</h3>
      <h2>{title}</h2>
      <p>{subTitle}</p>
    </div>
  );
};

export default Title;