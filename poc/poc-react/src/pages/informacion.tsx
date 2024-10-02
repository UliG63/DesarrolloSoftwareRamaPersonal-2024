import React from 'react'
import Footer from '../components/footer/footer'
import Inicio from '../components/inicio/inicio'
import backgroundImg from '../assets/test.jpg'
import Navbar from '../components/navbar/navbar'
import InformacionMenu from '../components/informacion-menu/informacion-menu'
import Horarios from '../components/horarios/horarios'
import Contact from '../components/contact/contact'

export const InformacionPage:  React.FC = () => {
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
        <Contact />
        <Footer />
    </div>
  )
}

export default InformacionPage