import {NavigationTagsType} from "../const.js";

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
  return movies.filter((movies) => movies.isFavorite);
};

const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case NavigationTagsType.ALL:
      return getAllMovies(movies);
    case NavigationTagsType.WATCHLIST:
      return getWatchlistMovies(movies);
    case NavigationTagsType.HISTORY:
      return getWatchedMovies(movies);
    case NavigationTagsType.FAVORITES:
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
