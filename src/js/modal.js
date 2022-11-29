import ApiService from './apiService';

const movieItemEl = document.querySelector('.movie-list')
const imageEl = document.querySelector('.modal_image')
const titleNameValueEl = document.querySelector('.modal_info_name')
const voteValueEl = document.querySelector('[data-vote]')
const votesSumValueEl = document.querySelector('[data-votes]')
const popularityValueEl = document.querySelector('[data-popularity]')
const original_titleValueEl = document.querySelector('[data-title]')
const genresValueEl = document.querySelector('[data-genres]')
const overviewValueEl = document.querySelector('[data-text-overview]')
const modalWindowEl = document.getElementById("modal_window");
const closeModalBtn = document.querySelector('.modal_close_btn')

const onClickOpenModal = event => {
    
    const movieId = event.target.closest('li').getAttribute('data-id') 

    const newMovie = new ApiService();
    newMovie.getMovieById(movieId)
    .then(object => { console.log(object.data)
        titleNameValueEl.textContent = object.data.original_title;
        voteValueEl.textContent = object.data.vote_average;
        votesSumValueEl.textContent = object.data.vote_count;
        popularityValueEl.textContent = object.data.popularity;
        original_titleValueEl.textContent = object.data.original_title;
        overviewValueEl.textContent = object.data.overview;
        genresValueEl.textContent = object.data.genres.map(el => el.name).join(', ')
        imageEl.src = event.target.closest('IMG').src
    })
    .catch(err => console.log(err))
    modalWindowEl.showModal();
}

const onClickCloseModal = event => {
  
    modalWindowEl.close()
}
movieItemEl.addEventListener('click', onClickOpenModal)
closeModalBtn.addEventListener('click', onClickCloseModal)
