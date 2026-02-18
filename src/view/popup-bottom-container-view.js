import AbstractView from '../framework/view/abstract-view.js';

const createPopupTopTemplate = () => '<div class="film-details__bottom-container"></div>';

export default class PopupBottomView extends AbstractView {
  get template() {
    return createPopupTopTemplate();
  }
}
