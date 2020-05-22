import {NavigationType} from "./const";
import {calculateStatistics, generateNavigations} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import {render} from "./utils/render";
import ContainerComponent from "./components/films-container";
import FooterStatisticsComponents from "./components/footer-statistics";
import MoviesModel from "./models/movies";
import NavigationComponents from "./components/navigation";
import ProfileRatingComponents from "./components/profile";
import PageController from "./controllers/page-controller";

const FILMS_COUNT = 25;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

// 3.1 - 3.2; Генерируем фильмы
const movies = generateFilms(FILMS_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

// 3.5;
const statistics = calculateStatistics(movies);
const navigations = generateNavigations(statistics);

render(siteHeaderElement, new ProfileRatingComponents(statistics[NavigationType.HISTORY]));
render(siteMainElement, new NavigationComponents(navigations));

const containerComponent = new ContainerComponent();
const pageController = new PageController(containerComponent, moviesModel);
pageController.render(siteMainElement);
render(siteMainElement, containerComponent);
render(siteFooterStatisticsElement, new FooterStatisticsComponents(statistics[NavigationType.ALL]));
