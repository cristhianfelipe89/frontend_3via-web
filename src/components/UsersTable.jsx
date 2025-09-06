import React, { useEffect, useState } from "react";
import api from "../services/api";

function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                setUsers(res.data);
            } catch (err) {
                console.error("Error al cargar usuarios", err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h3>Usuarios registrados</h3>
            <table border="1" cellPadding="10" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;