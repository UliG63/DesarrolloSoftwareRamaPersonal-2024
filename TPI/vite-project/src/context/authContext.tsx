import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  profesion: string;
  madera_varita: string;
  nucleo_varita: string;
  largo_varita: string;
  institucion: string;
  isEmpleado: boolean;
}

interface AuthContextProps {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: User) => Promise<void>; // Función para actualizar el usuario
}

interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  pass: string;
  profesion: string;
  madera_varita: string;
  nucleo_varita: string;
  largo_varita: string;
  institucion: string;
  isEmpleado: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: async () => {}, // Método vacío inicialmente
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') as string) || null
  );

  // envía el email y contraseña para logear
  const login = async (email: string, pass: string) => {
    const response = await axios.post(`${apiUrl}/api/auth/login`, { email, pass });
    setCurrentUser(response.data); // almacena los datos del usuario
    document.cookie = `accessToken=${response.data.accessToken}; path=/`; // guarda el token de acceso en una cookie
  };

  // envía los datos del usuario al backend para crear una cuenta
  const register = async (data: RegisterData) => {
    await axios.post(`${apiUrl}/api/auth/register`, data);
    //alert(response.data.message || 'Registro exitoso'); // esto notificar al usuario, podríamos cambiarlo y hacerlo más aesthetic
  };

  const logout = () => {
    setCurrentUser(null); // limpia al usuario actual
    localStorage.removeItem('user'); // eliminar el usuario del almacenamiento local
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // eliminar el token de acceso
  };

  // Actualiza los datos del usuario en el contexto y en el localStorage
  const updateUser = async (data: User) => {
    try {
      const response = await axios.put(`${apiUrl}/api/auth/update`, data);
      setCurrentUser(response.data); // actualiza el estado con los nuevos datos del usuario
      localStorage.setItem('user', JSON.stringify(response.data)); // guarda los datos actualizados en el localStorage
      alert('Información actualizada con éxito');
    } catch (error) {
      console.error("Error al actualizar la información:", error);
      alert('Hubo un error al actualizar la información. Por favor, inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser)); // guarda los datos en localStorage al cambiar el estado
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
