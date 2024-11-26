import { useUserStore } from "../store/userStore";
import supabase from "../supabase/supabaseClient";
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Review } from "../../types/type";
import { useNavigate } from "react-router-dom";
import Sample from "../assets/default.png"

function MyPage() {
  const { clearUser } = useUserStore.getState();
  const { setIsLoggingOut } = useUserStore.getState();
  const user = useUserStore((state) => state.user);
  const [myReadBooks, setMyReadBooks] = useState<Review[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      const getReviewBooks = async () => {
        if (!user?.id) return;

        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching review books:", error);
          return;
        }
        setMyReadBooks(data);
      };
      getReviewBooks();
    }
  }, [user?.id]);

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    clearUser();
    setIsLoggingOut(true);
  };

  const goToBookReview = (id: string) => {
    navigate(`/bookreview/${id}`);
  };

  return (
    <>
      <div className="w-full h-[calc(100vh-46px)] p-6">
        <div className="border w-full p-4 flex items-center gap-2">
          <img src={Sample} alt="프로필이미지" className="border w-[80px] h-[80px] rounded-full"/>
          {/* <div className="border w-[80px] h-[80px] rounded-[50%]"></div> */}
          <p className="text-[18px]">{user?.user_metadata.nickname}</p>
          <div className="grid gap-3 ml-auto text-[14px]">
            <button type="button" className="text-[20px]">
              <FiSettings />
            </button>
            <button className="text-[20px]" onClick={signOut}>
              <FiLogOut />
            </button>
          </div>
        </div>
        <hr className="bg-black my-6" />
        <h3 className="text-[20px]">내가 읽은 책</h3>
        <div className="w-full flex flex-col-3 space-x-3">
          {!myReadBooks ? (
            <p className="text-center mt-[50px]">등록된 책이 없습니다.</p>
          ) : (
            myReadBooks.map((book, index) => (
              <button
                className="w-[100px] p-2"
                key={index}
                onClick={() => goToBookReview(book.id)}
              >
                <img
                  src={book.book_image ? book.book_image : Sample}
                  alt="책커버이미지"
                  className="w-[80px] shadow-md"
                />
                <p className="truncate">{book.title}</p>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyPage;
