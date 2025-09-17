import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./Dashboard.css";
import UsersTable from "./UsersTable";
import QuestionsTable from "./QuestionsTable";
import Podium from "./Podium"; // 👈 nuestro componente para top ganadores

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

function Dashboard({ user, onLogout }) {
    const [section, setSection] = useState("stats");
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (section === "stats") loadStats();
    }, [section]);

    const loadStats = async () => {
        try {
            const res = await api.get("/stats/overview");
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Panel Administrativo</h1>
                <p>Bienvenido {user?.name}</p>
                <button onClick={onLogout}>Cerrar sesión</button>
            </header>

            <nav>
                <button onClick={() => setSection("stats")}>📊 Estadísticas</button>
                <button onClick={() => setSection("users")}>👥 Usuarios</button>
                <button onClick={() => setSection("questions")}>❓ Preguntas</button>
            </nav>

            <main>
                {section === "stats" && stats && (
                    <div>
                        <h2>📊 Estadísticas globales</h2>
                        <p>Total de partidas jugadas: {stats.played}</p>

                        <h3>🏆 Top ganadores</h3>
                        {/* Podium para top5 */}
                        <Podium />

                        <h3>📚 Categorías más acertadas</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={stats.categories}
                                dataKey="hits"
                                nameKey="_id"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#82ca9d"
                                label
                            >
                                {stats.categories.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            [
                                                "#0088FE",
                                                "#00C49F",
                                                "#FFBB28",
                                                "#FF8042",
                                                "#AA66CC"
                                            ][index % 5]
                                        }
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                )}

                {section === "users" && <UsersTable />}
                {section === "questions" && <QuestionsTable />}
            </main>
        </div>
    );
}

export default Dashboard;