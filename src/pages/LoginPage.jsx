import React from "react";
import LoginForm from "../components/LoginForm.jsx";

function LoginPage({ onLogin }) {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <LoginForm onLogin={onLogin} />
        </div>
    );
}

export default LoginPage;