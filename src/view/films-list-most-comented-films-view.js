import AbstractView from '../framework/view/abstract-view';

const createListMostCommentedFilmsTemplate = () =>
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>`;

export default class ListMostCommentedFilmsView extends AbstractView {
  get template() {
    return createListMostCommentedFilmsTemplate();
  }
}
