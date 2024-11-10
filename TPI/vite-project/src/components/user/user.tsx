import React, { useContext, useState } from 'react';
import './user.css';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User: React.FC = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Usar useNavigate para la redirección

  // Estado para el modo edición/visualización
  const [isEditing, setIsEditing] = useState(false);

  // Estado que almacena los datos del usuario para edición
  const [userData, setUserData] = useState({
    nombre: currentUser?.nombre || '',
    apellido: currentUser?.apellido || '',
    email: currentUser?.email || '',
    profesion: currentUser?.profesion || '',
    madera_varita: currentUser?.madera_varita || '',
    nucleo_varita: currentUser?.nucleo_varita || '',
    largo_varita: currentUser?.largo_varita || '',
    pass: '', // La contraseña no la muestra
  });

  // Estado para la confirmación de la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState('');

  // Actualiza el estado userData con el valor ingresado en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Actualiza el estado para la confirmación de la contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'pass') {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setConfirmPassword(value);
    }
  };

  // Cambia entre modo edición y visualización
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Guardar cambios del usuario
  const handleSaveChanges = async () => {
    if (userData.pass !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      await axios.put('http://localhost:3000/api/auth/update', { ...userData, id: currentUser?.id });
      setIsEditing(false);  // Desactiva el modo edición
      alert('Información actualizada con éxito.');
    } catch (error) {
      console.error("Error al actualizar la información:", error);
      alert("Hubo un error al actualizar la información. Por favor, inténtalo de nuevo.");
    }
  };

  // Cerrar sesión y redirigir al login
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir sin recargar la página
  };

  // Eliminar cuenta
  const handleDelete = async (id: number) => {
    
    const confirmDelete = window.confirm("¿Estás seguro de que querés eliminar esta cuenta?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/magos/${id}`);
        logout();  // Limpia el estado de autenticación
        alert("Cuenta eliminada con éxito.");
        navigate('/login');  // Redirige al login
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
        alert("Hubo un error al eliminar la cuenta. Intenta nuevamente.");
      }
    }
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
            <input type="password" name="pass" value={userData.pass} onChange={handlePasswordChange} placeholder="Nueva Contraseña" />
            <input type="password" value={confirmPassword} onChange={handlePasswordChange} placeholder="Confirmar Contraseña" />
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
      <div className='red-buttons'>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
        <button onClick={() => currentUser && handleDelete(currentUser.id)} className="delete-user"disabled={!currentUser}>Eliminar</button>
      </div>
    </div>
  );
};

export default User;
