import ListFilmsView from '../view/films-list-view.js';
import ListFilmsContainerView from '../view/films-container-view.js';
import ListFilmsEmptyView from '../view/films-list-empty-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import SortFilmsView from '../view/sort-films-view';
import { SortType, sortDate, sortRating } from '../sort.js';
import { render, remove, RenderPosition } from '../framework/render';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsListPresenter {
  #mainContainer = null;
  #dataFilms = null;
  #filmsSection = null;
  #onCardFilmClick = null;
  #filmChange = null;

  #filmsList = new ListFilmsView();
  #filmsContainer = new ListFilmsContainerView();

  #sortComponent = null;
  #currentSort = SortType.DEFAULT;
  #sortFilms = [];

  #showMoreBtn = new ShowMoreBtnView();

  #renderedFilmsCount = FILM_COUNT_PER_STEP;

  #filmCardPresenter = new Map();

  constructor(mainContainer, films) {
    this.#mainContainer = mainContainer;
    this.#filmsSection = films;
  }

  init = (dataFilms, onCardFilmClick, filmChange) => {
    this.#dataFilms = dataFilms;
    this.#sortFilms = [...dataFilms];
    this.#onCardFilmClick = onCardFilmClick;
    this.#filmChange = filmChange;

    this.#renderList();
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

  updateCard = (updatedFilm) => {
    const presenter = this.#filmCardPresenter.get(updatedFilm.id);

    if (presenter) {
      presenter.init(updatedFilm);
    }
  };

  #renderCard = (cardsContainer, data) => {
    const filmCardPresenter = new FilmCardPresenter(cardsContainer, this.#filmChange);
    filmCardPresenter.init(data);
    this.#filmCardPresenter.set(data.id, filmCardPresenter);
  };

  #renderFilmsSection = () => {
    render (this.#filmsSection, this.#mainContainer);
  };

  #renderFilmsList = () => {
    render (this.#filmsList, this.#filmsSection.element, RenderPosition.AFTERBEGIN);
  };

  #renderFilmsListConteiner = () => {
    render (this.#filmsContainer, this.#filmsList.element);
  };

  #renderListFilmsEmpty = () => {
    render(new ListFilmsEmptyView(), this.#filmsSection.element);
  };

  #renderFilms = (from, to) => {
    this.#dataFilms
      .slice(from, to)
      .forEach((film) => this.#renderCard(this.#filmsContainer.element, film));

    if (this.#dataFilms.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreBtn, this.#filmsList.element);

      this.#showMoreBtn.setClickHandler(this.#onShowMoreBtnClick);
    }
  };

  #clearList = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    remove(this.#filmsContainer);
    this.#renderedFilmsCount = FILM_COUNT_PER_STEP;
  };

  #updateFilms = (newFilms) => {
    this.#dataFilms = newFilms;

    this.#clearList();

    this.#renderFilmsListConteiner();

    this.#renderFilms(0, Math.min(newFilms.length, FILM_COUNT_PER_STEP));

    this.#filmsContainer.setClickHandler(this.#onCardFilmClick);
  };

  #applaySorting = (sortType) => {
    switch(sortType) {
      case 'date' :
        this.#dataFilms.sort(sortDate);
        break;
      case 'rating' :
        this.#dataFilms.sort(sortRating);
        break;
      default:
        this.#dataFilms = [...this.#sortFilms];
    }

    this.#currentSort = sortType;
  };

  #onBtnSortClick = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#applaySorting(sortType);
    this.#sortComponent.updateBtnSort(this.#currentSort);
    this.#updateFilms(this.#dataFilms);
  };

  #renderSort = () => {
    this.#sortComponent = new SortFilmsView(this.#currentSort);
    render (this.#sortComponent, this.#mainContainer);

    this.#sortComponent.setClickHandler(this.#onBtnSortClick);
  };

  #renderList = () => {
    this.#renderSort();
    this.#renderFilmsSection();

    if (this.#dataFilms.length === 0) {
      this.#renderListFilmsEmpty();
      return;
    }

    this.#renderFilmsList();
    this.#renderFilmsListConteiner();
    this.#renderFilms(0, Math.min(this.#dataFilms.length, FILM_COUNT_PER_STEP));

    this.#filmsContainer.setClickHandler(this.#onCardFilmClick);
  };
}
