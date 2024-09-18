import { createContext, ReactNode } from "react";
import { hechizos, Hechizo } from "../assets/assets";

// Tipo del contexto que será un array de Hechizo
interface HechizosContextType {
  hechizos: Hechizo[];
}

// Creación del contexto con un valor inicial adecuado
export const HechizosContext = createContext<HechizosContextType>({ hechizos: [] });

// Tipo de las props del proveedor
interface HechizosContextProviderProps {
    children: ReactNode;
}

// Proveedor del contexto
const HechizosContextProvider = ({ children }: HechizosContextProviderProps) => {
    const contextValue = {
        hechizos
    };

    return (
        <HechizosContext.Provider value={contextValue}>
            {children}
        </HechizosContext.Provider>
    );
};

export default HechizosContextProvider;
