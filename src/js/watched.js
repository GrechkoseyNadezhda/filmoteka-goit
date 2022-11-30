import ApiService from './apiService';
import Movie from './movie';

const WATCHED_FILM_KEY = 'watched-films';
const filmInfo = [436270];
// 436270  668461  119051
const library = document.querySelector('.watched')

localStorage.setItem(WATCHED_FILM_KEY, JSON.stringify(filmInfo));


const myLibraryApi = new ApiService();

async function onWatchedFilmsShow() {
  try {

    const movieId = filmInfo[0]
    const res = await myLibraryApi.getMovieById(movieId);
    const movieById = res.data
    const genres = movieById.genres.map(el => el.name).join(', ')
    const date = new Date(movieById.release_date).getFullYear()
    console.log(genres)

    const markup = `
      <li class='movie' data-id='${movieById.id}'>
      <img
        class='movie__img'
        width='440'
        src='https://image.tmdb.org/t/p/original/${movieById.poster_path}'
        alt='${movieById.title}'
        loading='lazy'
      />
      <div class='movie__info'>
        <p class='movie__name'>${movieById.title}</p>
        <p class='movie__description'>${genres}
          |
          ${date}</p>
      </div>
      </li>
    `

    library.innerHTML = markup

  } catch (err) {
    console.log(err);
  }
}
onWatchedFilmsShow()
