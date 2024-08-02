import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser()); // Parsing cookies 
app.use(express.json()); // Parsing raw body / request into Json

// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
    
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});