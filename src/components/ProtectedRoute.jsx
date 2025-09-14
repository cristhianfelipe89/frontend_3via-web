import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
    if (!user) return <Navigate to="/login" />;
    if (user.role !== "admin") return <h2>No autorizado</h2>;

    return children;
}

export default ProtectedRoute;