import { BooksType } from "../../../types/booksTypes";
import { HiX } from "react-icons/hi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function BookDetail({
  book,
  closeModal,
}: {
  book: BooksType;
  closeModal: () => void;
}) {
  const navigate = useNavigate();
  const goToReview = () => {
    navigate("/add", { state: { book } });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[400px] p-5 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <HiX />
        </button>

        <div className="flex justify-center mb-4">
          <img
            src={book.image}
            alt={book.title}
            className="w-[150px] h-[200px] object-cover shadow-md"
          />
        </div>

        <h2 className="font-bold text-center mb-2">
          {book.title
            .replace(")", "")
            .split("(") 
            .map((part, index) => (
              <span key={index}>
                {part}
                {index !== book.title.split("(").length - 1 && <br />}
              </span>
            ))}
        </h2>

        <p className="text-sm text-gray-700 text-center mb-2">
          작가 : {book.author}
        </p>
        <p className="text-sm text-gray-700 text-center mb-2">
          가격 :{" "}
          {Number(book.discount) === 0
            ? "정보없음"
            : Number(book.discount).toLocaleString() + "원"}
        </p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-5 overflow-y-auto">
          {book.description}
        </p>

        <button className="flex mx-auto border-b border-red-900 px-2 rounded-sm items-center" onClick={goToReview}>
          독후감 쓰러가기
          <HiOutlineArrowNarrowRight />
        </button>
      </div>
    </div>
  );
}

export default BookDetail;
