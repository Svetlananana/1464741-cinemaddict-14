import Abstract from './abstract.js';

const createGenresTemplate = (genres) => {
  const genresSpan = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

  return `
  <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
  <td class="film-details__cell"> ${genresSpan}`;
};

export default class Genres extends Abstract {
  constructor(genres) {
    super();
    this._genres = genres;
  }

  getTemplate() {
    return createGenresTemplate(this._genres);
  }
}
