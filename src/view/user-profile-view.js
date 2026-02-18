import AbstractView from '../framework/view/abstract-view.js';

const USER_INFO = {
  NONE: {
    label: '',
    min: 0
  },
  NOVICE: {
    label: 'Novice',
    max: 10
  },
  FAN: {
    label: 'Fan',
    max: 20
  },
  MOVIE_BUFF: {
    label: 'Movie Buff'
  }
};

const getStatusUser = (films) => {
  let statusUser = '';
  let sumWatched = 0;

  films.forEach((film) => {
    const { userDetails } = film;
    sumWatched += userDetails.alreadyWatched;
  });

  if (sumWatched === USER_INFO.NONE.min) {
    return statusUser;
  }

  if (sumWatched <= USER_INFO.NOVICE.max) {
    statusUser = 'Novice';
    return statusUser;
  }

  if (sumWatched <= USER_INFO.FAN.max) {
    statusUser = 'Fan';
    return statusUser;
  }

  statusUser = 'Movie Buff';
  return statusUser;
};

const createUserProfileTemplate = (films) => {
  const statusUser = getStatusUser(films);

  return `<section class="header__profile profile">
      <p class="profile__rating">${statusUser}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserProfileView extends AbstractView {
  #films = null;

  constructor (films) {
    super();
    this.#films = films;
  }

  get template() {
    return createUserProfileTemplate(this.#films);
  }
}
