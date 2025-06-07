import { Schema, model, Document, Types } from 'mongoose';

export interface IConversation extends Document {
    name?: string,
    isGroup: boolean;
    participants: Types.ObjectId[];
    messages: Types.ObjectId[];
    createdBy?: Types.ObjectId;
}


const conversationSchema = new Schema<IConversation>({
    name: { type: String },
    isGroup: { type: Boolean, default: false },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const Conversation =  model<IConversation>("Conversation", conversationSchema);
