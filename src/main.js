import {createProfileTemplate} from "./components/profile";
import {createNavigationTemplate} from "./components/navigation";
import {createSortTemplate} from "./components/sorting";
import {createFilmsContainerTemplate} from "./components/films-container";
import {createFilmsContainerExtraTemplate} from "./components/films-container-extra";
import {createFilmCardTemplate} from "./components/film-card";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createFooterStatisticsTemplate} from "./components/footer-statistics";
import {generateNavigations} from "./mock/navigation";
import {generateFilms} from "./mock/film";
import {removeElement, render} from "./utils";
import {keys} from "./const";
import {getTopRatedFilms} from "./components/films-top-rated";

const FILMS_COUNT = 25;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRA_FILMS_CARD_COUNT = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
let showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

// 3.1 - 3.2; Генерируем фильмы
const films = generateFilms(FILMS_COUNT);
// 3.5;
const navigations = generateNavigations(films);
console.log(films);

render(siteHeaderElement, createProfileTemplate(navigations[2]));
// 3.6;
render(siteMainElement, createNavigationTemplate(navigations));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());
// 3.5
render(siteFooterStatisticsElement, createFooterStatisticsTemplate(FILMS_COUNT));

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

const popupFilmClickHandler = (evt) => {
  if (evt.target.classList.contains(`film-card__poster`)
    || evt.target.classList.contains(`film-card__title`)
    || evt.target.classList.contains(`film-card__comments`)) {
    removeElement(`.film-details`);

    //3.4;
    render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);

    const filmDetailsCloseButton = document.querySelector(`.film-details__close-btn`);
    filmDetailsCloseButton.addEventListener(`click`, () => {
      removeElement(`.film-details`);
      document.removeEventListener('keydown', popupEscHandler);
    });

    const popupEscHandler = (evt) => {
      if (evt.key === keys.ESC) {
        removeElement(`.film-details`);
        document.removeEventListener('keydown', popupEscHandler);
      }
    };

    document.addEventListener(`keydown`, popupEscHandler);
  }
};

filmsElement.addEventListener(`click`, popupFilmClickHandler);

// 3.3;
render(filmsListContainerElement, createFilmCardTemplate(films, ``, SHOWING_FILMS_COUNT_ON_START));

render(filmsListContainerElement, createShowMoreButtonTemplate(), `afterend`);

const showMoreButton = document.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;

  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
  render(filmsListContainerElement, createFilmCardTemplate(films, prevFilmsCount, showingFilmsCount));

  if (showingFilmsCount >= films.length) {
    showMoreButton.style.display = `none`;
  }
});

render(filmsElement, createFilmsContainerExtraTemplate(films));

// const addCardsToExtraBlock = (extraBlock) => {
//   const filmsListContainerExtraElement = extraBlock.querySelector(`.films-list__container`);
//   render(filmsListContainerExtraElement, createFilmCardTemplate(topRatedFilms, ``, EXTRA_FILMS_CARD_COUNT));
// };
//
// const filmsListExtraElement = filmsElement.querySelectorAll(`.films-list--extra`);
// filmsListExtraElement.forEach((extraBlock) => {
//   addCardsToExtraBlock(extraBlock);
// });


