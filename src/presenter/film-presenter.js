import { render, InsertPlace, remove, replace } from '../utils/render.js';
import { UserAction, UpdateType } from '../utils/const.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
// import {deleteItemById} from '../utils/items.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPEN: 'OPEN',
};

export default class FilmPresenter {

  constructor(filmContainer, bodyElement, handleChangeData, changeMode) {
    this._filmContainer = filmContainer;
    this._bodyElement = bodyElement;
    this._handleChangeData = handleChangeData;
    this._changeMode = changeMode;

    this._filmElementCard = null;
    this._filmDetailsCard = null;
    this._popUpStatus = Mode.CLOSED;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);

    this.resetFilm = this.resetFilm.bind(this);
    this._replacePopUpToFilm = this._replacePopUpToFilm.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmElementCard;
    const prevPopup = this._filmDetailsCard;

    this._filmElementCard  = new FilmCardView(this._film);
    this._filmDetailsCard = new FilmDetailsView(this._film);

    this._filmElementCard.getElement();
    this._filmDetailsCard.getElement();

    this._filmElementCard.setClickHandler(this._handleEditClick);
    this._filmElementCard.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmElementCard.setWathlistClickHandler(this._handleWatchlistClick);
    this._filmElementCard.setWatchedClickHandler(this._handleWatchedClick);

    this._filmDetailsCard.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsCard.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsCard.setWathlistClickHandler(this._handleWatchlistClick);

    this._filmDetailsCard.setClickHandler(this._replacePopUpToFilm);

    // this._filmDetailsCard.setDeleteCommentHandler((id) => {
    //   this._handleChangeData(
    //     UserAction.UPDATE_FILM,
    //     UpdateType.MINOR,
    //     Object.assign(
    //       {},
    //       this._film,
    //       {
    //         comments: deleteItemById(this._film.comments, id),
    //       }),
    //   );});

    if (prevFilmCard === null || prevPopup === null) {
      render(this._filmContainer, this._filmElementCard, InsertPlace.BEFORE_END);
      return;
    }

    if (this._popUpStatus === Mode.CLOSED) {
      replace(this._filmElementCard, prevFilmCard);
    }

    if (this._bodyElement.contains(prevPopup.getElement())) {
      replace(this._filmDetailsCard, prevPopup);
    }

    remove(prevFilmCard);
    remove(prevPopup);
  }

  _handleWatchedClick() {
    this._handleChangeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isWatched: !this._film.userDetails.isWatched,
            isWatchlist: this._film.userDetails.isWatchlist,
            isFavorite: this._film.userDetails.isFavorite,
            watchingDate: this._film.userDetails.watchingDate,
          },
        },
      ));
  }

  _handleWatchlistClick() {
    this._handleChangeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isWatchlist: !this._film.userDetails.isWatchlist,
            isFavorite: this._film.userDetails.isFavorite,
            isWatched: this._film.userDetails.isWatched,
            watchingDate: this._film.userDetails.watchingDate,
          },
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._handleChangeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isFavorite: !this._film.userDetails.isFavorite,
            isWatchlist: this._film.userDetails.isWatchlist,
            isWatched: this._film.userDetails.isWatched,
            watchingDate: this._film.userDetails.watchingDate,
          },
        },
      ),
    );
  }

  // _handleUpdateCommentClick(comments) {
  //   this._handleChangeData(
  //     UserAction.UPDATE_COMMENTS,
  //     UpdateType.MINOR,
  //     Object.assign(
  //       {},
  //       this._film,
  //       {
  //         comments,
  //       },
  //     ),
  //   );
  // }

  destroy() {
    remove(this._filmElementCard);
  }

  resetFilm() {
    if (this._popUpStatus !== Mode.CLOSED) {
      this._replacePopUpToFilm();
    }
  }

  _replaceFilmToPopUp() {
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._bodyElement.classList.add('hide-overflow');
    render(this._bodyElement, this._filmDetailsCard, InsertPlace.BEFORE_END);
    this._changeMode();
    this._popUpStatus === Mode.OPEN;
  }

  _replacePopUpToFilm() {
    document.removeEventListener('keydown',this._escKeyDownHandler);
    this._filmDetailsCard.getElement().remove();
    this._bodyElement.classList.remove('hide-overflow');
    this._popUpStatus === Mode.CLOSED;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replacePopUpToFilm();
    }
  }

  _handleEditClick() {
    this._replaceFilmToPopUp();
  }
}
