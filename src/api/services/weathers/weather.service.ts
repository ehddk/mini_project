import {
  getCurrentWeatherRequest,
  getCurrentWeatherResponse,
} from "../../@types/weathers/weather.type";

//const API_KEY = "c33a21799543cf7c08f96007d18f8add";
const API_KEY = "68651cebe0326dadf201e10763812be2";

export class WeatherService {
  /** 현재 날씨 조회 */
  async getCurrentWeather(req: getCurrentWeatherRequest) {
    const { params } = req;
    const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);
  
    Object.entries({
      ...params,
      appid: API_KEY,
    }).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    const res = await fetch(url);

    const data = (await res.json()) as getCurrentWeatherResponse;

    return data;
    
  }
}