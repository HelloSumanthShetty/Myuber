import user from "../model/user.model"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import blacklistToken from "../model/blacklistToken.model"
dotenv.config()


const jwtcode = process.env.JWT || ""

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({ success: false, error: "Access denied. No token provided." })
        }
        const blacklisted = await blacklistToken.findOne({ token })
        if (blacklisted) {
            return res.status(401).json({ success: false, error: "Not authorized Invalid token." })
        }   
        const decoded: any = jwt.verify(token, jwtcode)
        const userId = decoded._id
        const findUser = await user.findById(userId)
        if (!findUser) {
            return res.status(401).json({ success: false, error: "Invalid token." })
        }
        (req as any).userId = userId
        next()
    } catch (error) {
        return res.status(401).json({ success: false, error: "Invalid token." })
    }
}