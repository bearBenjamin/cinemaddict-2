import dayjs from 'dayjs';

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const sortDate = (filmA, filmB) => {
  const { info: { release: { date: dateA} } } = filmA;
  const { info: { release: {date: dateB } } } = filmB;

  return dayjs(dateB).diff(dayjs(dateA));
};

const sortRating = (filmA, filmB) => {
  const { info: { totalRating: ratingA } } = filmA;
  const { info: { totalRating: ratingB } } = filmB;

  return ratingB - ratingA;
};

const sortMostCommented = (filmA, filmB) => {
  const { comments: commentsA } = filmA;
  const { comments: commentsB } = filmB;
  return commentsB.length - commentsA.length;
};

export { SortType, sortDate, sortRating , sortMostCommented};
