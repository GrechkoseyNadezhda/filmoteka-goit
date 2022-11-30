import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import ApiService from './apiService';

const movieItemEl = document.querySelector('.movie-list');
const imageEl = document.querySelector('.modal_image');
const titleNameValueEl = document.querySelector('.modal_info_name');
const voteValueEl = document.querySelector('[data-vote]');
const votesSumValueEl = document.querySelector('[data-votes]');
const popularityValueEl = document.querySelector('[data-popularity]');
const original_titleValueEl = document.querySelector('[data-title]');
const genresValueEl = document.querySelector('[data-genres]');
const overviewValueEl = document.querySelector('[data-text-overview]');
const modalWindowEl = document.getElementById('modal_window');
const closeModalBtn = document.querySelector('.modal_close_btn');
const modalBackDropToCloseEl = document.querySelector('.js-backdrop');
const addToWatchedListBtn = document.querySelector('.js-toWatchBtn');
const addToQueueListBtn = document.querySelector('.js-toAddtoQue');

const onClickOpenModal = event => {
  if (event.target.tagName === 'UL') {
    return;
  }
  Loading.standard({
    clickToClose: true,
    svgSize: '100px',
    cssAnimationDuration: 0,
  });

  const movieId = event.target.closest('li').getAttribute('data-id');
  const newMovie = new ApiService();
  newMovie
    .getMovieById(movieId)
    .then(object => {
      titleNameValueEl.textContent = object.data.original_title;
      voteValueEl.textContent = object.data.vote_average;
      votesSumValueEl.textContent = object.data.vote_count;
      popularityValueEl.textContent = object.data.popularity;
      original_titleValueEl.textContent = object.data.original_title;
      overviewValueEl.textContent = object.data.overview;
      genresValueEl.textContent = object.data.genres
        .map(el => el.name)
        .join(', ');
      imageEl.src = event.target.closest('LI').querySelector('img').src;
      modalWindowEl.showModal();
    })
    .catch(err =>
      Notify.info('Sorry, this movie is currently unavailable!', {
        fontSize: '16px',
        width: '200px',
      })
    )
    .finally(Loading.remove);
};

const onClickCloseModal = event => {
  if (
    event.target.tagName === 'DIALOG' ||
    event.target.closest('.modal_close_btn')
  ) {
    modalWindowEl.close();
  }
};

const addToWatchedList = event => console.log('Ooooooo');

const addToQueueList = event => console.log('Aaaaaaa');

movieItemEl.addEventListener('click', onClickOpenModal);
window.addEventListener('click', onClickCloseModal);
addToWatchedListBtn.addEventListener('click', addToWatchedList);
addToQueueListBtn.addEventListener('click', addToQueueList);
