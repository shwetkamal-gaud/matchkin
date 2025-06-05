import express from "express";
import http from "http";
import cors from "cors";
import * as  dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import waitlistRoutes from "./routes/waitlist.routes";
import chatRoutes from "./routes/message.routes";
import userRoutes from './routes/user.routes'
import cookieParser from "cookie-parser";


connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", waitlistRoutes);
app.use("/api/messages", chatRoutes);
app.use("/api/users", userRoutes);

// io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     socket.on("sendMessage", async ({ sender, recipient, content }) => {
//         const msg = await Message.create({ sender, recipient, content });
//         socket.broadcast.emit("receiveMessage", msg);
//     });
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
