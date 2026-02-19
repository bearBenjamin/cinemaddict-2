import ListTopFilmsView from '../view/films-list-top-ratted-films-view.js';
import ListFilmsContainerView from '../view/films-container-view.js';
import ListMostCommentedFilmsView from '../view/films-list-most-comented-films-view.js';
import { render } from '../framework/render.js';

const EXTRA_FILM_COUNT = 2;

export default class ExtraListPresenter {
  #dataFilms = null;
  #films = null;
  #renderCard = null;
  #onCardFilmClick = null;

  #renderedExtraFilmsCount = EXTRA_FILM_COUNT;

  #filmsListTop = new ListTopFilmsView();
  #filmsTopContainer = new ListFilmsContainerView();

  #filmsListMostCommented = new ListMostCommentedFilmsView();
  #filmsMostCommentedContainer = new ListFilmsContainerView();

  constructor (dataFilms) {
    this.#dataFilms = dataFilms;
  }

  init = (films, renderCard, onCardFilmClick) => {
    this.#films = films;
    this.#renderCard = renderCard;
    this.#onCardFilmClick = onCardFilmClick;

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
