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

    const toggleRole = async (id, currentRole) => {
        const newRole = currentRole === "admin" ? "player" : "admin";
        await api.patch(`/users/${id}`, { role: newRole });
        loadUsers();
    };

    return (
        <div>
            <h2>👥 Gestión de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <button onClick={() => toggleRole(u._id, u.role)}>
                                    Cambiar Rol
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;