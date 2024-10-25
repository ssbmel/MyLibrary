import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import supabase from "../supabase/supabaseClient";

function Header() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user?.user_metadata);

  const goToLogin = () => {
    navigate("/loginhome");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    const { clearUser } = useUserStore.getState();
    clearUser();
  }

  return (
    <div className="w-full h-[46px] bg-[#3A0000] flex">
      {user ? (
        <button onClick={signOut} className="text-white ml-auto mr-4">
          log out
        </button>
      ) : (
        <button onClick={goToLogin} className="text-white ml-auto mr-4">
          log in
        </button>
      )}
    </div>
  );
}

export default Header;
