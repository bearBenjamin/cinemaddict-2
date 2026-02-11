import { createElement } from '../render.js';

const createContainerFilmTemplate = () => `<article class="film-card">
</article>`;

export default class CardFilmView {
  getTemplate() {
    return createContainerFilmTemplate();
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
