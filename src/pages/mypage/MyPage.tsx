import { useUserStore } from "../../store/userStore";
import supabase from "../../supabase/supabaseClient";
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Review } from "../../../types/type";
import { useNavigate } from "react-router-dom";
import Sample from "../../assets/default.png";
import EditProfile from "./EditProfile";

function MyPage() {
  const { clearUser } = useUserStore.getState();
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
  const user = useUserStore((state) => state.user);
  const [myReadBooks, setMyReadBooks] = useState<Review[] | null>(null);
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);

  const handleEditModal = () => {
    setEditModal((prev)=> !prev);
  }

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
    navigate("/");
    setIsLoggedIn(false);
  };

  const goToBookReview = (id: string) => {
    navigate(`/bookreview/${id}`);
  };

  return (
    <div className="w-full h-full xl:w-[700px] mx-auto px-6 pt-[46px]">
      <div className="border w-full p-4 flex items-center gap-2 mt-[20px]">
        <img
          src={Sample}
          alt="프로필이미지"
          className="border w-[60px] h-[60px] rounded-full"
        />
        <p className="text-[18px]">{user?.user_metadata.nickname}</p>
        <div className="grid gap-3 ml-auto text-[14px]">
          <button type="button" className="text-[20px]" onClick={handleEditModal}>
            <FiSettings />
          </button>
          {editModal && <EditProfile currentImage={user?.user_metadata.profile_Img} currentNickname={user?.user_metadata.nickname} handleEditModal={handleEditModal}/>}
          <button className="text-[20px]" onClick={signOut}>
            <FiLogOut />
          </button>
        </div>
      </div>
      <h3 className="text-[16px] mt-6">내가 읽은 책</h3>
      <hr className="bg-black mb-6" />
      <div className="w-full grid grid-cols-3 gap-4 place-items-center">
        {!myReadBooks ? (
          <p className="text-center mt-[50px] col-span-3">
            등록된 책이 없습니다.
          </p>
        ) : (
          myReadBooks.map((book, index) => (
            <button
              className="w-fit flex flex-col items-center"
              key={index}
              onClick={() => goToBookReview(book.id)}
            >
              <img
                src={book.book_image ? book.book_image : Sample}
                alt="책커버이미지"
                className="w-[80px] h-[120px] shadow-md"
              />
              <p className="w-[80px] truncate my-2 text-center">{book.title}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default MyPage;
