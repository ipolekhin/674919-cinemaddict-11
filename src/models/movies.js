import {NavigationTagsType} from "../const";
import {getMoviesByFilter} from "../utils/filter";
import {setProfileRating} from "../utils/common";

export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = NavigationTagsType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getMovies() {
    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateStatistics() {
    const rank = () => {
      return this._movies.reduce((result, {isWatched}) => {
        if (isWatched) {
          result++;
        }
        return result;
      }, 0);
    };
    const countWatched = rank();
    const profileRank = setProfileRating(countWatched);

    return {
      countWatched,
      rank: profileRank,
    };
  }

  updateMovies(id, movie) {
    const index = this._movies.findIndex((value) => value.id === id);

    if (index === -1) {
      return false;
    }

    // debugger;
    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  addedCommentsId(movie, id) {
    movie.commentsId.unshift(id);
  }

  removeCommentsId(movie, id) {
    movie.commentsId.splice(movie.commentsId.indexOf(id), 1);
  }

  setDataChangeHandler(handler) {
    // debugger;
    // console.log(`modelmovie1`);
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => {
      // console.log(`modelmovie2`);
      handler();
    });
  }
}
