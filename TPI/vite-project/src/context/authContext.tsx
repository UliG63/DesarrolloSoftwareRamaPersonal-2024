import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// podríamos cambiar los alert para hacer popups más lindos, si sobra tiempo...

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
    logout: () => {}
  });

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   // estado para almacenar el usuario autenticado (spoiler, lo usamos mucho)
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') as string) || null
  );

  // envía el email y contraseña para logear
  const login = async (email: string, pass: string) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, pass });
    setCurrentUser(response.data); // almacena los datos del usuario
    document.cookie = `accessToken=${response.data.accessToken}; path=/`; // guarda el token de acceso en una cookie
  };

   // envía los datos del usuario al backend para crear una cuenta
  const register = async (data: RegisterData) => {
    const response = await axios.post('http://localhost:3000/api/auth/register', data);
    alert(response.data.message || 'Registro exitoso'); // esto notificar al usuario, podríamos cambiarlo y hacerlo más aesthetic
  };

  const logout = () => {
    setCurrentUser(null); // limpiaa el usuario actual
    localStorage.removeItem('user'); // eliminar el usuario del almacenamiento local
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // eliminar el token de acceso
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
