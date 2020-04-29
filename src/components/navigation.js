import {NavigationType, TAGS_NAMES, TagsType} from "../const";

const createNavigationMarkup = ({name, count}, index) => {
  const isFirstChild = !index;

  return (
    `<a
      href="#${TAGS_NAMES[index]}"
      class="main-navigation__item ${isFirstChild ? `main-navigation__item--active` : ``}">
      ${name}
      ${name !== NavigationType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

const createNavigationTemplate = (navigations) => {
  const [navigationStats] = navigations.slice(-1);
  const navigationMarkup = navigations
    .slice(0, -1)
    .map((navigation, i) => createNavigationMarkup(navigation, i))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navigationMarkup}
      </div>
      <a href="#${TagsType.STATS}" class="main-navigation__additional">${navigationStats.name}</a>
    </nav>`
  );
};

export {createNavigationTemplate};
