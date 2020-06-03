import {NAVIGATION_NAMES} from "../const";

// Функция считатет статиститку
const calculateStatistics = (films) => {
  return films.reduce((result, {isWatchlist, isWatched, isFavorite}) => {
    result[NAVIGATION_NAMES.ALL]++;
    if (isWatchlist) {
      result[NAVIGATION_NAMES.WATCHLIST]++;
    }
    if (isWatched) {
      result[NAVIGATION_NAMES.HISTORY]++;
    }
    if (isFavorite) {
      result[NAVIGATION_NAMES.FAVORITES]++;
    }

    return result;
  }, {
    [NAVIGATION_NAMES.ALL]: 0,
    [NAVIGATION_NAMES.FAVORITES]: 0,
    [NAVIGATION_NAMES.HISTORY]: 0,
    [NAVIGATION_NAMES.WATCHLIST]: 0,
  });
};

export {calculateStatistics};
