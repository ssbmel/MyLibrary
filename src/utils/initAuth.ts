// src/utils/initAuth.ts
import { useUserStore } from '../store/userStore';
import supabase from '../supabase/supabaseClient';

export const initializeUser = async () => {
  const { data } = await supabase.auth.getUser();
  const { setUser } = useUserStore.getState();
  if (data.user) {
    setUser(data.user);
  }
};
