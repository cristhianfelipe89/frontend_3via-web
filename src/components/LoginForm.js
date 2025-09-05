import React, { useState } from "react";
import API from "../services/api";

export default function LoginForm({ onLogin }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            onLogin();
        } catch {
            setError("Credenciales inválidas");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <input type="email" placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Entrar</button>
            {error && <p>{error}</p>}
        </form>
    );
}