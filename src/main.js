import MainPresenter from './presenter/main-presenter.js';
import UserProfileView from './view/user-profile-view.js';
import FilterFilmsView from './view/fileter-films-view';
import SortFilmsView from './view/sort-films-view';
import Statistic from './view/statistic-view.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import { render } from './framework/render.js';
import { films, comments } from './data.js';
import { generateFilters } from './filters.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const statisticDate = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(films);
const commentsModel = new CommentsModel(comments);
const filmsPresenter = new MainPresenter (siteMainElement, filmsModel, commentsModel);

render (new UserProfileView(films), siteHeaderElement);

const filters = generateFilters(films);
render (new FilterFilmsView(filters), siteMainElement);

if (films.length !== 0) {
  render (new SortFilmsView(films), siteMainElement);
}

render (new Statistic(films), statisticDate);

filmsPresenter.init();
