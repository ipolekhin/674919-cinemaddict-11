import {EXTRA_BLOCK_NAMES, Keys, NavigationType} from "./const";
import {calculateStatistics, generateNavigations} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import ContainerComponent from "./components/films-container";
import FooterStatisticsComponents from "./components/footer-statistics";
import NavigationComponents from "./components/navigation";
import ProfileRatingComponents from "./components/profile";
import {getExtraBlocksFilms, removeElement, render, RenderPosition} from "./utils";
import SortComponents from "./components/sort";
import FilmComponent from "./components/film-card";
import ShowMoreButtonComponent from "./components/show-more-button";
import FilmsContainerExtraComponent from "./components/films-container-extra";
// import {collectMovieCards} from "./components/film-card";
// import {createFilmDetailsTemplate} from "./components/film-details";
// import {createShowMoreButtonTemplate} from "./components/show-more-button";

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

const collectMovieCards = (container, films, endCount, beginCount = 0) => {
  return films
    .slice(beginCount, endCount)
    .map((film) => renderFilm(container, film));
};

const renderFilm = (container, film) => {
  const filmComponent = new FilmComponent(film);

  render(container, filmComponent.getElement());
};

const renderContainer = (containerComponent, movie) => {
  const filmsElement = containerComponent.getElement();
  const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
  let showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

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
render(siteMainElement, containerComponent.getElement());
renderContainer(containerComponent, films);
render(siteFooterStatisticsElement, new FooterStatisticsComponents(statistics[NavigationType.ALL]).getElement());


