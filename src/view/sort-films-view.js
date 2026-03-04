import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../sort.js';

const createSortFilmsTemplate = (sortType) => {
  const getClassActive = (type) => (type === sortType) ? 'sort__button--active' : '';
  return `<ul class="sort">
    <li><a href="#" class="sort__button ${getClassActive(SortType.DEFAULT)}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${getClassActive(SortType.DATE)}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${getClassActive(SortType.RATING)}">Sort by rating</a></li>
  </ul>`;
};

export default class SortFilmsView extends AbstractView {
  #currentSort = null;
  #sort = null;

  constructor (currentSort) {
    super();
    this.#currentSort = currentSort;
  }

  get template() {
    return createSortFilmsTemplate(this.#currentSort);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    if (evt.target.classList.contains('sort__button')) {
      switch (evt.target.textContent) {
        case 'Sort by default':
          this.#sort = 'default';
          break;
        case 'Sort by date' :
          this.#sort = 'date';
          break;
        case 'Sort by rating' :
          this.#sort = 'rating';
          break;
      }
    } else {
      return;
    }

    this._callback.click(this.#sort);
  };
}
