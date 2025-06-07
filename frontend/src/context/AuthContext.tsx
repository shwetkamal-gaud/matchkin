'use client'
import { User } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    authUser: User | null;
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthContextProvider");
    return context;
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setAuthUser(parsed);
            } catch (e) {
                console.error("Failed to parse user from localStorage:", e);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
