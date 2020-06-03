import StatisticsComponent from "../components/statistics";
import {render, replace} from "../utils/render";

export default class StatisticsController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._statisticsComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onStatisticsChange = this._onStatisticsChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const statistic = this._moviesModel.updateStatistics();
    const oldComponent = this._statisticsComponent;

    this._statisticsComponent = new StatisticsComponent(statistic);

    if (oldComponent) {
      replace(this._statisticsComponent, oldComponent);
    } else {
      render(container, this._statisticsComponent);
    }
  }

  _onStatisticsChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
