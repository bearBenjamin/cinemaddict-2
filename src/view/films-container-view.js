import AbstractView from '../framework/view/abstract-view.js';

const createListFilmsTemplate = () => `<div class="films-list__container">
</div>`;

export default class ListFilmsContainerView extends AbstractView {
  get template() {
    return createListFilmsTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    const cardElement = evt.target.closest('.film-card');
    const isControlClicked = evt.target.closest('.film-card__controls');

    if (!cardElement) {
      return;
    }

    if (isControlClicked) {
      return;
    }

    const id = cardElement.dataset.id;
    document.querySelector('body').classList.add('hide-overflow');

    this._callback.click(id);
  };
}
