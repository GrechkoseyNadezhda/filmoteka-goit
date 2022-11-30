import ApiService from './js/apiService';
import Movie from './js/movie';
import MovieTemplate from './templates/movieTemplate.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import {container, paginationSettings} from './js/pagination'
import './js/movie'


const refs = {
  movieListRef: document.querySelector('.movie-list'),
  formRef: document.querySelector('.header__search'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

export const apiService = new ApiService();

async function fillMovies(page) {
  try {
    const {
      data: { results, total_results },
    } = await apiService.getTrendingMovies();

    initPagination({
      page,
      itemsPerPage: results.length,
      totalItems: total_results
    })

    const markup = await parseObjects(results);

    refs.movieListRef.innerHTML = MovieTemplate(markup);
  } catch (err) {
    console.log(err);
  }
}

fillMovies(paginationSettings.startPage);

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
    } = await apiService.getGengeList();

    return arr.map(el => new Movie(el, genres));
  } catch (err) {
    console.log(err);
  }
}


function initPagination ({ page, itemsPerPage, totalItems }) {
  const options = {
    totalItems,
    itemsPerPage,
    page,
    visiblePages: 5,
    centerAlign: false,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
        '</a>'
    }
  };
  const pagination = new Pagination(container, options);

  paginationSettings.pagination = pagination;

  pagination.on('afterMove', async ({ page }) => {
    apiService.page = page

    window.scroll(0,0);
    fillMovies(page)

  });

}