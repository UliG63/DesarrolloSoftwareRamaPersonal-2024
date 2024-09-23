import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InicioPage from './pages/inicio';
import NovedadesPage from './pages/novedades';
import InformacionPage from './pages/informacion';
import CarrerasTipo from './pages/carrerasTipo';
import CarrerasContextProvider from './context/carrerasContext';

const App: React.FC = () => {
  return (
    <CarrerasContextProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/diplomaturas" element={<CarrerasTipo tipo='Diplomatura'/>} />
            <Route path="/especializaciones" element={<CarrerasTipo tipo='Especialización'/>} />
            <Route path="/ingenierias" element={<CarrerasTipo tipo='Ingeniería'/>} />
            <Route path="/licenciaturas" element={<CarrerasTipo tipo='Licenciatura'/>} />
            <Route path="/maestrias" element={<CarrerasTipo tipo='Maestría'/>} />
            <Route path="/tecnicaturas" element={<CarrerasTipo tipo='Tecnicatura'/>} />
            <Route path="/novedades" element={<NovedadesPage />} />
            <Route path="/informacion" element={<InformacionPage />} />
          </Routes>
        </div>
      </Router>
    </CarrerasContextProvider>
  );
};

export default App;