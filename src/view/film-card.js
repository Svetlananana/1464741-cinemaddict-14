// import { InsertPlace, render, createElement, BODY } from '../utils/render.js';
import FilmButtonCard, {ButtonType} from './film-button-card';
import { DateFormat, formatDate } from '../utils/time.js';
import Abstract from './abstract.js';

const MAX_LENGTH_DESCRIPTION = 140;

export const createFilmCardTemlate = (film) => {
  const {
    comments,
    filmInfo: {
      title,
      totalRating,
      runtime,
      genres,
      poster,
      description,
      release: {
        date,
      },
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
  } = film;

  const getDescriptionSlice = (text, count) => {
    return (text.length >= count) ? text.slice(0, count - 1) + '...' : text;
  };

  return `
  <article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${formatDate(date, DateFormat.RELEASE_YEAR)}</span>
    <span class="film-card__duration">${formatDate(runtime, DateFormat.TIME)}</span>
    <span class="film-card__genre">${genres.join(' ')}</span>
  </p>

  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${getDescriptionSlice(description, MAX_LENGTH_DESCRIPTION)}</p>

  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
  ${new FilmButtonCard(ButtonType.WATCHLIST, watchlist).getTemplate()}
  ${new FilmButtonCard(ButtonType.ALREADY_WATCHED, alreadyWatched).getTemplate()}
  ${new FilmButtonCard(ButtonType.FAVORITE, favorite).getTemplate()}
  </div>
</article>`;
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemlate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    const title = this._element.querySelector('.film-card__title');
    const poster = this._element.querySelector('.film-card__poster');
    const comments = this._element.querySelector('.film-card__comments');
    const cardsElements = [title, poster, comments];

    cardsElements.forEach((element) => {
      element.addEventListener('click', this._clickHandler);
    });
  }
}
