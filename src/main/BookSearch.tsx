import { useRef, useState } from "react";
import { BooksType } from "../../types/booksTypes";
import BookDetail from "./components/BookDetail";

function BookSearch() {
  const findBookRef = useRef<HTMLInputElement>(null);
  const [foundBooks, setFoundBooks] = useState<BooksType[]>([]);
  const [selectedBook, setSelectedBook] = useState<BooksType | null>(null);

  const clientId = import.meta.env.VITE_APP_CLIENT_ID;

  const getBookDate = async () => {
    const query = findBookRef.current?.value || "";
    if (!query) {
      alert("검색어를 입력해주세요.");
      return;
    }

    await fetch(`https://dapi.kakao.com/v3/search/book?query=${query}`, {
      method: "GET",
      headers: {
        "Authorization": `KakaoAK ${clientId}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("API 요청 실패");
        }
        return res.json();
      })
      .then((result) => setFoundBooks(result.documents))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getBookDate();
    }
  };

  const handleBookDetailModal = (book: BooksType) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="w-full min-h-[650px] pt-[40px] bg-gray-100">
      <div className="flex justify-center items-center gap-2 mt-6">
        <input
          ref={findBookRef}
          type="text"
          className="border border-gray-300 rounded-full w-[70%] px-4 py-2 text-sm focus:ring focus:ring-red-300 focus:outline-none shadow-sm"
          placeholder="책 제목을 입력하세요"
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={getBookDate}
          className="bg-red-900 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all"
        >
          검색
        </button>
      </div>
      {foundBooks.length === 0 && (
        <p className="w-full flex justify-center my-10 text-gray-500 text-base">
          찾고 싶은 책을 검색해보세요.
        </p>
      )}

<div className="w-full grid grid-cols-3 gap-3 place-items-center py-10">
        {foundBooks.map((book) => (
          <button key={book.title} className="w-[100px] h-[160px] items-center" onClick={() => handleBookDetailModal(book)}>
            <img
              src={book.thumbnail}
              alt="책커버"
              className="w-[100px] h-[130px] shadow-[0_5px_5px_0px_rgba(0,0,0,0.5)]"
            />
            <p className="text-[12px] py-2 truncate">{book.title}</p>
          </button>
        ))}
        {selectedBook && (
        <BookDetail book={selectedBook} closeModal={closeModal} />
      )}
      </div>
    </div>
  );
}

export default BookSearch;
