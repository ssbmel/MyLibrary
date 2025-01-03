import { useRef, useState, useEffect } from "react";
import { MdLocationSearching } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

function LibraryMap() {
  const { kakao } = window;
  const searchRegionRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState<any>(null);

  const markers: any[] = [];
  const defaultLat = 37.5665;
  const defaultLng = 126.978;

  useEffect(() => {
    if (!map && window.kakao) {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(defaultLat, defaultLng),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(container, options);
      setMap(kakaoMap);
    }
  }, [map]);

  const searchMyLocationHandler = () => {
    const isAgreed = window.confirm("현재 위치 정보를 사용하시겠습니까?");
    if (isAgreed) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          localStorage.setItem("userLocation", JSON.stringify({ lat, lng }));
          searchLibraries(lat, lng);
        }
      );
    } else {
      searchLibraries(defaultLat, defaultLng);
    }
  };

  const searchLibraries = (lat: number, lng: number) => {
    const ps = new kakao.maps.services.Places();
    const keyword = "도서관";
    const location = new kakao.maps.LatLng(lat, lng);

    ps.keywordSearch(keyword, (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        removeMarkers();
        displayPlaces(data);
        const bounds = new kakao.maps.LatLngBounds();
        data.forEach((place: any) => {
          const position = new kakao.maps.LatLng(place.y, place.x);
          bounds.extend(position);
        });
        if (map) {
          map.setBounds(bounds);
          setIsLoading(false);
        }
      } else {
        alert("주변 도서관 검색 결과가 없습니다.");
        setIsLoading(false);
      }
    }, { location });
  };

  const searchPlacesHandler = () => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert("지도 서비스를 불러오지 못했습니다. 페이지를 새로고침하세요.");
      return;
    }

    const keyword = searchRegionRef.current?.value;
    if (!keyword?.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const searchKeyword = `${keyword} 도서관`;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        removeMarkers();
        displayPlaces(data);
        const bounds = new kakao.maps.LatLngBounds();
        data.forEach((place: any) => {
          const position = new kakao.maps.LatLng(place.y, place.x);
          bounds.extend(position);
        });
        map.setBounds(bounds);
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPlacesHandler();
    }
  };

  const displayPlaces = (places: any[]) => {
    const listEl = document.getElementById("placesList");
    const bounds = new kakao.maps.LatLngBounds();
  
    if (listEl) {
      listEl.innerHTML = ''; // Clear previous results
  
      places.forEach((place, index) => {
        const position = new kakao.maps.LatLng(place.y, place.x);
        const marker = addMarker(position, index);
        bounds.extend(position);
        
        const listItem = getListItem(index, place); // Create the list item
        listEl.appendChild(listItem); // Append the list item to the list
  
        // Event listeners for marker hover effects
        marker.addListener("mouseover", () => displayInfowindow(marker, place.place_name));
        marker.addListener("mouseout", () => infowindow.close());
  
        // Add hover event for list item
        listItem.addEventListener("mouseover", () => {
          displayInfowindow(marker, place.place_name); // Show infowindow when hovering over the list item
        });
        listItem.addEventListener("mouseout", () => {
          infowindow.close(); // Hide infowindow when mouse leaves the list item
        });
      });
  
      map.setBounds(bounds);
    }
  };
  
  

  const addMarker = (position: any, idx: number) => {
    const marker = new kakao.maps.Marker({
      position,
    });
    marker.setMap(map);
    markers.push(marker);
    return marker;
  };

  const removeMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    markers.length = 0;
  };

  const getListItem = (index: number, place: any) => {
    const el = document.createElement("li");
    el.innerHTML = `<span class="markerbg marker_${index + 1}"></span>
                    <div class="info">
                      <h5>${place.place_name}</h5>
                      <span>${place.address_name}</span>
                      <span class="tel">${place.phone}</span>
                    </div>`;
    el.className = "item";
    return el;
  };

  const displayInfowindow = (marker: any, title: string) => {
    infowindow.setContent(title);
    infowindow.open(map, marker);
  };

  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  return (
    <div className="w-full h-[calc(100vh-46px)] xl:px-[100px] xl:pt-[20px] px-4">
      <h1 className="text-xl xl:text-2xl my-4 hidden xl:block border-b border-red-950 py-2">
        내 주변 도서관 찾아보기
      </h1>
      <div className="mx-auto flex flex-col justify-between xl:flex-row">
        <div className="xl:w-[50%] w-full mx-auto">
          <div className="flex gap-3 items-center truncate mt-[30px]">
            <h2 className="xl:text-xl">도서관 조회</h2>
            <input
              type="text"
              ref={searchRegionRef}
              className="border border-gray-300 rounded-full w-[60%] px-4 py-2 text-sm focus:none shadow-sm"
              placeholder="지역을 입력하세요."
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={searchPlacesHandler}
              type="button"
              className="bg-red-900 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all"
            >
              검색
            </button>
          </div>
          <div className="w-full">
            <ul id="placesList" className="list-inside mt-4 overflow-y-auto w-full h-full"></ul>
          </div>
        </div>

        <div className="flex flex-col xl:w-[60%]">
          <button
            onClick={searchMyLocationHandler}
            className="flex gap-2 ml-auto my-2 items-center"
          >
            <p className="xl:text-[18px]">현재 내 위치</p>
            <MdLocationSearching className="w-[20px] h-[20px]" />
          </button>
          <div
            id="map"
            className="xl:w-full xl:h-[700px] w-full h-[calc(100vh-200px)] xl:mt-0"
          >
            {isLoading && <p className="truncate">지도를 불러오는 중...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryMap;
