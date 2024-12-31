import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";
import supabase from "../../supabase/supabaseClient";
import { Review } from "../../../types/type";

function AddReview() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bookImageUrl, setBookImageUrl] = useState<string>();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const reviewId = uuidv4();
  const location = useLocation();
  const { book } = location.state || {};

  useEffect(() => {
    if (book?.thumbnail) {
      setBookImageUrl(book.thumbnail);
    }
  }, [book]);

  const ChangeReviewImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
      
    setImageFile(file);
    setBookImageUrl(URL.createObjectURL(file));
  };

  const registerReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (titleRef.current?.value === "") {
      alert("책제목을 입력해주세요.");
      return;
    } else if (contentRef.current?.value === "") {
      alert("후기를 입력해주세요.");
      return;
    }
  
    const newReview: Review = {
      id: reviewId as string,
      created_at: new Date().toISOString(),
      title: titleRef.current?.value || "",
      content: contentRef.current?.value || "",
      book_image: book?.thumnail || "",
      user_id: user!.id as string,
    };
  
    if (imageFile) {
      const { error: imgError } = await supabase.storage
        .from("review_image")
        .upload(`${user?.email}/${reviewId}/${imageFile.name}`, imageFile);
  
      if (imgError) {
        console.error("Error uploading imgData:", imgError);
        return;
      }
  
      const { data: fileData } = supabase.storage
        .from("review_image")
        .getPublicUrl(`${user?.email}/${reviewId}/${imageFile.name}`);
  
      newReview.book_image = fileData.publicUrl;
    }
  
    const { error } = await supabase
      .from("reviews")
      .insert([newReview])
      .select();
  
    if (error) {
      console.error("Error inserting data:", error);
      return;
    }
  
    alert("리뷰가 등록되었습니다.");
    navigate(`/bookreview/${reviewId}`);
  };
  

  return (
    <form onSubmit={registerReview} className="w-full xl:w-[700px] xl:mx-auto pt-[46px] px-6 flex flex-col gap-5">
      <input
        defaultValue={book && book.title}
        ref={titleRef}
        type="text"
        placeholder="책제목"
        className="border-red-950 border-b h-[35px] px-2 mt-[20px] focus:outline-none"
      />
      <textarea
        ref={contentRef}
        name="content"
        id="content"
        placeholder="후기를 입력하세요"
        className="border h-[200px] resize-none p-2 border-gray-300 rounded-md focus:outline-none" 
      ></textarea>
      
      <label htmlFor="bookCover" className="flex items-center w-[100px] h-[100px] border justify-center border-gray-300 font-semibold py-2 px-4 rounded-md cursor-pointer transition">
        <FaCamera className="w-[30px] h-[30px]"/>
        <input
          type="file"
          name="bookCover"
          id="bookCover"
          onChange={ChangeReviewImgHandler}
          accept="image/*"
          className="hidden"
        />
      </label>
  
      {bookImageUrl && (
        <div className="mt-4 flex justify-center">
          <img
            src={bookImageUrl}
            alt="리뷰 이미지"
            className="w-[60%] h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
  
      <button
        type="submit"
        className="w-full py-3 bg-red-950 hover:bg-red-900 text-white rounded-md my-4"
      >
        등록하기
      </button>
    </form>
  );
  
}

export default AddReview;
