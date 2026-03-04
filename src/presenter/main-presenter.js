import FilmsView from '../view/films-view.js';
import SortFilmsView from '../view/sort-films-view';
import PopupPresenter from './popup-presenter.js';
import FilmsListPresenter from './films-list-presenter.js';
import ExtraListPresenter from './extra-list-presenter.js';
import { updateItem } from '../utils.js';
import { SortType, sortDate, sortRating } from '../sort.js';
import { render, remove } from '../framework/render.js';

export default class MainPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #dataFilms = [];
  #dataComments = [];

  #filmsSection = new FilmsView();
  #sortComponent = null;
  #currentSort = SortType.DEFAULT;
  #sortFilms = [];

  #popup = null;

  #filmsListPresenter = null;
  #extraListPresenter = null;

  constructor (mainContainer, filmsModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#dataFilms = [...this.#filmsModel.films];
    this.#dataComments = [...this.#commentsModel.comments];
    this.#sortFilms = [...this.#filmsModel.films];

    this.#renderFilmsList();

    if (this.#dataFilms.length !== 0) {
      this.#renderSort();
    }

    this.#renderExtraList();
  };

  #onCardFilmClick = (id) => {
    const selectedFilm = this.#dataFilms.find((film) => film.id === id);
    this.#renderPopup(selectedFilm, this.#mainContainer, this.#dataComments);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#dataFilms = updateItem(this.#dataFilms, updatedFilm);
    this.#sortFilms = updateItem(this.#dataFilms, updatedFilm);

    if (this.#filmsListPresenter) {
      this.#filmsListPresenter.updateCard(updatedFilm);
    }

    if (this.#extraListPresenter) {
      this.#extraListPresenter.updateCard(updatedFilm);
    }

    if (this.#popup && this.#popup.currentFilmId === updatedFilm.id) {
      this.#popup.updateCard(updatedFilm);
    }
  };

  #getSortFilms = (sortType) => {
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

    this.#getSortFilms(sortType);

    remove(this.#sortComponent);
    this.#renderSort();
    this.#filmsListPresenter.updateFilms(this.#dataFilms);
  };

  #renderSort = () => {
    this.#sortComponent = new SortFilmsView(this.#currentSort);
    render (this.#sortComponent, this.#mainContainer);

    this.#mainContainer.insertBefore(
      this.#sortComponent.element,
      this.#filmsSection.element
    );

    this.#sortComponent.setClickHandler(this.#onBtnSortClick);
  };

  #renderPopup = (film, mainContainer, dataComments) => {
    if (this.#popup) {
      this.#popup.removePopup();
    }

    this.#popup = new PopupPresenter(mainContainer, dataComments, this.#handleFilmChange);

    this.#popup.init(film);
  };

  #renderFilmsList = () => {
    this.#filmsListPresenter = new FilmsListPresenter(this.#mainContainer, this.#filmsSection);
    this.#filmsListPresenter.init(this.#dataFilms, this.#onCardFilmClick, this.#handleFilmChange, this.#handleFilmChange);
  };

  #renderExtraList = () => {
    this.#extraListPresenter = new ExtraListPresenter(this.#dataFilms);
    this.#extraListPresenter.init(this.#filmsSection, this.#onCardFilmClick, this.#handleFilmChange);
  };
}
