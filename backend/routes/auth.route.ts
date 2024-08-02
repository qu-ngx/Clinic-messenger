import express from "express";

const router = express.Router();

import {login, logout, signup} from "../controllers/auth.controller.js"

// localhost:9000/api/auth/... (The ... are like below routes)

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);

export default router;