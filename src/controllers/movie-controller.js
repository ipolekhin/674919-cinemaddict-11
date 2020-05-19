import {render, replace} from "../utils/render";
import FilmComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {Keys, Mode} from "../const";
import CommentsComponent from "../components/comments";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._commentsComponent = null;
    this._popupEscHandler = this._popupEscHandler.bind(this);
  }

  render(movie) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmComponent = new FilmComponent(movie);

    // Передали комментарии в компонент
    this._commentsComponent = new CommentsComponent(movie.comments);

    this._filmDetailsComponent = new FilmDetailsComponent(movie);

    render(this._filmDetailsComponent.getFilmCommentsContainer(), this._commentsComponent);


    this._filmComponent.setPopupElementsClickHandler(() => {
      this._openPopup();
      document.addEventListener(`keydown`, this._popupEscHandler);
    });

    this._filmComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatchlist: !movie.isWatchlist,
      }));
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._filmComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    this._filmDetailsComponent.setCloseHandler((event) => {
      event.preventDefault();
      this._closePopup();
    });


    if (oldFilmDetailsComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _openPopup() {
    this._onViewChange();
    render(document.body, this._filmDetailsComponent);
    this._mode = Mode.EDIT;
  }

  _closePopup() {
    this._filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._popupEscHandler);
    this._mode = Mode.DEFAULT;
  }

  _popupEscHandler(event) {
    const isEscapeKey = event.key === Keys.ESC || event.key === Keys.ESCAPE;

    if (isEscapeKey) {
      this._closePopup();
    }
  }
}
