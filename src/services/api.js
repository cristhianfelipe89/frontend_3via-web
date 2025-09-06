import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // ajustar con tu backend en producción
});

export default api;