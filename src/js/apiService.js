import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
  api_key: '5ba51c2da469b356ab2a1378773a169b',
};

export default class ApiService {
  constructor() {
    this.page = 1;
  }

  getTrendingMovies() {
    return axios.get('/trending/all/day', {
      params: {
        page: this.page,
      },
    });
  }

  getMovieByName(movieName) {
    return axios.get('/search/movie', {
      params: {
        query: movieName,
        page: this.page,
      },
    });
  }

  getMovieById(movieId) {
    return axios.get(`/movie/${movieId}`);
  }

  getGengeList() {
    return axios.get('/genre/movie/list');
  }

  changePage(pageNumber) {
    this.page = pageNumber;
  }

  resetPage() {
    this.page = 1;
  }

  getPage() {
    return this.page;
  }
}