import PopupView from '../view/popup-film-view.js';
import PopupFormView from '../view/popup-form-view';
import PopupTopView from '../view/popup-top-container-view';
import PopupCloseView from '../view/popup-top-close-view';
import PopupControlView from '../view/popup-top-control-view';
import PopupBottomView from '../view/popup-bottom-container-view';
import PopupInfoView from '../view/popup-top-info-view.js';
import PopupCommentsListView from '../view/popup-comments-list-view.js';
import { render, remove } from '../framework/render.js';

export default class PopupPresenter {
  #popup = null;
  #mainContainer = null;
  #dataComments = null;

  #onEscKeyDown = null;

  constructor (mainContainer, dataComments) {
    this.#mainContainer = mainContainer;
    this.#dataComments = dataComments;
  }

  init = (film) => {
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

    popupClose.setClickHandler(() => {
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
}
