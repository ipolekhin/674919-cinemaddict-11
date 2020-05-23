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

const collectMovieCards = (container, movies, onDataChange, onViewChange) => {
  return movies
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
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._setSortTypeChangeHandler);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render(sortContainer) {
    // this._movies = movies;
    const container = this._container.getElement();
    const movies = this._moviesModel.getMovies();
    const isMovieInSystem = !!(movies.length);
    this._sortContainer = sortContainer;

    render(this._sortContainer, this._sortComponent);

    if (!isMovieInSystem) {
      render(container, this._noMovieComponent);

      return;
    }

    render(container, this._filmsComponent);
    this._renderMovies(movies.slice(0, this._showingMoviesCount));
    this._renderShowMoreButton();
    this._renderExtraBlocks();
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderMovies(movies) {
    this._filmsListContainerElement = this._filmsComponent.getFilmsContainer();
    const newMovies = collectMovieCards(this._filmsListContainerElement, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._showingMoviesCount = this._showedMovieControllers.length;
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const filmListElement = this._filmsComponent.getElement();
    render(filmListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _updateMovies(count) {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovies(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
    this._showedExtraMovies.forEach((it) => it.setDefaultView());
  }

  _setSortTypeChangeHandler(sortType) {
    this._showingMoviesCount = SHOWING_FILMS_COUNT_ON_START;
    const sortedMovies = getSortedMovies(this._moviesModel.getMovies(), sortType);
    this._removeMovies();
    this._renderMovies(sortedMovies.slice(0, this._showingMoviesCount));
    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const prevMoviesCount = this._showingMoviesCount;
    const movies = this._moviesModel.getMovies();

    this._showingMoviesCount = this._showingMoviesCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    const sortedMovies = getSortedMovies(movies, this._sortComponent.getSortType());
    this._renderMovies(sortedMovies.slice(prevMoviesCount, this._showingMoviesCount));

    if (this._showingMoviesCount >= sortedMovies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateMovies(SHOWING_FILMS_COUNT_ON_START);
  }

  _renderExtraBlocks() {
    const extraBlocks = getExtraBlocksFilms(this._moviesModel.getMovies());
    EXTRA_BLOCK_NAMES.forEach((name) => {
      const filmsContainerExtra = new FilmsContainerExtraComponent(name);
      const container = this._container.getElement();
      render(container, filmsContainerExtra);
      const newMovies = collectMovieCards(filmsContainerExtra.getFilmsListContainer(), extraBlocks[name], this._onDataChange, this._onViewChange, extraBlocks[name].length);
      this._showedExtraMovies = this._showedExtraMovies.concat(newMovies);
    });
  }
}
