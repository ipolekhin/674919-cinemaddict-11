import {EXTRA_BLOCK_NAMES, NavigationType, Keys} from "./const";
import {calculateStatistics, generateNavigations} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import {getExtraBlocksFilms} from "./utils/common";
import {remove, render, RenderPosition, replace} from "./utils/render";
import ContainerComponent from "./components/films-container";
import FilmComponent from "./components/film-card";
import FilmsContainerExtraComponent from "./components/films-container-extra";
import FilmDetailsComponent from "./components/film-details";
import FooterStatisticsComponents from "./components/footer-statistics";
import NavigationComponents from "./components/navigation";
import NoMovieComponent from "./components/no-films";
import ProfileRatingComponents from "./components/profile";
import ShowMoreButtonComponent from "./components/show-more-button";
import SortComponents from "./components/sort";

const FILMS_COUNT = 25;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

// 3.1 - 3.2; Генерируем фильмы
const films = generateFilms(FILMS_COUNT);

// 3.5;
const statistics = calculateStatistics(films);
const navigations = generateNavigations(statistics);

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

const renderContainer = (containerComponent, movie) => {
  const filmsElement = containerComponent.getElement();
  const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
  const filmsList = filmsElement.querySelector(`.films-list`);
  const isMovieInSystem = !(movie.length);
  let showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

  if (isMovieInSystem) {
    replace(new NoMovieComponent(), filmsList);

    return;
  }

  collectMovieCards(filmsListContainerElement, movie, SHOWING_FILMS_COUNT_ON_START);

  const showMoreButton = new ShowMoreButtonComponent();
  render(filmsListContainerElement, showMoreButton, RenderPosition.AFTEREND);

  showMoreButton.setClickHandler(() => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    collectMovieCards(filmsListContainerElement, movie, showingFilmsCount, prevTasksCount);

    if (showingFilmsCount >= movie.length) {
      remove(showMoreButton);
    }
  });

  const extraBlocks = getExtraBlocksFilms(movie);
  EXTRA_BLOCK_NAMES.map((name) => {
    const filmsContainerExtra = new FilmsContainerExtraComponent(name, extraBlocks[name]);
    const filmsListContainer = filmsContainerExtra.getElement().querySelector(`.films-list__container`);
    render(filmsElement, filmsContainerExtra);
    collectMovieCards(filmsListContainer, extraBlocks[name], extraBlocks[name].length);
  });
};

render(siteHeaderElement, new ProfileRatingComponents(statistics[NavigationType.HISTORY]));
render(siteMainElement, new NavigationComponents(navigations));
render(siteMainElement, new SortComponents());

const containerComponent = new ContainerComponent();
renderContainer(containerComponent, films);
render(siteMainElement, containerComponent);
render(siteFooterStatisticsElement, new FooterStatisticsComponents(statistics[NavigationType.ALL]));


