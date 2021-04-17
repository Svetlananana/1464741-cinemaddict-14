import { createElement } from '../utils/render.js';

const createGenresTemplate = (genres) => {
  const genresSpan = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

  return `<td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
       <td class="film-details__cell">
       ${genresSpan}`;
};

export default class Genres {
  constructor(genres) {
    this._element = null;
    this._genres = genres;
  }

  getTemplate() {
    return createGenresTemplate(this._genres);
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
