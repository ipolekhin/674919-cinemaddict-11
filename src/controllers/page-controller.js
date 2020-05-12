import {EXTRA_BLOCK_NAMES, Keys, SortType} from "../const";
import {getExtraBlocksFilms} from "../utils/common";
import {remove, render, RenderPosition, replace} from "../utils/render";
import FilmComponent from "../components/film-card";
import FilmsContainerExtraComponent from "../components/films-container-extra";
import FilmDetailsComponent from "../components/film-details";
import NoMovieComponent from "../components/no-films";
import ShowMoreButtonComponent from "../components/show-more-button";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const collectMovieCards = (container, movie, endCount, beginCount = 0) => {
  return movie
    .slice(beginCount, endCount)
    .forEach((film) => {
      renderFilm(container, film);
    });
};

const renderFilm = (container, film) => {
  const openPopupClickHandler = () => {
    render(document.body, filmDetailsComponent);
  };

  const closePopupClickHandler = () => {
    filmDetailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, popupEscHandler);
  };

  const popupEscHandler = (event) => {
    const isEscapeKey = event.key === Keys.ESC || event.key === Keys.ESCAPE;

    if (isEscapeKey) {
      closePopupClickHandler();
      // document.removeEventListener(`keydown`, popupEscHandler);
    }
  };

  const filmComponent = new FilmComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  filmComponent.setPopupElementsClickHandler(() => {
    openPopupClickHandler();
    document.addEventListener(`keydown`, popupEscHandler);
  });

  filmDetailsComponent.setCloseHandler((event) => {
    event.preventDefault();
    closePopupClickHandler();
    // document.removeEventListener(`keydown`, popupEscHandler);
  });

  render(container, filmComponent);
};

const getSortedMovies = (movies, sortType) => {
  let sortedMovies = [];
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedMovies = showingMovies.sort((a, b) => a.info.releaseDate - b.info.releaseDate);
      break;
    case SortType.RATING:
      sortedMovies = showingMovies.sort((a, b) => b.rating * 10 - a.rating * 10);
      break;
    case SortType.DEFAULT:
      sortedMovies = showingMovies;
      break;
  }

  return sortedMovies;
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noMovieComponent = new NoMovieComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(movies, sortComponent) {
    this._srotComponent = sortComponent;
    const container = this._container.getElement();
    const filmsListContainerElement = container.querySelector(`.films-list__container`);
    const filmsList = container.querySelector(`.films-list`);
    const isMovieInSystem = !(movies.length);
    let showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

    if (isMovieInSystem) {
      replace(this._noMovieComponent, filmsList);

      return;
    }

    collectMovieCards(filmsListContainerElement, movies, SHOWING_FILMS_COUNT_ON_START);

    render(filmsListContainerElement, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    const renderShowMoreButton = () => {
      if (showingFilmsCount >= movies.length) {
        return;
      }

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        collectMovieCards(filmsListContainerElement, movies, showingFilmsCount, prevTasksCount);

        if (showingFilmsCount >= movies.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    renderShowMoreButton();

    this._srotComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedMovies = getSortedMovies(movies, sortType);

      filmsListContainerElement.innerHTML = ``;

      collectMovieCards(filmsListContainerElement, sortedMovies, showingFilmsCount);

      renderShowMoreButton();
    });

    const extraBlocks = getExtraBlocksFilms(movies);
    EXTRA_BLOCK_NAMES.map((name) => {
      const filmsContainerExtra = new FilmsContainerExtraComponent(name, extraBlocks[name]);
      const filmsListContainer = filmsContainerExtra.getElement().querySelector(`.films-list__container`);
      render(container, filmsContainerExtra);
      collectMovieCards(filmsListContainer, extraBlocks[name], extraBlocks[name].length);
    });
  }
}
