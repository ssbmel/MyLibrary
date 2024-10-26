import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import supabase from "../supabase/supabaseClient";

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
      <div>MyPage</div>
      <button onClick={signOut}>로그아웃</button>
    </>
  );
}

export default MyPage;
