import { getUserLocation } from "./api/instances/getUserLocation";
//import { MidWeatherService } from "./api/services/weathers/dailyWeather.service";
import { WeatherService } from "./api/services/weathers/weather.service";
import "./main";
import "./styles/weather.scss";

const weatherService= new WeatherService();
//const midWeatherService=new MidWeatherService();

(async ()=>{
    const {lat,lon}=await getUserLocation();

    const weatherData=await weatherService.getCurrentWeather({
        params:{
            lat:lat,
            lon:lon,
        }
    })

    const jeonbWeatherData=await weatherService.getCurrentWeather({
        params:{
            lat:35.7532,
            lon:127.15
        }
    })

    const jeonNWeatherData=await weatherService.getCurrentWeather({
        params:{
            lon: 126.351,
            lat: 34.701
       
        }
    })

    // const seoulData=await weatherService.getCurrentWeather({
    //     params:{
    //         lat:,
    //         lon:,
    //     }
    // })
    // const midWeatherData=await midWeatherService.getMidWeather({
    //     params:{
    //         regId:'11D20501',
    //         tmFc:123,
    //         dataType:'JSON'
    //     }
       

    // })
    // console.log('mid',midWeatherData)
    // const weatherData = await weatherService.getCurrentWeather({
    //     params:{
    //         lat: 37.5665,
    //          lon: 126.978,
    //     }
    // })

    /**현재 사용자의 위치 기반 */
    const cityName=weatherData.name;
    const temperature = weatherData.main.temp;
    const feelsTemp=weatherData.main.feels_like;
    const humidity=weatherData.main.humidity;
    const wind = weatherData.wind.speed;
    const rain=weatherData?.rain?.["1h"] ?? "정보 없음";
    const cloud=weatherData.clouds.all;
    const maxTemp= weatherData.main.temp_max;
    const minTemp=weatherData.main.temp_min;
    const weatherIcon=weatherData.weather[0].icon;
    const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;


    const temperatureEle= document.getElementById("temperature")!;
    const cityEle = document.getElementById("city");
    const feelsEle = document.getElementById("feelsTemp");
    const humEle = document.getElementById('humidity');
    const windEle=document.getElementById('wind');
    const iconEle=document.getElementById('mainIcon');
    const rainEle=document.getElementById('rain');
    const cloudEle = document.getElementById('cloud')
    const minEle=document.getElementById('minTemp');
    const maxEle=document.getElementById('maxTemp');
    

    /**타 지역 위치 기반 */
    /**전북,전남 데이터  */
    const jeonb_temp = jeonbWeatherData.main.temp;
    const jeonN_temp = jeonNWeatherData.main.temp;
    const Icon= jeonbWeatherData.weather[0].icon;
    const jeonN_icon=jeonNWeatherData.weather[0].icon;
    const areaIconAdrs = `http://openweathermap.org/img/wn/${Icon}@2x.png`;
    const description=jeonbWeatherData.weather[0].description;
    const jeonNdes=jeonNWeatherData.weather[0].description;

    /**강원도,서울 데이터 */
    // const seoul_temp=seoulData.main.temp;

      /**전북,전남 엘리먼트  */
    const tempEle=document.getElementById('jeonb');
    const area1_icon=document.getElementById('jeonb_icon')
    const desEle=document.getElementById('description')
    const jeonNEle=document.getElementById('jeonN');
    const jeonNIcon=document.getElementById('jeonN_icon')
    const jeonNDes=document.getElementById('jeonDes')
    const jeonNIconAdrs=`http://openweathermap.org/img/wn/${jeonN_icon}@2x.png`;

    temperatureEle.textContent = `${(temperature-273.15).toFixed(2)}도`;
    cityEle && (cityEle.textContent = `${(cityName)}`)
    feelsEle&& (feelsEle.textContent=`${((feelsTemp)-273.15).toFixed(2)}도`)
    humEle&& (humEle.textContent=`${humidity}%`)
    windEle && (windEle.textContent=`${wind}m/s`)
    rainEle && (rainEle.textContent=`${rain}`)
    cloudEle && (cloudEle.textContent=`${cloud}`)
    minEle &&(minEle.textContent=`${(minTemp-273.15).toFixed(2)}도`)
    maxEle && (maxEle.textContent=`${(maxTemp-273.15).toFixed(2)}도`)
    if(iconEle){
        iconEle.src = weatherIconAdrs; // 이미지 URL을 img의 src 속성에 설정
        iconEle.alt = "Weather Icon";
    }
    if(area1_icon){
        area1_icon.src = areaIconAdrs; // 이미지 URL을 img의 src 속성에 설정
        area1_icon.alt = "Weather Icon";
    }
    if(jeonNIcon){
        jeonNIcon.src = jeonNIconAdrs; // 이미지 URL을 img의 src 속성에 설정
        jeonNIcon.alt = "Weather Icon";
    }

    /*전남,전북 */
    tempEle&&(tempEle.textContent = `${(jeonb_temp-273.15).toFixed(2)}도`);
    desEle&&(desEle.textContent=`${description}`);
    jeonNEle&&(jeonNEle.textContent =`${(jeonN_temp-273.15).toFixed(2)}도`);
    jeonNDes&&(jeonNDes.textContent=`${jeonNdes}`);




    console.log(jeonbWeatherData)
})();