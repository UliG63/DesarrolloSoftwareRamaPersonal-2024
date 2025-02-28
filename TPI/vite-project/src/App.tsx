import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContextProvider, AuthContext } from './context/authContext';

// Carga diferida de las páginas
const LoginPage = lazy(() => import('./pages/login'));
const HechizosPage = lazy(() => import('./pages/hechizos'));
const HechizosEmpleadoPage = lazy(() => import('./pages/hechizosEmpleado'));
const PatentesPage = lazy(() => import('./pages/patentes'));
const PatentesEmpleadoPage = lazy(() => import('./pages/patentesEmpleado'));
const VisualizacionPage = lazy(() => import('./pages/visualizacion'));
const VisualizacionEmpleadoPage = lazy(() => import('./pages/visualizacionEmpleado'));
const InicioPage = lazy(() => import('./pages/inicio'));
const UserPage = lazy(() => import('./pages/user'));
const MagosPage = lazy(() => import('./pages/magos'));
const InstitucionesPage = lazy(() => import('./pages/instituciones'));
const EtiquetasPage = lazy(() => import('./pages/etiquetas'));
const TipoHechizoPage = lazy(() => import('./pages/tipoHechizo'));
const MagosEmpleado = lazy(() => import('./pages/magosEmpleado'));

// Verifica la autenticación y selecciona la página según el rol
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
  // Lógica para asegurarme de que los estilos se carguen antes del renderizado
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
    return <div className="loading-screen">Cargando...</div>; // Loader mientras los estilos se cargan
  }

  return (
    <AuthContextProvider>
      <Router>
        <Suspense fallback={<div className="loading-screen">Cargando página...</div>}>
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
        </Suspense>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
