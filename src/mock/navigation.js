import {NAVIGATION_NAMES} from "../const";

// Функция считатет статиститку фильтра
// const calculateStatistics = (films) => {
//   return films.reduce(())
// };

const generateNavigations = (films) => {
  // const statistics = calculateStatistics(films);

  return NAVIGATION_NAMES.map((name) => {
    return {
      'name': name,
      'count': 2,
    };
  });
};

export {generateNavigations};
