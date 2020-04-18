import {NAVIGATION_NAMES} from "../const";

// Функция считатет статиститку навигации
const calculateStatistics = (films) => {
  return films.reduce((result, {isWatchlist, isWatched, isFavorite}) => {
    result[`All movies`]++;
    if (isWatchlist) {
      result[`Watchlist`]++;
    }
    if (isWatched) {
      result[`History`]++;
    }
    if (isFavorite) {
      result[`Favorites`]++;
    }

    return result;
  }, {
    'All movies': 0,
    'Watchlist': 0,
    'History': 0,
    'Favorites': 0,
  });
};

const generateNavigations = (films) => {
  const statistics = calculateStatistics(films);

  return NAVIGATION_NAMES.map((name) => {
    return {
      'name': name,
      'count': statistics[name],
    };
  });
};

export {generateNavigations};
