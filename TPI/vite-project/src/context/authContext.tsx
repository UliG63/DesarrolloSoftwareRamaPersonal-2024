// authContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

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
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') as string) || null
  );

  const login = async (email: string, pass: string) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, pass });
    setCurrentUser(response.data);
    document.cookie = `accessToken=${response.data.accessToken}; path=/`;
  };

  const register = async (data: RegisterData) => {
    const response = await axios.post('http://localhost:3000/api/auth/register', data);
    alert(response.data.message || 'Registro exitoso');
  };

  const logout = () => {
    setCurrentUser(null); // Limpiar el usuario actual
    localStorage.removeItem('user'); // Eliminar el usuario del almacenamiento local
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Eliminar el token de acceso
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
