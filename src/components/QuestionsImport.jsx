import React, { useState } from "react";
import api from "../services/api";
import "./QuestionsImport.css";

function QuestionsImport({ onImported }) {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus("");
    };

    const handleImport = async () => {
        if (!file) {
            setStatus("Selecciona un archivo primero");
            return;
        }
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            await api.post("/questions/bulk", data);
            setStatus("Preguntas importadas correctamente ✅");
            setFile(null);
            if (onImported) onImported();
        } catch (err) {
            console.error(err);
            setStatus("Error al importar archivo ❌");
        }
    };

    return (
        <div className="questions-import">
            <h3>📥 Importar preguntas (JSON)</h3>
            <input type="file" accept=".json" onChange={handleFileChange} />
            <button onClick={handleImport}>Importar</button>
            {status && <p>{status}</p>}
        </div>
    );
}

export default QuestionsImport;
