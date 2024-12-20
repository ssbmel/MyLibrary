import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../../supabase/supabaseClient";
import Sample from "../../../assets/default.png";
import { Review } from "../../../../types/type";

function BookReview() {
  const { id } = useParams();
  const [readBook, setReadBook] = useState<Review | null>(null);

  useEffect(() => {
    const getBookReviewData = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching review data:", error);
        return;
      }
      setReadBook(data);
    };

    getBookReviewData();
  }, [id]);

  return (
    <div className="w-full h-full pt-[46px] flex flex-col items-center p-6">
      <div className="w-[250px] h-[350px] mt-4 overflow-hidden shadow-lg mb-6">
        <img
          src={readBook?.book_image ? readBook.book_image : Sample}
          alt="책커버이미지"
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-4">
        {readBook?.title || "제목 없음"}
      </h1>

      <div className="w-16 h-1 bg-red-500 rounded-full mb-4"></div>

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md text-gray-700 leading-relaxed">
        <p className="whitespace-pre-wrap text-base">
          {readBook?.content || "내용이 없습니다."}
        </p>
      </div>
    </div>
  );
}

export default BookReview;
