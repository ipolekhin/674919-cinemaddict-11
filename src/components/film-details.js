import {formatDate, formatDuration} from "../utils/common";
import AbstractComponent from "./abstract-component";

const createDetailsTopMarkup = (film) => {
  const {
    poster,
    title,
    originalTitle,
    rating,
    info,
    description,
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;
  const setControlsActive = (isActive) => isActive ? `checked` : ``;
  const genreKey = info.genres.length > 1 ? `Genres` : `Genre`;
  const duration = formatDuration(info.duration);
  const date = formatDate(info.releaseDate);

  return (
    `<div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          ${info.ageRating}
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody>
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${info.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${info.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${info.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${info.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreKey}</td>
                <td class="film-details__cell">
                  ${info.genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`)}
                </td>
              </tr>
            </tbody>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"
            ${setControlsActive(isWatchlist)}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"
            ${setControlsActive(isWatched)}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"
            ${setControlsActive(isFavorite)}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const detailsTopMarkup = createDetailsTopMarkup(film);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        ${detailsTopMarkup}

        <div class="form-details__bottom-container">
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._closeHandler = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  getFilmCommentsContainer() {
    return this.getElement().querySelector(`.form-details__bottom-container`);
  }

  setCloseHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._closeHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }
}
