import {render, replace} from "../utils/render";
import FilmComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {Keys} from "../const";

export default class MovieController {
  constructor(container) {
    this._container = container;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._popupEscHandler = this._popupEscHandler.bind(this);
  }

  render(movie) {
    this._filmComponent = new FilmComponent(movie);
    this._filmDetailsComponent = new FilmDetailsComponent(movie);

    this._filmComponent.setPopupElementsClickHandler(() => {
      this._openPopup();
      document.addEventListener(`keydown`, this._popupEscHandler);
    });

    this._filmDetailsComponent.setCloseHandler((event) => {
      event.preventDefault();
      this._closePopup();
    });

    render(this._container, this._filmComponent);
  }

  _openPopup() {
    render(document.body, this._filmDetailsComponent);
  }

  _closePopup() {
    this._filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._popupEscHandler);
  }

  _popupEscHandler(event) {
    const isEscapeKey = event.key === Keys.ESC || event.key === Keys.ESCAPE;

    if (isEscapeKey) {
      this._closePopup();
    }
  }
}
