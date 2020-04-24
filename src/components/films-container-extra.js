import {EXTRA_BLOCK_NAMES} from "../const";
import {getExtraBlocksFilms} from "./films-top-rated";
import {createFilmCardMarkup} from "./film-card";

const createExtraBlockMarkup = (name, films) => {
  const filmMarkup = films.map((film) => createFilmCardMarkup(film)).join(`\n`);
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

export {createFilmsContainerExtraTemplate};
