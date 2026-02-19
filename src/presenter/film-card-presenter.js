import CardFilmView from '../view/film-container-view.js';
import InfoFilmView from '../view/film-info-view.js';
import ControlFilmView from '../view/film-control-view.js';
import { render } from '../framework/render.js';

export default class FilmCardPresenter {
  #conteinerCard = null;
  #film = null;

  constructor (conteinerCard) {
    this.#conteinerCard = conteinerCard;
  }

  init = (film) => {
    this.#film = film;

    const { id, comments, info } = this.#film;
    const cardComponent = new CardFilmView(id);
    const infoComponent = new InfoFilmView(comments, info);
    const controlComponent = new ControlFilmView();

    render(cardComponent, this.#conteinerCard);
    render(infoComponent, cardComponent.element);
    render(controlComponent, cardComponent.element);
  };
}

