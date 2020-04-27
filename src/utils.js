import {DESCRIPTION_ITEMS} from "./mock/const";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const castTimeFormat = (value) => {
  return value.toString().padStart(2, `0`);
};

// const formatTime = (time) => {
//   const hours = castTimeFormat(time.getHours() % 24);
//   const minutes = castTimeFormat(time.getMinutes());
//
//   return `${hours}:${minutes}`;
// };

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

export {
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
