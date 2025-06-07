import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const userSocketMap: Record<string, string> = {};

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://matchkin-six.vercel.app/"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

export const getRecievedSocketId = (receiveId) => {
    return userSocketMap[receiveId]
}

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    const userId = socket.handshake.query.userId as string | undefined;

    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`Mapped userId ${userId} to socket ${socket.id}`);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.id);

        if (userId) {
            delete userSocketMap[userId];
            console.log(`Removed userId ${userId} from map`);
        }

        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { app, server, io };
