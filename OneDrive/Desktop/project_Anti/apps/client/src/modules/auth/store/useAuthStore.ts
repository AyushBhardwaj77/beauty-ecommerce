import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';

export interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password?: string) => Promise<void>;
    register: (name: string, email: string, password?: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (email, password) => {
                if (!password) throw new Error("Password required");
                try {
                    const { data } = await api.post('/auth/login', { email, password });
                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                    });
                } catch (error: any) {
                    console.error("Login failed:", error);
                    throw error.response?.data?.error || "Login failed";
                }
            },
            register: async (name, email, password) => {
                if (!password) throw new Error("Password required");
                try {
                    const { data } = await api.post('/auth/register', { name, email, password });
                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                    });
                } catch (error: any) {
                    console.error("Registration failed:", error);
                    throw error.response?.data?.error || "Registration failed";
                }
            },
            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
