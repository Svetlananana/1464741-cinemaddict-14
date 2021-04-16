import { createElement } from '../utils/render.js';

const createFIlmButtonCardTemplate = (type, attribute, title) => {
  const TYPES_BUTTON = {
    watchlist: 'add-to-watchlist',
    alreadyWatched: 'mark-as-watched',
    favorite: 'favorite',
  };

  const TYPES_BUTTON_TITLE = {
    watchlist: 'Add to watchlist',
    alreadyWatched: 'Mark as watched',
    favorite: 'Mark as favorite',
  };

  return `<button class="film-card__controls-item button
  film-card__controls-item--${TYPES_BUTTON[type]} ${attribute ? 'film-card__controls-item--active' : ''}"
  type="button">${TYPES_BUTTON_TITLE[title]}</button>`;
};

export default class FilmButtonCard {
  constructor(type, attribute, title) {
    this._element = null;
    this._type = type;
    this._attribute = attribute;
    this._title = title;
  }

  getTemplate() {
    return createFIlmButtonCardTemplate(this._type, this._attribute, this._title);
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
