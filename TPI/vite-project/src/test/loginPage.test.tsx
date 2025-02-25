import { render, screen, fireEvent, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import LoginPage from '../pages/login.tsx';
import axios from 'axios';

// Mock de las funciones de AuthContext
const mockLogin = vi.fn();
const mockRegister = vi.fn();
const mockLogout = vi.fn();
const mockUpdateUser = vi.fn();
const mockIsLoggedIn = vi.fn().mockReturnValue(false); 

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          data: [
            {
              id: 1,
              nombre: "Hogwarts",
              ciudad: "Unknown",
              pais: "Scotland"
            },
            /* {
              id: 2,
              nombre: "Ilvermony",
              ciudad: "Kansas City",
              pais: "Estados Unidos"
            } */
          ],
          message: "found all instituciones"
        },
        status: 200,
        statusText: "OK",
        headers: {
          "content-type": "application/json; charset=utf-8"
        }
      });
    });
  });

  it('Debe renderizar el formulario de registro de manera correcta', async () => { 
    render(
      <AuthContext.Provider 
        value={{ 
          login: mockLogin, 
          register: mockRegister, 
          logout: mockLogout,
          updateUser: mockUpdateUser,
          isLoggedIn: mockIsLoggedIn,
          currentUser: null 
        }}
      >
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Crear Usuario')).toBeInTheDocument;
    expect(screen.getByText('Por favor registrarse para acceder al Ministerio de Magia')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Apellido')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();
    expect(screen.getByText('Confirmar Contraseña')).toBeInTheDocument();
    expect(screen.getByText('Profesión')).toBeInTheDocument();
    expect(screen.getByText('Madera Varita')).toBeInTheDocument();
    expect(screen.getByText('Núcleo Varita')).toBeInTheDocument();
    expect(screen.getByText('Largo Varita')).toBeInTheDocument();
    expect(screen.getByText('Institución')).toBeInTheDocument();
    expect(screen.getByText('Selecciona una institución')).toBeInTheDocument();
    expect(screen.getByText('Registrarse')).toBeInTheDocument();
    expect(screen.getByText('Ya tienes cuenta?')).toBeInTheDocument();
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
    //screen.debug();
  });

   it('Debe detectar el intercambio del formulario de registro al de login', async()=>{
    render(
        <AuthContext.Provider 
          value={{ 
            login: mockLogin, 
            register: mockRegister, 
            logout: mockLogout,
            updateUser: mockUpdateUser,
            isLoggedIn: mockIsLoggedIn,
            currentUser: null 
          }}
        >
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );

       const spanIngresar = screen.getByTestId('ingresar-span');
       act(()=>{
            fireEvent.click(spanIngresar);
       });
        
        screen.findByText('Ingresar');
        expect(screen.getByText('Por favor ingresar para acceder al Ministerio de Magia')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Contraseña')).toBeInTheDocument();
        expect(screen.getByText('No tienes cuenta?')).toBeInTheDocument();
        expect(screen.getByText('Registrarse')).toBeInTheDocument();
        //screen.debug();
  });

  it('Debe mostrar la institucion mockeada', async()=>{
    render(
        <AuthContext.Provider 
          value={{ 
            login: mockLogin, 
            register: mockRegister, 
            logout: mockLogout,
            updateUser: mockUpdateUser,
            isLoggedIn: mockIsLoggedIn,
            currentUser: null 
          }}
        >
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      await act( ()=>{
        const selectElement = screen.getByLabelText("Institución") as HTMLSelectElement;
        fireEvent.click(selectElement);
      });
      expect(screen.getByText('Hogwarts')).toBeInTheDocument();
      //screen.debug(); 
  });

  it("Debe corroborar que las contrasenas ingresadas sean iguales", async ()=>{
    render(
        <AuthContext.Provider 
          value={{ 
            login: mockLogin, 
            register: mockRegister, 
            logout: mockLogout,
            updateUser: mockUpdateUser,
            isLoggedIn: mockIsLoggedIn,
            currentUser: null 
          }}
        >
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      const inputNombre = screen.getByTestId('input-nombre');
      const inputApellido = screen.getByTestId('input-apellido');
      const inputEmail = screen.getByTestId('input-email');
      const inputPass1 = screen.getByTestId('input-pass1');
      const inputPass2 = screen.getByTestId('input-pass2');
      const inputProfesion = screen.getByTestId('input-profesion');
      const inputMV = screen.getByTestId('input-mv');
      const inputNV = screen.getByTestId('input-nv');
      const inputLV = screen.getByTestId('input-LV');
      //const selectElement = screen.getByLabelText("Institución") as HTMLSelectElement;
      const submitButton = screen.getByTestId('registrarse-button');

      act(()=>{
         fireEvent.change(inputNombre, { target: { value: "John" } });
      });

      act( ()=>{
         fireEvent.change(inputApellido, { target: { value: "Doe" } });
      });

      act( ()=>{
         fireEvent.change(inputEmail, { target: { value: "john@doe.com" } });
      });

      act( ()=>{
         fireEvent.change(inputPass1, { target: { value: "abcdefghi" } });
      });

      act( ()=>{
         fireEvent.change(inputPass2, { target: { value: "12345678" } });
      });

      act( ()=>{
         fireEvent.change(inputProfesion, { target: { value: "Desempleado" } });
      });

      act( ()=>{
         fireEvent.change(inputMV, { target: { value: "Acebo" } });
      });

      act( ()=>{
         fireEvent.change(inputNV, { target: { value: "Pluma de Cola de Fenix" } });
      });

      act( ()=>{
         fireEvent.change(inputLV, { target: { value: "23" } });
      });
      expect((inputLV as HTMLInputElement).value).toBe("23");

      await act( ()=>{
        const selectElement = screen.getByLabelText("Institución") as HTMLSelectElement;
        userEvent.click(selectElement);
      });

      await act(()=>{
        userEvent.click(screen.getByRole('option', { name: 'Hogwarts' }));

      });

      await act(()=>{
        fireEvent.click(submitButton);
      })

      expect(screen.getByText('Aceptar')).toBeInTheDocument();
      
      //screen.debug();
  });

});



