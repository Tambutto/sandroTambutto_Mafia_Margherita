import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
// import '.././src/styles/index.css'; // Asegúrate de tener este archivo CSS para estilos personalizados

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
