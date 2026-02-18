import AbstractView from '../framework/view/abstract-view.js';

const createPopupCloseTemplate = () => `<div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>`;

export default class PopupCloseView extends AbstractView {
  get template() {
    return createPopupCloseTemplate();
  }
}
