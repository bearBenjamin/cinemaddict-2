import ListFilmsView from '../view/films-list-view.js';
import ListFilmsContainerView from '../view/films-container-view.js';
import ListFilmsEmptyView from '../view/films-list-empty-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import { render, remove } from '../framework/render';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsListPresenter {
  #mainContainer = null;
  #dataFilms = null;
  #films = null;
  #renderCard = null;
  #onCardFilmClick = null;

  #filmsList = new ListFilmsView();
  #filmsContainer = new ListFilmsContainerView();
  #showMoreBtn = new ShowMoreBtnView();

  #renderedFilmsCount = FILM_COUNT_PER_STEP;

  constructor(mainContainer, films) {
    this.#mainContainer = mainContainer;
    this.#films = films;
  }

  init = (dataFilms, renderCard, onCardFilmClick) => {
    this.#dataFilms = dataFilms;
    this.#renderCard = renderCard;
    this.#onCardFilmClick = onCardFilmClick;

    this.#renderFilmsList();
  };

  #onShowMoreBtnClick = () => {
    this.#dataFilms
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderCard(this.#filmsContainer.element, film));

    this.#renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#dataFilms.length) {
      remove(this.#showMoreBtn);
    }
  };

  #renderFilmsSection = () => {
    render (this.#films, this.#mainContainer);
  };

  #renderFilmsListConteiner = () => {
    render (this.#filmsContainer, this.#filmsList.element);
  };

  #renderListFilmsEmpty = () => {
    render(new ListFilmsEmptyView(), this.#films.element);
  };

  #renderFilms = (from, to) => {
    this.#dataFilms
      .slice(from, to)
      .forEach((film) => this.#renderCard(this.#filmsContainer.element, film));

    if (this.#dataFilms.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreBtn, this.#filmsList.element);

      this.#showMoreBtn.setClickHandler(this.#onShowMoreBtnClick);
    }

    this.#filmsContainer.setClickHandler(this.#onCardFilmClick);
  };

  #renderFilmsList = () => {
    this.#renderFilmsSection();

    if (this.#dataFilms.length === 0) {
      this.#renderListFilmsEmpty();
      return;
    }

    render (this.#filmsList, this.#films.element);

    this.#renderFilmsListConteiner();
    this.#renderFilms(0, Math.min(this.#dataFilms.length, FILM_COUNT_PER_STEP));
  };
}
