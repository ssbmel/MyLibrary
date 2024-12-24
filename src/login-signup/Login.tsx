import { useRef } from "react";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import BackButton from "../components/BackButton";
import Button from "../components/Button";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setIsLoggedIn } = useUserStore.getState();
  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current?.value === "") {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (passwordRef.current?.value === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if (error) {
      alert("로그인 실패");
      return;
    }
    navigate("/");
    setIsLoggedIn(true);
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="w-full h-svh flex xl:bg-[#FFFAFA]">
        <div className="w-full xl:w-[45%] flex flex-col justify-center">
          <div className="w-full xl:w-[500px] mx-auto">
            <h1 className="text-center text-[24px]">
              나만의 도서관
            </h1>
            <form
              onSubmit={loginHandler}
              className="w-full p-10 mx-auto grid mt-[50px]"
            >
              <input
                type="text"
                ref={emailRef}
                placeholder="이메일"
                className="p-1 px-3 border-b-2 rounded-sm shadow-sm mb-[20px]"
              />
              <input
                type="password"
                ref={passwordRef}
                placeholder="비밀번호"
                className="p-1 px-3 border-b-2 rounded-sm shadow-sm mb-[20px]"
              />
              <div className="w-full h-[46px] flex my-4 gap-2">
                <BackButton type="button" onClick={goToHome}>
                  홈으로
                </BackButton>
                <Button type="submit">로그인</Button>
              </div>
              <div className="text-center grid gap-3 mt-[15px]">
                <button
                  type="button"
                  onClick={goToSignup}
                  className="text-[14px]"
                >
                  회원가입 하러 가기
                </button>
                <div className="flex items-center mx-auto">
                  <p className="text-gray-400 text-[12px] mr-1">
                    비밀번호를 잊으셨나요?
                  </p>
                  <button type="button" className="text-[14px]">
                    비밀번호 찾기
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden xl:block xl:w-[55%] bg-library-hall bg-cover bg-center"></div>
      </div>
    </>
  );
}

export default Login;
