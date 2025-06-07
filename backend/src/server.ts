import express from "express";
import http from "http";
import cors from "cors";
import * as  dotenv from "dotenv";
dotenv.config({ path: '.env.local' });
import { Server } from "socket.io";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import waitlistRoutes from "./routes/waitlist.routes";
import chatRoutes from "./routes/message.routes";
import userRoutes from './routes/user.routes'
import groupChatRoutes from './routes/groupChat.routes'
import s3Routes from './routes/s3.routes'
import cookieParser from "cookie-parser";
import { app,server } from "./socket/socket";
connectDB();
app.use(cookieParser())
app.use(cors({
    origin: true, 
    credentials: true,              
  }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", waitlistRoutes);
app.use("/api/messages", chatRoutes);
app.use("/api/users", userRoutes);
app.use('/api/groups', groupChatRoutes);
app.use('/api/s3', s3Routes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
