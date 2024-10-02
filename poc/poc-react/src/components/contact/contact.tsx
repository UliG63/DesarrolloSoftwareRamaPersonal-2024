import React from 'react';
import './contact.css';

const Contact: React.FC = () => {
  return (
    <div className='contact'>
      <form>
        <h2>Formulario de contacto</h2>
        <div className='input-box'>
          <input type="text" className="field" placeholder="Nombre*" required />
        </div>
        <div className='input-box'>
          <input type="text" className="field" placeholder="Telefono*" required />
        </div>
        <div className='input-box'>
          <input type="email" className="field" placeholder="E-Mail*" required />
        </div>
        <div className='input-box'>
          <textarea name="" id="" className="field mess" placeholder="Mensaje*" required></textarea>
        </div>
        <button type='submit'>Enviar consulta</button>
      </form>
    </div>
  )
}

export default Contact;
