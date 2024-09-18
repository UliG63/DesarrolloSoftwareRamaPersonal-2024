import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HechizosContextProvider from '../src/context/hechizosContext'
import './index.css';  

//Elemento con el id 'root' en el DOM
const rootElement = document.getElementById('root');

//Crea el renderizado root de React
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
    <HechizosContextProvider>
      <App />
    </HechizosContextProvider> 
    </React.StrictMode>
  );
}
