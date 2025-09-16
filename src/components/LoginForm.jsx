import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./LoginWeb.css";

function LoginForm({ onLogin }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { emailOrUsername, password });
      if (res.data.user.role !== "admin") {
        alert("Acceso denegado, solo administradores");
        return;
      }
      const { token, user } = res.data;
      onLogin({ ...user, token });
      navigate("/dashboard"); // 👈 redirige después de login
    } catch (err) {
      alert("Error en credenciales");
    }
  };

  return (
    <div className="card">
      <h2>Login Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email o Usuario"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default LoginForm;
