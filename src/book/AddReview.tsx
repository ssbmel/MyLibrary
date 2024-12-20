import { useEffect, useRef, useState } from "react";
import supabase from "../supabase/supabaseClient";
import { useUserStore } from "../store/userStore";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { Review } from "../../types/type"

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
    if (book?.image) {
      setBookImageUrl(book.image);
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
  
    // 리뷰 데이터 객체 초기화
    const newReview: Review = {
      id: reviewId as string,
      created_at: new Date().toISOString(),
      title: titleRef.current?.value || "",
      content: contentRef.current?.value || "",
      book_image: book?.image || "", // book.image를 우선으로 사용
      user_id: user!.id as string,
    };
  
    // 이미지 파일이 있을 경우 storage에 업로드
    if (imageFile) {
      const { error: imgError } = await supabase.storage
        .from("review_image")
        .upload(`${user?.email}/${reviewId}/${imageFile.name}`, imageFile);
  
      if (imgError) {
        console.error("Error uploading imgData:", imgError);
        return;
      }
  
      // 이미지의 public URL 가져오기
      const { data: fileData } = supabase.storage
        .from("review_image")
        .getPublicUrl(`${user?.email}/${reviewId}/${imageFile.name}`);
  
      newReview.book_image = fileData.publicUrl;
    }
  
    // 데이터베이스에 리뷰 삽입
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
    <form onSubmit={registerReview} className="w-full pt-[46px] px-6 flex flex-col gap-5">
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
      <input
        type="file"
        name="bookCover"
        id="bookCover"
        onChange={ChangeReviewImgHandler}
        accept="image/*"
      />
      {bookImageUrl && (
        <label htmlFor="file">
          <img
            src={bookImageUrl}
            alt="리뷰이미지"
            className="w-[80%] h-auto mx-auto object-cover overflow-hidden"
          />
        </label>
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
