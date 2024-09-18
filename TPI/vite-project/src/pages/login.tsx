import React, { useState } from 'react';
import './login.css';
import loginImage from '../assets/login.jpg';

export default function LoginPage() {
  const [state, setState] = useState('Registrarse'); //setState

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [profesion, setProfesion] = useState('');
  const [maderaVarita, setMaderaVarita] = useState('');
  const [nucleoVarita, setNucleoVarita] = useState('');
  const [largoVarita, setLargoVarita] = useState('');
  const [institucion, setInstitucion] = useState('');

    // Tipado del parámetro event usando React.FormEvent<HTMLFormElement>
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Lógica para enviar los datos del formulario
      };

//Podría haber hecho un componente? sí, pero como es lo único de esta pág no me dio ganas xD

  return (
    <div className='login-page'>
        <div className='login-container'>
        <div className="image-container-login">
            <img src={loginImage} alt={loginImage} className='login-image'/>
        </div>
        <form onSubmit={onSubmitHandler}>
      <div>
        <h3>{state === 'Registrarse' ? 'Crear Usuario' : 'Ingresar'}</h3>
        <h4>Por favor {state === 'Registrarse' ? 'registrarse' : 'ingresar'} para acceder al Ministerio de Magia</h4>
        {state === 'Registrarse' && (
            <div className='form-row'>
            <div>
              <p>Nombre</p>
              <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} required/>
            </div>
            <div>
              <p>Apellido</p>
              <input type="text" onChange={(e) => setApellido(e.target.value)} value={apellido} required/>
            </div>
            </div>
        )}
        <div>
          <p>Email</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
        </div>
        <div>
          <p>Contraseña</p>
          <input type="password" onChange={(e) => setPass(e.target.value)} value={pass} required/>
        </div>
        {state === 'Registrarse' && (
            <>
            <div>
            <p>Profesión</p>
            <input type="text" onChange={(e) => setProfesion(e.target.value)} value={profesion} required/>
          </div>
          <div className='form-row-tres'>
          <div>
            <p>Madera Varita</p>
            <input type="text" onChange={(e) => setMaderaVarita(e.target.value)} value={maderaVarita} required/>
          </div>
          <div>
            <p>Núcleo Varita</p>
            <input type="text" onChange={(e) => setNucleoVarita(e.target.value)} value={nucleoVarita} required/>
          </div>
          <div>
            <p>Largo Varita</p>
            <input type="text" onChange={(e) => setLargoVarita(e.target.value)} value={largoVarita} required/>
          </div>
          </div>
          <div className="form-group">
            <p>Institución</p>
            <select id="institucion"onChange={(e) => setInstitucion(e.target.value)} value={institucion} required>
                <option value="">Selecciona una institución</option>
                <option value="Hogwarts">Hogwarts</option>
                <option value="Beauxbatons">Beauxbatons</option>
                <option value="Durmstrang">Durmstrang</option>
                <option value="Ilvermorny">Ilvermorny</option>
            </select>
          </div>
            </>
        )}
        <button type="submit" className='button-login'>{state === 'Registrarse' ? 'Registrarse' : 'Ingresar'}</button>
        {
            state === 'Registrarse' 
            ? <h6>Ya tienes cuenta? <span onClick={()=> setState('Ingresar')}>Ingresar</span></h6>
            : <h6>No tienes cuenta? <span onClick={()=> setState('Registrarse')}>Registrarse</span></h6>
        }
      </div>
    </form>
    </div>
    </div>
    
    
  );
}
