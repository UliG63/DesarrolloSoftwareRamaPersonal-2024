//import React, { useState } from 'react';        //Descomentar para ver el funcionamiento de Hook de estado.
import './contact.css';
//import { MouseEvent } from 'react';             //Descomentar para ver el funcionamiento de manejo de eventos.

interface formPlaceHoldersProps{
  placeHolders: string[]
  Header: string
}

function Contact ({placeHolders, Header}: formPlaceHoldersProps) {
  
  //eventHandler
  //const handleClick = (event:MouseEvent) => console.log(event)                  //Descomentar para ver el funcionamiento de manejo de eventos.
  
  // const [placeHolderModificado, setPlaceHolder] = useState('E-mail');   //Descomentar para ver el funcionamiento de Hook de estado.
 
  return (
    <div className='contact'>
      <form>
        <h2>{Header}</h2>
        <div className='input-box'>
          <input type="text" className="field" placeholder={placeHolders[0]} required />
        </div>
        <div className='input-box'>
          <input type="text" className="field" placeholder={placeHolders[1]}  required />
        </div>
        <div className='input-box'>
          {/*<input type="email" className="field" placeholder={placeHolderModificado} required /> */}{/* Descomentar para ver funcionamiento de Hook de estado*/ }
          <input type="email" className="field" placeholder={placeHolders[2]} required />
        </div>
        <div className='input-box'>
          <textarea name="" id="" className="field mess" placeholder={placeHolders[3]} required></textarea>
        </div>
        <button type='submit' onClick={(event)=>console.log(event)}>Enviar consulta</button>
        
        {/*<button type='submit' onClick={handleClick}>Enviar consulta</button> */}   {/* Descomentar para ver el funcionamiento de eventHandler. */}
          {/* Notar que se referencia a la funcion handleClick definida en ts */}

        {/*<button type='submit' onClick={()=>setPlaceHolder('DAME TODOS TUS CORREOS!!!')}>Modificar placeholder mail</button> /*}
          {/*
            Notar que este ultimo boton es utilizado para demostrar el manejo de eventos en un componente
            utilizando el Hook de estado "useState". Simplemente descomentarlo en el momento de demostrar su funcionamiento    
          */}  
      </form>
    </div>
  )
}

export default Contact;
