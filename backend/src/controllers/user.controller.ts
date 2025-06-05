import { Request, Response } from 'express';
import { User } from '../models/user.model';


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const loggedinUserId = (req as any)?.user._id
        const allUsers = await User.find({ _id: { $ne: loggedinUserId } }).select("-password")
        res.status(200).json(allUsers)

    } catch (error) {
        console.error("Message error:", error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}