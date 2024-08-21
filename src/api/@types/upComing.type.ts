export type getUpComingRequestParams = {
    /**언어 */
    language: string;
    /** 페이지 수 */
    page: number;
};

export type getUpComingRequestPath = {};
export type getUpComingRequestBody = {};

/** 개봉 예정 영화 조회 요청 */
export type getUpComingRequest = {
    params: getUpComingRequestParams;
    path?: getUpComingRequestPath;
    body?: getUpComingRequestBody;
};

/** 개봉 예정 영화 조회 응답 */
export type getUpComingResponse = {
    /** 날짜 */
    dates: {
        /** 조회 종료 날짜 */
        maximum: string;
        /** 조회 시작 날짜 */
        minimum: string;
    };
    /** 페이지수 */
    page: number;
    /** 결과 */
    results: [
        {
            /** 성인 인증 */
            adult: boolean;
            /** 영화 이미지 */
            backdrop_path: string;
            /** 장르 아이디 */
            genre_ids: number;
            /** 아이디 */
            id: number;
            /** 영화 기본 언어 */
            original_language: string;
            /** 영화 제목 */
            original_title: string;
            /** 영화 개요 */
            overview: string;
            /** 인기 지표 */
            popularity: 2825.641;
            /** 포스터 경로 */
            poster_path: string;
            /** 개봉일자 */
            release_date: string;
            /** 영화 제목 */
            title: string;
            /** 비디오 유무 */
            video: string;
            /** 평점 */
            vote_average: number;
            /** 영화 투표 수 */
            vote_count: number;
        }
    ];
    /** 총 페이지 */
    total_pages: number;
    /** 총 결과 */
    total_results: number;
};
