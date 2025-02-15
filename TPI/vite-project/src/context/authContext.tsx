import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//la url de la api está en una variable de entorno para + seguridad
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
  updateUser: (data: Partial<User>) => Promise<void>;
  isLoggedIn: () => boolean;
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

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //para almacenar el usuario actual y saber si validó la sesión
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  //configuración para axios para que envíe las cookies con la petición
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  //validar la sesión de usuario
  useEffect(() => {
    const validateSession = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/auth/validate`);
        //si se valida, almacena usuario en el localStorage
        setCurrentUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } catch {
        //si falla, se elimina usuario almacenado
        setCurrentUser(null);
        localStorage.removeItem('user');
      } finally {
        //se completó la validación
        setIsReady(true);
      }
    };
    validateSession();
  }, []);

  //funcion auxiliar
  const handleAuthResponse = (response: { data: { user: User } }) => {
    const { user } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const login = async (email: string, pass: string) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, pass });
      handleAuthResponse(response);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  //agregué que luego de registrarse haga login
  const register = async (data: RegisterData) => {
    try {
       await axios.post(`${apiUrl}/api/auth/register`, data);
      const loginResponse = await axios.post(`${apiUrl}/api/auth/login`, { email: data.email, pass: data.pass });
      handleAuthResponse(loginResponse);
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

  //se elimina la cookie y se limpia el localStorage
  const logout = () => {
    axios.post(`${apiUrl}/api/auth/logout`);
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await axios.put(`${apiUrl}/api/auth/update`, data);
      setCurrentUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Información actualizada con éxito');
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  //es true si hay un usuario autenticado
  const isLoggedIn = () => {
    return !!currentUser;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateUser, isLoggedIn }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
