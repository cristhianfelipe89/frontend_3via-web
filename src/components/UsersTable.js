import React from "react";

export default function UsersTable({ users }) {
    return (
        <div>
            <h2>Usuarios</h2>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Fecha de creación</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
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