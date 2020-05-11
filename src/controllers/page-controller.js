import {EXTRA_BLOCK_NAMES, Keys} from "../const";
import {getExtraBlocksFilms} from "../utils/common";
import {remove, render, RenderPosition, replace} from "../utils/render";
import FilmComponent from "../components/film-card";
import FilmsContainerExtraComponent from "../components/films-container-extra";
import FilmDetailsComponent from "../components/film-details";
import NoMovieComponent from "../components/no-films";
import ShowMoreButtonComponent from "../components/show-more-button";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const siteFooterElement = document.querySelector(`.footer`);

const collectMovieCards = (container, movie, endCount, beginCount = 0) => {
  return movie
    .slice(beginCount, endCount)
    .forEach((film) => renderFilm(container, film));
};

const renderFilm = (container, film) => {
  const popupClickHandler = () => {
    render(siteFooterElement, filmDetailsComponent, RenderPosition.AFTEREND);
  };

  const popupCloseClickHandler = () => {
    filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, popupEscHandler);
  };

  const popupEscHandler = (event) => {
    const isEscapeKey = event.key === Keys.ESC || event.key === Keys.ESCAPE;

    if (isEscapeKey) {
      popupCloseClickHandler();
      // document.removeEventListener(`keydown`, popupEscHandler);
    }
  };

  const filmComponent = new FilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  filmComponent.setPopupElementsClickHandler(() => {
    popupClickHandler();
    document.addEventListener(`keydown`, popupEscHandler);
  });

  filmDetailsComponent.setCloseHandler((event) => {
    event.preventDefault();
    popupCloseClickHandler();
    // document.removeEventListener(`keydown`, popupEscHandler);
  });

  render(container, filmComponent);
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noMovieComponent = new NoMovieComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(movie) {
    const filmsElement = this._container.getElement();
    const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
    const filmsList = filmsElement.querySelector(`.films-list`);
    const isMovieInSystem = !(movie.length);
    let showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

    if (isMovieInSystem) {
      replace(this._noMovieComponent, filmsList);

      return;
    }

    collectMovieCards(filmsListContainerElement, movie, SHOWING_FILMS_COUNT_ON_START);

    render(filmsListContainerElement, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      collectMovieCards(filmsListContainerElement, movie, showingFilmsCount, prevTasksCount);

      if (showingFilmsCount >= movie.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    const extraBlocks = getExtraBlocksFilms(movie);
    EXTRA_BLOCK_NAMES.map((name) => {
      const filmsContainerExtra = new FilmsContainerExtraComponent(name, extraBlocks[name]);
      const filmsListContainer = filmsContainerExtra.getElement().querySelector(`.films-list__container`);
      render(filmsElement, filmsContainerExtra);
      collectMovieCards(filmsListContainer, extraBlocks[name], extraBlocks[name].length);
    });
  }
}
