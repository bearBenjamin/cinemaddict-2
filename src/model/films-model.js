export default class FilmsModel {
  #films = [];

  constructor(films) {
    this.#films = films;
  }

  getFilms = () => this.#films;
}
