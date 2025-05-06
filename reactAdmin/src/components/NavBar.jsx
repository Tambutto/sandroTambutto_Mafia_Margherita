import { Link } from 'react-router-dom';
import '../styles/navbar.css';


const NavBar = () => {
    return (
        
        <aside >
            
            <h2 className="navbar">Menú</h2>
            <ul>
                <li><Link to="/" className="navbar-list">Dashboard</Link></li>
                <li><Link to="/users" className="navbar-list">Usuarios</Link></li>
                <li><Link to="/products" className="navbar-list">Productos</Link></li>
            </ul>
        </aside>
    );
};

export default NavBar;
