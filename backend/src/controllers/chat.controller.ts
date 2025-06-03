import Message from '../models/message.model'
import { Request, Response } from "express";

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const messages = await Message.find({
        $or: [
            { sender: (req as any).user.id, recipient: userId },
            { sender: userId, recipient: (req as any).user.id },
        ],
    }).sort({ timestamp: 1 });
    res.json(messages);
};
