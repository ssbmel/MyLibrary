import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import supabase from "../supabase/supabaseClient";

function Header() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user?.user_metadata);

  const goToLogin = () => {
    navigate("/loginhome");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  return (
    <div className="w-full h-[46px] bg-[#3A0000] flex">
      {user ? (
        <button onClick={goToMypage} className="text-white ml-auto mr-4">
          My
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