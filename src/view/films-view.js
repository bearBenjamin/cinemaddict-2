import { createElement } from '../render.js';

const createContainerFilmsTemplate = () =>
  '<section class="films"></section>';

export default class FilmsView {
  getTemplate() {
    return createContainerFilmsTemplate();
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


