import AbstractView from '../framework/view/abstract-view.js';

const getClassActive = (isTrue) => isTrue ? 'film-details__control-button--active' : '';

const createPoupControlTemplate = (userDetails) => {
  const { watchlist, alreadyWatched, favorite } = userDetails;
  return `<section class="film-details__controls">
        <button type="button" class="film-details__control-button ${getClassActive(watchlist)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${getClassActive(alreadyWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${getClassActive(favorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>`;

};
export default class PopupControlView extends AbstractView {
  #userDetails = null;
  #type = null;

  constructor(userDetails) {
    super();
    this.#userDetails = userDetails;
  }

  get template() {
    return createPoupControlTemplate(this.#userDetails);
  }

  setBtnControlClick = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onBtnControlClick);
  };

  #onBtnControlClick = (evt) => {
    if (evt.target.classList.contains('film-details__control-button--watchlist')) {
      this.#type = 'watchlist';
    } else if (evt.target.classList.contains('film-details__control-button--watched')) {
      this.#type = 'alreadyWatched';
    } else if (evt.target.classList.contains('film-details__control-button--favorite')) {
      this.#type = 'favorite';
    } else {
      return;
    }

    this._callback.click(this.#type);
  };
}
