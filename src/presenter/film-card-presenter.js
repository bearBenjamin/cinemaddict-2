import CardFilmView from '../view/film-container-view.js';
import InfoFilmView from '../view/film-info-view.js';
import ControlFilmView from '../view/film-control-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class FilmCardPresenter {
  #conteinerCard = null;
  #film = null;
  #cardComponent = null;
  #infoComponent = null;
  #controlComponent = null;
  #changeFilm = null;

  constructor (conteinerCard, changeFilm) {
    this.#conteinerCard = conteinerCard;
    this.#changeFilm = changeFilm;
  }

  #onBtnControlClick = (type) => {
    const updateFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        [type]: !this.#film.userDetails[type]
      }
    };
    this.#changeFilm(updateFilm);
  };

  init = (film) => {
    this.#film = film;

    const { id, comments, info, userDetails } = this.#film;
    const prevCardComponent = this.#cardComponent;

    this.#cardComponent = new CardFilmView(id);
    this.#infoComponent = new InfoFilmView(comments, info);
    this.#controlComponent = new ControlFilmView(userDetails);

    this.#controlComponent.setBtnControlClick(this.#onBtnControlClick);

    render(this.#infoComponent, this.#cardComponent.element);
    render(this.#controlComponent, this.#cardComponent.element);

    if (prevCardComponent === null) {
      render(this.#cardComponent, this.#conteinerCard);
      return;
    }

    replace(this.#cardComponent, prevCardComponent);

    remove(prevCardComponent);
  };

  destroy = () => {
    remove(this.#cardComponent);
  };
}

