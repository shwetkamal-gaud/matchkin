import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";

export const authenticate = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
       const token = req.cookies?.jwt 
        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided" })
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded || !decoded.userId){
            res.status(401).json({ message: "Unauthorized: Invalid Token" })
            return;
        }
        const user = await User.findById(decoded?.userId).select("-password");
        if (!user) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
          }
        (req as any).user = user;
        next()
    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({ error: 'Interval Hello error' })
    }
};
