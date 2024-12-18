import { useRef } from "react";

function BookSearch() {
  const foundBookRef = useRef<HTMLInputElement>(null);

  const clientId = import.meta.env.VITE_APP_CLIENT_ID;
  const secretKey = import.meta.env.VITE_APP_CLIENT_SECRET;

  const getBookDate = async () => {
    const query = foundBookRef.current?.value || "";
    if (!query) {
      alert("검색어를 입력해주세요.");
      return;
    }

    await fetch(`/api/v1/search/book_adv.json?d_titl=${query}`, {
      method: "GET",
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": secretKey,
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.error("Error:", error));
  };
  

    return (
      <div className="w-full h-svh pt-[46px]">
        <div className="flex justify-center gap-2 mt-[20px]">
        <p>책 조회</p>
        <input ref={foundBookRef} type="text" className="border border-red-900 rounded-full px-2"/>
        <button onClick={getBookDate}>검색</button>
        </div>

        <div>책 리스트</div>
      </div>
    )
  }
  
  export default BookSearch