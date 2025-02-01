import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import ListadoMagos from "../components/listadoMagos/listadoMagos";

export default function MagosEmpleado() {
    return (
        <div className="magos-empleado-page">
            <Navbar />
            <ListadoMagos />
            <Footer />
        </div>
    );
}