import React, { useEffect, useState } from "react";
import api from "../services/api";

function QuestionsTable() {
    const [questions, setQuestions] = useState([]);

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

    return (
        <div>
            <h2>❓ Preguntas</h2>
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