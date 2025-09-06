import React, { useState } from "react";
import api from "../services/api";

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });
            if (res.data) {
                onLogin(res.data);
            }
        } catch (err) {
            alert("Credenciales inválidas");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
            <h2>Login Admin</h2>
            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Entrar</button>
        </form>
    );
}

export default LoginForm;