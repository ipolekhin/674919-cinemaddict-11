import {EXTRA_BLOCK_NAMES} from "../const";
import {getTopRatedFilms} from "./films-top-rated";
import {createFilmCardMarkup} from "./film-card";

const createExtraBlockMarkup = (name, films, index) => {
  console.log(films[index]);
  const filmMarkup = films[index].map((film) => createFilmCardMarkup(film)).join(`\n`);
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${name}</h2>

      <div class="films-list__container">${filmMarkup}</div>
    </section>`
  );
};

const createFilmsContainerExtraTemplate = (films) => {
  const topRatedFilms = getTopRatedFilms(films);
  const blockNames = [];
  const extraFilms = [];
  if (topRatedFilms.length > 0) {
    extraFilms.push(topRatedFilms);
    blockNames.push(EXTRA_BLOCK_NAMES[0]);
  }
  // console.log(extraFilms);
  console.log(blockNames);
  console.log(EXTRA_BLOCK_NAMES);
  const extraBlockMarkup = blockNames.map((name, i) => createExtraBlockMarkup(name, extraFilms, i)).join(`\n`);

  return `${extraBlockMarkup}`;
};

export {createFilmsContainerExtraTemplate};
