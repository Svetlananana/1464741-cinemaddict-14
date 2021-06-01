import Abstract from './abstract.js';
import { SortType } from '../utils/const.js';

export const createSortListTemplate = (sortType) => {

  return `
  <ul class="sort">
  <li>
  <a href="#" class="sort__button ${sortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort="${SortType.DEFAULT}">Sort by default</a>
  </li>

  <li>
  <a href="#" class="sort__button ${sortType === SortType.DATE ? 'sort__button--active' : ''}" data-sort="${SortType.DATE}">Sort by date</a>
  </li>

  <li>
  <a href="#" class="sort__button ${sortType === SortType.RATING ? 'sort__button--active' : ''}" data-sort="${SortType.RATING}">Sort by rating</a>
  </li>
</ul>`;
};

export default class SortList extends Abstract {

  constructor(sortType) {
    super();

    this._sortType = sortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this.setSortTypeChangeHandler = this.setSortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortListTemplate(this._sortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sort);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
