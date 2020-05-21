import {ExtraBlockNames} from "../const";
import moment from "moment";

const FILM_QUANTITY = 2;

const fullFormatDate = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatDateYear = (date) => {
  return moment(date).format(`YYYY`);
};

const formatDuration = (valueMinutes) => {
  const duration = moment.duration(valueMinutes, `minutes`);
  const hours = duration.hours();
  const minutes = duration.minutes();
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const getRandomBooleanValue = () => Math.random() > 0.5;

const getRandomIntegerNumber = (min, max) => min + Math.floor(Math.random() * (max - min));

const getRandomFractionalNumbers = (min, max, count) => (min + (Math.random() * (max - min))).toFixed(count);

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length);

  return items[randomIndex];
};

const removeElement = (selector) => {
  const removerElement = document.querySelector(selector);
  if (removerElement) {
    removerElement.remove();
  }
};

const reshuffle = (data, maxNumber) => {
  const shuffle = data.slice().sort(() => Math.random() - 0.5);
  shuffle.length = getRandomIntegerNumber(1, maxNumber);
  return shuffle;
};

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
  const topFilms = collectTopFilms(films.slice());
  const mostCommentedFilms = collectMostCommentedFilms(films.slice());

  return {
    [ExtraBlockNames.TOP_RATED]: topFilms,
    [ExtraBlockNames.MOST_COMMENTED]: mostCommentedFilms,
  };
};

export {
  formatDate,
  formatDateYear,
  formatDuration,
  fullFormatDate,
  getExtraBlocksFilms,
  getRandomBooleanValue,
  getRandomIntegerNumber,
  getRandomItem,
  getRandomFractionalNumbers,
  getRandomDate,
  removeElement,
  reshuffle,
};
