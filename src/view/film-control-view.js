import AbstractView from '../framework/view/abstract-view.js';

const getClassActive = (isTrue) => isTrue ? 'film-card__controls-item--active' : '';

const createControlFilmTemplate = (userDetails) => {
  const { watchlist, alreadyWatched, favorite } = userDetails;
  return `<div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getClassActive(watchlist)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getClassActive(alreadyWatched)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${getClassActive(favorite)}" type="button">Mark as favorite</button>
  </div>`;
};

export default class ControlFilmView extends AbstractView {
  #userDetails = null;
  #type = null;

  constructor(userDetails) {
    super();
    this.#userDetails = userDetails;
  }

  get template() {
    return createControlFilmTemplate(this.#userDetails);
  }

  setBtnControlClick = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    if (!evt.target.classList.contains('film-card__controls-item')) {
      return;
    }

    if (evt.target.classList.contains('film-card__controls-item--add-to-watchlist')) {
      this.#type = 'watchlist';
    }

    if (evt.target.classList.contains('film-card__controls-item--mark-as-watched')) {
      this.#type = 'alreadyWatched';
    }

    if (evt.target.classList.contains('film-card__controls-item--favorite')) {
      this.#type = 'favorite';
    }

    this._callback.click(this.#type);
  };
}
