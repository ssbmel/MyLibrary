import { useRef, useState } from "react";
import supabase from "../supabase/supabaseClient";
import { useUserStore } from "../store/userStore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Review } from "../../types/type"

function AddReview() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bookImageUrl, setBookImageUrl] = useState<string>();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const reviewId = uuidv4();

  const ChangeReviewImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setImageFile(file);
    setBookImageUrl(URL.createObjectURL(file));
  };

  const registerReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(titleRef.current?.value === "") {
      alert("책제목을 입력해주세요.");
      return;
    }else if(contentRef.current?.value === "") {
      alert("후기를 입력해주세요.");
      return;
    }else if(imageFile === null) {
      alert("이미지를 넣어주세요.");
      return;
    }

    const newReview: Review = {
      id: reviewId as string,
      created_at: new Date().toISOString(),
      title: titleRef.current?.value || "",
      content: contentRef.current?.value || "",
      book_image: "",
      user_id: user!.id as string,
    };

    const { error } = await supabase
      .from("reviews")
      .insert([newReview])
      .select();

    if (error) {
      console.error("Error inserting data:", error);
      return;
    }

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

    const imageUrl = fileData.publicUrl;
  
      await supabase
        .from("reviews")
        .update({ book_image: imageUrl })
        .eq("id", reviewId);
    }
    alert("리뷰가 등록되었습니다.");
    navigate(`/bookreview/${reviewId}`)
  };

  return (
    <form onSubmit={registerReview} className="w-full h-auto p-6 grid gap-5">
      <input
        ref={titleRef}
        type="text"
        placeholder="책제목"
        className="border-red-950 border-b h-[50px] p-2"
      />
      <textarea
        ref={contentRef}
        name="content"
        id="content"
        placeholder="후기를 입력하세요"
        className="border-y h-[300px] resize-none p-2 border-red-950"
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
            className="w-full h-full object-cover overflow-hidden"
          />
        </label>
      )}
      <button
        type="submit"
        className="w-full py-3 bg-red-950 hover:bg-red-900 text-white p-[6px] rounded-md"
      >
        등록하기
      </button>
    </form>
  );
}

export default AddReview;
