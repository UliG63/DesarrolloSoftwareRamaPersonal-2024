import { createContext, ReactNode } from "react";
import { carreras, Carrera } from "../assets/assets";

interface CarrerasContextType {
  carreras: Carrera[];
}

export const CarrerasContext = createContext<CarrerasContextType | null>(null);

interface CarrerasContextProviderProps {
  children: ReactNode;
}

const CarrerasContextProvider = ({ children }: CarrerasContextProviderProps) => {
  const contextValue = { carreras };

  return (
    <CarrerasContext.Provider value={contextValue}>
      {children}
    </CarrerasContext.Provider>
  );
};

export default CarrerasContextProvider;
