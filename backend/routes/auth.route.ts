import express from "express";
// import bodyParser from 'body-parser';

const router = express.Router();

import {login, logout, signup} from "../controllers/auth.controller.js"

// localhost:9000/api/auth/... (The ... are like below routes)

router.use(express.json());
router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);

export default router;