import { BooksType } from "../../../../types/booksTypes";
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
    navigate("/add", { state: { book }, replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[400px] p-5 relative">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <HiX />
        </button>

        <div className="flex justify-center mb-4">
          <img
            src={book.thumbnail}
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
        <div className="text-center flex flex-col gap-1">
          <p className="text-sm text-gray-700">작가 : {book.authors}</p>
          <p className="text-sm text-gray-700">
            가격 :{" "}
            {Number(book.price) === 0
              ? "정보없음"
              : Number(book.price).toLocaleString() + "원"}
          </p>
          <p
            className="hover:underline text-sm"
            onClick={() => window.open(`${book.url}`)}
          >
            책 구매 링크
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-5 overflow-y-auto my-4">
          {book.contents}
        </p>

        <button
          type="button"
          className="flex mx-auto border-b border-red-900 px-2 rounded-sm items-center"
          onClick={goToReview}
        >
          독후감 쓰러가기
          <HiOutlineArrowNarrowRight />
        </button>
      </div>
    </div>
  );
}

export default BookDetail;
