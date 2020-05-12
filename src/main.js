import {NavigationType} from "./const";
import {calculateStatistics, generateNavigations} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import {render} from "./utils/render";
import ContainerComponent from "./components/films-container";
import FooterStatisticsComponents from "./components/footer-statistics";
import NavigationComponents from "./components/navigation";
import ProfileRatingComponents from "./components/profile";
import SortComponent from "./components/sort";

import PageController from "./controllers/page-controller";

const FILMS_COUNT = 25;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

// 3.1 - 3.2; Генерируем фильмы
const films = generateFilms(FILMS_COUNT);

// 3.5;
const statistics = calculateStatistics(films);
const navigations = generateNavigations(statistics);

render(siteHeaderElement, new ProfileRatingComponents(statistics[NavigationType.HISTORY]));
render(siteMainElement, new NavigationComponents(navigations));
const sortComponent = new SortComponent();
render(siteMainElement, sortComponent);

const containerComponent = new ContainerComponent();
const pageController = new PageController(containerComponent);
pageController.render(films, sortComponent);
render(siteMainElement, containerComponent);
render(siteFooterStatisticsElement, new FooterStatisticsComponents(statistics[NavigationType.ALL]));


