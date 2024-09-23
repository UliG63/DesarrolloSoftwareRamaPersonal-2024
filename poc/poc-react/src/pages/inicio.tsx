import React from 'react'
import Informacion from '../components/informacion/infromacion'
import Footer from '../components/footer/footer'
import Inicio from '../components/inicio/inicio'
import backgroundImg from '../assets/test.jpg'
import InicioMenu from '../components/inicio-menu/inicio-menu'
import Navbar from '../components/navbar/navbar'

export const InicioPage:  React.FC = () => {
  return (
    <div>
       <Navbar/>
       <Inicio
      title="Bienvenido a la UTN Rosario"
      subTitle="Formando profesionales para el desarrollo tecnológico y productivo del país, promoviendo la investigación, la innovación y el compromiso con la industria y la sociedad.
Nuestra misión es preparar líderes que combinen conocimiento técnico con una visión cultural y humanística, contribuyendo al crecimiento de la industria nacional y la comunidad global."
      backgroundImage={backgroundImg}
      fullHeight={true}
      />
      <InicioMenu />
      <Informacion />
      <Footer />
    </div>
  )
}

export default InicioPage