import {
  ACTOR_NAMES,
  DESCRIPTION_ITEMS,
  DIRECTOR_NAMES,
  POSTERS_IMAGES,
  TITLE_ITEMS,
  WRITER_NAMES
} from "../mock/const";
import {
  getRandomBooleanValue,
  getRandomDate,
  getRandomFractionalNumbers,
  getRandomIntegerNumber,
  getRandomItem,
  reshuffle,
} from "../utils";
import {
  COUNTRY_NAMES,
  GENRE_NAMES,
} from "../const";

const MAX_LENGTH_DESCRIPTION = 140;
const ELLIPSIS = `...`;
const MIN_RATING = 1;
const MAX_RATING = 10;
const COUNT_AFTER_COMMA = 1;
const START_YEAR = 1929;
const MAX_HOURS_DURATION = 2;
const MAX_MINUTES_DURATION = 59;
const MAX_COMMENTS = 17;
const MAX_DESCRIPTIONS = 5;

const generateFilm = () => {
  const actors = reshuffle(ACTOR_NAMES, ACTOR_NAMES.length).join(`, `);
  const description = reshuffle(DESCRIPTION_ITEMS, MAX_DESCRIPTIONS).join(`\n`);
  const genres = reshuffle(GENRE_NAMES, GENRE_NAMES.length).join(`, `);
  const myDate = getRandomDate(new Date(START_YEAR), new Date());
  const title = getRandomItem(TITLE_ITEMS);
  const writers = reshuffle(WRITER_NAMES, WRITER_NAMES.length).join(`, `);

  return {
    description,
    title,
    poster: getRandomItem(POSTERS_IMAGES),
    originalTitle: title,
    rating: getRandomFractionalNumbers(MIN_RATING, MAX_RATING, COUNT_AFTER_COMMA),
    info: {
      actors,
      genres,
      writers,
      director: getRandomItem(DIRECTOR_NAMES),
      releaseDate: myDate,
      duration: `
        ${getRandomIntegerNumber(0, MAX_HOURS_DURATION)}h
        ${(getRandomIntegerNumber(0, MAX_MINUTES_DURATION)).toString().padStart(2, `0`)}m
      `,
      country: getRandomItem(COUNTRY_NAMES),
    },
    shortDescription: description.length > MAX_LENGTH_DESCRIPTION
      ? description.slice(0, MAX_LENGTH_DESCRIPTION)
      .padEnd(MAX_LENGTH_DESCRIPTION + ELLIPSIS.length, ELLIPSIS) : description,
    comments: getRandomIntegerNumber(0, MAX_COMMENTS),
    isWatchlist: getRandomBooleanValue(),
    isWatched: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};
