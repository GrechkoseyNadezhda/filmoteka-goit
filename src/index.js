import ApiService from './js/apiService';
import Movie from './js/movie';
import MovieTemplate from './templates/movieTemplate.hbs';

const refs = {
  movieListRef: document.querySelector('.movie-list'),
  formRef: document.querySelector('.header__search'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

const apiService = new ApiService();

async function fillMovies() {
  try {
    const {
      data: { results },
    } = await apiService.getTrendingMovies();

    const markup = await parseObjects(results);

    refs.movieListRef.innerHTML = MovieTemplate(markup);
  } catch (err) {
    console.log(err);
  }
}

fillMovies();

async function onFormSubmit(e) {
  e.preventDefault();

  const query = e.target.elements.input.value;

  try {
    const {
      data: { results },
    } = await apiService.getMovieByName(query);

    const newArr = await parseObjects(results);

    refs.movieListRef.innerHTML = MovieTemplate(newArr);
  } catch (err) {
    console.log(err);
  } finally {
    e.target.reset();
  }
}

async function parseObjects(arr) {
  try {
    const {
      data: { genres },
    } = await apiService.getGenges();

    return arr.map(el => new Movie(el, genres));
  } catch (err) {
    console.log(err);
  }
}
