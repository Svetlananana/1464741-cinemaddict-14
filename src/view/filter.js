import Smart from './smart.js';
import { FilterType, UpdateType } from '../utils/const.js';

const createFilterItemTemplate = (filter, currentFilter) => {
  const { name, count, type } = filter;

  return `<a href="#${type}" data-filter="${type}"
  class="main-navigation__item ${currentFilter === type ? 'main-navigation__item--active' : ''}">
  ${name}
  <span class="main-navigation__item-count ${name === 'All movies' ? 'visually-hidden' : ''}">
  ${count} </span></a>`;
};

const createFiltersTemplate = (filters, currentFilter) => {
  return filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('');
};

const createMainFilterTemplate = (filters, currentFilter) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
   ${createFiltersTemplate(filters, currentFilter)}
   </div>
   <a href="#stats" class="main-navigation__additional
   ${currentFilter === FilterType.STATS ?
    'main-navigation__additional--active' : ''}"
   data-filter = "${FilterType.STATS}">Stats</a>
   </nav>`;
};

export default class Filter extends Smart {

  constructor(filters, currentFilter) {
    super();
    this._data = filters;
    this._currentFilter = currentFilter;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainFilterTemplate(this._data, this._currentFilter);
  }

  updateData(update) {
    this._data = update;
    this.updateElement();
  }

  restoreHandlers() {
    this.setFilterTypeChangeHandler(this._callback.filterClick);
  }

  _filterTypeChangeHandler(evt) {
    const isNavigation = evt.target.classList.contains('main-navigation__item') ||
    evt.target.classList.contains('main-navigation__additional');

    if (!isNavigation || this._currentFilter === evt.target.dataset.filter) {
      return;
    }

    this._callback.filterClick(UpdateType.MAJOR, evt.target.dataset.filter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
