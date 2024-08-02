import { Request, Response } from "express";
import prisma from "../db/prisma.js"
import bcryptjs from "bcryptjs";

export const signup = async (req:Request, res:Response) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({error: "Please correct all the fields"});
        }

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Please match the passwords"});
        }

        const user = await prisma.user.findUnique({where: { username }}); 

        if (user) {
            return res.status(400).json({ error: "Username already exists"});
        }

        // hashing the password
        const salt = await bcryptjs.genSalt(13); // Roll the encryption 13 times whoo whoo
        const hashedPassword = await bcryptjs.hash(password, salt); 

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;



    } catch (error) {

    }
};
export const login = async (req:Request, res:Response) => {};
export const logout = async (req:Request, res:Response) => {};