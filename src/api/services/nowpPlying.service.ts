import {
    getNowPlayingRequest,
    getNowPlayingResponse,
} from "../@types/nowPlaying.type";

const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDEzYjkzN2JkNDQ3NGJhNjdkYmNhOWMzYjExMDJjNSIsIm5iZiI6MTcyNDE0MDc1OS45NjM5MDMsInN1YiI6IjY2YmFjM2Q5NmZlMTdmZDRjYzY0YTFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2sqAs4Fwk7kLWIsrlz39n60OeqFpobQ978QTrd3UJK4";

export class NowPlayingService {
    /** 개봉 예정 영화 조회 */
    async getNowPlaying(req: getNowPlayingRequest) {
        const { params } = req;
        const url = new URL(
            `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`
        );

        Object.entries({
            ...params,
            appid: API_KEY,
        }).forEach(([key, value]) => {
            url.searchParams.append(key, value.toString());
        });

        const res = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });

        const data = (await res.json()) as getNowPlayingResponse;

        return data;
    }
}
