import AbstractView from '../framework/view/abstract-view.js';

const createPopupCloseTemplate = () => `<div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>`;

export default class PopupCloseView extends AbstractView {
  get template() {
    return createPopupCloseTemplate();
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
