import {EXTRA_BLOCK_NAMES, SortType} from "../const";
import {getExtraBlocksFilms} from "../utils/common";
import {remove, render} from "../utils/render";
import MovieController from "./movie-controller";
import FilmsComponent from "../components/films";
import FilmsContainerExtraComponent from "../components/films-container-extra";
import NoMovieComponent from "../components/no-films";
import ShowMoreButtonComponent from "../components/show-more-button";
import SortComponent from "../components/sort";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const collectMovieCards = (container, movies, onDataChange, onViewChange, endCount, beginCount = 0) => {
  return movies
    .slice(beginCount, endCount)
    .map((movie) => {
      const filmController = new MovieController(container, onDataChange, onViewChange);

      filmController.render(movie);

      return filmController;
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
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._showedMovieControllers = [];
    this._showedExtraMovies = [];
    this._showingMoviesCount = SHOWING_FILMS_COUNT_ON_START;
    this._sortContainer = null;
    this._filmsListContainerElement = null;
    this._noMovieComponent = new NoMovieComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();
    this._setSortTypeChangeHandler = this._setSortTypeChangeHandler.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._setSortTypeChangeHandler);
  }

  render(movies, sortContainer) {
    // this._movies = movies;
    const container = this._container.getElement();
    const isMovieInSystem = !!(this._movies.length);
    this._sortContainer = sortContainer;
    this._filmsListContainerElement = this._filmsComponent.getFilmsContainer();

    render(this._sortContainer, this._sortComponent);

    if (!isMovieInSystem) {
      render(container, this._noMovieComponent);

      return;
    }

    render(container, this._filmsComponent);

    const newMovies = collectMovieCards(this._filmsListContainerElement, this._movies, this._onDataChange, this._onViewChange, this._showingMoviesCount);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._renderShowMoreButton();
    this._renderExtraBlocks();
  }

  _renderShowMoreButton() {
    if (this._showingMoviesCount >= this._movies.length) {
      return;
    }

    const filmListElement = this._filmsComponent.getElement();
    render(filmListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMoviesCount = this._showingMoviesCount;
      this._showingMoviesCount = this._showingMoviesCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedMovies = getSortedMovies(this._movies, this._sortComponent.getSortType());
      const newMovies = collectMovieCards(this._filmsListContainerElement, sortedMovies, this._onDataChange, this._onViewChange, this._showingMoviesCount, prevMoviesCount);
      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      if (this._showingMoviesCount >= this._movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._movies.findIndex((value) => value === oldData);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index), newData, this._movies.slice(index + 1));
    movieController.render(this._movies[index]);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
    this._showedExtraMovies.forEach((it) => it.setDefaultView());
  }

  _setSortTypeChangeHandler(sortType) {
    this._showingMoviesCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedMovies = getSortedMovies(this._movies, sortType);

    this._filmsListContainerElement.innerHTML = ``;

    const newMovies = collectMovieCards(this._filmsListContainerElement, sortedMovies, this._onDataChange, this._onViewChange, this._showingMoviesCount);
    this._showedMovieControllers = newMovies;

    this._renderShowMoreButton();
  }

  _renderExtraBlocks() {
    const extraBlocks = getExtraBlocksFilms(this._movies);
    EXTRA_BLOCK_NAMES.forEach((name) => {
      const filmsContainerExtra = new FilmsContainerExtraComponent(name);
      const container = this._container.getElement();
      render(container, filmsContainerExtra);
      const newMovies = collectMovieCards(filmsContainerExtra.getFilmsListContainer(), extraBlocks[name], this._onDataChange, this._onViewChange, extraBlocks[name].length);
      this._showedExtraMovies = this._showedExtraMovies.concat(newMovies);
    });
  }
}
