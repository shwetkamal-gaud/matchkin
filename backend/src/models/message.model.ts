import { Schema, model, Document, Types } from 'mongoose';

interface IMessage extends Document {
    senderId: Types.ObjectId;
    receiverId?: Types.ObjectId; 
    conversationId: Types.ObjectId;
    message: string;
    timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User" }, 
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export const Message = model<IMessage>("Message", messageSchema);
