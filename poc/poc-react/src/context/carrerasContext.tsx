import { createContext, ReactNode } from "react";

// importamos la lista de carreras y el tipo Carrera desde el archivo assets
import { carreras, Carrera } from "../assets/assets";

interface CarrerasContextType {
  carreras: Carrera[]; //el contexto contiene un array de objetos del tipo Carrera
}

//createContext -> crear un contexto que puede ser compartido en toda la aplicación
export const CarrerasContext = createContext<CarrerasContextType | null>(null);

//interfaz para los props del componente CarrerasContextProvider
interface CarrerasContextProviderProps {
  children: ReactNode;
}

//creamos el componente proveedor del contexto
const CarrerasContextProvider = ({ children }: CarrerasContextProviderProps) => {
   // valor que se compartirá en el contexto -> objeto que contiene el array de carreras
  const contextValue = { carreras };

  return (
    <CarrerasContext.Provider value={contextValue}>
      {children}
    </CarrerasContext.Provider>
  );
};

//se exporta el provider para que pueda ser utilizado en otras partes de la aplicación
export default CarrerasContextProvider;
