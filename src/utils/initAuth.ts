import { useUserStore } from '../store/userStore';
import supabase from '../supabase/supabaseClient';

export const initializeUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Failed to fetch user:", error);
      return;
    }
    
    const { setUser } = useUserStore.getState();
    if (data?.user) {
      setUser(data.user);
    }
  } catch (err) {
    console.error("Unexpected error in initializeUser:", err);
  }
};
