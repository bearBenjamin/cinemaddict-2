import AbstractView from '../framework/view/abstract-view.js';

const createInfoFilmTemplate = (comments, info) => {
  const countComments = comments.length;

  const { title, totalRating, poster, release, runtime, genre, description } = info;
  const { date } = release;

  return `<a class="film-card__link">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${date.split('-')[0]}</span>
    <span class="film-card__duration">${runtime}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <span class="film-card__comments">${countComments} comments</span>
</a>`;
};
export default class InfoFilmView extends AbstractView {
  #comments = null;
  #info = null;

  constructor (comments, info) {
    super();
    this.#comments = comments;
    this.#info = info;
  }

  get template() {
    return createInfoFilmTemplate(this.#comments, this.#info);
  }
}


