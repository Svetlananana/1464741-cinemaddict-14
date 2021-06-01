import { render, InsertPlace, remove, replace } from '../utils/render.js';
import { FilterType } from '../utils/const.js';
import { filtersFunction } from '../utils/filter.js';
import FilterView from '../view/filter.js';

export default class FilterPresenter {

  constructor(container, filterModel, filmsModel) {
    this._filterContainer = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;

    this._handleFilterClick = this._handleFilterClick.bind(this);
    this._handleFromModel = this._handleFromModel.bind(this);

    this._filterModel.addObserver(this._handleFromModel);
    this._filmsModel.addObserver(this._handleFromModel);
  }

  init() {
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(this._getFilter(), this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterClick);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, InsertPlace.BEFORE_END);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleFromModel() {
    this.init();
  }

  _handleFilterClick(updateType, filterType) {
    this._filterModel.setFilter(updateType, filterType);
  }

  _getFilter() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filtersFunction[FilterType.ALL](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filtersFunction[FilterType.FAVORITES](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filtersFunction[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filtersFunction[FilterType.HISTORY](films).length,
      },
    ];
  }
}
