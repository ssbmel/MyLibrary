import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import Button from "../communal/Button";
import { useUserStore } from "../store/userStore";
import BackButton from "../communal/BackButton";

function GeneralLogin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });
    if (error) throw error;

    const { setUser } = useUserStore.getState();
    setUser(data.user);

    alert("로그인 성공!");
    navigate("/");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
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
      <div className="w-full h-[46px] flex my-4">
        <button
          onClick={goToHome}
          type="button"
          className="w-[50%] mr-2 bg-black text-white p-[6px] rounded-sm"
        >
          홈으로
        </button>
        <Button>로그인</Button>
      </div>
      <div className="text-center grid gap-3 mt-[15px]">
        <Link to={"/signup"} className="text-[14px]">
          회원가입 하러 가기
        </Link>
        <div className="flex items-center mx-auto">
          <p className="text-gray-400 text-[12px] mr-1">
            비밀번호를 잊으셨나요?
          </p>
          <button className="text-[14px]">비밀번호 찾기</button>
        </div>
      </div>
    </form>
  );
}

export default GeneralLogin;
