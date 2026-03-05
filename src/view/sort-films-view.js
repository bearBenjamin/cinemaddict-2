import AbstractView from '../framework/view/abstract-view.js';

const createSortFilmsTemplate = () => `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="date">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="rating">Sort by rating</a></li>
  </ul>`;

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

  updateBtnSort = (sortType) => {
    const btns = this.element.querySelectorAll('.sort__button');

    btns.forEach((btn) => {
      btn.classList.remove('sort__button--active');
    });

    const activeBtn = this.element.querySelector(`[data-sort-type="${sortType}"]`);

    if (activeBtn) {
      activeBtn.classList.add('sort__button--active');
    }
  };

  #clickHandler = (evt) => {
    if (evt.target.classList.contains('sort__button')) {
      this.#sort = evt.target.dataset.sortType;
      if (this.#sort) {
        evt.preventDefault();
        this._callback.click(this.#sort);
      }
    }
  };
}
