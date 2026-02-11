import { createElement } from '../render.js';

const createPopupTopTemplate = () => '<div class="film-details__bottom-container"></div>';

export default class PopupBottomView {
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
