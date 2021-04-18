import { createElement } from '../utils/render.js';

export const ButtonType = {
  WATCHLIST: 'watchlist',
  ALREADY_WATCHED: 'alreadyWatched',
  FAVORITE: 'favorite',
};

export const BUTTON_CLASS = {
  watchlist: 'add-to-watchlist',
  alreadyWatched: 'mark-as-watched',
  favorite: 'favorite',
};

const TYPES_BUTTON_TITLE = {
  watchlist: 'Add to watchlist',
  alreadyWatched: 'Mark as watched',
  favorite: 'Mark as favorite',
};

const createFIlmButtonCardTemplate = (type, attribute) => {
  const buttonTypeClass = `film-card__controls-item--${BUTTON_CLASS[type]}`;
  const activeClass = attribute ? 'film-card__controls-item--active' : '';
  const title = TYPES_BUTTON_TITLE[type];

  return (
    `
      <button
        class="button film-card__controls-item ${activeClass} ${buttonTypeClass}"
        type="button"
      >
        ${title}
      </button>
    `
  );
};

export default class FilmButtonCard {
  constructor(type, attribute) {
    this._element = null;
    this._type = type;
    this._attribute = attribute;
  }

  getTemplate() {
    return createFIlmButtonCardTemplate(this._type, this._attribute);
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
