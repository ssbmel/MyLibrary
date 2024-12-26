import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import supabase from '../supabase/supabaseClient';

export const useUserInitialize = async () => {
  const setUser = useUserStore((state=>state.setUser));
  const setIsInitialized = useUserStore((state)=>state.setIsInitialized)
  const isLoggedIn = useUserStore((state)=> state.isLoggedIn);

  useEffect(() => {
    const initUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (data?.user) {
        setUser(data.user)
      }
      setIsInitialized(true);
    }
    initUser();
  }, [setUser, setIsInitialized, isLoggedIn])
};