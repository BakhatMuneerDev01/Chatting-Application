// Importing necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Importing custom modules for database connection and socket setup
import { connectDB } from "./lib/db.js";
import { app, server, io } from "../src/lib/socket.js";

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to enable CORS with specific origin and credentials
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Define the port from environment variables
const PORT = process.env.PORT;

// Resolve the directory name
const __dirname = path.resolve();

// Importing route handlers
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Use authentication routes
app.use("/api/auth", authRoutes);

// Use message routes
app.use("/api/messages", messageRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Serve the frontend application for any other route
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    // Connect to the database
    connectDB();
});