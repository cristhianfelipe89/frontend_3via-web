import React, { useEffect, useState } from "react";
import api from "../services/api";

function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await api.get("/users");
        setUsers(res.data);
    };

    return (
        <div>
            <h2>👥 Gestión de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Fecha Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;