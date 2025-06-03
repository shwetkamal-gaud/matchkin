import mongoose from "mongoose";

const WaitlistSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["client", "consultant"], required: true },
    name: String,
    phone: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Waitlist", WaitlistSchema);
