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

export { getRandomInteger, getRandomCommentsIds, getRandomBoolean };
