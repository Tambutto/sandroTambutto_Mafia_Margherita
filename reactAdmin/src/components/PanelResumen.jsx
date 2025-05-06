import React, { useEffect, useState } from 'react';

const PanelResumen = () => {
    const [total, setTotal] = useState({ users: 0, products: 0, categories: 0 });

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:4000/api/users').then(res => res.json()),
            fetch('http://localhost:4000/api/products', { cache: 'no-store' }).then(res => res.json()),
            fetch('http://localhost:4000/api/categories').then(res => res.json())
        ])
        .then(([usersData, productsData, categoriesData]) => {
            setTotal(prev => ({
                ...prev,
                users: usersData.count || 0,
                products: productsData.meta?.total || 0,
                categories: categoriesData.meta?.total || 0 // Asegura que `categoriesData.meta.total` existe
            }));
        })
        .catch(error => console.error("Error al obtener datos:", error));
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
                <h3>Total Usuarios</h3>
                <p>{total.users}</p>
            </div>
            <div>
                <h3>Total Productos</h3>
                <p>{total.products}</p>
            </div>
            <div>
                <h3>Total Categorías</h3>
                <p>{total.categories}</p>
            </div>
        </div>
    );
};

export default PanelResumen;
