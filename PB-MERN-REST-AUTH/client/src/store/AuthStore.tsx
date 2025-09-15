// src/store/authStore.ts
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  token: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: (token, username) =>
    set({ isAuthenticated: true, user: { username }, token }),
  logout: () => set({ isAuthenticated: false, user: null, token: null }),
}));
