import FilmsView from '../view/films-view.js';
import ListFilmsView from '../view/films-list-view.js';
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

export default class FilmsPresenter {
  films = new FilmsView();
  filmsList = new ListFilmsView();
  filmsContainer = new ListFilmsContainerView();
  showMoreBtn = new ShowMoreBtnView();

  filmsListTop = new ListTopFilmsView();
  filmsTopContainer = new ListFilmsContainerView();

  filmsListMostCommented = new ListMostCommentedFilmsView();
  filmsMostCommentedContainer = new ListFilmsContainerView();

  popup = new PopupView();
  popupForm = new PopupFormView();
  popupTop = new PopupTopView();
  popupClose = new PopupCloseView();
  popupControl = new PopupControlView();
  popupBottom = new PopupBottomView ();

  renderCard = (cardsContainer, data) => {
    const { comments, info } = data;
    const cardComponent = new CardFilmView();
    const infoComponent = new InfoFilmView(comments, info);
    const controlComponent = new ControlFilmView();

    render(cardComponent, cardsContainer);
    render(infoComponent, cardComponent.getElement());
    render(controlComponent, cardComponent.getElement());
  };


  init = (mainContainer, films, comments) => {
    this.mainContainer = mainContainer;
    this.filmsModel = films;
    this.dataFilms = [...this.filmsModel.getFilms()];
    this.commentsModel = comments;
    this.dataComments = [...this.commentsModel.getComments()];

    render (this.films, this.mainContainer);
    render (this.filmsList, this.films.getElement());
    render (this.filmsContainer, this.filmsList.getElement());

    for (let i = 0; i < this.dataFilms.length; i += 1) {
      this.renderCard(this.filmsContainer.getElement(), this.dataFilms[i]);
    }

    render(this.showMoreBtn, this.filmsList.getElement());


    // top-films section
    render (this.filmsListTop, this.films.getElement());
    render (this.filmsTopContainer, this.filmsListTop.getElement());

    for (let i = 0; i < 2; i += 1) {
      this.renderCard(this.filmsTopContainer.getElement(), this.dataFilms[i]);
    }

    // most commented films section
    render (this.filmsListMostCommented, this.films.getElement());
    render(this.filmsMostCommentedContainer, this.filmsListMostCommented.getElement());

    for (let i = 0; i < 2; i += 1) {
      this.renderCard(this.filmsMostCommentedContainer.getElement(), this.dataFilms[i]);
    }


    //pop-up card film
    render (this.popup, this.mainContainer.parentElement);
    render (this.popupForm, this.popup.getElement());
    render (this.popupTop, this.popupForm.getElement());
    render (this.popupClose, this.popupTop.getElement());
    render (new PopupInfoView(this.dataFilms[0]), this.popupTop.getElement()); // пока добавляю информацию из первой карточки, массива карточек фильмов
    render (this.popupControl, this.popupTop.getElement());
    render (this.popupBottom, this.popupForm.getElement());
    render (new PopupCommentsListView(this.dataFilms[0].comments, this.dataComments), this.popupBottom.getElement()); // пока добавляю информацию из первой карточки, массива карточек фильмов
  };
}
