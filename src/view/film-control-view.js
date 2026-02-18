import AbstractView from '../framework/view/abstract-view.js';

const createControlFilmTemplate = () => `
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
</div>`;

export default class ControlFilmView extends AbstractView {
  get template() {
    return createControlFilmTemplate();
  }
}
