/**현재 날씨 예보 */
export type getCurrentWeatherRequestParams = {
  /** 위도 */
  lat: number;
  /** 경도 */
  lon: number;
};

export type getCurrentWeatherRequestPath = {};

export type getCurrentWeatherRequestBody = {};

/** 현재 날씨 조회 요청 */
export type getCurrentWeatherRequest = {
  params: getCurrentWeatherRequestParams;
  path?: getCurrentWeatherRequestPath;
  body?: getCurrentWeatherRequestBody;
};

/** 현재 날씨 조회 응답 */
export type getCurrentWeatherResponse = {
  /** 좌표 */
  coord: {
    /** 경도 */
    lon: number;
    /** 위도 */
    lat: number;
  };
  /** 날씨 정보 */
  weather: Array<{
    /** ID */
    id: number;
    /** 날씨 상태 */
    main: string;
    /** 날씨 상태 설명 */
    description: string;
    /** 아이콘 */
    icon: string;
  }>;
  /** 기본 정보 */
  base: string;
  /** 메인 정보 */
  main: {
    /** 온도 */
    temp: number;
    /** 체감 온도 */
    feels_like: number;
    /** 최저 온도 */
    temp_min: number;
    /** 최고 온도 */
    temp_max: number;
    /** 기압 */
    pressure: number;
    /** 습도 */
    humidity: number;
    /** 해수면 기압 */
    sea_level: number;
    /** 지면 기압 */
    grnd_level: number;
  };
  /**강수 */
  rain: {'1h'?: number}
  /** 가시성 */
  visibility: number;
  /** 바람 정보 */
  wind: {
    /** 풍속 */
    speed: number;
    /** 풍향 */
    deg: number;
  };
  /** 구름 정보 */
  clouds: {
    /** 구름 양 */
    all: number;
  };
  /** 시간 정보 */
  dt: number;
  /** 시스템 정보 */
  sys: {
    /** 타입 */
    type: number;
    /** ID */
    id: number;
    /** 국가 */
    country: string;
    /** 일출 시간 */
    sunrise: number;
    /** 일몰 시간 */
    sunset: number;
  };
  /** 타임존 */
  timezone: number;
  /** 도시 ID */
  id: number;
  /** 도시 이름 */
  name: string;
  /** 응답 코드 */
  cod: number;
};



/**중기예보 날씨 조회 요청 */
export type getMidWeatherRequestParams={
  regId:string;
  tmFc:number;
  dataType:string;
}

export type getMidWeatherRequestBody={}
export type getMidWeatherRequestPath={}

export type getMidWeatherRequest={
  params: getMidWeatherRequestParams;
  body?:getMidWeatherRequestBody;
  path?:getCurrentWeatherRequestPath
}



/**중기예보 날씨 조회응답 */
// export type getMidWeatherResponse={
//     items  : {
//       item  : [
//         {
//               regId  : '11D20501',
//               taMin3  : number,
//               taMin3Low  :number,
//               taMin3High  :number,
//               taMax3  : number,
//               taMax3Low  :number,
//               taMax3High  :number,
//               taMin4  : number,
//               taMin4Low  :number,
//               taMin4High  :number,
//               taMax4  : number,
//               taMax4Low  :number,
//               taMax4High  :number,
//               taMin5  : number,
//               taMin5Low  :number,
//               taMax5  : number,
//               taMax5High  :number,
//               taMin6  : number,
//               taMin6Low  :number,
//               taMin6High  : number
//               taMax6  : number,
//               taMin5High  :number,
//               taMax6Low  :number,
//               taMax5Low  :number,
//               taMax6High  :number,
//               taMin7  : number,
//               taMin7Low  :number,
//               taMin7High  :number,
//               taMax7  : number,
//               taMax7Low  :number,
//               taMax7High  :number,
//               taMin8  : number,
//               taMin8Low  :number,
//               taMin8High  :number,
//               taMax8  : number,
//               taMax8Low  :number,
//               taMax8High  :number,
//               taMin9  : number,
//               taMin9Low  :number,
//               taMin9High  :number,
//               taMax9  : number,
//               taMax9Low  :number,
//               taMax9High  :number,
//               taMin10  : number,
//               taMin10Low  :number,
//               taMin10High  :number,
//               taMax10  : number,
//               taMax10Low  :number,
//               taMax10High  :number
//         }
//     ]
// },
// }