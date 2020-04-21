import {EXTRA_BLOCK_NAMES} from "../const";
import {getExtraBlocksFilms} from "./films-top-rated";
import {createFilmCardMarkup} from "./film-card";

const createExtraBlockMarkup = (name, films, index) => {
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
  const extraBlocksMarkup = EXTRA_BLOCK_NAMES.map((name, i) => createExtraBlockMarkup(name, extraBlocks[name], i)).join(`\n`);

  return `${extraBlocksMarkup}`;
};

export {createFilmsContainerExtraTemplate};
