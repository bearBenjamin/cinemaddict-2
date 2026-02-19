import FilmsView from '../view/films-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import PopupPresenter from './popup-presenter.js';
import FilmsListPresenter from './films-list-presenter.js';
import ExtraListPresenter from './extra-list-presenter.js';

export default class MainPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #dataFilms = [];
  #dataComments = [];

  #films = new FilmsView();

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

  #renderCard = (cardsContainer, data) => {
    const filmCardPresenter = new FilmCardPresenter(cardsContainer);
    filmCardPresenter.init(data);
  };

  #renderPopup = (film, mainContainer, dataComments) => {
    const popup = new PopupPresenter(mainContainer, dataComments);
    popup.init(film);
  };

  #renderFilmsList = () => {
    const filmsList = new FilmsListPresenter(this.#mainContainer, this.#films);
    filmsList.init(this.#dataFilms, this.#renderCard, this.#onCardFilmClick);
  };

  #renderExtraList = () => {
    const extraList = new ExtraListPresenter(this.#dataFilms);
    extraList.init(this.#films, this.#renderCard, this.#onCardFilmClick);
  };
}
