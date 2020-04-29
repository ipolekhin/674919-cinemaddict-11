import {NAVIGATION_NAMES, NavigationType} from "../const";

// Функция считатет статиститку
const calculateStatistics = (films) => {
  return films.reduce((result, {isWatchlist, isWatched, isFavorite}) => {
    result[NavigationType.ALL]++;
    if (isWatchlist) {
      result[NavigationType.WATCHLIST]++;
    }
    if (isWatched) {
      result[NavigationType.HISTORY]++;
    }
    if (isFavorite) {
      result[NavigationType.FAVORITES]++;
    }

    return result;
  }, {
    [NavigationType.ALL]: 0,
    [NavigationType.FAVORITES]: 0,
    [NavigationType.HISTORY]: 0,
    [NavigationType.WATCHLIST]: 0,
  });
};

const generateNavigations = (stat) => {
  return NAVIGATION_NAMES.map((name) => {
    return {
      name,
      'count': stat[name],
    };
  });
};

export {generateNavigations, calculateStatistics};
