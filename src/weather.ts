import { getUserLocation } from "./api/instances/getUserLocation";
import { DustService } from "./api/services/weathers/dust.service";
//import { MidWeatherService } from "./api/services/weathers/dailyWeather.service";
import { WeatherService } from "./api/services/weathers/weather.service";
import "./main";
import "./styles/weather.scss";

const weatherService = new WeatherService();
const dustService= new DustService();

//window라는 객체가 웹 문서를 불러올때 문서가 사용되는 시점에 실행되는 onload 함수.
//함수 내에 스크립트가 다 준비가 되어야만 실행.
window.onload=function(){
    
    const loading= document.querySelector('.loading') as HTMLDivElement || null ;
    const weatherDataDiv= document.querySelector('.main_weather') as HTMLDivElement || null;
    
    if(loading && weatherDataDiv){
        loading.style.visibility= 'visible'; //로딩 화면 보이게
        weatherDataDiv.style.display = 'none'; //날씨 데이터 표시되는 부분은 숨김
    }
    
};

(async ()=>{
    /**위치 */
    const {lat,lon}=await getUserLocation();
    /**시간 */
    const today=new Date();
    let year=today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');  // 월을 2자리로 표시
    let date = today.getDate().toString().padStart(2, '0');
    let today_date=year + '-' + month+ '-'+date;

    try {
        /** 날씨 및 미세먼지 데이터를 가져옴 */
        const weatherData = await weatherService.getCurrentWeather({
            params: { lat: lat, lon: lon }
        });

        const dustData = await dustService.getDust({
            params: {
                returnType: 'json',
                numOfRows: 100,
                pageNo: 1,
                searchDate: today_date,
                InformCode: 'PM10'
            }
        });
         /** 현재 전북 날씨 데이터 */
        const jeonbWeatherData=await weatherService.getCurrentWeather({
            params:{
                lat:35.7532,
                lon:127.15
            }
        })

        /** 현재 전남 날씨 데이터 */
        const jeonNWeatherData=await weatherService.getCurrentWeather({
            params:{
                lon: 126.351,
                lat: 34.701
        
            }
        })
        /** 현재 서울 날씨 데이터 */
        const seoulData=await weatherService.getCurrentWeather({
            params:{
                lat:37.5657,
                lon:126.978,
            }
        })
        /** 현재 강원도 날씨 데이터 */
        const gangwonData=await weatherService.getCurrentWeather({
            params:{
                lat:37.8228,
                lon:128.1555,
            }
        })

        // 데이터를 성공적으로 가져왔을 때만 ..로딩 화면을 숨김
        const loading= document.querySelector('.loading') as HTMLDivElement || null ;
        const weatherDataDiv= document.querySelector('.main_weather') as HTMLDivElement || null;
        
        if (loading && weatherDataDiv) {
            loading.style.visibility = 'hidden'; // 로딩 화면 숨김
            weatherDataDiv.style.display = 'flex'; // 날씨 데이터 표시
        }

        // 날씨 데이터를 화면에 표시함.
        updateWeatherUI(weatherData, dustData,gangwonData,seoulData,jeonNWeatherData,jeonbWeatherData);
    } catch (error) {
        console.error("오류: ", error);
        // 에러 발생 시
        const loading = document.querySelector('.loading') as HTMLDivElement || null ;
        if (loading) {
            loading.style.visibility = 'hidden';
        }
    }
})();
//화면에 딱 표시될때의 ui
function updateWeatherUI(weatherData: any, dustData: any,seoulData:any, gangwonData:any,jeonbWeatherData:any, jeonNWeatherData:any) {
    const today=new Date();
    let year=today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');  // 월을 2자리로 표시
    let date = today.getDate().toString().padStart(2, '0');
    let today_date=year + '-' + month+ '-'+date;


   /**미세먼지 데이터 요소 */
   const dust=dustData.response.body.items[0]?.informCause; //예보
   const dustInform=dustData.response.body.items[0]?.informOverall; 
   const dustEle=document.getElementById('dust');
   const informEle=document.getElementById('inform');
   
   dustEle && (dustEle.textContent=`${dust}`);
   informEle &&(informEle.textContent=`${dustInform}`);

    /**현재 사용자의 위치 기반 */
    const cityName=weatherData.name;  //도시명
    const temperature = weatherData.main.temp; //현재 기온
    const feelsTemp=weatherData.main.feels_like; //체감 온도
    const humidity=weatherData.main.humidity;  //습도
    const wind = weatherData.wind.speed;  //풍속
    const rain=weatherData?.rain?.["1h"] ?? "정보 없음";  //강수량
    const cloud=weatherData.clouds.all;  //구름양
    const maxTemp= weatherData.main.temp_max;  //최고온도
    const minTemp=weatherData.main.temp_min;   //최저온도

    const weatherIcon=weatherData.weather[0].icon;  //날씨 아이콘 
    const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    /**각 역할에 맞는 엘리먼트 요소 */
    const temperatureEle= document.getElementById("temperature")!;
    const cityEle = document.getElementById("city");
    const feelsEle = document.getElementById("feelsTemp");
    const humEle = document.getElementById('humidity');
    const windEle=document.getElementById('wind');
    const iconEle=document.getElementById('mainIcon') as HTMLImageElement | null;
    const rainEle=document.getElementById('rain');
    const cloudEle = document.getElementById('cloud')
    const minEle=document.getElementById('minTemp');
    const maxEle=document.getElementById('maxTemp');

    
    /**타 지역 */
    /**전북,전남 데이터  */
    const jeonb_temp = jeonbWeatherData.main.temp;  //전북 날씨
    const jeonN_temp = jeonNWeatherData.main.temp;  //전남 날씨
    const Icon= jeonbWeatherData.weather[0].icon;   //전북 날씨 아이콘
    const jeonN_icon=jeonNWeatherData.weather[0].icon; //전남 날씨 아이콘
    const areaIconAdrs = `http://openweathermap.org/img/wn/${Icon}@2x.png`;
    const description=jeonbWeatherData.weather[0].description;  //전북 날씨 설명
    const jeonNdes=jeonNWeatherData.weather[0].description;     //전남 날씨 설명

    /**강원도,서울 데이터 */
    const seoul_temp=seoulData.main.temp;   //서울 온도
    const Gangwon_temp=gangwonData.main.temp;  //강원도 온도
    const seoul_des=seoulData.weather[0].description;  //서울 날씨 설명
    const gang_des=gangwonData.weather[0].description; //강원도 날씨 설명
    const seoul_icon=seoulData.weather[0].icon;    //서울 날씨 아이콘
    const gang_icon=gangwonData.weather[0].icon;   //강원도 날씨 아이콘
    
    /**강원도,서울 엘리먼트 */
    const gangwonEle=document.getElementById('gangwon');  
    const seoulEle=document.getElementById('seoul');
    const gangwonDes=document.getElementById('gangDes');
    const seoulDes=document.getElementById('seoulDes');
    const seoulIcon=document.getElementById('seoul_icon') as HTMLImageElement | null;
    const gangIcon=document.getElementById('gang_icon') as HTMLImageElement | null;
    const seoulAdrs=`http://openweathermap.org/img/wn/${seoul_icon}@2x.png`;
    const gangAdrs=`http://openweathermap.org/img/wn/${gang_icon}@2x.png`;

      /**전북,전남 엘리먼트  */
    const tempEle=document.getElementById('jeonb');  
    const area1_icon=document.getElementById('jeonb_icon') as HTMLImageElement | null;
    const desEle=document.getElementById('description')
    const jeonNEle=document.getElementById('jeonN');
    const jeonNIcon=document.getElementById('jeonN_icon') as HTMLImageElement | null;
    const jeonNDes=document.getElementById('jeonDes')
    const jeonNIconAdrs=`http://openweathermap.org/img/wn/${jeonN_icon}@2x.png`;

    temperatureEle.textContent = `${(temperature-273.15).toFixed(2)}도`; //현재 온도 표시 
    cityEle && (cityEle.textContent = `${(cityName)}`)   //도시명 표시
    feelsEle&& (feelsEle.textContent=`${((feelsTemp)-273.15).toFixed(2)}도`)  //체감온도 표시
    humEle&& (humEle.textContent=`${humidity}%`)  //습도 표시
    windEle && (windEle.textContent=`${wind}m/s`) //풍속 표시
    rainEle && (rainEle.textContent=`${rain}`)    //강수량 표시
    cloudEle && (cloudEle.textContent=`${cloud}`)  //구름양 표시
    minEle &&(minEle.textContent=`${(minTemp-273.15).toFixed(2)}도`)   //최저 온도 표시
    maxEle && (maxEle.textContent=`${(maxTemp-273.15).toFixed(2)}도`)  //최고 온도 표시

    iconEle && (iconEle.src = weatherIconAdrs);// 이미지 URL을 img의 src 속성에 설정
    area1_icon && (area1_icon.src = areaIconAdrs); //전북 날씨 아이콘 표시
    jeonNIcon && (jeonNIcon.src = jeonNIconAdrs);   //전남 날씨 아이콘 표시
    seoulIcon && (seoulIcon.src = seoulAdrs);      //서울 날씨 아이콘 표시
    gangIcon && (gangIcon.src = gangAdrs);         //강원 날씨 아이콘 표시

    /*전남,전북 */
    tempEle&&(tempEle.textContent = `${(jeonb_temp-273.15).toFixed(2)}도`);  //전북 현재 온도 표시
    desEle&&(desEle.textContent=`${description}`);  //전북 날씨 설명 표시
    jeonNEle&&(jeonNEle.textContent =`${(jeonN_temp-273.15).toFixed(2)}도`);  //전남 현재 온도 표시
    jeonNDes&&(jeonNDes.textContent=`${jeonNdes}`);  //전북 날씨 설명 표시

    /**서울,강원도 */
    seoulEle&&(seoulEle.textContent=`${(seoul_temp-273.15).toFixed(2)}도`);   //서울 현재 온도 표시
    gangwonEle&&(gangwonEle.textContent=`${(Gangwon_temp-273.15).toFixed(2)}도`);  //강원도 현재 온도 표시
    seoulDes&&(seoulDes.textContent=`${seoul_des}`);  //서울 현재 날씨 설명 표시
    gangwonDes && (gangwonDes.textContent=`${gang_des}`);  //강원도 현재 날씨 설명 표시
    
    
    const dateEle = document.getElementById('today_date');
    dateEle && (dateEle.textContent=`${today_date}`)

    const messageEle = document.getElementById('message'); // 문구를 표시할 엘리먼트

    const calcTemp = parseInt((temperature - 273.15).toFixed(2));
    switch (true) {
        case calcTemp > 30:
            messageEle && (messageEle.textContent = '폭염 조심하세요!');
            break;
        case calcTemp > 27:
            messageEle && (messageEle.textContent = '다소 덥습니다.외출시 얇은 옷차림을 추천합니다');
            break;
        case calcTemp > 20:
            messageEle && (messageEle.textContent = '따뜻한 날씨입니다.');
            break;
        case calcTemp > 10:
            messageEle && (messageEle.textContent = '바람이 불 수 있으며,아우터를 꼭 챙기세요.');
            break;
        case calcTemp < -5:
            messageEle && (messageEle.textContent = '날씨가 몹시 추우니 보온에 각별히 유의해주세요!');
            break;
        default:
            messageEle && (messageEle.textContent = '몸관리와 한파 예방에 더욱더 신경써주세요.');
    }

   
   // console.log(dustData)
}
