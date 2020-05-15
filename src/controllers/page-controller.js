import {EXTRA_BLOCK_NAMES, SortType} from "../const";
import {getExtraBlocksFilms} from "../utils/common";
import {remove, render, RenderPosition, replace} from "../utils/render";
import FilmController from "./movie";
import FilmsContainerExtraComponent from "../components/films-container-extra";
import NoMovieComponent from "../components/no-films";
import ShowMoreButtonComponent from "../components/show-more-button";
import SortComponent from "../components/sort";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const collectMovieCards = (container, movie, endCount, beginCount = 0) => {
  return movie
    .slice(beginCount, endCount)
    .forEach((film) => {
      renderFilm(container, film);
    });
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
    this._movies = [];
    this._showingMoviesCount = SHOWING_FILMS_COUNT_ON_START;
    this._sortContainer = null;
    this._filmsListContainerElement = null;
    this._noMovieComponent = new NoMovieComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._setSortTypeChangeHandler = this._setSortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._setSortTypeChangeHandler);
  }

  render(movies, sortContainer) {
    this._movies = movies;
    const container = this._container.getElement();
    const filmsList = container.querySelector(`.films-list`);
    const isMovieInSystem = !!(this._movies.length);
    this._sortContainer = sortContainer;
    this._filmsListContainerElement = container.querySelector(`.films-list__container`);


    if (!isMovieInSystem) {
      replace(this._noMovieComponent, filmsList);

      return;
    }

    render(this._sortContainer, this._sortComponent);
    this._sortComponent.setActiveClass();

    collectMovieCards(this._filmsListContainerElement, movies, this._showingMoviesCount);
    render(this._filmsListContainerElement, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._renderShowMoreButton();

    const extraBlocks = getExtraBlocksFilms(this._movies);
    EXTRA_BLOCK_NAMES.map((name) => {
      const filmsContainerExtra = new FilmsContainerExtraComponent(name, extraBlocks[name]);
      const filmsListContainer = filmsContainerExtra.getElement().querySelector(`.films-list__container`);
      render(container, filmsContainerExtra);
      collectMovieCards(filmsListContainer, extraBlocks[name], extraBlocks[name].length);
    });
  }

  _renderShowMoreButton() {
    if (this._showingMoviesCount >= this._movies.length) {
      return;
    }

    render(this._container, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMoviesCount = this._showingMoviesCount;
      this._showingMoviesCount = this._showingMoviesCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedMovies = getSortedMovies(this._movies, this._sortComponent.getSortType());

      collectMovieCards(this._filmsListContainerElement, sortedMovies, this._showingMoviesCount, prevMoviesCount);

      if (this._showingMoviesCount >= this._movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _setSortTypeChangeHandler(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedMovies = getSortedMovies(this._movies, sortType);

    this._filmsListContainerElement.innerHTML = ``;

    collectMovieCards(this._filmsListContainerElement, sortedMovies, this._showingFilmsCount);
    this._renderShowMoreButton(sortedMovies);
  }
}
