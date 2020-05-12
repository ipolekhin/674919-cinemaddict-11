import {SORT_NAMES, SortType} from "../const";
import AbstractComponent from "./abstract-component";

const createSortMarkup = (name, isFirstChild) => {
  return (
    `<li>
      <a
        href="#"
        class="sort__button ${isFirstChild ? `sort__button--active` : ``}"
        data-sort-type="${name}">
      Sort by ${name}</a>
    </li>`
  );
};

const createSortTemplate = () => {
  const sortMarkup = SORT_NAMES.map((name, i) => createSortMarkup(name, i === 0)).join(`\n`);

  return (
    `<ul class="sort">
        ${sortMarkup}
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (event) => {
      event.preventDefault();

      if (event.target.tagName !== `A`) {
        return;
      }

      const sortType = event.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
