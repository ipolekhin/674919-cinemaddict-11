import {FilterType} from "../const.js";

const getAllMovies = (movies) => {
  return movies;
};

const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isWatchlist);
};

const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

const getFavoriteMovies = (movies) => {
  return movies.filter((task) => task.isFavorite);
};

const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return getAllMovies(movies);
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getWatchedMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
  }

  return movies;
};

export {
  getAllMovies,
  getWatchlistMovies,
  getWatchedMovies,
  getFavoriteMovies,
  getMoviesByFilter,
};
