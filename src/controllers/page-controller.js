import {EXTRA_BLOCK_NAMES, SortType} from "../const";
import {getExtraBlocksFilms} from "../utils/common";
import {remove, render, RenderPosition, replace} from "../utils/render";
import FilmController from "./movie-controller";
import FilmsContainerExtraComponent from "../components/films-container-extra";
import NoMovieComponent from "../components/no-films";
import ShowMoreButtonComponent from "../components/show-more-button";
import SortComponent from "../components/sort";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const collectMovieCards = (container, movies, onDataChange, endCount, beginCount = 0) => {
  return movies
    .slice(beginCount, endCount)
    .map((movie) => {
      const filmController = new FilmController(container, onDataChange);

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
  constructor(container) {
    this._container = container;
    this._movies = [];
    this._showedMovieControllers = [];
    this._showingMoviesCount = SHOWING_FILMS_COUNT_ON_START;
    this._sortContainer = null;
    this._filmsListContainerElement = null;
    this._noMovieComponent = new NoMovieComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._onDataChange = this._onDataChange.bind(this);
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

    const newMovies = collectMovieCards(this._filmsListContainerElement, this._movies, this._onDataChange, this._showingMoviesCount);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._renderShowMoreButton();
    this._renderExtraBlocks();
  }

  _renderShowMoreButton() {
    if (this._showingMoviesCount >= this._movies.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMoviesCount = this._showingMoviesCount;
      this._showingMoviesCount = this._showingMoviesCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedMovies = getSortedMovies(this._movies, this._sortComponent.getSortType());
      const newMovies = collectMovieCards(this._filmsListContainerElement, sortedMovies, this._onDataChange, prevMoviesCount);
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

  _setSortTypeChangeHandler(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedMovies = getSortedMovies(this._movies, sortType);

    this._filmsListContainerElement.innerHTML = ``;

    const newMovies = collectMovieCards(this._filmsListContainerElement, sortedMovies, this._onDataChange, this._showingFilmsCount);
    this._showedMovieControllers = newMovies;

    this._renderShowMoreButton(sortedMovies);
  }

  _renderExtraBlocks() {
    const extraBlocks = getExtraBlocksFilms(this._movies);
    EXTRA_BLOCK_NAMES.map((name) => {
      const filmsContainerExtra = new FilmsContainerExtraComponent(name, extraBlocks[name]);
      const container = this._container.getElement();
      render(container, filmsContainerExtra);
      collectMovieCards(filmsContainerExtra.getFilmsListContainer(), extraBlocks[name], this._onDataChange, extraBlocks[name].length);
    });
  }
}
