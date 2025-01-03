import { useUserStore } from "../../store/userStore";
import BookSearch from "./BookSearch";
import MainBg from "../../assets/clean-empty-library-hall.jpg"
import LibraryMap from "./LibraryMap";

function Main() {
  const user = useUserStore((state) => state.user?.user_metadata);

  return (
    <div className="w-full h-svh relative">
      <img src={MainBg} alt="배경이미지" className="-z-10 absolute h-full xl:w-full xl:h-full object-cover" />
      <div className="w-full h-svh bg-black bg-opacity-40 justify-center flex flex-col items-center text-white gap-3">
        <h1 className="w-full text-4xl font-bold text-center my-6">나만의 도서관</h1>
        {user ? <p>{user.nickname}님, 안녕하세요</p> : ""}
        <p className="text-lg">읽은 책에 대한 느낀점을 기록하고 보관하세요</p>
      </div>
      <BookSearch/>
      <LibraryMap/>
    </div>
  );
}

export default Main;
