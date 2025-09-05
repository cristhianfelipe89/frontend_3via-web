import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
    const [logged, setLogged] = useState(!!localStorage.getItem("token"));

    return logged ? <DashboardPage /> : <LoginPage onLogin={() => setLogged(true)} />;
}