import React, { useEffect, useState } from 'react';

const PanelCategorias = () => {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/api/categories')
            .then(res => {
                if (!res.ok) throw new Error(`Error en la API: ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log("Datos recibidos:", data); // Depuración
                setCategories(data.countByCategory || {}); // Asegura que sea un objeto válido
            })
            .catch(error => console.error("Error al obtener categorías:", error));
    }, []);

    return (
        <div>
            <h3>Productos por Categoría</h3>
            {Object.keys(categories).length > 0 ? (
                <ul>
                    {Object.entries(categories).map(([category, count]) => (
                        <li key={category}>{category}: {count}</li>
                    ))}
                </ul>
            ) : (
                <p>No hay categorías disponibles.</p>
            )}
        </div>
    );
};

export default PanelCategorias;
