import {NAVIGATION_NAMES} from "./const";
// возможно удалить
// import {calculateStatistics} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import {render, replace} from "./utils/render";
import ContainerComponent from "./components/films-container";
import FooterStatisticsComponent from "./components/footer-statistics";
import MoviesModel from "./models/movies";
import StatisticsController from "./controllers/statistics-controller";
// Точка входа модели комментов
import CommentsModel from "./models/comments";
// Генерируем комментарии
import {generateComments} from "./mock/comments";
import FilterController from "./controllers/filter-controller";
import ProfileRatingComponents from "./components/profile";
import PageController from "./controllers/page-controller";

const FILMS_COUNT = 25;
const COMMENTS_COUNT = 250;
let oldStatisticsComponents = null;

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

// const statistics = calculateStatistics(movies);
// console.log(statistics);

const changeProfileRank = (flag = false) => {
  const userRank = moviesModel.updateStatistics().rank;

  if (flag) {
    const profileRatingComponents = new ProfileRatingComponents(userRank);
    render(siteHeaderElement, profileRatingComponents);
    oldStatisticsComponents = profileRatingComponents;
    return;
  }
  const profileRatingComponents = new ProfileRatingComponents(userRank);
  replace(profileRatingComponents, oldStatisticsComponents);
  oldStatisticsComponents = profileRatingComponents;
};
changeProfileRank(true);
moviesModel.setDataChangeHandler(changeProfileRank);

const containerComponent = new ContainerComponent();
const pageController = new PageController(containerComponent, moviesModel, commentsModel);
const filterController = new FilterController(siteMainElement, moviesModel);
const statisticsController = new StatisticsController(siteMainElement, moviesModel);

filterController.render();
pageController.render(siteMainElement);
render(siteMainElement, containerComponent);
statisticsController.render();

render(siteFooterStatisticsElement, new FooterStatisticsComponent(movies.length));
