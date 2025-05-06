import React, { useEffect, useState } from 'react';

const PanelDetalle = () => {
    const [lastUser, setLastUser] = useState(null);
    const [lastProduct, setLastProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);

        // Obtener el último usuario
        fetch('http://localhost:4000/api/users')
            .then(res => res.json())
            .then(data => {
                const users = data.data || [];
                setLastUser(users.length ? users[0] : null);
            })
            .catch(error => console.error("Error al obtener usuario:", error));

        // Obtener el último producto
        fetch('http://localhost:4000/api/products')
            .then(res => res.json())
            .then(data => {
                console.log("Productos recibidos:", data.products); // Depuración
                setLastProduct(data.products?.length ? data.products[0] : null);
            })
            .catch(error => console.error("Error al obtener producto:", error));

        // Obtener categorías
        fetch('http://localhost:4000/api/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data.data || []);
            })
            .catch(error => console.error("Error al obtener categorías:", error))
            .finally(() => setLoading(false)); 

    }, []);

    console.log("Categoría del último producto:", lastProduct?.category);

    const lastProductCategory = lastProduct?.category 
        ? (typeof lastProduct.category === "object" ? lastProduct.category.name : lastProduct.category) 
        : "Sin categoría";

    return (
        <div>
            <div>
                <h3>Último Usuario Creado</h3>
                {loading ? (
                    <p>Cargando...</p>
                ) : lastUser ? (
                    <div>
                        <p><strong>Nombre:</strong> {lastUser.firstName}</p>
                        <p><strong>Email:</strong> {lastUser.email}</p>
                        <img src={lastUser.image} alt={lastUser.name} width="100" />
                    </div>
                ) : (
                    <p>No hay usuarios disponibles.</p>
                )}
            </div>
    
            <div>
                <h3>Último Producto Creado</h3>
                {loading ? (
                    <p>Cargando...</p>
                ) : lastProduct ? (
                    <div>
                        <p><strong>Nombre:</strong> {lastProduct.name}</p>
                        <p><strong>Categoría:</strong> {lastProductCategory}</p>
                    </div>
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>

            {/* Nueva sección: Productos por Categoría */}
            <div>
                <h3>Productos por Categoría</h3>
                {categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category.id}>
                            <h4>{category.name}</h4>
                            <ul>
                                {lastProduct && lastProductCategory.toLowerCase() === category.name.toLowerCase() ? (
                                    <li key={lastProduct.id}>
                                        <strong>{lastProduct.name}</strong> - {lastProduct.description}
                                    </li>
                                ) : (
                                    <p>No hay productos en esta categoría.</p>
                                )}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No hay categorías disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default PanelDetalle;

