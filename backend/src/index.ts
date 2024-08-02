import express from "express";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();

// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
    
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});