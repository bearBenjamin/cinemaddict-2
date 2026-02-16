import { createElement } from '../render.js';

const createPopupTopTemplate = () => '<div class="film-details__bottom-container"></div>';

export default class PopupBottomView {
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
