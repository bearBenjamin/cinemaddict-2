import { createElement } from '../render.js';

const createListFilmsTemplate = () => `<div class="films-list__container">
</div>`;

export default class ListFilmsContainerView {
  getTemplate() {
    return createListFilmsTemplate();
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
