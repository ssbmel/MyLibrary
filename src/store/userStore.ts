import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isLoggedIn : boolean;
  setIsLoggedIn : (isLoggingOut: boolean) => void;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  isLoggedIn : false,
  setIsLoggedIn : (isLoggedIn) => set({ isLoggedIn }),
  isInitialized: false,
  setIsInitialized: (isInitialized) => set({isInitialized}),
}));
