import AbstractView from '../framework/view/abstract-view.js';

const createContainerFilmTemplate = (id) => `<article class="film-card" data-id="${id}"></article>`;

export default class CardFilmView extends AbstractView{
  #id = null;

  constructor (id) {
    super();
    this.#id = id;
  }

  get template() {
    return createContainerFilmTemplate(this.#id);
  }

}
