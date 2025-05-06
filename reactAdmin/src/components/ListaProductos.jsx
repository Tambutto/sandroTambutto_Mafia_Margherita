import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

const ListaProductos = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llamada a la API para obtener los productos
        fetch('http://localhost:4000/api/products', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                setProducts(data.data || []); // Actualiza la lista de productos
                setLoading(false); // Marca como cargado
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                setLoading(false); // Marca como cargado aunque haya error
            });
    }, []);

    return (
        <div>
            <h3>Listado de Productos</h3>
            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <strong>Nombre:</strong> {product.name} <br />
                            <strong>Descripción:</strong> {product.description} <br />
                            <Link to={`/products/${product.id}`}>Ver detalles</Link></li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaProductos;
