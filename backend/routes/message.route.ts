import express from "express";

const router = express.Router();

router.get("/conversation", (req, res) => {
    res.send("Logged in successfully");
});

export default router;
