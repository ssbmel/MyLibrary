import { Link } from "react-router-dom";
import GeneralLogin from "./GeneralLogin";

function LoginHome() {
  return (
    <>
      <div className="w-full h-svh flex xl:bg-[#FFFAFA]">
        <div className="w-full xl:w-[45%]">
          <h1 className="mt-[200px] text-center text-[24px]">나만의 도서관</h1>
          <GeneralLogin />
        </div>

        <div className="hidden xl:block xl:w-[55%]">
          <img
            src={`${process.env.PUBLIC_URL}/images/clean-empty-library-hall.jpg`}
            alt="Library Hall"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default LoginHome;