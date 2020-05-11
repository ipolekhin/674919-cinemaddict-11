import {EXTRA_BLOCK_NAMES, NavigationType, Keys} from "./const";
import {calculateStatistics, generateNavigations} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import {getExtraBlocksFilms, render, RenderPosition} from "./utils";
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
    siteFooterElement.after(filmDetailsComponent.getElement());
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
  const popupButtons = filmComponent.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);
  for (const button of popupButtons) {
    button.addEventListener(`click`, () => {
      popupClickHandler();
      document.addEventListener(`keydown`, popupEscHandler);
    });
  }

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const closeButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    popupCloseClickHandler();
    // document.removeEventListener(`keydown`, popupEscHandler);
  });

  render(container, filmComponent.getElement());
};

const renderContainer = (containerComponent, movie) => {
  const filmsElement = containerComponent.getElement();
  const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
  const filmsList = filmsElement.querySelector(`.films-list`);
  let showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

  const isMovieInSystem = !(movie.length);
  if (isMovieInSystem) {
    filmsElement.replaceChild(new NoMovieComponent().getElement(), filmsList);

    return;
  }

  collectMovieCards(filmsListContainerElement, movie, SHOWING_FILMS_COUNT_ON_START);

  const showMoreButton = new ShowMoreButtonComponent();
  render(filmsListContainerElement, showMoreButton.getElement(), RenderPosition.AFTEREND);

  showMoreButton.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    collectMovieCards(filmsListContainerElement, movie, showingFilmsCount, prevTasksCount);

    if (showingFilmsCount >= movie.length) {
      showMoreButton.getElement().style.display = `none`;
      showMoreButton.removeElement();
    }
  });

  const extraBlocks = getExtraBlocksFilms(movie);
  EXTRA_BLOCK_NAMES.map((name) => {
    const filmsContainerExtra = new FilmsContainerExtraComponent(name, extraBlocks[name]).getElement();
    const filmsListContainer = filmsContainerExtra.querySelector(`.films-list__container`);
    render(filmsElement, filmsContainerExtra);
    collectMovieCards(filmsListContainer, extraBlocks[name], extraBlocks[name].length);
  });
};

render(siteHeaderElement, new ProfileRatingComponents(statistics[NavigationType.HISTORY]).getElement());
render(siteMainElement, new NavigationComponents(navigations).getElement());
render(siteMainElement, new SortComponents().getElement());

const containerComponent = new ContainerComponent();
renderContainer(containerComponent, films);
render(siteMainElement, containerComponent.getElement());
render(siteFooterStatisticsElement, new FooterStatisticsComponents(statistics[NavigationType.ALL]).getElement());


