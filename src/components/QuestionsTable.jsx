import React, { useEffect, useState } from "react";
import api from "../services/api";
import QuestionsImport from "./QuestionsImport";
import "./QuestionsTable.css";

function QuestionsTable() {
    const [questions, setQuestions] = useState([]);
    const [newQ, setNewQ] = useState({
        statement: "",
        category: "",
        options: "",
        correctIndex: 0
    });

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const res = await api.get("/questions");
            setQuestions(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteQuestion = async (id) => {
        await api.delete(`/questions/${id}`);
        loadQuestions();
    };

    const createQuestion = async (e) => {
        e.preventDefault();
        const payload = {
            statement: newQ.statement,
            category: newQ.category,
            options: newQ.options
                .split("|")
                .map((s) => s.trim())
                .filter(Boolean),
            correctIndex: Number(newQ.correctIndex)
        };
        await api.post("/questions", payload);
        setNewQ({ statement: "", category: "", options: "", correctIndex: 0 });
        loadQuestions();
    };

    return (
        <div className="questions-container">
            <h2>❓ Preguntas</h2>

            {/* Importador JSON */}
            <QuestionsImport onImported={loadQuestions} />

            {/* Formulario para nueva pregunta */}
            <form className="questions-form" onSubmit={createQuestion}>
                <input
                    placeholder="Enunciado"
                    value={newQ.statement}
                    onChange={(e) =>
                        setNewQ({ ...newQ, statement: e.target.value })
                    }
                    required
                />
                <input
                    placeholder="Categoría"
                    value={newQ.category}
                    onChange={(e) =>
                        setNewQ({ ...newQ, category: e.target.value })
                    }
                    required
                />
                <input
                    placeholder="Opciones separadas por |"
                    value={newQ.options}
                    onChange={(e) =>
                        setNewQ({ ...newQ, options: e.target.value })
                    }
                    required
                />
                <input
                    type="number"
                    min="0"
                    placeholder="Índice correcto"
                    value={newQ.correctIndex}
                    onChange={(e) =>
                        setNewQ({ ...newQ, correctIndex: e.target.value })
                    }
                    required
                />
                <button type="submit">Crear</button>
            </form>

            {/* Tabla de preguntas */}
            <div className="questions-table-wrapper">
                <table className="questions-table">
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Categoría</th>
                            <th>Índice correcto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q) => (
                            <tr key={q._id}>
                                <td>{q.statement}</td>
                                <td>{q.category}</td>
                                <td>{q.correctIndex}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteQuestion(q._id)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QuestionsTable;