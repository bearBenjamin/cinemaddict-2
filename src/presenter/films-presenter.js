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
import { render} from '../render.js';

const FILM_COUNT_PER_STEP = 5;
const SORT_FILM_COUNT = 2;

export default class FilmsPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #dataFilms = [];
  #commentsModel = null;
  #dataComments = [];
  #renderedFilmsCount = FILM_COUNT_PER_STEP;
  #renderedSortFilmsCount = SORT_FILM_COUNT;

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

    render (this.#films, this.#mainContainer);

    if (this.#dataFilms.length === 0) {
      render(new ListFilmsEmptyView(), this.#films.element);
      return;
    }

    render (this.#filmsList, this.#films.element);
    render (this.#filmsContainer, this.#filmsList.element);

    for (let i = 0; i < Math.min(this.#dataFilms.length, FILM_COUNT_PER_STEP); i += 1) {
      this.#renderCard(this.#filmsContainer.element, this.#dataFilms[i]);
    }

    if (this.#dataFilms.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreBtn, this.#filmsList.element);

      this.#showMoreBtn.element.addEventListener('click', this.#onShowMoreBtnClick);
    }

    // top-films section
    render (this.#filmsListTop, this.#films.element);
    render (this.#filmsTopContainer, this.#filmsListTop.element);

    for (let i = 0; i < this.#renderedSortFilmsCount; i += 1) {
      this.#renderCard(this.#filmsTopContainer.element, this.#dataFilms[i]);
    }

    // most commented films section
    render (this.#filmsListMostCommented, this.#films.element);
    render(this.#filmsMostCommentedContainer, this.#filmsListMostCommented.element);

    for (let i = 0; i < this.#renderedSortFilmsCount; i += 1) {
      this.#renderCard(this.#filmsMostCommentedContainer.element, this.#dataFilms[i]);
    }

    this.#filmsContainer.element.addEventListener('click', this.#onCardFilmClick);
    this.#filmsTopContainer.element.addEventListener('click', this.#onCardFilmClick);
    this.#filmsMostCommentedContainer.element.addEventListener('click', this.#onCardFilmClick);
  };

  #onCardFilmClick = (evt) => {
    const cardElement = evt.target.closest('.film-card');
    const isControlClicked = evt.target.closest('.film-card__controls');

    if (!cardElement) {
      return;
    }

    if (isControlClicked) {
      return;
    }

    const idFilm = cardElement.dataset.id;
    const selectedFilm = this.#dataFilms.find((film) => film.id === idFilm);
    document.querySelector('body').classList.add('hide-overflow');
    this.#renderPopup(selectedFilm);
  };

  #onShowMoreBtnClick = (evt) => {
    evt.preventDefault();
    this.#dataFilms
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderCard(this.#filmsContainer.element, film));

    this.#renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#dataFilms.length) {
      this.#showMoreBtn.element.remove();
      this.#showMoreBtn.removeElement();
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

    this.#popup.element.addEventListener('click', (evt) => {
      const btnClose = evt.target.closest('.film-details__close-btn');
      if (!btnClose) {
        return;
      }
      this.#removePopup();
    });

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #removePopup = () => {
    this.#popup.element.remove();
    this.#popup.removeElement();
    this.#popup = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#onEscKeyDown = null;
    document.querySelector('body').classList.remove('hide-overflow');
  };
}
