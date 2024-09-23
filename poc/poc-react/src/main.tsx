import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CarrerasContextProvider from './context/carrerasContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <CarrerasContextProvider>
  <App />
  </CarrerasContextProvider>
  </StrictMode>,
)
