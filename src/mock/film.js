import {POSTERS_IMG, TITLE_ITEMS, DESCRIPTION_ITEMS} from "../const.js";
import {getRandomBooleanValue, getRandomFractionalNumbers, getRandomItem} from "../utils";

const MAX_LENGTH_DESCRIPTION = 140;
const ELLIPSIS = `...`;
const MIN_RATING = 1;
const MAX_RATING = 10;
const COUNT_AFTER_COMMA = 1;

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
  return {
    poster: getRandomItem(POSTERS_IMG),
    title: getRandomItem(TITLE_ITEMS),
    rating: getRandomFractionalNumbers(MIN_RATING, MAX_RATING, COUNT_AFTER_COMMA),
    info: `1929 1h 55m Musical`,
    description: description.length > MAX_LENGTH_DESCRIPTION
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
