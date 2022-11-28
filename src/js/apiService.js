import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export default class ApiService {
  #API_KEY = '5ba51c2da469b356ab2a1378773a169b';

  constructor() {
    this.query = null;
    this.page = 1;
    this.path = '/trending/all/day';
  }

  getData() {
    return axios.get(this.path, {
      params: {
        query: this.query,
        page: this.page,
        api_key: this.#API_KEY,
      },
    });
  }

  getQuery() {
    return this.query;
  }

  changeQuery(newQuery) {
    this.query = newQuery;
  }

  resetQuery() {
    this.query = null;
  }

  changePath() {
    this.path = '/search/movie';
  }

  resetPath() {
    this.path = '/trending/all/day';
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getPage() {
    return this.page;
  }
}
