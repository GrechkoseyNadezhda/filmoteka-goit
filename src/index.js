import ApiService from './js/apiService';
import movieTemplate from './templates/movieTemplate.hbs';

const refs = {
  movieListRef: document.querySelector('.movie-list'),
  formRef: document.querySelector('.form'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

const apiService = new ApiService();

async function fillMovies() {
  try {
    const {
      data: { results },
    } = await apiService.getTrendingMovies();

    const markup = await parseObjects(results);

    console.log(results);
    refs.movieListRef.innerHTML = movieTemplate(markup);
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

    console.log(results);
    const newArr = parseObjects(results);
    console.log(newArr);

    refs.movieListRef.innerHTML = movieTemplate(newArr);
  } catch (err) {
    console.log(err);
  } finally {
    e.target.reset();
  }
}

async function parseObjects(arr) {
  const {
    data: { genres },
  } = await apiService.getGengeList();

  const genreIds = genres.reduce((acc, el) => {
    return {
      ...acc,
      [el.id]: el.name,
    };
  }, {});

  return arr.map(el => {
    return {
      id: el.id,
      img: el.poster_path
        ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
        : 'https://dummyimage.com/395x592/000/fff.jpg&text=MOVIE+POSTER+IS+NOT+DEFINED',
      title: el.title || el.name,
      genres: el.genre_ids
        .map(id => genreIds[id])
        .filter(e => e)
        .join(', '),
      releaseDate: el.release_date || el.first_air_date,
    };
  });
}
