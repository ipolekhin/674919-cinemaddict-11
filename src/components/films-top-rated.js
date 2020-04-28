import {ExtraBlockNames} from "../const";

const FILM_QUANTITY = 2;

const collectTopFilms = (films) => {
  return films.sort((first, second) => {
    if (first[`rating`].padStart(4, `0`) < second[`rating`].padStart(4, `0`)) {
      return 1;
    }
    if (first[`rating`].padStart(4, `0`) > second[`rating`].padStart(4, `0`)) {
      return -1;
    }
    return 0;
  }).slice(0, FILM_QUANTITY);
};

const collectMostCommentedFilms = (films) => {
  return films.sort((first, second) => {
    if (first[`comments`] < second[`comments`]) {
      return 1;
    }
    if (first[`comments`] > second[`comments`]) {
      return -1;
    }
    return 0;
  }).slice(0, FILM_QUANTITY);
};

const getExtraBlocksFilms = (films) => {
  const topFilms = collectTopFilms(films);
  const mostCommentedFilms = collectMostCommentedFilms(films);

  return {
    [ExtraBlockNames.TOP_RATED]: topFilms,
    [ExtraBlockNames.MOST_COMMENTED]: mostCommentedFilms,
  };
};

export {getExtraBlocksFilms};
