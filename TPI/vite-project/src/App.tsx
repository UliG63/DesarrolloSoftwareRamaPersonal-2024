import React, { useContext, useState, useEffect } from 'react';
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
import MagosEmpleado from './pages/magosEmpleado';

// Verifica la autenticación, el rol y selecciona la página según el rol
const ProtectedRoute: React.FC<{ children: React.ReactNode; empleadoPage?: React.ReactNode; isEmpleadoOnly?: boolean }> = ({ children, empleadoPage, isEmpleadoOnly }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (isEmpleadoOnly && !currentUser.isEmpleado) {
    return <Navigate to="/" />;
  }

  if (currentUser.isEmpleado && empleadoPage) {
    return <>{empleadoPage}</>;
  }

  if (currentUser.id === 1 && React.isValidElement(children) && children.type === MagosPage) {
    return <MagosEmpleado />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [isStylesLoaded, setIsStylesLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsStylesLoaded(true);

    if (document.readyState === 'complete') {
      setIsStylesLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (!isStylesLoaded) {
    return <div className="loading-screen">Cargando...</div>; // Muestra un loader mientras los estilos se cargan
  }

  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<ProtectedRoute><InicioPage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hechizos" element={<ProtectedRoute empleadoPage={<HechizosEmpleadoPage />}><HechizosPage /></ProtectedRoute>} />
            <Route path="/patentes" element={<ProtectedRoute empleadoPage={<PatentesEmpleadoPage />}><PatentesPage /></ProtectedRoute>} />
            <Route path="/visualizacion" element={<ProtectedRoute empleadoPage={<VisualizacionEmpleadoPage />}><VisualizacionPage /></ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
            <Route path="/instituciones" element={<ProtectedRoute isEmpleadoOnly={true}><InstitucionesPage /></ProtectedRoute>} />
            <Route path="/magos" element={<ProtectedRoute isEmpleadoOnly={true}><MagosPage /></ProtectedRoute>} />
            <Route path="/etiquetas" element={<ProtectedRoute isEmpleadoOnly={true}><EtiquetasPage /></ProtectedRoute>} />
            <Route path="/tipo_hechizo" element={<ProtectedRoute isEmpleadoOnly={true}><TipoHechizoPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
