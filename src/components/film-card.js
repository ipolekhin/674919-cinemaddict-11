import {getHoursMinutes} from "../utils";

const MAX_LENGTH_DESCRIPTION = 140;
const ELLIPSIS = `...`;

const createFilmCardMarkup = (film) => {
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
      <a class="film-card__comments">${comments} comments</a>
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

const createFilmCardTemplate = (films, endCount, beginCount = 0) => {
  console.log(endCount);
  console.log(beginCount);
  return films
    .slice(beginCount, endCount)
    .map((film) => createFilmCardMarkup(film))
    .join(`\n`);
};

export {createFilmCardTemplate, createFilmCardMarkup};
