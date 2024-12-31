import { useEffect, useRef } from "react";

function LibraryMap() {
  const { kakao } = window as unknown as { kakao: any };
  const searchRegionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 현재 위치 가져오기 동의
    // 현재 위치 가져오는 동안 로딩화면 보여주기
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const container = document.getElementById("map");
        const options = {
          center: await new kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        const marker = await new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lat, lng),
        });
        marker.setMap(map);
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다.", error);
      }
    );
  }, []);
  return (
    <div className="w-full h-svh xl:px-[100px] xl:pt-[100px] px-4">
      <h1 className="text-xl xl:text-2xl my-8">내 주변 도서관 찾아보기</h1>
      <div className="mx-auto flex flex-col justify-between xl:flex-row">
        <div className="xl:w-[50%] mx-auto">
          <div className="flex gap-3 items-center truncate">
            <h2 className="xl:text-xl">지역 검색</h2>
            <input
              type="text"
              ref={searchRegionRef}
              className="border border-gray-300 rounded-full w-[60%] px-4 py-2 text-sm focus:none shadow-sm"
              placeholder="지역을 입력하세요."
            />
            <button
              type="button"
              className="bg-red-900 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all"
            >
              검색
            </button>
          </div>
        </div>
        <div id="map" className="xl:w-[50%] xl:h-[700px] w-full min-h-[500px] mt-[20px] xl:mt-0"></div>
      </div>
    </div>
  );
}

export default LibraryMap;
