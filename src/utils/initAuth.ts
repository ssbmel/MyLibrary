import { useUserStore } from '../store/userStore';
import supabase from '../supabase/supabaseClient';

export const initializeUser = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    
    const { setUser } = useUserStore.getState();
    if (data?.user) {
      setUser(data.user);
    }
  } catch (err) {
    console.error("Unexpected error in initializeUser:", err);
  }
};
