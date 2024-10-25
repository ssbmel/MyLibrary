import { useEffect } from "react";
import Header from "../header/Header";
import { useUserStore } from "../store/userStore";
import { initializeUser } from "../utils/initAuth";

function Main() {
  const user = useUserStore((state) => state.user?.user_metadata);

  useEffect(() => {
    initializeUser();
  },[])

  return (
    <div>
      <Header />
      <div className="relative w-full h-[calc(100vh-46px)] bg-library-hall bg-cover bg-center">
        {/* 반투명 배경을 추가합니다 */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute w-full grid gap-8 mt-[250px] justify-center text-white">
          <h1 className="text-4xl font-bold text-center">나만의 도서관</h1>
          <p className="text-lg">읽은 책에 대한 느낀점을 기록하고 보관하세요</p>
          {user ? <p>{user.nickname}님, 안녕하세요</p> : ""}
        </div>
      </div>
    </div>
  );
}

export default Main;
