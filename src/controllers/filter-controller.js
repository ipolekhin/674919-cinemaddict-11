import FilterComponent from "../components/filter";
import {NavigationTagsType, NavigationType} from "../const";
import {render, replace} from "../utils/render";
import {getMoviesByFilter} from "../utils/filter";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = NavigationTagsType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();
    // console.log(allMovies);
    const filters = Object.values(NavigationTagsType).map((filterType) => {
      return {
        name: NavigationType[filterType],
        filterName: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
