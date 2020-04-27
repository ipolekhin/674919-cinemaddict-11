import {NAVIGATION_NAMES, StatisticsType} from "../const";

// Функция считатет статиститку навигации
const calculateStatistics = (films) => {
  return films.reduce((result, {isWatchlist, isWatched, isFavorite}) => {
    result[StatisticsType.ALL]++;
    if (isWatchlist) {
      result[StatisticsType.WATCHLIST]++;
    }
    if (isWatched) {
      result[StatisticsType.HISTORY]++;
    }
    if (isFavorite) {
      result[StatisticsType.FAVORITES]++;
    }

    return result;
  }, {
    [StatisticsType.ALL]: 0,
    [StatisticsType.WATCHLIST]: 0,
    [StatisticsType.HISTORY]: 0,
    [StatisticsType.FAVORITES]: 0,
  });
};

const generateNavigations = (films) => {
  const statistics = calculateStatistics(films);
  console.log(statistics);

  return NAVIGATION_NAMES.map((name) => {
    return {
      'name': name,
      'count': statistics[name],
    };
  });
};

export {generateNavigations};
