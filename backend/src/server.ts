import express from "express";
import http from "http";
import cors from "cors";
import * as  dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import waitlistRoutes from "./routes/waitlist.routes";
import chatRoutes from "./routes/chat.routes";
import Message from "./models/message.model";

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", waitlistRoutes);
app.use("/api/chat", chatRoutes);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async ({ sender, recipient, content }) => {
        const msg = await Message.create({ sender, recipient, content });
        socket.broadcast.emit("receiveMessage", msg);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
