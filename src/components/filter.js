import {NavigationType, NAVIGATION_TAGS_NAMES, NavigationTagsType} from "../const";
import AbstractComponent from "./abstract-component";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = ({name, count}, isChecked, index) => {
  const check = isChecked ? `checked` : ``;

  return (
    `<a
      href="#${NAVIGATION_TAGS_NAMES[index]}"
      class="main-navigation__item ${check}">
      ${name}
      ${name !== NavigationType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

const createFilterTemplate = (navigation) => {
  const [navigationStats] = navigation.slice(-1);
  const navigationMarkup = navigation
    .slice(0, -1)
    .map((navigation, index) => createFilterMarkup(navigation, navigation.checked, index))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navigationMarkup}
      </div>
      <a href="#${NavigationTagsType.STATS}" class="main-navigation__additional">${navigationStats.name}</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(navigations) {
    super();
    this._navigations = navigations;
  }

  getTemplate() {
    return createFilterTemplate(this._navigations);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (event) => {
      const filterName = getFilterNameById(event.target.id);
      handler(filterName);
    });
  }
}
