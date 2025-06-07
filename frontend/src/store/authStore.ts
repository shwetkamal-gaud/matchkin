import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: null | { email: string; name?: string };
    login: (user: { email: string; name?: string }) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            login: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-store',
            
        }
    )
);
