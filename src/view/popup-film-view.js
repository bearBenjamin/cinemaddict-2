import { createElement } from '../render.js';

const createPoupFilmTemplate = () =>
  '<section class="film-details"></section>';

export default class PopupView {
  #element = null;

  get template() {
    return createPoupFilmTemplate();
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
