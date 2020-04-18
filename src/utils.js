const castTimeFormat = (value) => {
  return value.toString().padStart(2, `0`);
};

const formatTime = (time) => {
  const hours = castTimeFormat(time.getHours() % 24);
  const minutes = castTimeFormat(time.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomBooleanValue = () => Math.random() > 0.5;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomItem = (items) => {
  const randomIndex = getRandomIntegerNumber(0, items.length);

  return items[randomIndex];
};

export {formatTime, getRandomBooleanValue, getRandomItem};
