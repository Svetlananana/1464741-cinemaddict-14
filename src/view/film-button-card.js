import Abstract from './abstract.js';

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

const createFilmButtonCardTemplate = (type, attribute) => {
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

export default class FilmButtonCard extends Abstract {
  constructor(type, attribute) {
    super();
    this._type = type;
    this._attribute = attribute;
  }

  getTemplate() {
    return createFilmButtonCardTemplate(this._type, this._attribute);
  }
}
