import {NAVIGATION_NAMES, StatisticsType} from "../const";

const createNavigationMarkup = ({name, count}, isFirstChild) => {

  return (
    `<a
      href="#${isFirstChild ? name.slice(0, 3) : name}"
      class="main-navigation__item ${isFirstChild ? `main-navigation__item--active` : ``}">
      ${name}
      ${name !== StatisticsType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

const createNavigationTemplate = (navigations) => {
  const [navigationStats] = navigations.slice(-1);
  const navigationMarkup = navigations.slice(0, -1).map((navigation, i) => createNavigationMarkup(navigation, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navigationMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">${navigationStats.name}</a>
    </nav>`
  );
};

export {createNavigationTemplate};
