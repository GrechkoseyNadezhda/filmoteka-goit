import ApiService from './apiService';
const library = document.querySelector('.watched')
const WATCHED_FILM_KEY = 'watched-films';
const filmInfo = [436270, 668461];
// 436270  668461  119051


localStorage.setItem(WATCHED_FILM_KEY, JSON.stringify(filmInfo));

const myLibraryApi = new ApiService();

(async () => {
    const watchedFilms = localStorage.getItem(WATCHED_FILM_KEY);
    const parsedWatchedFilms = JSON.parse(watchedFilms);
    if (watchedFilms) {
      parsedWatchedFilms.forEach(async el => {
        try {
          const res = await myLibraryApi.getMovieById(el);
          const movieById = res.data
          const genres = movieById.genres.map(el => el.name).join(', ')
          const date = new Date(movieById.release_date).getFullYear()

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
                | ${date}</p>
            </div>
            </li>
          `
        library.insertAdjacentHTML('beforeend', markup)
        } catch (err) {
          console.log(err);
        }
      })
    }
  
})();

