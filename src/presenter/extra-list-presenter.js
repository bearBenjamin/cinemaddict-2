import ListTopFilmsView from '../view/films-list-top-ratted-films-view.js';
import ListFilmsContainerView from '../view/films-container-view.js';
import ListMostCommentedFilmsView from '../view/films-list-most-comented-films-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import { sortRating, sortMostCommented } from '../sort.js';
import { render } from '../framework/render.js';

const EXTRA_FILM_COUNT = 2;

export default class ExtraListPresenter {
  #dataFilms = null;
  #filmsSection = null;
  #onCardFilmClick = null;
  #filmChange = null;

  #renderedExtraFilmsCount = EXTRA_FILM_COUNT;

  #filmCardPresenters = new Map();

  #filmsListTop = new ListTopFilmsView();
  #filmsTopContainer = new ListFilmsContainerView();

  #filmsListMostCommented = new ListMostCommentedFilmsView();
  #filmsMostCommentedContainer = new ListFilmsContainerView();

  constructor (dataFilms) {
    this.#dataFilms = dataFilms;
  }

  init = (films, onCardFilmClick, filmChange) => {
    this.#filmsSection = films;
    this.#onCardFilmClick = onCardFilmClick;
    this.#filmChange = filmChange;

    const topRatedFilms = [...this.#dataFilms].sort(sortRating);
    const mostCommentedFilms = [...this.#dataFilms].sort(sortMostCommented);

    this.#renderExtraList(
      this.#filmsListTop,
      this.#filmsTopContainer,
      topRatedFilms,
    );
    this.#renderExtraList(
      this.#filmsListMostCommented,
      this.#filmsMostCommentedContainer,
      mostCommentedFilms
    );
  };

  updateCard = (updatedFilm) => {
    const presenters = this.#filmCardPresenters.get(updatedFilm.id);
    if (presenters) {
      presenters.forEach((presenter) => presenter.init(updatedFilm));
    }
  };

  #renderCard = (cardsContainer, data) => {
    const filmCardPresenter = new FilmCardPresenter(cardsContainer, this.#filmChange);
    filmCardPresenter.init(data);

    if (!this.#filmCardPresenters.has(data.id)) {
      this.#filmCardPresenters.set(data.id, []);
    }
    this.#filmCardPresenters.get(data.id).push(filmCardPresenter);
  };

  #renderExtraList = (listComponent, containerComponent, films) => {
    if (this.#dataFilms.length === 0) {
      return;
    }

    render (listComponent, this.#filmsSection.element);
    render (containerComponent, listComponent.element);

    films
      .slice(0, Math.min(films.length, this.#renderedExtraFilmsCount))
      .forEach((film) => this.#renderCard(containerComponent.element, film));

    containerComponent.setClickHandler(this.#onCardFilmClick);
  };
}
