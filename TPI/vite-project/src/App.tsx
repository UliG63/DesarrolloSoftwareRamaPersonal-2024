import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import HechizosPage from './pages/hechizos';
import PatentesPage from './pages/patentes';
import VisualizacionPage from './pages/visualizacion';
import InicioPage from './pages/inicio';
import UserPage from './pages/user';
import { AuthContextProvider, AuthContext } from './context/authContext';

// Componente ProtectedRoute que verifica la autenticación
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useContext(AuthContext); // Obtener el usuario actual

  // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};


const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<ProtectedRoute><InicioPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hechizos" element={<ProtectedRoute><HechizosPage /></ProtectedRoute>} />
          <Route path="/patentes" element={<ProtectedRoute><PatentesPage /></ProtectedRoute>} />
          <Route path="/visualizacion" element={<ProtectedRoute><VisualizacionPage /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
    </AuthContextProvider>
  );
};

export default App;