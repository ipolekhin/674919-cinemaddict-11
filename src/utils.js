import {ExtraBlockNames} from "./const";

const FILM_QUANTITY = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const castTimeFormat = (value) => {
  return value.toString().padStart(2, `0`);
};

const getHoursMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const min = castTimeFormat(minutes - (hours * 60));

  return hours ? `${hours}h ${min}m` : `${min}m`;
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
  const reshuffle = data.slice().sort(() => Math.random() - 0.5);
  reshuffle.length = getRandomIntegerNumber(1, maxNumber);
  return reshuffle;
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
  castTimeFormat,
  getExtraBlocksFilms,
  getHoursMinutes,
  getRandomBooleanValue,
  getRandomIntegerNumber,
  getRandomItem,
  getRandomFractionalNumbers,
  getRandomDate,
  removeElement,
  render,
  reshuffle,
};
