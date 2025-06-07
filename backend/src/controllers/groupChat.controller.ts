import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model";

export const createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, participantIds } = req.body;
        const creatorId = (req as any).user._id;

        if (!participantIds || participantIds.length < 2) {
            res.status(400).json({ message: "At least two participants required" });
            return
        }

        const conversation = await Conversation.create({
            name,
            isGroup: true,
            participants: [...participantIds, creatorId],
            createdBy: creatorId,
        });

        res.status(201).json(conversation);
    } catch (err) {
        res.status(500).json({ error: "Failed to create group" });
    }
};

export const addUserToGroup = async (req: Request, res: Response) => {
    const { conversationId, userIdToAdd } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.isGroup) {
        res.status(404).json({ message: "Group not found" });
        return;
    }

    if (!conversation.participants.includes(userIdToAdd)) {
        conversation.participants.push(userIdToAdd);
        await conversation.save();
    }

    res.json({ message: "User added", conversation });
};

export const removeUserFromGroup = async (req: Request, res: Response) => {
    const { conversationId, userIdToRemove } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.isGroup) {
        res.status(404).json({ message: "Group not found" });
        return
    }

    conversation.participants = conversation.participants.filter(
        (id) => id.toString() !== userIdToRemove
    );

    await conversation.save();
    res.json({ message: "User removed", conversation });
};
  
  