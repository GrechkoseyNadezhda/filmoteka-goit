import ApiService from './apiService';
import Movie from './movie';
import '../index';

const WATCHED_FILM_KEY = 'watched-films';
const filmInfo = [119051];
const library = document.querySelector('.library')

localStorage.setItem(WATCHED_FILM_KEY, JSON.stringify(filmInfo));


const myLibraryApi = new ApiService();

async function onWatchedFilmsShow(e) {
  try {
    const movieId = filmInfo[0]
    const res = await myLibraryApi.getMovieById(movieId);
    const movieById = res.data
    console.log(movieById)


  } catch (err) {
    console.log(err);
  }
}
onWatchedFilmsShow()


{/* <a href="./watched.html">ССЫЛКА</a> */}