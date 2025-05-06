import React from 'react';
import PanelResumen from '../components/PanelResumen';
import PanelDetalle from '../components/PanelDetalle';
import PanelCategorias from '../components/PanelCategorias';
import '../styles/dashboard.css'; // Asegúrate de tener este archivo CSS para estilos personalizados
import ListaProductos from '../components/ListaProductos';

const Dashboard = () => {
    return (
        
        <div>
            <h1 className='title'>Bienvenido a la aplicación de administración</h1>
          
            <PanelResumen />
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                
            <PanelDetalle type="user" />
            <PanelCategorias />
            <ListaProductos />
            </div>
        </div>
    );
};

export default Dashboard;
