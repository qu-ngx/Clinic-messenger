import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

router.get("/conversation", (req, res) => {
    res.send("Conversation route");
});

export default router;