import { DateFormat, formatDate } from '../utils/time.js';
import Abstract from './abstract.js';

export const createFilmCommentTemplate = (comment) => {
  const {author, text, date, emotion} = comment;

  return `
  <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src=${emotion} width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formatDate(date, DateFormat.COMMENT)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export default class FilmComment extends Abstract{
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createFilmCommentTemplate(this._comment);
  }
}
