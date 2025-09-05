import React from "react";

export default function Dashboard({ stats }) {
    return (
        <div>
            <h2>Estadísticas</h2>
            <ul>
                <li>Partidas jugadas: {stats?.gamesPlayed || 0}</li>
                <li>Ganadores registrados: {stats?.winners || 0}</li>
                <li>Usuarios totales: {stats?.totalUsers || 0}</li>
            </ul>
        </div>
    );
}