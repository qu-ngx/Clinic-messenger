import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
            };
        }
   }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the tokens from the cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({error: "Unauthorized - No token provided"});
        }

        // Verify the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded) {
            return res.status(401).json({error: "Unauthorized - Invalid Token"});
        }

        // Find the user in the db with the token verified
        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: {id: true, username: true, fullname: true, profilePic: true}});

        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        req.user = user;

        next();
        
    } catch (error) {
        
    }
}

export default protectRoute;