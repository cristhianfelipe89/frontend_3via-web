import React, { useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            {!isAuthenticated ? (
                <LoginPage onLogin={() => setIsAuthenticated(true)} />
            ) : (
                <DashboardPage />
            )}
        </div>
    );
}

export default App;