import {NavigationType} from "./const";
import {calculateStatistics} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import {render} from "./utils/render";
import ContainerComponent from "./components/films-container";
import FooterStatisticsComponents from "./components/footer-statistics";
import MoviesModel from "./models/movies";

// Точка входа модели комментов
import CommentsModel from "./models/comments";

// Генерируем комментарии
import {generateComments} from "./mock/comments";
import FilterController from "./controllers/filter-controller";
// import NavigationComponents from "./components/filter";
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
// console.log(movies);

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

// 3.5;
const statistics = calculateStatistics(movies);
// const navigations = generateNavigations(statistics);

render(siteHeaderElement, new ProfileRatingComponents(statistics[NavigationType.HISTORY]));
// render(siteMainElement, new NavigationComponents(navigations));
const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const containerComponent = new ContainerComponent();
const pageController = new PageController(containerComponent, moviesModel, commentsModel);
pageController.render(siteMainElement);
render(siteMainElement, containerComponent);
render(siteFooterStatisticsElement, new FooterStatisticsComponents(statistics[NavigationType.ALL]));
