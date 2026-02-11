import FilmsPresenter from './presenter/films-presenter.js';
import UserProfileView from './view/user-profile-view.js';
import FilterFilmsView from './view/fileter-films-view';
import SortFilmsView from './view/sort-films-view';
import Statistic from './view/statistic-view.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import { render } from './render.js';
import { films, comments } from './data.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const statisticDate = siteFooterElement.querySelector('.footer__statistics');

const filmsPresenter = new FilmsPresenter ();
const filmsModel = new FilmsModel(films);
const commentsModel = new CommentsModel(comments);

render (new UserProfileView, siteHeaderElement);
render (new FilterFilmsView, siteMainElement);
render (new SortFilmsView, siteMainElement);
render (new Statistic, statisticDate);

filmsPresenter.init(siteMainElement, filmsModel, commentsModel);
