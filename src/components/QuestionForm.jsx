import React, { useState } from "react";
import api from "../services/api";

function QuestionForm() {
    const [statement, setStatement] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctIndex, setCorrectIndex] = useState(0);
    const [category, setCategory] = useState("General");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/questions", { statement, options, correctIndex, category });
        alert("Pregunta creada");
        setStatement("");
        setOptions(["", "", "", ""]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Agregar Pregunta</h3>
            <input
                type="text"
                placeholder="Enunciado"
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                required
            />
            {options.map((opt, i) => (
                <input
                    key={i}
                    type="text"
                    placeholder={`Opción ${i + 1}`}
                    value={opt}
                    onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[i] = e.target.value;
                        setOptions(newOptions);
                    }}
                    required
                />
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
            <button type="submit">Guardar</button>
        </form>
    );
}

export default QuestionForm;