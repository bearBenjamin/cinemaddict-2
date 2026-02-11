import dayjs from 'dayjs';
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomCommentsIds = () => {
  const count = Math.floor(Math.random() * 6);
  const ids = new Set();

  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * 25) + 1;
    ids.add(String(randomId));
  }

  return Array.from(ids);
};

const getRandomBoolean = () => Math.random() >= 0.5;

const getFormatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const humanizeFilmReleaseDate = (releaseDate) => dayjs(releaseDate).format('DD MMMM YYYY');
const humanizeDateComment = (dateComment) => dayjs(dateComment).format('YYYY/MM/DD HH:mm');

const getRandomCommentDate = () => {
  const maxDaysGap = 365 * 3;
  const daysGap = Math.floor(Math.random() * maxDaysGap);

  return dayjs()
    .subtract(daysGap, 'day')
    .subtract(Math.random() * 24, 'h')
    .subtract(Math.random() * 60, 'm')
    .toISOString();
};

export { getRandomInteger, getRandomCommentsIds, getRandomBoolean, getFormatRuntime, humanizeFilmReleaseDate, humanizeDateComment, getRandomCommentDate };
