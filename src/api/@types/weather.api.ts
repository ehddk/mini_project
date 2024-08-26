// https://api.openweathermap.org/data/2.5/forecast?lat=45.67&lon=126.0889&appid=c33a21799543cf7c08f96007d18f8add

// 날씨 api - fontawesome 아이콘
var weatherIcon: { [key: string]: string } = {
  "01": "fas fa-sun",
  "02": "fas fa-cloud-sun",
  "03": "fas fa-cloud",
  "04": "fas fa-cloud-meatball",
  "09": "fas fa-cloud-sun-rain",
  "10": "fas fa-cloud-showers-heavy",
  "11": "fas fa-poo-storm",
  "13": "far fa-snowflake",
  "50": "fas fa-smog",
};

// API 응답의 타입을 정의합니다.
interface WeatherResponse {
  weather: { icon: string }[];
  main: { temp: number; humidity: number; temp_min: number; temp_max: number };
  wind: { speed: number };
  name: string;
  clouds: { all: number };
}

// 위치 정보를 받아오는 함수
function getWeatherByLocation(lat: number, lon: number): void {
  const apiKey = "c33a21799543cf7c08f96007d18f8add"; // 실제 API 키로 교체하세요.
  const apiURI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(apiURI)
    .then((response) => response.json())
    .then((resp: WeatherResponse) => {
      const Icon = resp.weather[0].icon.substr(0, 2);
      const Temp = Math.floor(resp.main.temp - 273.15) + "º";
      const humidity =
        "습도&nbsp;&nbsp;&nbsp;&nbsp;" + resp.main.humidity + " %";
      const wind = "바람&nbsp;&nbsp;&nbsp;&nbsp;" + resp.wind.speed + " m/s";
      const city = resp.name;
      const cloud = "구름&nbsp;&nbsp;&nbsp;&nbsp;" + resp.clouds.all + "%";
      const temp_min =
        "최저 온도&nbsp;&nbsp;&nbsp;&nbsp;" +
        Math.floor(resp.main.temp_min - 273.15) +
        "º";
      const temp_max =
        "최고 온도&nbsp;&nbsp;&nbsp;&nbsp;" +
        Math.floor(resp.main.temp_max - 273.15) +
        "º";

      // DOM 업데이트 부분
      document.querySelector(".weather .icon")!.innerHTML =
        '<i class="' + weatherIcon[Icon] + '" ></i>';
      document.querySelector(".current_temp")!.textContent = Temp;
      document.querySelector(".humidity")!.innerHTML = humidity;
      document.querySelector(".wind")!.innerHTML = wind;
      document.querySelector(".city")!.textContent = city;
      document.querySelector(".cloud")!.innerHTML = cloud;
      document.querySelector(".temp_min")!.innerHTML = temp_min;
      document.querySelector(".temp_max")!.innerHTML = temp_max;
    })
    .catch((error) =>
      console.error("날씨 데이터를 불러오는 중 오류 발생:", error)
    );
}

// 사용자의 현재 위치를 받아오는 함수
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByLocation(lat, lon); // 위도와 경도로 날씨 정보를 가져옵니다
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// 페이지 로드 시 현재 위치의 날씨를 받아오기
getLocation();
