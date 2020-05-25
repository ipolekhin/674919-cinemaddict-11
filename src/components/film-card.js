import {BUTTON_TAG_NAMES, ButtonTagType, ButtonType} from "../const";
import {formatDateYear, formatDuration} from "../utils/common";
import AbstractComponent from "./abstract-component";

const MAX_LENGTH_DESCRIPTION = 140;
const ELLIPSIS = `...`;

const createButtonsMarkup = ({isWatchlist, isWatched, isFavorite}) => {
  const setControlsActive = (isActive) => isActive ? `film-card__controls-item--active` : ``;
  const activeButton = {
    [ButtonTagType.WATCHLIST]: isWatchlist,
    [ButtonTagType.WATCHED]: isWatched,
    [ButtonTagType.FAVORITE]: isFavorite,
  };

  return BUTTON_TAG_NAMES
    .map((tagName) => {
      const controlActive = setControlsActive(activeButton[tagName]);

      return (
        `<button
          class="film-card__controls-item button film-card__controls-item--${tagName}
          ${controlActive}">
          ${ButtonType[tagName]}
        </button>`
      );
    })
    .join(`\n`);
};

const createMovieCardMarkup = (film) => {
  const {poster, title, rating, info, description, isWatchlist, isWatched, isFavorite, commentsId} = film;
  const dateYear = formatDateYear(info.releaseDate);
  const duration = formatDuration(info.duration);
  const shortDescription = description.length > MAX_LENGTH_DESCRIPTION
    ? description.slice(0, MAX_LENGTH_DESCRIPTION)
    .padEnd(MAX_LENGTH_DESCRIPTION + ELLIPSIS.length, ELLIPSIS) : description;
  const buttonsMarkup = createButtonsMarkup({isWatchlist, isWatched, isFavorite});

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dateYear}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${info.genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsId.length} comments</a>
      <form class="film-card__controls">
        ${buttonsMarkup}
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createMovieCardMarkup(this._film);
  }

  setPopupElementsClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => {
        element.addEventListener(`click`, handler);
      });
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (event) => {
        event.preventDefault();
        handler();
      });
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (event) => {
        event.preventDefault();
        handler();
      });
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (event) => {
        event.preventDefault();
        handler();
      });
  }
}
