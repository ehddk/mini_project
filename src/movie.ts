import "./main";
import "./styles/movie.scss";
import { NowPlayingService } from "./api/services/nowpPlying.service";
import { UpComingService } from "./api/services/upComing.service";

interface Movie {
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
}

interface MovieResponse {
    results: Movie[];
}

const nowPlayingService = new NowPlayingService();
const upComingService = new UpComingService();

// 영화 정보 요청
async function fetchMovies() {
    const getNowPlaying = await nowPlayingService.getNowPlaying({
        params: {
            language: "ko-KR",
            page: 1,
        },
    });
    const getUpComing = await upComingService.getUpComing({
        params: {
            language: "ko-KR",
            page: 1,
        },
    });

    return {
        getNowPlaying: { results: getNowPlaying.results },
        getUpComing: { results: getUpComing.results },
    };
}

// 랜덤으로 영화 선택
function getRandomMovie(movies: Movie[]): Movie {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
}

// 추천 영화 표시
function displayRecMovie(movie: Movie): void {
    const recMovieElement = document.querySelector(".today-rec-movie");

    if (!recMovieElement) {
        console.error("No element found with class 'today-rec-movie'");
        return;
    }

    const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

    recMovieElement.innerHTML = `
    <section class="movie-container-inner">
        <div>
            <img src="${imageBaseUrl}${movie.poster_path}" alt="Recommended Movie" class="rec-movie-image"/>
        </div>
        <div>
        <p>영화 제목 : ${movie.title}</p>
        <p>영화 줄거리 : ${movie.overview}</p>
        <p>평점 : ${movie.vote_average}</p>

        </div>
    </section>
    `;
}

// 랜덤 추천 영화 저장 및 업데이트
function updateRecMovie(movies: MovieResponse): void {
    const today = new Date().toDateString();
    const lastUpdatedDate = localStorage.getItem("recommendationDate");

    // 매일 새로운 영화 업데이트
    if (lastUpdatedDate !== today) {
        const recMovie = getRandomMovie(movies.results);
        localStorage.setItem("recommendedMovie", JSON.stringify(recMovie));
        localStorage.setItem("recommendationDate", today);
    }
}

// 추천 영화 표시
function displaySavedRecMovie(): void {
    const recMovie = localStorage.getItem("recommendedMovie");

    if (recMovie) {
        displayRecMovie(JSON.parse(recMovie));
    }
}

async function disPlayMovie() {
    try {
        // 데이터 가져오기
        const fetchResult = await fetchMovies();

        // 현재 상영 중인 영화와 개봉 예정 영화 추출
        const { getNowPlaying, getUpComing } = fetchResult;

        console.log("Now Playing Movies:", getNowPlaying);
        console.log("Upcoming Movies:", getUpComing);

        // 영화 리스트를 화면에 표시
        function movieLists(movies: MovieResponse, movieId: string): void {
            const container = document.getElementById(movieId);

            if (!container) {
                console.error(`No element found with ID: ${movieId}`);
                return;
            }

            const listElement = container.querySelector(".movie-list-detail");

            if (!listElement) {
                console.error(
                    `No element found with class 'movie-list-detail' inside ID: ${movieId}`
                );
                return;
            }

            const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

            movies.results.forEach((movie) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <a href="#">
                        <div>
                            <img src="${imageBaseUrl}${movie.poster_path}" alt="" class="movie-image"/>
                        </div>
                    </a>`;
                listElement.appendChild(listItem);
            });
        }

        // 현재 상영 중인 영화와 개봉 예정 영화 화면에 표시
        movieLists(getNowPlaying, "movie-list-nowplaying");
        movieLists(getUpComing, "movie-list-upcoming");

        // 현재 상영중인 영화 중 1개 추천 영화로 표시
        if (getNowPlaying.results.length > 0) {
            updateRecMovie(getNowPlaying);
            displaySavedRecMovie();
        }
    } catch (error) {
        console.error("Error fetching or displaying movies:", error);
    }
}

document.addEventListener("DOMContentLoaded", disPlayMovie);
