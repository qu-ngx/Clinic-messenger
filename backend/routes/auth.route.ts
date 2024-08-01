import express from "express";

const router = express.Router();

// localhost:9000/api/auth/... (The ... are like below routes)

router.get("/login", (req, res) => {
    res.send("Logged in successfully");
});

router.get("/logout", (req, res) => {
    res.send("Logged out successfully");
});

router.get("/signup", (req, res) => {
    res.send("Signed up successfully");
});

export default router;