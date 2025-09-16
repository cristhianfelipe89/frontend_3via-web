import React, { useEffect, useState } from "react";
import api from "../services/api";

function QuestionsTable() {
    const [questions, setQuestions] = useState([]);
    const [newQ, setNewQ] = useState({ statement: "", category: "", options: "", correctIndex: 0 });

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        const res = await api.get("/questions");
        setQuestions(res.data);
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
            options: newQ.options.split("|").map(s => s.trim()).filter(Boolean),
            correctIndex: Number(newQ.correctIndex)
        };
        await api.post("/questions", payload);
        setNewQ({ statement: "", category: "", options: "", correctIndex: 0 });
        loadQuestions();
    };

    return (
        <div>
            <h2>❓ Preguntas</h2>
            <form onSubmit={createQuestion} style={{ marginBottom: 16 }}>
                <input placeholder="Enunciado" value={newQ.statement} onChange={e => setNewQ({ ...newQ, statement: e.target.value })} required />
                <input placeholder="Categoría" value={newQ.category} onChange={e => setNewQ({ ...newQ, category: e.target.value })} required />
                <input placeholder="Opciones separadas por |" value={newQ.options} onChange={e => setNewQ({ ...newQ, options: e.target.value })} required />
                <input type="number" min="0" placeholder="Índice correcto" value={newQ.correctIndex} onChange={e => setNewQ({ ...newQ, correctIndex: e.target.value })} required />
                <button type="submit">Crear</button>
            </form>
            <ul>
                {questions.map((q) => (
                    <li key={q._id}>
                        {q.statement} ({q.category})
                        <button onClick={() => deleteQuestion(q._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionsTable;