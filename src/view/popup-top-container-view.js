import { createElement } from '../render.js';

const createPopupTopTemplate = () => '<div class="film-details__top-container"></div>';

export default class PopupTopView {
  #element = null;

  get template() {
    return createPopupTopTemplate();
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
