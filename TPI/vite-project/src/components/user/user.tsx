import React, { useContext, useState } from 'react';
import './user.css';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

// habría que hacer que tenga que ingresar dos veces su nueva contraseña

const User: React.FC = () => {
  // obtener el usuario actual y la función logout
  const { currentUser, logout } = useContext(AuthContext);  
  // estado para saber si está en modo edición/visualización
  const [isEditing, setIsEditing] = useState(false);
  // estado que almacena los datos del usuario para edición
  const [userData, setUserData] = useState({
    nombre: currentUser?.nombre || '',
    apellido: currentUser?.apellido || '',
    email: currentUser?.email || '',
    profesion: currentUser?.profesion || '',
    madera_varita: currentUser?.madera_varita || '',
    nucleo_varita: currentUser?.nucleo_varita || '',
    largo_varita: currentUser?.largo_varita || '',
    pass: '' //la contraseña no la muestra
  });

   // actualiza el estado userData con el valor ingresado en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // va cambiando el modo edición entre true y false
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // enviar put a la api con el id del usuario actual y la nueva info
  const handleSaveChanges = async () => {
    try {
      await axios.put('http://localhost:3000/api/auth/update', { ...userData, id: currentUser?.id });
      setIsEditing(false);  // desactiva el modo edición
    } catch (error) {
      console.error("Error al actualizar la información:", error);
    }
  };

   // cerrar sesión al llamar la función logout del contexto de autenticación y redirige al login
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className='user-container'>
      <div className='user-card'>
        {isEditing ? (
          <>
            <input type="text" name="nombre" value={userData.nombre} onChange={handleInputChange} placeholder="Nombre" />
            <input type="text" name="apellido" value={userData.apellido} onChange={handleInputChange} placeholder="Apellido" />
            <input type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder="Email" />
            <input type="text" name="profesion" value={userData.profesion} onChange={handleInputChange} placeholder="Profesión" />
            <input type="text" name="madera_varita" value={userData.madera_varita} onChange={handleInputChange} placeholder="Madera de la Varita" />
            <input type="text" name="nucleo_varita" value={userData.nucleo_varita} onChange={handleInputChange} placeholder="Núcleo de la Varita" />
            <input type="text" name="largo_varita" value={userData.largo_varita} onChange={handleInputChange} placeholder="Largo de la Varita" />
            <input type="password" name="pass" value={userData.pass} onChange={handleInputChange} placeholder="Nueva Contraseña" />
            <button onClick={handleSaveChanges} className='save-button'>Guardar</button>
            <button onClick={handleEditToggle} className='cancel-button'>Cancelar</button>
          </>
        ) : (
          <>
            <h3>{userData.nombre} {userData.apellido}</h3>
            <h6>Información Personal</h6>
            <div className='personal-info'>
              <p>Email: {userData.email}</p>
              <p>Profesión: {userData.profesion}</p>
            </div>
            <h6>Información de la Varita</h6>
            <div className='user-varita'>
              <p>Madera: {userData.madera_varita}</p>
              <p>Núcleo: {userData.nucleo_varita}</p>
              <p>Largo: {userData.largo_varita}</p>
            </div>
            <button onClick={handleEditToggle} className='edit-button'>Editar</button>
          </>
        )}
      </div>
      <button onClick={handleLogout} className='logout-button'>Logout</button>
    </div>
  );
};

export default User;
