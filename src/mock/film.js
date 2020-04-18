import {POSTERS_IMG, DESCRIPTION_ITEMS} from "../const.js";
import {getRandomBooleanValue, getRandomItem} from "../utils";

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
  return {
    poster: getRandomItem(POSTERS_IMG),
    title: `The Dance of Life`,
    rating: `8.7`,
    info: `1929 1h 55m Musical`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
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
