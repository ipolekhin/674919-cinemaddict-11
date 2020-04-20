import {POSTERS_IMG, TITLE_ITEMS, DESCRIPTION_ITEMS} from "../const.js";
import {
  getRandomBooleanValue,
  getRandomDate,
  getRandomFractionalNumbers,
  getRandomIntegerNumber,
  getRandomItem
} from "../utils";
import {
  ACTOR_NAMES,
  COUNTRY_NAMES,
  DIRECTOR_NAMES,
  GENRE_NAMES,
  WRITER_NAMES
} from "../const";

const MAX_LENGTH_DESCRIPTION = 140;
const ELLIPSIS = `...`;
const MIN_RATING = 1;
const MAX_RATING = 10;
const COUNT_AFTER_COMMA = 1;
const START_YEAR = 1929;
const MAX_HOURS_DURATION = 2;
const MAX_MINUTES_DURATION = 59;

// Генерируем дату и время от текущего +/- 8
// const getRandomDate = () => {
//   const targetDate = new Date();
//   const sign = getRandomBooleanValue() ? 1 : -1;
//   const diffValue = sign * getRandomIntegerNumber(0, DAYS_VALUE);
//
//   targetDate.setDate(targetDate.getDate() + diffValue);
//   targetDate.setHours(HOURS_VALUE);
//
//   return targetDate;
// };

const generateFilm = () => {
  const description = getRandomItem(DESCRIPTION_ITEMS);
  const myDate  = getRandomDate(new Date(START_YEAR), new Date());
  const writers= WRITER_NAMES
    .slice(0,getRandomIntegerNumber(0, WRITER_NAMES.length))
    .map((name) => name).join(`\n`);
  const actors=ACTOR_NAMES
    .slice(0,getRandomIntegerNumber(0, ACTOR_NAMES.length))
    .map((name) => name).join(`\n`);

  return {
    poster: getRandomItem(POSTERS_IMG),
    title: getRandomItem(TITLE_ITEMS),
    rating: getRandomFractionalNumbers(MIN_RATING, MAX_RATING, COUNT_AFTER_COMMA),
    info: {
      director: getRandomItem(DIRECTOR_NAMES),
      writers,
      actors,
      releaseDate: myDate,
      duration: `
        ${getRandomIntegerNumber(0, MAX_HOURS_DURATION)}h
        ${(getRandomIntegerNumber(0, MAX_MINUTES_DURATION)).toString().padStart(2, `0`)}m
      `,
      country: getRandomItem(COUNTRY_NAMES),
      genres: getRandomItem(GENRE_NAMES),
    },
    description,
    shortDescription: description.length > MAX_LENGTH_DESCRIPTION
      ? description.slice(0, MAX_LENGTH_DESCRIPTION)
      .padEnd(MAX_LENGTH_DESCRIPTION + ELLIPSIS.length, ELLIPSIS) : description,
    comments: `5 comments`,
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

export {generateFilm, generateFilms};
