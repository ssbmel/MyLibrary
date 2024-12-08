import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useUserStore } from "../store/userStore";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false);
  const [isCheckedAccept, setIsCheckedAccept] = useState<boolean>(false);

  const [emailMsg, setEmailMsg] = useState<string>("");
  const [nicknameMsg, setNicknameMsg] = useState<string>("");
  const [passwordMsg, setPasswordMsg] = useState<string>("");
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState<string>("");
  const setUser = useUserStore((state)=>state.setUser); 

  const navigate = useNavigate();

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);
    if (!regex.test(value)) {
      setEmailMsg("올바른 이메일 형식이 아닙니다.");
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9가-힣\s]+(?![ㄱ-ㅎㅏ-ㅣ])$/;
    setNickname(e.target.value);
    if (!regex.test(value)) {
      setNicknameMsg("한글,영문,숫자로 최대 8자이내로 지어주세요.");
      setIsNickname(false);
    } else {
      setIsNickname(true);
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    setPassword(value);
    if (!regex.test(value)) {
      setPasswordMsg(
        "숫자, 영문, 특수문자를 포함하여 최소 8자를 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (password === value) {
      setConfirmPasswordMsg("비밀번호가 일치합니다.");
      setIsConfirmPassword(true);
    } else {
      setConfirmPasswordMsg("비밀번호가 일치하지 않습니다.");
      setIsConfirmPassword(false);
    }
  };

  const checkedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAccept(e.target.checked);
  };

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (nickname === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (password === "") {
      alert("비밀번호을 입력해주세요.");
      return;
    }
    if (confirmPassword === "") {
      alert("비밀번호를 재확인해주세요.");
      return;
    }
    if (!isCheckedAccept) {
      alert("개인정보의 수집 및 이용에 대한 동의를 체크해주세요.");
      return;
    }
    if (!isEmail || !isNickname || !isPassword || !isConfirmPassword) {
      alert("회원가입 형식에 맞게 입력해주세요.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });
    setUser(data.user);
    alert("회원가입이 완료되었습니다! 로그인을 진행해주세요.");
    navigate("/login");

    if (error) {
      throw error;
    }

    await supabase.from("users").insert({
      id: data.user!.id,
      nickname,
      email,
      profile_img: "",
    });
  };

  const goToLogin = () => {
    navigate("/login");
  }

  return (
    <form onSubmit={registerUser} className="w-full h-full mx-auto mt-[120px]">
      <div className="p-10 grid gap-5">
        <h1 className="text-center mb-[24px] text-[18px]">회원가입</h1>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={emailHandler}
          className="p-1 px-3 border-b-2 rounded-sm shadow-sm"
        />
        {isEmail === false && email !== "" && (
          <p className="text-[12px] pl-2 text-red-800">{emailMsg}</p>
        )}
        <input
          type="text"
          placeholder="닉네임"
          maxLength={8}
          value={nickname}
          onChange={nicknameHandler}
          className="p-1 px-3 border-b-2 rounded-sm shadow-sm"
        />
        {isNickname === false && nickname !== "" && (
          <p className="text-[12px] pl-2 text-red-800">{nicknameMsg}</p>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={passwordHandler}
          className="p-1 px-3 border-b-2 rounded-sm shadow-sm"
        />
        {isPassword === false && password !== "" && (
          <p className="text-[12px] pl-2 text-red-800">{passwordMsg}</p>
        )}
        <input
          type="password"
          placeholder="비밀번호재확인"
          value={confirmPassword}
          onChange={confirmPasswordHandler}
          className="p-1 px-3 border-b-2 rounded-sm shadow-sm"
        />
        {isConfirmPassword === false && confirmPassword !== "" && (
          <p className="text-[12px] pl-2 text-red-800">{confirmPasswordMsg}</p>
        )}
        <span className="text-gray-500 mx-auto text-[14px]">
          <input
            type="checkbox"
            checked={isCheckedAccept}
            onChange={checkedHandler}
            className="mr-2 mt-5"
          />
          개인정보의 수집 및 이용에 대한 동의 (필수)
        </span>
      </div>
      <div className="w-full h-[46px] flex gap-2 justify-center px-10">
        <BackButton type="button" onClick={goToLogin}>뒤로가기</BackButton>
        <Button type="submit">가입하기</Button>
      </div>
    </form>
  );
}
