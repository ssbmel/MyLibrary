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
      <Header />
      <div className="w-full h-[calc(100vh-46px)] p-10">
        <div className="border w-full p-4 flex items-center gap-2">
          <div className="border w-[80px] h-[80px] rounded-[50%]"></div>
          <p className="text-[18px]">닉네임</p>
          <div className="grid gap-1 ml-auto text-[14px]">
            <button>프로필 수정</button>
            <button onClick={signOut}>로그아웃</button>
          </div>
        </div>
        <hr className="bg-black my-6"/>
        <div>
          <h3 className="text-[20px]">내가 읽은 책</h3>
        </div>
      </div>
    </>
  );
}

export default MyPage;
