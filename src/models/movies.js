export default class Movies {
  constructor() {
    this._movies = [];
    this._dataChangeHandlers = [];
  }

  getMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  // updateMovies(id, film) {
  //   const index = this._movies.findIndex((value) => value.id === id);
  //
  //   if (index === -1) {
  //     return;
  //   }
  //
  //   this._movies = [].concat(this._movies.slice(0, index), film, this._movies.slice(index + 1));
  //   this._callHandlers(this._dataChangeHandlers);
  //
  //   return true;
  // }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
