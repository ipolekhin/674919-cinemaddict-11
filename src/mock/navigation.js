import {NAVIGATION_NAMES} from "../const";

// Функция считатет статиститку фильтра
// const calculateNavigationStatistics = (tasks) => {
//   const valuesOfNavigationStatistics = {
//     'all': 0,
//     'watchlist': 0,
//     'history': 0,
//     'favorites': 0,
//     'stats': 0,
//   };
//   const date = new Date();
//
//   tasks.forEach((task) => {
//     const {dueDate, repeatingDays, isArchive, isFavorite} = task;
//     const isRepeatingTask = Object.values(repeatingDays).some((element) => element);
//
//     valuesOfNavigationStatistics[`all`]++;
//     if (dueDate instanceof Date && dueDate < date) {
//       valuesOfNavigationStatistics[`overdue`]++;
//     }
//     if (dueDate instanceof Date && dueDate.getDate() === date.getDate()) {
//       valuesOfNavigationStatistics[`today`]++;
//     }
//     if (isFavorite) {
//       valuesOfNavigationStatistics[`favorites`]++;
//     }
//     if (isRepeatingTask) {
//       valuesOfNavigationStatistics[`repeating`]++;
//     }
//     if (isArchive) {
//       valuesOfNavigationStatistics[`all`]--;
//       valuesOfNavigationStatistics[`archive`]++;
//     }
//   });
//   return valuesOfNavigationStatistics;
// };

const generateNavigations = () => {
  // const valuesOfFilterStatistics = calculateNavigationStatistics(tasks);

  return NAVIGATION_NAMES.map((name) => {
    return {
      'name': name,
      'count': 1,
    };
  });
};

export {generateNavigations};
