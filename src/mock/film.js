import {
  ACTOR_NAMES,
  DESCRIPTION_ITEMS,
  DIRECTOR_NAMES,
  POSTERS_IMAGES,
  TITLE_ITEMS,
  WRITER_NAMES
} from "./const";
import {
  getRandomBooleanValue,
  getRandomComments,
  getRandomDate,
  getRandomFractionalNumbers,
  getRandomIntegerNumber,
  getRandomItem,
  reshuffle,
} from "../utils/common";
import {
  AGE_RESTRICTIONS,
  COUNTRY_NAMES,
  GENRE_NAMES,
} from "../const";

const MIN_RATING = 1;
const MAX_RATING = 10;
const COUNT_AFTER_COMMA = 1;
const START_YEAR = 1929;
const MIN_MINUTES_DURATION = 30;
const MAX_MINUTES_DURATION = 180;
const MAX_DESCRIPTIONS = 5;
const MAX_COMMENTS_COUNT = 15;

const generateFilm = (commentsId) => {
  const actors = reshuffle(ACTOR_NAMES, ACTOR_NAMES.length).join(`, `);
  const ageRating = getRandomBooleanValue() ? `<p class="film-details__age">${AGE_RESTRICTIONS}</p>` : ``;
  const description = reshuffle(DESCRIPTION_ITEMS, MAX_DESCRIPTIONS).join(`\n`);
  const genres = reshuffle(GENRE_NAMES, GENRE_NAMES.length);
  const myDate = getRandomDate(new Date(START_YEAR, 0), new Date());
  const title = getRandomItem(TITLE_ITEMS);
  const writers = reshuffle(WRITER_NAMES, WRITER_NAMES.length).join(`, `);

  return {
    description,
    title,
    commentsId,
    id: String(new Date() + Math.random()),
    info: {
      actors,
      ageRating,
      genres,
      writers,
      country: getRandomItem(COUNTRY_NAMES),
      director: getRandomItem(DIRECTOR_NAMES),
      duration: getRandomIntegerNumber(MIN_MINUTES_DURATION, MAX_MINUTES_DURATION),
      releaseDate: myDate,
    },
    isWatchlist: getRandomBooleanValue(),
    isWatched: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
    originalTitle: title,
    poster: getRandomItem(POSTERS_IMAGES),
    rating: getRandomFractionalNumbers(MIN_RATING, MAX_RATING, COUNT_AFTER_COMMA),
  };
};

const generateFilms = (count, commentsModel) => {
  const commentsList = commentsModel.getComments();
  const commentsListCopy = commentsList.slice();

  return new Array(count)
    .fill(``)
    .map(() => {
      const comments = getRandomComments(MAX_COMMENTS_COUNT, commentsListCopy);

      return generateFilm(comments);
    });
};

export {generateFilms};
