const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const castTimeFormat = (value) => {
  return value.toString().padStart(2, `0`);
};

const formatTime = (time) => {
  const hours = castTimeFormat(time.getHours() % 24);
  const minutes = castTimeFormat(time.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomBooleanValue = () => Math.random() > 0.5;

const getRandomIntegerNumber = (min, max) => min + Math.floor(Math.random() * (max - min));

const getRandomFractionalNumbers = (min, max, count) => (min + (Math.random() * (max - min))).toFixed(count);

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length);

  return items[randomIndex];
};

const removeElement = (element) => {
  const removeElement = document.querySelector(element);
  if (removeElement) {
    removeElement.remove();
  }
};

export {
  formatTime,
  getRandomBooleanValue,
  getRandomIntegerNumber,
  getRandomItem,
  getRandomFractionalNumbers,
  getRandomDate,
  render,
  removeElement
};
