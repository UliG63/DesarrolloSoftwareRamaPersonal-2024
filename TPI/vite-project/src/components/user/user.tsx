import React from 'react';
import './user.css';

//No tenía ganas de poner imagen siendo honesta
//Pusee información random, después habría que llamar a la bdd y todo eso

const User: React.FC = () => {
    return (
      <div className='user-container'>
        <div className='user-card'>
          <h3>Nombre Apellido</h3>
          <h6>Información Personal</h6>
          <div className='personal-info'>
            <p>Email: email@ejemplo.com</p>
            <p>Profesión: Mago</p>
          </div>
          <h6>Información de la Varita</h6>
          <div className='user-varita'>
              <p>Madera: Roble</p>
              <p>Núcleo: Pluma de fénix</p>
              <p>Largo: 32 cm</p>
          </div>
        </div>
      </div>
    );
};

export default User;
