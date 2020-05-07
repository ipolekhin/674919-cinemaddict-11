import {getHoursMinutes, createElement} from "../utils";

const MAX_LENGTH_DESCRIPTION = 140;
const ELLIPSIS = `...`;

const createMovieCardMarkup = (film) => {
  const {poster, title, rating, info, description, isWatchlist, isWatched, isFavorite, comments} = film;
  const setControlsActive = (isActive) => isActive ? `film-card__controls-item--active` : ``;
  const duration = getHoursMinutes(info.duration);
  const shortDescription = description.length > MAX_LENGTH_DESCRIPTION
    ? description.slice(0, MAX_LENGTH_DESCRIPTION)
    .padEnd(MAX_LENGTH_DESCRIPTION + ELLIPSIS.length, ELLIPSIS) : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${info.releaseDate.getUTCFullYear()}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${info.genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button
          class="film-card__controls-item button film-card__controls-item--add-to-watchlist
          ${setControlsActive(isWatchlist)}">
          Add to watchlist
        </button>
        <button
          class="film-card__controls-item button film-card__controls-item--mark-as-watched
          ${setControlsActive(isWatched)}">
            Mark as watched
        </button>
        <button
          class="film-card__controls-item button film-card__controls-item--favorite
          ${setControlsActive(isFavorite)}">
          Mark as favorite
        </button>
      </form>
    </article>`
  );
};

export default class Film {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createMovieCardMarkup(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
