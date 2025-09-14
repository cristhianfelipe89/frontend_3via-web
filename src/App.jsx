import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (loggedUser) => {
        setUser(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", loggedUser.token);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginForm onLogin={handleLogin} />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute user={user}>
                            <Dashboard user={user} onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;