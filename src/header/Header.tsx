import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { FiChevronLeft } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user?.user_metadata);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  const goToBack = () => {
    navigate("/")
  }

  return (
    <div className="w-full h-[46px] bg-[#3A0000] flex">
      <button onClick={goToBack} className="text-white text-[24px] ml-2"><FiChevronLeft/></button>
      {user ? (
        <button onClick={goToMypage} className="text-white text-[24px] ml-auto mr-4">
          <FiUser/>
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