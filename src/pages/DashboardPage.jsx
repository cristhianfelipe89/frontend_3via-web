import React from "react";
import Dashboard from "../components/Dashboard.jsx";
import UsersTable from "../components/UsersTable.jsx";

function DashboardPage() {
    return (
        <div style={{ padding: "20px" }}>
            <Dashboard />
            <UsersTable />
        </div>
    );
}

export default DashboardPage;