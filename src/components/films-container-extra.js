import AbstractComponent from "./abstract-component";

const createExtraBlockMarkup = (name) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${name}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsContainerExtra extends AbstractComponent {
  constructor(name) {
    super();
    this._name = name;
  }

  getTemplate() {
    return createExtraBlockMarkup(this._name);
  }

  getFilmsListContainer() {
    return  this.getElement().querySelector(`.films-list__container`);
  }

  render() {

  }
}
