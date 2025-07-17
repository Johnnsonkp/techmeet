import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    bio?: string | null;
    image?: string;
  } | null;
  access_token: string | null;
  refresh_token: string | null;
  provider: string | null;
}

interface AuthStore extends AuthState {
  setAuth: (data: AuthState) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      provider: null,
      setAuth: (data) => set(data),
      logout: () => set({ user: null, access_token: null, refresh_token: null, provider: null }),
    }),
    { name: 'auth-store' }
  )
);