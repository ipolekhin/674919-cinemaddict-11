import {NAVIGATION_NAMES} from "./const";
import {calculateStatistics} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import {render} from "./utils/render";
import ContainerComponent from "./components/films-container";
import FooterStatisticsComponent from "./components/footer-statistics";
import MoviesModel from "./models/movies";
import StatisticsComponent from "./components/statistics";
// Точка входа модели комментов
import CommentsModel from "./models/comments";
// Генерируем комментарии
import {generateComments} from "./mock/comments";
import FilterController from "./controllers/filter-controller";
import ProfileRatingComponents from "./components/profile";
import PageController from "./controllers/page-controller";

const FILMS_COUNT = 25;
const COMMENTS_COUNT = 250;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const comments = generateComments(COMMENTS_COUNT);
const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

// 3.1 - 3.2; Генерируем фильмы
const movies = generateFilms(FILMS_COUNT, commentsModel);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const statistics = calculateStatistics(movies);
// console.log(statistics);

render(siteHeaderElement, new ProfileRatingComponents(statistics[NAVIGATION_NAMES.HISTORY]));

const containerComponent = new ContainerComponent();
const pageController = new PageController(containerComponent, moviesModel, commentsModel);
const filterController = new FilterController(siteMainElement, moviesModel);

filterController.render();
pageController.render(siteMainElement);
render(siteMainElement, containerComponent);

const statisticsComponent = new StatisticsComponent();
render(siteMainElement, statisticsComponent);

render(siteFooterStatisticsElement, new FooterStatisticsComponent(statistics[NAVIGATION_NAMES.ALL]));
