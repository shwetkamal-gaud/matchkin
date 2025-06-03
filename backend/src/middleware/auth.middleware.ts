import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access denied" })

    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            (req as any).user = decoded;
            next();
        } catch (err) {
            res.status(400).json({ message: "Invalid token" });
        }
    }

};
