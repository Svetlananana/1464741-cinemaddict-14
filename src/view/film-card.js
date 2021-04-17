import dayjs from 'dayjs';
import { InsertPlace, render, createElement, BODY } from '../utils/render.js';
import FilmButtonCard, {ButtonType} from './film-button-card';
import FilmDetails from './film-details.js';
import { DateFormat } from '../utils/time.js';

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

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(date).format(DateFormat.RELEASE_YEAR)}</span>
    <span class="film-card__duration">${dayjs(runtime).format(DateFormat.TIME)}</span>
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

export default class FilmCard {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemlate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  setOpenPopupHandler() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    const title = this._element.querySelector('.film-card__title');
    const poster = this._element.querySelector('.film-card__poster');
    const comments = this._element.querySelector('.film-card__comments');
    const cardsElements = [title, poster, comments];

    cardsElements.forEach((element) => {
      element.addEventListener('click', () => {
        const filmDetailsPopup = new FilmDetails(this._film);
        BODY.classList.add('hide-overflow');

        render(BODY, filmDetailsPopup.getElement(), InsertPlace.BEFORE_END);
        filmDetailsPopup.setClosePopupHandler();
      });
    });
  }

  removeElement() {
    this._element = null;
  }
}
