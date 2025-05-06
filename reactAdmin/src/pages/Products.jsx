import React, { useEffect, useState } from 'react';

const Products = () => {
    // Estado para almacenar los productos obtenidos de la API
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Efecto para hacer la solicitud a la API cuando el componente se monta
    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:4000/api/products') // Asegúrate de que esta URL es correcta
            .then(res => res.json()) // Convierte la respuesta en JSON
            .then(data => {
                console.log("Productos recibidos:", data.products); // Depuración en consola
                setProducts(data.products || []); // Asegura que `products` siempre sea un array válido
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
                setProducts([]); // En caso de error, asigna un array vacío para evitar fallos
            })
            .finally(() => setLoading(false)); // Desactiva el estado de carga después de la solicitud
    }, []);

    // Ordenar los productos desde el más antiguo hasta el más reciente
    const sortedProducts = [...products].reverse(); // Invierte el array si la API los devuelve en orden descendente

    return (
        <div>
            {/* Encabezado de la sección de productos */}
            <h1>Lista de Productos</h1>

            {/* Muestra un mensaje mientras la API carga los datos */}
            {loading ? (
                <p>Cargando productos...</p>
            ) : sortedProducts.length > 0 ? (
                // Muestra la lista de productos si hay datos disponibles
                <ul>
                    {sortedProducts.map(product => (
                        <li key={product.id}>
                            <strong>{product.name}</strong> 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos disponibles.</p>
            )}

            {/* Sección que muestra el total de productos obtenidos */}
            <h2>Total Productos: {sortedProducts.length}</h2>
        </div>
    );
};

// Exporta el componente para su uso en otras partes de la aplicación
export default Products;

