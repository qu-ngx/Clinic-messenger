import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { server, app } from "./socket/socket.js";
dotenv.config();
const PORT = process.env.PORT || 9001;
const __dirname = path.resolve();
app.use(cookieParser()); // Parsing cookies 
app.use(express.json()); // Parsing raw body / request into Json
// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// frontend => localhost:5137
// backend => localhost:9000
// all => localhost:9000
if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}
server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
