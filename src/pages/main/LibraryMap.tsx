import { useRef, useState, useEffect } from "react";
import { MdLocationSearching } from "react-icons/md";

function LibraryMap() {
  const { kakao } = window as unknown as { kakao: any };
  const searchRegionRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultLat = 37.5665;
  const defaultLng = 126.978;

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      const { lat, lng } = JSON.parse(storedLocation);
      loadMap(lat, lng);
    } else {
      loadMap(defaultLat, defaultLng);
    }
  }, []);

  const searchMyLocationHandler = () => {
    const isAgreed = window.confirm("현재 사용자의 위치 정보를 수집하는 데에 동의하시겠습니까?");
    
    if (isAgreed) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const location = { lat, lng };
          localStorage.setItem("userLocation", JSON.stringify(location));
          loadMap(lat, lng);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다.", error);
          setIsLoading(false);
        }
      );
    } else {
      loadMap(defaultLat, defaultLng);
    }
  };

  const loadMap = (lat: number, lng: number) => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
    });
    marker.setMap(map);

    setIsLoading(false);
  };

  return (
    <div className="w-full h-svh xl:px-[100px] xl:pt-[100px] px-4">
      <h1 className="text-xl xl:text-2xl my-4">내 주변 도서관 찾아보기</h1>
      <div className="mx-auto flex flex-col justify-between xl:flex-row">
        <div className="xl:w-[50%] mx-auto">
          <div className="flex gap-3 items-center truncate mt-[30px]">
            <h2 className="xl:text-xl">도서관 조회</h2>
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

        <div className="flex xl:w-[60%] h-full flex-col">
          <button onClick={searchMyLocationHandler} className="flex gap-2 ml-auto my-2 items-center">
            <p className="xl:text-[18px]">현재 내 위치</p>
            <MdLocationSearching className="xl:w-[24px] xl:h-[24px] w-[18px] h-[18px]" />
          </button>
          <div
            id="map"
            className="xl:w-full xl:h-[700px] w-full h-[500px] xl:mt-0"
          >
            {isLoading && <p className="truncate">지도를 불러오는 중...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryMap;
