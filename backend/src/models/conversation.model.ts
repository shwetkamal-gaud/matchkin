import { Schema, model, Document, Types } from 'mongoose';

interface IConverstion extends Document {
    participants: Schema.Types.ObjectId[],
    messages: Types.ObjectId[],
}


const conversationSchema = new Schema<IConverstion>({
    participants: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    messages: [{ type: Types.ObjectId, ref: "Message" }],
}, { timestamps: true });

export const Conversation =  model<IConverstion>("Conversation", conversationSchema);
