import Abstract from './abstract.js';

const createFilmDetailsControls = (watchlist, alreadyWatched, favorite) => {
  return `<input type="checkbox" ${watchlist ? 'checked' : ''} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

  <input type="checkbox" ${alreadyWatched ? 'checked' : ''} class="film-details__control-input visually-hidden" id="watched" name="watched">
  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

  <input type="checkbox" ${favorite ? 'checked' : ''} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>`;
};

export default class FilmDetailsControls extends Abstract {
  constructor(watchlist, alreadyWatched, favorite) {
    super();
    this._watchlist = watchlist;
    this._alreadyWatched = alreadyWatched;
    this._favorite = favorite;
  }

  getTemplate() {
    return createFilmDetailsControls(this._comment);
  }
}
