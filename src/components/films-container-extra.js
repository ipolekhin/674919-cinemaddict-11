import {EXTRA_BLOCK_NAMES} from "../const";
import {createElement, getExtraBlocksFilms} from "../utils";
import {createMovieCardMarkup} from "./film-card";

const createExtraBlockMarkup = (name, films) => {
  const filmMarkup = films.map((film) => createMovieCardMarkup(film)).join(`\n`);
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${name}</h2>

      <div class="films-list__container">${filmMarkup}</div>
    </section>`
  );
};

const createFilmsContainerExtraTemplate = (films) => {
  const extraBlocks = getExtraBlocksFilms(films);

  return EXTRA_BLOCK_NAMES.map((name) => createExtraBlockMarkup(name, extraBlocks[name])).join(`\n`);
};

export default class FilmsContainerExtra {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainerExtraTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
