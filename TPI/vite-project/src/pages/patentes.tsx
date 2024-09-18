import Navbar from "../components/navbar/navbar";
import Inicio from '../components/inicio/inicio';
import Footer from "../components/footer/footer";
import backgroundImg from '../assets/inicio-patentes.jpeg';
import FormPatente from "../components/formPatente/formPatente";

export default function PatentesPage() {
    return (
        <div>
            <Navbar />
            <Inicio
                title="Solicitudes de Patentes"
                subTitle="Aquí puedes gestionar todas tus solicitudes de patentes de hechizos. En esta sección, podrás ver el estado actual de tus patentes solicitadas, hacer un seguimiento del progreso y revisar cualquier actualización importante. Además, si tienes nuevas ideas para hechizos, puedes solicitar nuevas patentes fácilmente. Explora nuestras opciones y lleva tus invenciones mágicas al siguiente nivel."
                backgroundImage={backgroundImg}
            />
            <FormPatente /> 
            <Footer />
        </div>
    );
}
  
