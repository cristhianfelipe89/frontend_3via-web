import React, { useState } from "react";
import api from "../services/api";

function QuestionsImport() {
    const [file, setFile] = useState(null);

    const handleImport = async () => {
        if (!file) return alert("Selecciona un archivo JSON");

        const text = await file.text();
        try {
            const questions = JSON.parse(text);
            for (let q of questions) {
                await api.post("/questions", q);
            }
            alert("Preguntas importadas correctamente");
        } catch (err) {
            alert("Error en formato JSON");
        }
    };

    return (
        <div>
            <h3>📥 Importar Preguntas JSON</h3>
            <input type="file" accept=".json" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleImport}>Importar</button>
        </div>
    );
}

export default QuestionsImport;