import AbstractView from '../framework/view/abstract-view.js';

const createStatisticTemplate = (films) => {
  const sumFilms = films.length;
  return `<p>${sumFilms} movies inside</p>`;
};

export default class StaisticView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createStatisticTemplate(this.#films);
  }
}
