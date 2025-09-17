import React, { useState } from "react";
import api from "../services/api";
import "./QuestionForm.css";

const QuestionForm = ({ onCreated }) => {
    const [statement, setStatement] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctIndex, setCorrectIndex] = useState(0);
    const [category, setCategory] = useState("General");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/questions", { statement, options, correctIndex, category });
            setStatus("Pregunta creada ✅");
            setStatement("");
            setOptions(["", "", "", ""]);
            setCorrectIndex(0);
            setCategory("General");
            if (onCreated) onCreated(); // refrescar tabla
        } catch (err) {
            console.error(err);
            setStatus("Error al crear pregunta ❌");
        }
    };

    return (
        <div className="question-form-container">
            <h2>➕ Nueva Pregunta</h2>
            <form onSubmit={handleSubmit} className="question-form">
                <label>
                    Enunciado:
                    <input
                        type="text"
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        required
                    />
                </label>

                {options.map((opt, i) => (
                    <label key={i}>
                        Opción {i + 1}:
                        <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[i] = e.target.value;
                                setOptions(newOptions);
                            }}
                            required
                        />
                    </label>
                ))}

                <label>
                    Respuesta correcta:
                    <select value={correctIndex} onChange={(e) => setCorrectIndex(Number(e.target.value))}>
                        {options.map((_, i) => (
                            <option key={i} value={i}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Categoría:
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </label>

                <button type="submit" className="submit-button">Guardar</button>
            </form>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
};

export default QuestionForm;