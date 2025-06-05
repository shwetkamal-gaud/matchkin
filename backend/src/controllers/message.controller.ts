import { Request, Response } from "express";
import { Message } from "../models/message.model";
import { Conversation } from "../models/conversation.model";
import mongoose, { Schema } from "mongoose";

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = (req as any)?.user._id
        console.log(senderId, userToChatId)
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, userToChatId]},
        }).populate("messages")

        res.status(200).json(conversation?.messages)
    } catch (error) {
        console.error("Message error:", error);
        res.status(500).json({ error: 'Interval server error' })
    }
    
};

export const sendMessage = async (req: Request, res: Response): Promise<void> =>{
    try {
        const {message} = req.body
        const {id: receiverId} = req.params
        const senderId = (req as any)?.user._id
        
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
          });

        if(newMessage && conversation){
            conversation.messages.push(new mongoose.Types.ObjectId(newMessage._id as string))
            await conversation.save();
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Message error:", error);
        res.status(500).json({ error: 'Interval server error' })
    }
}