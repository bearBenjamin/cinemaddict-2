import { getFilm } from '../data.js';

export default class FilmsModel {
  films = Array.from({length: 5}, getFilm);

  getFilms = () => this.films;
}
