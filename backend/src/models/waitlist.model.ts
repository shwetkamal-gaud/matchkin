import { Schema, model, Document } from 'mongoose';

export interface IClient extends Document {
    accountType: string;
    companyName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    industry: string;
    size: string;
    projectType?: string;
    description?: string;
    budgetMin?: string;
    budgetMax?: string;
    timeline?: string;
    howHeard?: string;
    additionalInfo?: string;
    createdAt: Date;
    role: string
}

const clientSchema = new Schema<IClient>(
    {
        accountType: { type: String, required: true },
        companyName: String,
        firstName: String,
        lastName: String,
        email: { type: String, required: true },
        phone: String,
        industry: { type: String, required: true },
        size: { type: String },
        projectType: String,
        description: String,
        budgetMin: String,
        budgetMax: String,
        timeline: String,
        howHeard: String,
        additionalInfo: String,
        role: String
    },
    { timestamps: true }
);

export const Client = model<IClient>('Client', clientSchema);
