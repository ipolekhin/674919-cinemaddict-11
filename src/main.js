import {createProfileTemplate} from "./components/profile";
import {createNavigationTemplate} from "./components/navigation";
import {createSortTemplate} from "./components/sorting";
import {createFilmsContainerTemplate} from "./components/films-container";
import {createFilmsContainerExtraTemplate} from "./components/films-container-extra";
import {createFilmCardTemplate} from "./components/film-card";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createFooterStatisticsTemplate} from "./components/footer-statistics";

const FILMS_CARD_COUNT = 5;
const EXTRA_BLOCKS_COUNT = 2;
const EXTRA_FILMS_CARD_COUNT = 2;
const namesOfExtraBlock = {
  0: `Top rated`,
  1: `Most commented`,
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());
render(siteFooterStatisticsElement, createFooterStatisticsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_CARD_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}

render(filmsListContainerElement, createShowMoreButtonTemplate(), `afterend`);

for (let i = 0; i < EXTRA_BLOCKS_COUNT; i++) {
  render(filmsElement, createFilmsContainerExtraTemplate());
}

const addTitleNameForExtraBlock = (extraBlock, index) => {
  const filmsListTitleElement = extraBlock.querySelector(`.films-list__title`);
  filmsListTitleElement.textContent = namesOfExtraBlock[index];
};

const addCardsToExtraBlock = (extraBlock) => {
  const filmsListContainerExtraElement = extraBlock.querySelector(`.films-list__container`);
  for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
    render(filmsListContainerExtraElement, createFilmCardTemplate());
  }
};

const filmsListExtraElement = filmsElement.querySelectorAll(`.films-list--extra`);
filmsListExtraElement.forEach((extraBlock, index) => {
  addTitleNameForExtraBlock(extraBlock, index);
  addCardsToExtraBlock(extraBlock);
});

render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
