import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-powered-personalized-meal-3ey0.onrender.com/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("omnifood_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;