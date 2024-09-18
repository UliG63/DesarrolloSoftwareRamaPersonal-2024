import Navbar from "../components/navbar/navbar";
import Inicio from '../components/inicio/inicio';
import Footer from "../components/footer/footer";
import backgroundImg from '../assets/inicio-visualizacion2.jpeg';
import FormVisualizacion from "../components/formVisualizacion/formVisualizacion";

export default function VisualizacionPage() {
    return (
        <div>
            <Navbar />
            <Inicio
                title="Solicitudes de Visualización"
                subTitle="En esta sección, puedes solicitar acceso a las instrucciones de hechizos restringidos completando un formulario específico. Este proceso es necesario para acceder a información sobre hechizos que están sujetos a restricciones especiales. También podrás hacer un seguimiento del estado de tus solicitudes realizadas."
                backgroundImage={backgroundImg}
            />
            <FormVisualizacion />
            <Footer />
        </div>
    );
}