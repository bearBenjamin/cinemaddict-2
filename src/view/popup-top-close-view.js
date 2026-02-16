import { createElement } from '../render.js';

const createPopupCloseTemplate = () => `<div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>`;

export default class PopupCloseView {
  #element = null;

  get template() {
    return createPopupCloseTemplate();
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
