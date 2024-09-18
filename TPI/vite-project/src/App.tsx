import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import HechizosPage from './pages/hechizos';
import PatentesPage from './pages/patentes';
import VisualizacionPage from './pages/visualizacion';
import InicioPage from './pages/inicio';
import UserPage from './pages/user';

//Temporalmente puse que el default fuera el inicio, mi idea era que sea el login y que el login te redirija al inicio
//Cambiar en el futuro ^

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hechizos" element={<HechizosPage />} />
          <Route path="/patentes" element={<PatentesPage />} />
          <Route path="/visualizacion" element={<VisualizacionPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;