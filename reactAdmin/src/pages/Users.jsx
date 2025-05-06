import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/users') // Ajusta la URL según tu API
            .then(res => res.json())
            .then(data => {
                console.log("Usuarios recibidos:", data.data); // Depuración
                setUsers(data.data || []);
            })
            .catch(error => console.error("Error al obtener usuarios:", error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div>
                <h1>Lista de Usuarios</h1>
                
                {loading ? (
                    <p>Cargando usuarios...</p>
                ) : users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <strong>{user.firstName} {user.lastName}</strong> - {user.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay usuarios disponibles.</p>
                )}
            </div>
            <h2>Total Usuarios: {users.length}</h2>
        </>
    );
};

export default Users;

