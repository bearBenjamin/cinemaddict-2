import AbstractView from '../framework/view/abstract-view.js';

const createPopupTopTemplate = () => '<div class="film-details__top-container"></div>';

export default class PopupTopView extends AbstractView {
  get template() {
    return createPopupTopTemplate();
  }
}
