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
    <div className="w-full justify-center p-6">
      <img src={readBook?.book_image ? readBook.book_image : Sample} alt="책커버이미지" className="w-[70%] object-cover mx-auto shadow-md"/>
      <h1 className="w-full text-xl text-center py-3 font-bold">{readBook?.title}</h1>
      <p>{readBook?.content}</p>
    </div>
  )
}

export default BookReview;