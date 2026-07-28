require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");

const app = express();

connectDB();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://ai-powered-personalized-meal-3ey0.onrender.com"
        ],
        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Omnifood AI Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: `Route not found: ${req.originalUrl}`,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});