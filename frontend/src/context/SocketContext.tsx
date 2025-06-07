'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { Socket, io } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[]; // Adjust based on your backend's response type
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocketContext must be used within SocketContextProvider");
    return context;
};

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { authUser } = useAuthContext();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        if (authUser?._id) {
            const newSocket = io(process.env.NODE_ENV === "development"
                ? "http://localhost:5000"
                : "https://matchkin-kazv.onrender.com", {
                query: { userId: authUser._id },
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            });

            return () => {
                newSocket.disconnect();
                setSocket(null);
                setOnlineUsers([]);
            };
        } else if (socket) {
            socket.disconnect();
            setSocket(null);
            setOnlineUsers([]);
        }
    }, [authUser, socket]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
