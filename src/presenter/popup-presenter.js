import PopupView from '../view/popup-film-view.js';
import PopupFormView from '../view/popup-form-view';
import PopupTopView from '../view/popup-top-container-view';
import PopupCloseView from '../view/popup-top-close-view';
import PopupControlView from '../view/popup-top-control-view';
import PopupBottomView from '../view/popup-bottom-container-view';
import PopupInfoView from '../view/popup-top-info-view.js';
import PopupCommentsListView from '../view/popup-comments-list-view.js';
import { render, remove, replace } from '../framework/render.js';

export default class PopupPresenter {
  #popup = null;
  #mainContainer = null;
  #dataComments = null;
  #film = null;

  #onEscKeyDown = null;
  #filmChange = null;

  #popupInfoComponent = null;
  #popupControlComponent = null;
  #popupCommentsComponent = null;

  constructor (mainContainer, dataComments, filmChange) {
    this.#mainContainer = mainContainer;
    this.#dataComments = dataComments;
    this.#filmChange = filmChange;
  }

  init = (film) => {
    this.#film = film;

    const prevInfoComponent = this.#popupInfoComponent;
    const prevControlComponent = this.#popupControlComponent;
    const prevCommentsComponent = this.#popupCommentsComponent;

    this.#popupInfoComponent = new PopupInfoView(this.#film);
    this.#popupControlComponent = new PopupControlView(this.#film.userDetails);
    this.#popupCommentsComponent = new PopupCommentsListView(this.#film.comments, this.#dataComments);

    this.#popupControlComponent.setBtnControlClick(this.#onBtnControlClick);

    if (this.#popup) {
      replace(this.#popupInfoComponent, prevInfoComponent);
      replace(this.#popupControlComponent, prevControlComponent);
      replace(this.#popupCommentsComponent, prevCommentsComponent);

      remove(prevInfoComponent);
      remove(prevControlComponent);
      remove(prevCommentsComponent);
      return;
    }

    this.#popup = new PopupView();
    const popupForm = new PopupFormView();
    const popupTop = new PopupTopView();
    const popupClose = new PopupCloseView();
    const popupBottom = new PopupBottomView();

    render (this.#popup, this.#mainContainer.parentElement);
    render (popupForm, this.#popup.element);
    render (popupTop, popupForm.element);
    render (popupClose, popupTop.element);

    render(this.#popupInfoComponent, popupTop.element);
    render(this.#popupControlComponent, popupTop.element);

    render (popupBottom, popupForm.element);
    render(this.#popupCommentsComponent, popupBottom.element);

    this.#onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        this.removePopup();
      }
    };

    popupClose.setClickHandler(() => {
      this.removePopup();
    });

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  get currentFilmId() {
    return this.#film ? this.#film.id : null;
  }

  updateCard = (updatedFilm) => {
    this.#film = updatedFilm;

    const newInfoComponent = new PopupInfoView(this.#film);
    const newControlComponent = new PopupControlView(this.#film.userDetails);

    newControlComponent.setBtnControlClick(this.#onBtnControlClick);

    if (this.#popupControlComponent) {
      replace(newControlComponent, this.#popupControlComponent);
      remove(this.#popupControlComponent);
    }
    this.#popupControlComponent = newControlComponent;

    if (this.#popupInfoComponent) {
      replace(newInfoComponent, this.#popupInfoComponent);
      remove(this.#popupInfoComponent);
    }
    this.#popupInfoComponent = newInfoComponent;
  };

  #onBtnControlClick = (type) => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        [type]: !this.#film.userDetails[type]
      }
    };

    this.#filmChange(updatedFilm);
  };

  removePopup = () => {
    remove(this.#popup);
    this.#popup = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#onEscKeyDown = null;
  };
}
