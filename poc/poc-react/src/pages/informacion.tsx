import React from 'react'
import Footer from '../components/footer/footer'
import Inicio from '../components/inicio/inicio'
import backgroundImg from '../assets/test.jpg'
import Navbar from '../components/navbar/navbar'
import InformacionMenu from '../components/informacion-menu/informacion-menu'
import Horarios from '../components/horarios/horarios'
import Contact from '../components/contact/contact'

export const InformacionPage:  React.FC = () => {
  
  /*
    Notar que las siguientes variables seran utilizadas como parametros
    Para poder demostrar el uso de props en componentes
    Con las primeras dos, el componente sera utilizado para un formulario
    de contacto.
  */

  const headerForm = "Formulario de contacto";
  const placeHolders=["Nombre", "Telefono", "Email", "Mensaje"];

  /*
    En este caso, las siguientes variables seran utilizadas como parametros
    para que el componente formulario, sea un formulario de datos de un paciente.
  */ 

  //const headerForm = "Descripcion del paciente";
  //const placeHolders=["Edad", "Altura", "Peso", "Breve descripcion de la persona"];
  return (
    <div>
        <Navbar />
        <Inicio 
        title="Información"
        subTitle=""
        backgroundImage={backgroundImg}
        />
        <InformacionMenu/>
        <Horarios/>
        <Contact placeHolders={placeHolders} Header={headerForm} />
        <Footer />
    </div>
  )
}

export default InformacionPage