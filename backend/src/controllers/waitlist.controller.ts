// src/controllers/onboardingController.ts
import { Request, Response } from 'express';
import { Client } from '../models/waitlist.model';

export const submitClientOnboarding = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        if (!data.email || !data.industry || !data.size) {
            res.status(400).json({ message: 'Missing required fields.' });
            return;
        }

        const newClient = new Client(data);
        await newClient.save();
        res.status(201).json({ message: 'Client onboarded successfully.' });
     
    } catch (err) {
        console.error('Onboarding error:', err);
        res.status(500).json({ message: 'Server error while onboarding client.' })
    }
};
