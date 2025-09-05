import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function DashboardPage() {
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resStats = await API.get("/admin/stats");
            const resUsers = await API.get("/admin/users");
            setStats(resStats.data);
            setUsers(resUsers.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Partidas jugadas: {stats.gamesPlayed}</p>
            <p>Ganadores: {stats.winners}</p>
            <h2>Usuarios</h2>
            <ul>
                {users.map((u) => (
                    <li key={u._id}>{u.email} - {u.role}</li>
                ))}
            </ul>
        </div>
    );
}