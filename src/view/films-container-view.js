import { createElement } from '../render.js';

const createListFilmsTemplate = () => `<div class="films-list__container">
</div>`;

export default class ListFilmsContainerView {
  #element = null;

  get template() {
    return createListFilmsTemplate();
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
