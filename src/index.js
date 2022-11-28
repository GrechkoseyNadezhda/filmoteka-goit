import ApiService from './js/apiService';
import movieTemplate from './templates/movieTemplate.hbs';

const refs = {
  movieListRef: document.querySelector('.movie-list'),
  formRef: document.querySelector('.form'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

const apiService = new ApiService();

apiService
  .getData()
  .then(res => {
    refs.movieListRef.innerHTML = movieTemplate(res.data.results);
  })
  .catch(err => console.log(err));

async function onFormSubmit(e) {
  e.preventDefault();

  const query = e.target.elements.input.value;
  apiService.changeQuery(query);
  apiService.changePath();

  try {
    const {
      data: { results },
    } = await apiService.getData();

    console.log(results);

    refs.movieListRef.innerHTML = movieTemplate(results);
  } catch (err) {
    console.log(err);
  } finally {
    e.target.reset();
  }
}
