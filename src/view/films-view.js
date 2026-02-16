import { createElement } from '../render.js';

const createContainerFilmsTemplate = () =>
  '<section class="films"></section>';

export default class FilmsView {
  #element = null;

  get template() {
    return createContainerFilmsTemplate();
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


