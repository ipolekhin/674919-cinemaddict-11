import AbstractComponent from "./abstract-component";

const createFooterStatisticsTemplate = (countFilms) => {
  return (
    `<p>${countFilms} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(countFilms) {
    super();
    this._countFilms = countFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._countFilms);
  }
}
