import { createElement } from '../render.js';

const createPopupCloseTemplate = () => `<div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>`;

export default class PopupCloseView {
  getTemplate() {
    return createPopupCloseTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
