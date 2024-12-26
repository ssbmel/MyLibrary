import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { FiChevronLeft } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { pathname } = useLocation();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToMypage = () => {
    if(user) {
      navigate("/mypage");
    }
  };

  const goToBack = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate("/");
  };



  return (
    <div className="mx-auto min-w-[360px] w-full max-w-[500px] xl:max-w-none h-[46px] bg-[#3A0000] flex items-center justify-between fixed top-0">
      {pathname === "/" ? (
        <div className="w-12"></div>
      ) : (
        <button onClick={goToBack} className="w-10 text-white text-[24px] ml-2">
          <FiChevronLeft />
        </button>
      )}

      <button onClick={goToHome} className="text-white font-bold text-lg">
        My Library
      </button>

      {user ? (
        <button onClick={goToMypage} className="text-white text-[24px] mr-4">
          <FiUser />
        </button>
      ) : (
        <button onClick={goToLogin} className="text-white text-sm mr-4">
          Login
        </button>
      )}
    </div>
  );
}

export default Header;
