import React, { useEffect, useState, useContext } from 'react';
import './login.css';
import loginImage from '../assets/login.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import ModalMessage from "../components/modalMessage/modalMessage.tsx";
import { ErrorTipo } from "../components/modalMessage/error.enum.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

// Definir la interfaz para Institucion
interface Institucion {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
}

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const [tipoError, setTipoError] = useState<ErrorTipo | null>(null);
  const [recargaPagina, setRecargaPagina] = useState(false)
  const [modalMessage, setModalMessage] = useState('');
  const { login, register, currentUser } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [state, setState] = useState('Registrarse');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState(''); // Nuevo estado para la confirmación de contraseña
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [profesion, setProfesion] = useState('');
  const [maderaVarita, setMaderaVarita] = useState('');
  const [nucleoVarita, setNucleoVarita] = useState('');
  const [largoVarita, setLargoVarita] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [instituciones, setInstituciones] = useState<Institucion[]>([]);

  useEffect(() => {
    const fetchInstituciones = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/institucion`);
        // Verifica que 'data' sea un arreglo antes de establecer el estado
        if (Array.isArray(response.data.data)) {
          setInstituciones(response.data.data);
        } else {
          setTipoError(ErrorTipo.SOFT_ERROR);
          setRecargaPagina(true);
          setModalMessage('La respuesta no contiene un arreglo en data\n'+response.data);
          setShowModal(true);
        }
      } catch (error) {
        setTipoError(ErrorTipo.HARD_ERROR);
        setRecargaPagina(false);
        setModalMessage('No se pudieron recuperar las Instituciones.\n'+error);
        setShowModal(true);
      }
    };
  
    fetchInstituciones();
  }, []);

// Redirigir automáticamente si el usuario ya está autenticado
useEffect(() => {
  if (currentUser) {
    navigate('/'); // Redirige a la página de inicio
  }
}, [currentUser, navigate]); // Ejecutar efecto cuando currentUser cambie

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'Registrarse') {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  const handleRegister = async () => {
    // Verificar que las contraseñas coincidan
    if (pass !== confirmPass) {
      setTipoError(ErrorTipo.SOFT_ERROR);
      setRecargaPagina(false);
      setModalMessage('Las contraseñas no coinciden');
      setShowModal(true);
      return;
    }
    try {
      await register({
          nombre,
          apellido,
          email,
          pass,
          profesion,
          madera_varita: maderaVarita,
          nucleo_varita: nucleoVarita,
          largo_varita: largoVarita,
          institucion,
          isEmpleado: false,
      });
      setTipoError(ErrorTipo.SUCCESS);
      setRecargaPagina(false);
      setModalMessage('Registro exitoso');
      setShowModal(true);
  } catch (error) {
      setTipoError(ErrorTipo.SOFT_ERROR);
      setRecargaPagina(true);
      setModalMessage('Error en el registro\n' + error);
      setShowModal(true);
  }
  };

  const handleLogin = async () => {
    try {
      await login(email, pass);
      navigate('/'); // Redirigir a la página de inicio después de iniciar sesión
    } catch (error) {
      setTipoError(ErrorTipo.SOFT_ERROR);
      setRecargaPagina(true);
      setModalMessage('Error en el inicio de sesion\n'+error);
      setShowModal(true);
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className="image-container-login">
          <img src={loginImage} alt="Login" className='login-image' />
        </div>
        <form onSubmit={onSubmitHandler}>
          <div>
            <h3>{state === 'Registrarse' ? 'Crear Usuario' : 'Ingresar'}</h3>
            <h4>Por favor {state === 'Registrarse' ? 'registrarse' : 'ingresar'} para acceder al Ministerio de Magia</h4>
            {state === 'Registrarse' && (
              <div className='form-row'>
                <div>
                  <p>Nombre</p>
                  <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} required />
                </div>
                <div>
                  <p>Apellido</p>
                  <input type="text" onChange={(e) => setApellido(e.target.value)} value={apellido} required />
                </div>
              </div>
            )}
            <div>
              <p>Email</p>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>
            <div>
              <p>Contraseña</p>
              <input type="password" onChange={(e) => setPass(e.target.value)} value={pass} required />
            </div>
            {state === 'Registrarse' && (
              <>
                <div>
                  <p>Confirmar Contraseña</p>
                  <input type="password" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} required />
                </div>
                <div>
                  <p>Profesión</p>
                  <input type="text" onChange={(e) => setProfesion(e.target.value)} value={profesion} required />
                </div>
                <div className='form-row-tres'>
                  <div>
                    <p>Madera Varita</p>
                    <input type="text" onChange={(e) => setMaderaVarita(e.target.value)} value={maderaVarita} required />
                  </div>
                  <div>
                    <p>Núcleo Varita</p>
                    <input type="text" onChange={(e) => setNucleoVarita(e.target.value)} value={nucleoVarita} required />
                  </div>
                  <div>
                    <p>Largo Varita</p>
                    <input type="text" onChange={(e) => setLargoVarita(e.target.value)} value={largoVarita} required />
                  </div>
                </div>
                <div className="form-group">
                  <p>Institución</p>
                  <select id="institucion" onChange={(e) => setInstitucion(e.target.value)} value={institucion} required>
                    <option value="">Selecciona una institución</option>
                    {instituciones.map((inst) => (
                      <option key={inst.id} value={inst.id}>{inst.nombre}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <button type="submit" className='button-login'>{state === 'Registrarse' ? 'Registrarse' : 'Ingresar'}</button>
            {
              state === 'Registrarse'
                ? <h6>Ya tienes cuenta? <span onClick={() => setState('Ingresar')}>Ingresar</span></h6>
                : <h6>No tienes cuenta? <span onClick={() => setState('Registrarse')}>Registrarse</span></h6>
            }
          </div>
        </form>
      </div>
        {showModal && (
            <ModalMessage
                errorType={tipoError}
                message={modalMessage}
                reloadOnClose={recargaPagina} 
            />
        )}
    </div>
  );
}
