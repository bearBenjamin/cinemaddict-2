import FilmsView from '../view/films-view.js';
import PopupPresenter from './popup-presenter.js';
import FilmsListPresenter from './films-list-presenter.js';
import ExtraListPresenter from './extra-list-presenter.js';
import { updateItem } from '../utils.js';

export default class MainPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #dataFilms = [];
  #dataComments = [];

  #filmsSection = new FilmsView();

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

    this.#renderFilmsList();
    this.#renderExtraList();
  };

  #onCardFilmClick = (id) => {
    const selectedFilm = this.#dataFilms.find((film) => film.id === id);
    this.#renderPopup(selectedFilm, this.#mainContainer, this.#dataComments);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#dataFilms = updateItem(this.#dataFilms, updatedFilm);

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
