export default class Movie {
  constructor(el, genres) {
    this.id = el.id;
    this.img = this.setupImg(el);
    this.title = this.setupTitle(el);
    this.genres = this.setupGenres(el, genres);
    this.releaseDate = this.setupYear(el);
  }

  setupImg(el) {
    return el.poster_path
      ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
      : 'https://dummyimage.com/395x592/000/fff.jpg&text=MOVIE+POSTER+IS+NOT+DEFINED';
  }

  setupTitle(el) {
    return el.title || el.name;
  }

  setupYear(el) {
    return new Date(el.release_date || el.first_air_date).getFullYear();
  }

  setupGenres(el, genres) {
    const groupedGenres = this.groupGenres(genres);
    if (el.genre_ids) {
      return el.genre_ids
      .map(id => groupedGenres[id])
      .filter(e => e)
      .join(', ');
    } else {
      return '';
    }
  }

  groupGenres(genres) {
    return genres.reduce((acc, el) => {
      return {
        ...acc,
        [el.id]: el.name,
      };
    }, {});
  }
}
