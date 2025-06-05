import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    gender: "male" | "female",
    profilePicture: string,
    role: 'client' | 'consultant'
}

const userSchema = new Schema<IUser>({
    name: String,
    email: { type: String, unique: true },
    password: String,
    gender: { type: String, enum: ["male", "female"] },
    profilePicture: { type: String, default: "" },
    role: { type: String, enum: ["client", "consultant"] },
}, { timestamps: true });

export const User = model<IUser>("User", userSchema);
