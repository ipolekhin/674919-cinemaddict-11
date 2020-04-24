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
  getRandomItem
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

const newArray = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(newArray);
const newArray1 = newArray.slice();



const generateFilm = () => {
  const description = getRandomItem(DESCRIPTION_ITEMS);
  const myDate = getRandomDate(new Date(START_YEAR), new Date());
  const title = getRandomItem(TITLE_ITEMS);
  const writers = WRITER_NAMES
    .slice(0, getRandomIntegerNumber(1, WRITER_NAMES.length))
    .map((name) => name).join(`, `);
  const actors = ACTOR_NAMES
    .slice(0, getRandomIntegerNumber(1, ACTOR_NAMES.length))
    .map((name) => name).join(`, `);
  const genres = GENRE_NAMES
    .slice(0, getRandomIntegerNumber(1, GENRE_NAMES.length))
    .map((name) => name);

  return {
    poster: getRandomItem(POSTERS_IMAGES),
    title,
    originalTitle: title,
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
      genres,
    },
    description,
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
