const getFilterAll = (films) => films.length;
const getFilterWatchlist = (films) => films.filter((film) => film.userDetails.watchlist).length;
const getFilterAlreadyWatched = (films) => films.filter((film) => film.userDetails.alreadyWatched).length;
const getFilterFavorites = (films) => films.filter((film) => film.userDetails.favorite).length;

const generateFilters = (films) => {
  const filterInfo = {
    ALL: getFilterAll(films),
    WATCHLIST: getFilterWatchlist(films),
    HISTORY: getFilterAlreadyWatched(films),
    FAVORITES: getFilterFavorites(films),
  };
  return filterInfo;
};

export { generateFilters };
