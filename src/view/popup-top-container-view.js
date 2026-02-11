import { createElement } from '../render.js';

const createPopupTopTemplate = () => '<div class="film-details__top-container"></div>';

export default class PopupTopView {
  getTemplate() {
    return createPopupTopTemplate();
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
