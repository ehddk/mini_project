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

    recMovieElement.innerHTML = `
    <div class="movie-container-inner">
        <div>
            <img src="${imageBaseUrl}${movie.poster_path}" alt="Recommended Movie" class="rec-movie-image"/>
        </div>
        <div>
        <p class="rec-movie-detail">영화 제목 : ${movie.title}</p>
        <p class="rec-movie-detail">영화 줄거리 : ${movie.overview}</p>
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

async function disPlayMovie() {
    try {
        const fetchResult = await fetchMovies();

        const { getNowPlaying, getUpComing } = fetchResult;

        // console.log("Now Playing Movies:", getNowPlaying);
        // console.log("Upcoming Movies:", getUpComing);

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

            // 가영님 코드
            // movies.results.forEach((movie) => {
            //     const listItem = document.createElement("li");
            //     listItem.innerHTML = `
            //         <a href="#">
            //             <div>
            //                 <img src="${imageBaseUrl}${movie.poster_path}" alt="" class="movie-image"/>
            //             </div>
            //         </a>`;
            //     listElement.appendChild(listItem);
            // });

            movies.results.forEach((movie) => {
                const listItem = document.createElement("a");
                listItem.href= "#";
                listItem.innerHTML = `
                    <div>
                        <img src="${imageBaseUrl}${movie.poster_path}" alt="" class="movie-image"/>
                    </div>
                    `;
                listElement.appendChild(listItem);
            });
        }

        // 현재 상영 중인 영화와 개봉 예정 영화 화면에 표시
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

// //버튼 이벤트
// document.addEventListener("DOMContentLoaded", () => {
//     function scrollMovies(container: HTMLElement, direction: "left" | "right") {
//         const scrollAmount = container.clientWidth;
//         container.scrollBy({
//             left: direction === "left" ? -scrollAmount : scrollAmount,
//             behavior: "smooth",
//         });
//     }

//     // 버튼 클릭 시 스크롤 이동 처리
//     document
//         .querySelectorAll(".movie-pager-prev, .movie-pager-next")
//         .forEach((button) => {
//             button.addEventListener("click", () => {
//                 const section = button.closest("section");
//                 const container = section?.querySelector(
//                     ".movie-list-detail"
//                 ) as HTMLElement;

//                 if (container) {
//                     const direction = button.classList.contains(
//                         "movie-pager-prev"
//                     )
//                         ? "left"
//                         : "right";
//                     scrollMovies(container, direction);
//                 }
//             });
//         });
// });

const swiper = new Swiper(".swiper", {
    autoplay: false,
    loop: true,
    slidesPerGroup: 3,
    direction: "horizontal",

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    scrollbar: {
        el: ".swiper-scrollbar",
    },
});
