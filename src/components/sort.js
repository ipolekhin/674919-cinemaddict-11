import {SORT_NAMES, SortType} from "../const";
import AbstractComponent from "./abstract-component";

const createSortMarkup = (name) => {
  return (
    `<li>
      <a
        href="#"
        class="sort__button"
        data-sort-type="${name}">
      Sort by ${name}</a>
    </li>`
  );
};

const createSortTemplate = () => {
  const sortMarkup = SORT_NAMES.map((name) => createSortMarkup(name)).join(`\n`);

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

      this._removeActiveClass();
      this._currentSortType = sortType;
      this.setActiveClass();
      handler(this._currentSortType);
    });
  }

  _getCurrentElement() {
    return this._element.querySelector(`a[data-sort-type="${this._currentSortType}"]`);
  }

  // Публичный метод, используется в page-controller.js
  setActiveClass() {
    this._getCurrentElement().classList.add(`sort__button--active`);
  }

  _removeActiveClass() {
    this._getCurrentElement().classList.remove(`sort__button--active`);
  }
}
