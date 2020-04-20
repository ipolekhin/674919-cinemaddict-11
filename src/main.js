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
import {removeElement} from "./utils";

const FILMS_COUNT = 17;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRA_BLOCKS_COUNT = 2;
const EXTRA_FILMS_CARD_COUNT = 2;
const namesOfExtraBlock = {
  0: `Top rated`,
  1: `Most commented`,
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
let showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

// Генерируем фильмы
const films = generateFilms(FILMS_COUNT);
const navigations = generateNavigations(films);
console.log(films);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createNavigationTemplate(navigations));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());
render(siteFooterStatisticsElement, createFooterStatisticsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

const popupFilmClickHandler = (evt) => {
  if (evt.target.classList.contains(`film-card__poster`)
    || evt.target.classList.contains(`film-card__title`)
    || evt.target.classList.contains(`film-card__comments`)) {
    console.log('клик2');
    removeElement(`.film-details`);

    render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);

    const filmDetailsCloseButton = document.querySelector(`.film-details__close-btn`);
    filmDetailsCloseButton.addEventListener(`click`, () => {
      removeElement(`.film-details`);
    });
  }
};

filmsElement.addEventListener(`click`, popupFilmClickHandler);

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

// for (let i = 0; i < EXTRA_BLOCKS_COUNT; i++) {
//   render(filmsElement, createFilmsContainerExtraTemplate());
// }
//
// const addTitleNameForExtraBlock = (extraBlock, index) => {
//   const filmsListTitleElement = extraBlock.querySelector(`.films-list__title`);
//   filmsListTitleElement.textContent = namesOfExtraBlock[index];
// };
//
// const addCardsToExtraBlock = (extraBlock) => {
//   const filmsListContainerExtraElement = extraBlock.querySelector(`.films-list__container`);
//   for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
//     render(filmsListContainerExtraElement, createFilmCardTemplate(films));
//   }
// };
//
// const filmsListExtraElement = filmsElement.querySelectorAll(`.films-list--extra`);
// filmsListExtraElement.forEach((extraBlock, index) => {
//   addTitleNameForExtraBlock(extraBlock, index);
//   addCardsToExtraBlock(extraBlock);
// });


