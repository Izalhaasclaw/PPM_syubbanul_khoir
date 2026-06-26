import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {UserLogin, LoginResponse } from "../types/Auth"

interface AuthStore {
  isAuthenticated: boolean;
  user: UserLogin | null;
  token: string | null;
  login: (payload: LoginResponse) => void;
  logout: () => void;
}

export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: ({user, token}) =>
        set({ isAuthenticated: true, user, token }),
      logout: () => set({ isAuthenticated: false, user: null, token: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
