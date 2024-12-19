import { BooksType } from "../../../types/booksTypes";

function BookDetail({ book, closeModal }: { book: BooksType; closeModal: () => void }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[400px] p-5 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        {/* 책 이미지 */}
        <div className="flex justify-center mb-4">
          <img
            src={book.image}
            alt={book.title}
            className="w-[150px] h-[200px] object-cover shadow-md"
          />
        </div>

        {/* 책 정보 */}
        <h2 className="font-bold text-center mb-2">{book.title}</h2>
        <p className="text-sm text-gray-700 text-center mb-2">작가 : {book.author}</p>
        <p className="text-sm text-gray-700 text-center mb-2">가격 : {Number(book.discount).toLocaleString()}원</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-5 overflow-y-auto">{book.description}</p>

      </div>
    </div>
  );
}

export default BookDetail;
