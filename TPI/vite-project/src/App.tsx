import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import HechizosPage from './pages/hechizos';
import HechizosEmpleadoPage from './pages/hechizosEmpleado';
import PatentesPage from './pages/patentes';
import PatentesEmpleadoPage from './pages/patentesEmpleado';
import VisualizacionPage from './pages/visualizacion';
import VisualizacionEmpleadoPage from './pages/visualizacionEmpleado';
import InicioPage from './pages/inicio';
import UserPage from './pages/user';
import MagosPage from './pages/magos';
import InstitucionesPage from './pages/instituciones';
import EtiquetasPage from './pages/etiquetas';
import TipoHechizoPage from './pages/tipoHechizo';
import { AuthContextProvider, AuthContext } from './context/authContext';

// Componente ProtectedRoute que verifica la autenticación
const ProtectedRoute: React.FC<{ children: React.ReactNode; isEmpleado?: boolean }> = ({ children, isEmpleado }) => {
  const { currentUser } = useContext(AuthContext); // Obtener el usuario actual

  // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Si es una ruta exclusiva para empleados y el usuario no es empleado, redirigir
  if (isEmpleado && !currentUser.isEmpleado) {
    return <Navigate to="/" />;
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

            {/* Rutas exclusivas para empleados */}
            <Route path="/instituciones" element={<ProtectedRoute isEmpleado={true}><InstitucionesPage /></ProtectedRoute>} />
            <Route path="/magos" element={<ProtectedRoute isEmpleado={true}><MagosPage /></ProtectedRoute>} />
            <Route path="/etiquetas" element={<ProtectedRoute isEmpleado={true}><EtiquetasPage /></ProtectedRoute>} />
            <Route path="/tipo_hechizo" element={<ProtectedRoute isEmpleado={true}><TipoHechizoPage /></ProtectedRoute>} />
            <Route path="/patentesEmpleado" element={<ProtectedRoute isEmpleado={true}><PatentesEmpleadoPage /></ProtectedRoute>} />
            <Route path="/visualizacionEmpleado" element={<ProtectedRoute isEmpleado={true}><VisualizacionEmpleadoPage /></ProtectedRoute>} />
            <Route path="/hechizosEmpleado" element={<ProtectedRoute isEmpleado={true}><HechizosEmpleadoPage /></ProtectedRoute>} />

            {/* Redirección para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
