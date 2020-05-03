import {SORT_NAMES} from "../const";
import {createElement} from "../utils";

const createSortMarkup = (name, isFirstChild) => {
  return (
    `<li>
      <a href="#" class="sort__button ${isFirstChild ? `sort__button--active` : ``}">Sort by ${name}</a>
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

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
