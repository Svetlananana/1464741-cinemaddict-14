import { render, InsertPlace, remove } from '../utils/render.js';
import { SortType, UserAction, UpdateType } from '../utils/const.js';
import { sortFilmsByDate, sortFilmsByRating } from '../utils/films.js';
import { filtersFunction } from '../utils/filter.js';

import ProfileUserView from '../view/profile-user.js';
import SortListView from '../view/sort.js';
import FilmBlockView from '../view/films-section.js';
import FilmListAllView from '../view/film-all.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import StatisticsView from '../view/stats-footer.js';
import FilmPresenter from './film-presenter.js';

import NoFilmsMessageView from '../view/no-film-message.js';

const FILM_COUNT_STEP = 5;

export default class MainPage {

  constructor(bodyElement, filmsModel, filterModel) {
    this._bodyElement = bodyElement;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._renderCountStep = FILM_COUNT_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._mainElement = this._bodyElement.querySelector('.main');
    this._headerElement = this._bodyElement.querySelector('.header');
    this._footerElement = this._bodyElement.querySelector('.footer');
    this._statisticsMoviesContainer = this._footerElement.querySelector('.footer__statistics');

    this._profileUserComponent = new ProfileUserView();
    this._filmBlockComponent = new FilmBlockView();
    this._filmListAllComponent = new FilmListAllView();
    this._noFilmComponent = new NoFilmsMessageView();
    this._statisticsComponent = new StatisticsView();

    this._showMoreButtonComponent = null;
    this._sortListComponent = null;

    this._renderFilm = this._renderFilm.bind(this);
    this._renderFilms = this._renderFilms.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderProfileUser();
    render(this._mainElement, this._filmBlockComponent, InsertPlace.BEFORE_END);
    render(this._filmBlockComponent, this._filmListAllComponent, InsertPlace.BEFORE_END);

    this._allFilmsListContainer = this._filmListAllComponent.getElement().querySelector('.films-list__container');
    this._renderedFilmsCount = FILM_COUNT_STEP;
    this._renderFilmList();
    const filmCount = this._getFilms().length;
    if (!filmCount) {
      return this._renderNoFilms();
    }

    this._renderStatistics();
  }

  _renderProfileUser() {
    render(this._headerElement, this._profileUserComponent, InsertPlace.BEFORE_END);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filtersFunction[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortFilmsByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmsByRating);
      default:
        return filteredFilms;
    }
  }

  _renderFilm(filmContainer, film) {
    const filmPresenter = new FilmPresenter(
      filmContainer,
      this._bodyElement,
      this._handleViewAction,
      this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._allFilmsListContainer, film));
  }

  _renderFilmList() {
    const filmCount = this._getFilms().length;
    this._renderSort();

    this._renderFilms(this._getFilms().slice(0, Math.min(filmCount, this._renderedFilmsCount)));

    if (filmCount > this._renderedFilmsCount) {
      this._renderShowMoreButton();
    }
  }

  _renderNoFilms() {
    render(this._allFilmsListContainer, this._noFilmComponent, InsertPlace.AFTER_BEGIN);
  }

  _clearFilmList({resetRenderFilmsCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortListComponent);
    remove(this._noFilmComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderFilmsCount) {
      this._renderedFilmsCount = FILM_COUNT_STEP;
    } else {
      this._renderedFilmsCount = Math.min(filmCount, this._renderedFilmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmListAllComponent, this._showMoreButtonComponent, InsertPlace.BEFORE_END);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderFilmCount = Math.min(filmCount, this._renderedFilmsCount + FILM_COUNT_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderFilmCount);

    this._renderFilms(films);
    this._renderedFilmsCount = newRenderFilmCount;

    if (this._renderedFilmsCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleFilmChange(updatedFilm) {
    this._filmPresenter[updatedFilm.id]
      .forEach((filmPresenter) => filmPresenter.init(updatedFilm));
  }

  _handleViewAction(actionType, updateType, update, popUpStatus) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.UPDATE_COMMENTS:
        this._filmsModel.updateComments(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateComments(updateType, update, popUpStatus);
    }
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      // - обновить часть списка (например, когда поменялось описание)
      case UpdateType.PATCH:
        this._handleFilmChange(data);
        break;
        // - обновить список (например, когда задача ушла в архив)
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderFilmList();
        break;
        // - обновить всю доску (например, при переключении фильтра)
      case UpdateType.MAJOR:
        this._clearFilmList({resetRenderFilmsCount: true, resetSortType: true});
        this._renderFilmList();
        break;
    }
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmList({resetRenderFilmsCount: true});
    this._renderFilmList();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetFilm());
  }

  _renderSort() {
    if (this._sortListComponent !== null) {
      this._sortListComponent = null;
    }

    this._sortListComponent = new SortListView(this._currentSortType);
    this._sortListComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._mainElement, this._sortListComponent, InsertPlace.BEFORE_END);
  }

  _renderFilmBlock() {
    render(this._mainElement, this._filmBlockComponent, InsertPlace.BEFORE_END);
  }

  _renderStatistics() {
    render(this._footerElement, this._statisticsComponent, InsertPlace.BEFORE_END);
  }
}
