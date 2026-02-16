import { createElement } from '../render.js';

const createContainerFilmTemplate = (id) => `<article class="film-card" data-id="${id}"></article>`;

export default class CardFilmView {
  #element = null;
  #id = null;

  constructor (id) {
    this.#id = id;
  }

  get template() {
    return createContainerFilmTemplate(this.#id);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
