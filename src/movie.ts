import "./main";
import "./styles/movie.scss";
import { NowPlayingService } from "./api/services/nowpPlying.service";
import { UpComingService } from "./api/services/upComing.service";

interface Movie {
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
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

// 추천 영화 표시
function displaySavedRecMovie(): void {
    const recMovie = localStorage.getItem("recommendedMovie");

    if (recMovie) {
        displayRecMovie(JSON.parse(recMovie));
    }
}

function displayRecMovie(movie: Movie): void {
    const recMovieElement = document.querySelector(".today-rec-movie");

    if (!recMovieElement) {
        console.error("No element found with class 'today-rec-movie'");
        return;
    }

    const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
    const overviewText = movie.overview ? movie.overview : "정보 없음";
    recMovieElement.innerHTML = `
    <div class="movie-container-inner">
        <div>
        <a href="">
            <img src="${imageBaseUrl}${movie.poster_path}" alt="Recommended Movie" class="rec-movie-image"/>
            </a>
        </div>
        <div>
        <p class="rec-movie-detail title">${movie.title}</p>
        <p class="rec-movie-detail">${overviewText}</p>
        <p class="rec-movie-detail">개봉일자 : ${movie.release_date}</p>
        <p class="rec-movie-detail">평점 : ${movie.vote_average}</p>
        </div>
    </div>
    `;
}

// 랜덤으로 영화 선택
function getRandomMovie(movies: Movie[]): Movie {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
}

// 랜덤 추천 영화 저장 및 업데이트
function updateRecMovie(movies: MovieResponse): void {
    const today = new Date().toDateString();
    const lastUpdatedDate = localStorage.getItem("recommendationDate");

    if (lastUpdatedDate !== today) {
        const recMovie = getRandomMovie(movies.results);
        localStorage.setItem("recommendedMovie", JSON.stringify(recMovie));
        localStorage.setItem("recommendationDate", today);
    }
}

// 영화 리스트를 화면에 표시
async function disPlayMovie() {
    try {
        const fetchResult = await fetchMovies();
        const { getNowPlaying, getUpComing } = fetchResult;
        function movieLists(movies: MovieResponse, movieId: string): void {
            const container = document.getElementById(movieId);
            if (!container) {
                console.error(`No element found with ID: ${movieId}`);
                return;
            }
            const listElement = container;
            const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
            movies.results.forEach((movie) => {
                if (movie.poster_path) {
                    const listItem = document.createElement("div");
                    listItem.classList.add("swiper-slide");
                    const posterUrl = `${imageBaseUrl}${movie.poster_path}`;
                    listItem.innerHTML = `
                        <img src="${posterUrl}" alt="${movie.title}" class="movie-image"/>
                    `;
                    listElement.appendChild(listItem);
                }
            });
        }

        movieLists(getNowPlaying, "movie-list-nowplaying");
        movieLists(getUpComing, "movie-list-upcoming");

        if (getNowPlaying.results.length > 0) {
            updateRecMovie(getNowPlaying);
            displaySavedRecMovie();
        }
    } catch (error) {
        console.error("Error fetching or displaying movies:", error);
    }
}

document.addEventListener("DOMContentLoaded", disPlayMovie);

/**스와이퍼*/
if ((window as any).Swiper) {
    new (window as any).Swiper(".swiper", {
        observer: true,
        observeParents: true,
        spaceBetween: 25,
        slidesPerView: "auto",
        loop: false,
        direction: "horizontal",
        slidesPerGroup: 3,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        scrollbar: {
            el: ".swiper-scrollbar",
        },

        pagination: {
            el: ".swiper-pagination",
        },
    });
}
