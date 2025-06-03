import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Message", MessageSchema);
