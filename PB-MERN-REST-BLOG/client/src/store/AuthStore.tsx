// src/store/authStore.ts
import { create } from "zustand";

interface AuthUser {
  id: string;
  userId: string;
  email: string;
  name: string;
  roles: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: (token) =>
  {
    // get the payload from the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('payload from token:', payload);
    set({ isAuthenticated: true, user: { ...payload } })
    // save to local storage
    localStorage.setItem('auth', JSON.stringify({ token, user: { ...payload } }));
  },
  logout: () => {
    set({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem('auth');
  },
}));
