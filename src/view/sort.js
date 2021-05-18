import Abstract from './abstract.js';
import { SortType } from '../utils/const.js';

// export const SortType = {
//   DEFAULT: 'deafault',
//   DATE: 'date',
//   RATING: 'rating',
// };

export const createSortListTemplate = (sortType) => {

  const renderActiveClass = (sortTypeClass) => (sortTypeClass === sortType) ? 'sort__button--active' : '';

  return `
  <ul class="sort">
  <li>
  <a href="#" class="sort__button ${renderActiveClass(SortType.DEFAULT)}" data-sort="${SortType.DEFAULT}">Sort by default</a>
  </li>

  <li>
  <a href="#" class="sort__button ${renderActiveClass(SortType.DATE)}" data-sort="${SortType.DATE}">Sort by date</a>
  </li>

  <li>
  <a href="#" class="sort__button ${renderActiveClass(SortType.RATING)}" data-sort="${SortType.RATING}">Sort by rating</a>
  </li>
</ul>`;
};

export default class SortList extends Abstract {

  constructor(sortType) {
    super();

    this._sortType = sortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortListTemplate(this._sortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
