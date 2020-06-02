import {render, replace, remove} from "../utils/render";
import FilmComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {Keys, Mode} from "../const";
import CommentsController from "./comments-controller";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._movie = null;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._commentsController = null;
    this._popupEscHandler = this._popupEscHandler.bind(this);
  }

  render(movie) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmComponent = new FilmComponent(movie);
    this._filmDetailsComponent = new FilmDetailsComponent(movie);
    this._commentsController = new CommentsController(this._filmDetailsComponent.getFilmCommentsContainer(), this._commentsModel);
    this._movie = movie;

    this._renderComments(movie);

    this._filmComponent.setPopupElementsClickHandler(() => {
      this._openPopup();
      document.addEventListener(`keydown`, this._popupEscHandler);
      // console.log(`открыть попап`);
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

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatchlist: !movie.isWatchlist,
      }));
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
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

  _renderComments(movie) {
    this._commentsController.render(movie.commentsId, (id) => {
      movie.commentsId.splice(movie.commentsId.indexOf(id), 1);
      this._onDataChange(this, movie, Object.assign({}, movie, {}));
    },
    (id) => {
      movie.commentsId.unshift(id);
      this._onDataChange(this, movie, Object.assign({}, movie, {}));
    }
    );
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _openPopup() {
    this._onViewChange();
    render(document.body, this._filmDetailsComponent);
    this._mode = Mode.OPEN;
  }

  _closePopup() {
    this._filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._popupEscHandler);
    this._commentsController.resetForm();
    // this._onDataChange(this, this._movie, Object.assign({}, this._movie, {}));
    this._mode = Mode.DEFAULT;
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmComponent);
    document.removeEventListener(`keydown`, this._popupEscHandler);
  }

  _popupEscHandler(event) {
    const isEscapeKey = event.key === Keys.ESC || event.key === Keys.ESCAPE;

    if (isEscapeKey) {
      this._closePopup();
    }
  }
}
