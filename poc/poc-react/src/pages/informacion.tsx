import React from 'react'
import Footer from '../components/footer/footer'
import Inicio from '../components/inicio/inicio'
import backgroundImg from '../assets/test.jpg'
import Navbar from '../components/navbar/navbar'

export const InformacionPage:  React.FC = () => {
  return (
    <div>
        <Navbar />
        <Inicio 
        title="Información"
        subTitle=""
        backgroundImage={backgroundImg}
        />
        <Footer />
    </div>
  )
}

export default InformacionPage