import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import supabase from "../supabase/supabaseClient";
import Header from "../header/Header";

function MyPage() {
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    const { clearUser } = useUserStore.getState();
    clearUser();
    navigate("/");
  };

  return (
    <>
      <Header/>
      <div className="w-full h-[calc(100vh-46px)]">
      <button onClick={signOut}>로그아웃</button>

      </div>
    </>
  );
}

export default MyPage;
