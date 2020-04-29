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
  AGE_RESTRICTIONS,
  COUNTRY_NAMES,
  GENRE_NAMES,
} from "../const";
import {generateComments} from "./comments";

const MIN_RATING = 1;
const MAX_RATING = 10;
const COUNT_AFTER_COMMA = 1;
const START_YEAR = 1929;
const MIN_MINUTES_DURATION = 30;
const MAX_MINUTES_DURATION = 180;
const MAX_COMMENTS = 17;
const MAX_DESCRIPTIONS = 5;

  const generateFilm = () => {
  const actors = reshuffle(ACTOR_NAMES, ACTOR_NAMES.length).join(`, `);
  const ageRating = getRandomBooleanValue() ? `<p class="film-details__age">${AGE_RESTRICTIONS}</p>` : ``;
  const comments = generateComments(getRandomIntegerNumber(0, MAX_COMMENTS));
  const description = reshuffle(DESCRIPTION_ITEMS, MAX_DESCRIPTIONS).join(`\n`);
  const genres = reshuffle(GENRE_NAMES, GENRE_NAMES.length);
  const myDate = getRandomDate(new Date(START_YEAR, 0), new Date());
  const title = getRandomItem(TITLE_ITEMS);
  const writers = reshuffle(WRITER_NAMES, WRITER_NAMES.length).join(`, `);

  return {
    description,
    title,
    comments: comments,
    info: {
      actors,
      ageRating,
      genres,
      writers,
      director: getRandomItem(DIRECTOR_NAMES),
      releaseDate: myDate,
      duration: getRandomIntegerNumber(MIN_MINUTES_DURATION, MAX_MINUTES_DURATION),
      country: getRandomItem(COUNTRY_NAMES),
    },
    isWatchlist: getRandomBooleanValue(),
    isWatched: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
    originalTitle: title,
    poster: getRandomItem(POSTERS_IMAGES),
    rating: getRandomFractionalNumbers(MIN_RATING, MAX_RATING, COUNT_AFTER_COMMA),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};
