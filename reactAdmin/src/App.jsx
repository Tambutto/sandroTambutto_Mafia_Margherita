import { Routes, Route } from 'react-router-dom';
import NavBar from '../src/components/NavBar';
import Users from '../src/pages/Users';
import Products from '../src/pages/Products';
import Dashboard from '../src/pages/Dashboard';
import logo from '../src/assets/logo.webp';
import ProductDetail from '../src/pages/ProductDetail';
import '../src/styles/App.css'; // Asegúrate de tener este archivo CSS para estilos personalizados

function App() {
  return (
    <>
      <div className='app'>
          
          <header >
              <img src={logo} alt="Logo" className='logo' />
          <NavBar />
          </header>

          {/* Contenido y navbar */}
          <main>
              <Routes>
                  <Route path="/" element={<Dashboard className="dashboard"/>} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
              </Routes>
          </main>
          
      </div>
      
      </>
  );
}

export default App
