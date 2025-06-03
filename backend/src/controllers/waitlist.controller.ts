import Waitlist from "../models/waitlist.model";
import { Request, Response } from "express";

export const joinWaitlist = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone, role } = req.body;
    await Waitlist.create({ name, email, phone, role });
    res.json({ message: "Successfully joined waitlist" });
};
