import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./Podium.css";

function Podium() {
    const [winners, setWinners] = useState([]);
    const [view, setView] = useState("podium");

    useEffect(() => {
        loadTop5();
    }, []);

    const loadTop5 = async () => {
        try {
            const res = await api.get("/stats/top5");
            setWinners(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!winners.length) return <div className="podium-loading">Cargando...</div>;

    return (
        <div className="podium-container">
            <div className="podium-header">
                <h2>🏆 Top Ganadores</h2>
                <button onClick={() => setView(view === "podium" ? "table" : "podium")}>
                    {view === "podium" ? "Ver tabla" : "Ver podio"}
                </button>
            </div>

            {view === "podium" ? (
                <div className="podium-view">
                    <div className="podium-first">
                        🥇 {winners[0]?.name} ({winners[0]?.wins})
                    </div>
                    <div className="podium-others">
                        {winners.slice(1, 3).map((w, idx) => (
                            <div key={idx} className="podium-place">
                                {idx === 0 ? "🥈" : "🥉"} {w.name} ({w.wins})
                            </div>
                        ))}
                    </div>
                    {winners.slice(3).length > 0 && (
                        <div className="podium-rest">
                            {winners.slice(3).map((w, idx) => (
                                <div key={idx} className="podium-rest-item">
                                    {idx + 4}° {w.name} ({w.wins})
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <table className="podium-table">
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Jugador</th>
                            <th>Victorias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winners.map((w, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{w.name}</td>
                                <td>{w.wins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Podium;