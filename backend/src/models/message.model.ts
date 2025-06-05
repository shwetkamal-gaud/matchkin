import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document{
    senderId: Schema.Types.ObjectId,
    receiverId: Schema.Types.ObjectId,
    message: string,
    timestamp: Date
}

const messageSchema = new Schema<IMessage>({
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
    timestamp: { type: Date, default: Date.now },
}, {timestamps: true});

export const Message =  model<IMessage>("Message", messageSchema);
