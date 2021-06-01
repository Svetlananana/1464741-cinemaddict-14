import Smart from './smart.js';
import Genres from './film-genres.js';
import { DateFormat, formatDate, getHumanizeCommentDate } from '../utils/time.js';
import { FilmCardStatus } from '../utils/const.js';
import he from 'he';

const createNewComment = (comment, emoji) => {
  return {
    'comment': comment,
    'emotion': emoji,
  };
};

export const createFilmDetailsTemplate = (data) => {
  const {
    comments,
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      director,
      actors,
      writers,
      runtime,
      genres,
      poster,
      description,
      ageRating,
      release: {
        date,
        relaseCountry,
      },
    },
    userDetails: {
      isWatchlist,
      isWatched,
      isFavorite,
    },
  } = data;

  const { currentEmoji, currentCommentText, isDelete, isDisable, deleteId } = data;

  const createFilmDetailsControls = (isWatchlist, isWatched, isFavorite) => {
    return `<input type="checkbox" ${isWatchlist ? 'checked' : ''} ${isDisable ? 'disabled' : ''}class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

  <input type="checkbox" ${isWatched ? 'checked' : ''} ${isDisable ? 'disabled' : ''}class="film-details__control-input visually-hidden" id="watched" name="watched">
  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

  <input type="checkbox" ${isFavorite ? 'checked' : ''} ${isDisable ? 'disabled' : ''}class="film-details__control-input visually-hidden" id="favorite" name="favorite">
  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>`;
  };

  const createCommentList = () => {
    return `${comments.map((comment) =>  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src=${comment.emotion} width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment.text)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${getHumanizeCommentDate(comment.date)}</span>
        <button class="film-details__comment-delete"
        data-comment-id = "${comment.id}"
        ${isDisable ? 'disabled' : ''}
        ${isDelete ? 'disabled' : ''}
        >${isDelete && deleteId === comment.id ? 'Deleting...' : 'Delete'}
        </button>
      </p>
    </div>
  </li>`).join('')}`;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatDate(date, DateFormat.RELEASE_DATE)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatDate(runtime, DateFormat.TIME)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${relaseCountry}</td>
            </tr>
            <tr class="film-details__row">
            ${new Genres(genres).getTemplate()}
            </tr>
          </table>

          <p class="film-details__film-description">
          ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
       ${createFilmDetailsControls(isWatchlist, isWatched, isFavorite)}
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${createCommentList()}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${currentEmoji ? `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-smile">`: ''}
          </div>

          <label class="film-details__comment-label">
            <textarea ${isDisable ? 'disabled' : ''} class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">
            ${!currentCommentText ? '' : currentCommentText}
            </textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetails extends Smart {
  constructor(data, comments) {
    super();
    this._data = FilmDetails.parseFilmToData(data);
    this._comments = comments;

    this.setClickHandler = this.setClickHandler.bind(this);
    this.setDeleteCommentHandler = this.setDeleteCommentHandler.bind(this);
    this.setChangeFilmCardControlsHandler = this.setChangeFilmCardControlsHandler.bind(this);
    this.setSendNewComment = this.setSendNewComment.bind(this);
    this._changeEmojiHandler = this._changeEmojiHandler.bind(this);
    this._commentTextHandler = this._commentTextHandler.bind(this);
    this._setSendNewCommentHandler = this._setSendNewCommentHandler.bind(this);
    this._closeButtonClick = this._closeButtonClick.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this._onControlsChange = this._onControlsChange.bind(this);

    this._wathlistClicklHandler = this._wathlistClicklHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this.setWathlistClickHandler = this.setWathlistClickHandler.bind(this);
    this.setWatchedClickHandler = this.setWatchedClickHandler.bind(this);
    this.setFavoriteClickHandler = this.setFavoriteClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data, this._comments);
  }

  getButtonClose() {
    return this.getElement().querySelector('.film-details__close-btn');
  }

  getEmojiControls() {
    return this.getElement().querySelector('.film-details__emoji-list');
  }

  getCommentedField() {
    return this.getElement().querySelector('.film-details__comment-input');
  }

  _wathlistClicklHandler(evt) {
    evt.preventDefault();
    this._callback.wathlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setWathlistClickHandler(callback) {
    this._callback.wathlistClick = callback;
    this._element
      .querySelector('#watchlist')
      .addEventListener('change', this._wathlistClicklHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this._element
      .querySelector('#watched')
      .addEventListener('change', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this._element
      .querySelector('#favorite')
      .addEventListener('change', this._favoriteClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setChangeFilmCardControlsHandler(this._callback.changeInputControl);
    this.setClickHandler(this._callback.closeButtonClick);
    this.setSendNewComment(this._callback.setSendNewComment);
  }

  reset(filmCard) {
    this.updateData(
      FilmDetails.parseFilmToData(filmCard),
    );
  }

  _setInnerHandlers() {
    this.getEmojiControls().addEventListener('change', this._changeEmojiHandler);
    this.getCommentedField().addEventListener('input', this._commentTextHandler);
    this.getElement().addEventListener('keydown', this._setSendNewCommentHandler);
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._deleteCommentHandler);
  }

  _closeButtonClick(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  _onControlsChange(evt) {
    evt.preventDefault();
    this._callback.changeInputControl(evt.target.id);
  }

  _changeEmojiHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        currentEmoji: evt.target.value,
      },
    );
  }

  _commentTextHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        currentCommentText: evt.target.value,
      },
      false,
    );
  }

  setChangeFilmCardControlsHandler(callback) {
    this._callback.changeInputControl = callback;
    this.getElement().querySelector('.film-details__controls')
      .addEventListener('change', this._onControlsChange);
  }

  setClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getButtonClose()
      .addEventListener('click', this._closeButtonClick);
  }

  setSendNewComment(callback) {
    this._callback.setSendNewComment = callback;
  }

  _setSendNewCommentHandler(evt) {
    if((evt.ctrlKey || evt.metaKey) && evt.keyCode == 13) {
      if (!this._data.currentEmoji || (!this._data.currentCommentText || !this._data.currentCommentText.trim())) {
        return;
      }
      this._data = FilmDetails.parseDataToFilm(this._data);
      this._callback.setSendNewComment(this._data, createNewComment(this._data.currentCommentText, this._data.currentEmoji));
      this.updateElement();
    }
  }

  _deleteCommentHandler(evt) {
    if (!evt.target.classList.contains('film-details__comment-delete')) {
      return;
    }
    evt.preventDefault();
    this._callback.deleteComment(evt.target.dataset.commentId);
  }

  setDeleteCommentHandler(callback) {
    this._callback.deleteComment = callback;
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this._scroll = this.getElement().scrollTop;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this.getElement().scrollTop = this._scroll;
    this.restoreHandlers();
  }

  updateData(update, isUpdateNow = true, comments = '') {
    if(!update) {
      return;
    }
    this._data = Object.assign(
      {},
      this._data,
      update,
    );
    if (!isUpdateNow) {
      return;
    }
    if (comments) {
      this._comments = comments.slice();
    }
    this.updateElement();
  }

  setStatusFilmCard(status, deleteId) {
    switch(status) {
      case FilmCardStatus.DISABLED:
        this.updateData(
          {
            isDisable: true,
          },
        );
        break;
      case FilmCardStatus.DELETE:
        this.updateData(
          {
            isDelete: true,
            deleteId: deleteId,
          },
        );
        break;
      case FilmCardStatus.DEFAULT:
        this.updateData(
          {
            isDelete: false,
            deleteId: false,
          },
        );
        break;
      case FilmCardStatus.ABORTING:
        this.updateData(
          {
            isDelete: false,
            deleteId: false,
          },
        );
        this.showErrorUI();
    }
  }

  static parseFilmToData(filmCard) {
    return Object.assign(
      {},
      filmCard,
      {
        currentEmoji: false,
        currentCommentText: false,
        isDelete: false,
        isSave: false,
        isDisable: false,
        deleteId: '',
      },
    );
  }

  static parseDataToFilm(filmCard) {
    filmCard = Object.assign(
      {},
      filmCard,
    );
    delete filmCard.currentEmoji;
    delete filmCard.currentCommentText;
    delete filmCard.isDelete;
    delete filmCard.isDisable;
    delete filmCard.deleteId;
    return filmCard;
  }
}
