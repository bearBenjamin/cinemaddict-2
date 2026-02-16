import { createElement } from '../render.js';
import { humanizeFilmReleaseDate } from '../utils.js';

const createGenreListTemplate = (genre) => {
  const genres = [];
  for (let i = 0; i < genre.length; i += 1) {
    const item = `<span class="film-details__genre">${genre[i]}</span>`;
    genres.push(item);
  }

  const template = `<td class="film-details__term">Genres</td>
              <td class="film-details__cell">${genres.join('')}</td>
            </tr>`;
  return template;
};

const createPopupInfoTemplate = (data) => {
  const { info } = data;
  const { title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, release, runtime, genre, description } = info;
  const { date, releaseCountry } = release;

  const templateGenre = createGenreListTemplate(genre);

  return `<div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeFilmReleaseDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">${templateGenre}</tr>
          </tbody></table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>`;

};
export default class PopupInfoView {
  #element = null;
  #data = null;

  constructor (data) {
    this.#data = data;
  }

  get template() {
    return createPopupInfoTemplate(this.#data);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
