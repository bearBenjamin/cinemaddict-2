import AbstractView from '../framework/view/abstract-view.js';

const createPoupFilmTemplate = () =>
  '<section class="film-details"></section>';

export default class PopupView extends AbstractView {
  get template() {
    return createPoupFilmTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    const btnClose = evt.target.closest('.film-details__close-btn');
    if (!btnClose) {
      return;
    }
    document.querySelector('body').classList.remove('hide-overflow');
    this._callback.click();
  };
}
