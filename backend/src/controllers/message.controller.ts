import { Request, Response } from "express";
import { Message } from "../models/message.model";
import { Conversation, IConversation } from "../models/conversation.model";
import { Types } from "mongoose";
import { getRecievedSocketId, io } from "../socket/socket";

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = (req as any)?.user._id
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages")
        if (!conversation) { res.status(200).json([]); return }
        const messages = conversation.messages
        res.status(200).json(messages)
    } catch (error) {
        console.error("Message error:", error);
        res.status(500).json({ error: 'Interval server error' })
    }

};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = (req as any)?.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(new Types.ObjectId(newMessage._id as string));
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId = getRecievedSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Message error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
