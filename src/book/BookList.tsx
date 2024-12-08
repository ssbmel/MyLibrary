function BookList() {
    return (
      <div className="w-full h-svh pt-[46px]">
        <div className="flex justify-center gap-2 mt-[20px]">
        <p>책 조회</p>
        <input type="text" className="border border-red-900 rounded-full px-2"/>
        <button>검색</button>
        </div>

        <div>책 리스트</div>
      </div>
    )
  }
  
  export default BookList