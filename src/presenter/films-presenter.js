import FilmsView from '../view/films-view.js';
import ListFilmsView from '../view/films-list-view.js';
import ListFilmsEmptyView from '../view/films-list-empty-view.js';
import ListFilmsContainerView from '../view/films-container-view.js';
import CardFilmView from '../view/film-container-view.js';
import InfoFilmView from '../view/film-info-view.js';
import ControlFilmView from '../view/film-control-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import ListTopFilmsView from '../view/films-list-top-ratted-films-view.js';
import ListMostCommentedFilmsView from '../view/films-list-most-comented-films-view.js';
import PopupView from '../view/popup-film-view.js';
import PopupFormView from '../view/popup-form-view.js';
import PopupTopView from '../view/popup-top-container-view.js';
import PopupCloseView from '../view/popup-top-close-view.js';
import PopupInfoView from '../view/popup-top-info-view.js';
import PopupControlView from '../view/popup-top-control-view.js';
import PopupBottomView from '../view/popup-bottom-container-view.js';
import PopupCommentsListView from '../view/popup-comments-list-view.js';
import { render, remove } from '../framework/render.js';

const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

export default class FilmsPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #dataFilms = [];
  #dataComments = [];

  #renderedFilmsCount = FILM_COUNT_PER_STEP;
  #renderedExtraFilmsCount = EXTRA_FILM_COUNT;

  #popup = null;
  #onEscKeyDown = null;

  #films = new FilmsView();
  #filmsList = new ListFilmsView();
  #filmsContainer = new ListFilmsContainerView();
  #showMoreBtn = new ShowMoreBtnView();

  #filmsListTop = new ListTopFilmsView();
  #filmsTopContainer = new ListFilmsContainerView();

  #filmsListMostCommented = new ListMostCommentedFilmsView();
  #filmsMostCommentedContainer = new ListFilmsContainerView();

  constructor (mainContainer, filmsModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#dataFilms = [...this.#filmsModel.films];
    this.#dataComments = [...this.#commentsModel.comments];

    this.#renderFilmsList();
    this.#renderExtraList(
      this.#filmsListTop,
      this.#filmsTopContainer,
      this.#dataFilms
    );
    this.#renderExtraList(
      this.#filmsListMostCommented,
      this.#filmsMostCommentedContainer,
      this.#dataFilms
    );
  };

  #onCardFilmClick = (id) => {
    const selectedFilm = this.#dataFilms.find((film) => film.id === id);
    this.#renderPopup(selectedFilm);
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

  #renderCard = (cardsContainer, data) => {
    const { id, comments, info } = data;
    const cardComponent = new CardFilmView(id);
    const infoComponent = new InfoFilmView(comments, info);
    const controlComponent = new ControlFilmView();

    render(cardComponent, cardsContainer);
    render(infoComponent, cardComponent.element);
    render(controlComponent, cardComponent.element);
  };

  #renderPopup = (film) => {
    if (this.#popup) {
      this.#removePopup();
    }

    this.#popup = new PopupView();
    const popupForm = new PopupFormView();
    const popupTop = new PopupTopView();
    const popupClose = new PopupCloseView();
    const popupControl = new PopupControlView();
    const popupBottom = new PopupBottomView ();

    render (this.#popup, this.#mainContainer.parentElement);
    render (popupForm, this.#popup.element);
    render (popupTop, popupForm.element);
    render (popupClose, popupTop.element);
    render (new PopupInfoView(film), popupTop.element);
    render (popupControl, popupTop.element);
    render (popupBottom, popupForm.element);
    render (new PopupCommentsListView(film.comments, this.#dataComments), popupBottom.element);

    this.#onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        this.#removePopup();
      }
    };

    this.#popup.setClickHandler(() => {
      this.#removePopup();
    });

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #removePopup = () => {
    remove(this.#popup);
    this.#popup = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#onEscKeyDown = null;
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

  #renderExtraList = (listComponent, containerComponent, films) => {
    if (this.#dataFilms.length === 0) {
      return;
    }

    render (listComponent, this.#films.element);
    render (containerComponent, listComponent.element);

    films
      .slice(0, Math.min(films.length, this.#renderedExtraFilmsCount))
      .forEach((film) => this.#renderCard(containerComponent.element, film));

    containerComponent.setClickHandler(this.#onCardFilmClick);
  };
}
