export default class Movie {
  constructor(el, genreIds) {
    this.id = el.id;
    this.img = this.setupImg();
    this.title = setupTitle();
    this.genres = setupGenres();
    this.releaseDate = setupYear();
  }

  setupImg() {
    console.log(el);
    return poster_path
      ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
      : 'https://dummyimage.com/395x592/000/fff.jpg&text=MOVIE+POSTER+IS+NOT+DEFINED';
  }

  setupTitle() {
    return title || name;
  }

  setupYear() {
    const date = release_date || first_air_date;
    return new Date(date).getFullYear();
  }

  setupGenres() {
    return genre_ids
      .map(id => genreIds[id])
      .filter(e => e)
      .join(', ');
  }
}
