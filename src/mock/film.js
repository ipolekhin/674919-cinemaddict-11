import {COLORS, DESCRIPTION_ITEMS, DAYS} from "../const.js";
import {getRandomBooleanValue} from "../utils";

const DAYS_VALUE = 8;
const HOURS_VALUE = 23;
const DEFAULT_REPEATING_DAYS = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length);

  return items[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Генерируем дату и время от текущего +/- 8
const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBooleanValue() ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, DAYS_VALUE);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(HOURS_VALUE);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, ...DAYS.map((day) =>
    ({[day]: getRandomBooleanValue()})
  ));
};

const generateFilm = () => {
  return {
    poster: `./images/posters/the-dance-of-life.jpg`,
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
