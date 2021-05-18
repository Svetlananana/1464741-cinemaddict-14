import { render, InsertPlace, remove, updateItem} from '../utils/render.js';
import { SortType } from '../utils/const.js';

import ProfileUserView from '../view/profile-user.js';
import MenuView from '../view/menu.js';
import SortListView from '../view/sort.js';
import FilmBlockView from '../view/films-section.js';
import FilmListAllView from '../view/film-all.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import StatisticsView from '../view/stats-footer.js';
import FilmPresenter from './film-presenter.js';

import NoFilmsMessageView from '../view/no-film-message.js';

const FILM_COUNT_STEP = 5;
const INITIAL_FILMS_COUNT = 5;

export default class MainPage {

  constructor(bodyElement) {
    this._bodyElement = bodyElement;
    this._renderCountStep = FILM_COUNT_STEP;

    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._mainElement = this._bodyElement.querySelector('.main');
    this._headerElement = this._bodyElement.querySelector('.header');
    this._footerElement = this._bodyElement.querySelector('.footer');
    this._statisticsMoviesContainer = this._footerElement.querySelector('.footer__statistics');

    this._filmBlockComponent = new FilmBlockView();
    this._filmListAllComponent = new FilmListAllView();

    this._profileUserComponent = new ProfileUserView();
    this._menuComponent = new MenuView();
    this._sortListComponent = new SortListView();
    this._noFilmComponent = new NoFilmsMessageView();

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._statisticsComponent = new StatisticsView();

    this._renderFilm = this._renderFilm.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._renderFilms = this._renderFilms.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._renderedFilmsCount = 0;

    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }


    render(this._mainElement, this._filmBlockComponent, InsertPlace.BEFORE_END);
    render(this._filmBlockComponent, this._filmListAllComponent, InsertPlace.BEFORE_END);


    this._allFilmsListContainer = this._filmListAllComponent
      .getElement()
      .querySelector('.films-list__container');

    this._renderProfileUser();
    this._renderMenu();
    this._renderSortList();

    this._renderFilms(0, INITIAL_FILMS_COUNT);


    this._renderStatistics();
  }

  _handleFilmChange(updateFilm) {  // 5.1.12 Реализует логику обновления задачи
    this._films = updateItem(this._films, updateFilm);
    this._filmPresenter[updateFilm.id].init(updateFilm);

    //Перерисовывать и фильтрацию. Чтобы было актуальным количество
  }
  // export const FILTER = {
  //   ALL_MOVIES: 'All movies',
  //   WATCHLIST: 'Watchlist',
  //   FAVORITES: 'Favorites',
  //   HISTORY: 'History',
  //   STATS: 'Stats',
  // };

  _sortFilms(sortType) {
    switch(sortType) {
      case 'ALL':
        this._films = this._sourcedFilms;
        break;
      case 'HISTORY':
        this._films = getHistoryFilms(this._sourcedFilms); //Поиск по критерию
        break;
      case 'WATCHLIST':
        this._films = getWatchlistFilms(this._sourcedFilms); //Поиск по критерию
        break;
      case 'FAVORITE':
        this._films = getFavoriteFilms(this._sourcedFilms); //Поиск по критерию
        break;
      default:
        this._films = this._sourcedFilms;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
  }

  _renderNoFilms() {
    render(this._allFilmsListContainer, this._noFilmComponent, InsertPlace.AFTER_BEGIN);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => {
        this._renderFilm(this._allFilmsListContainer, film);
      });


    if (this._films.length > FILM_COUNT_STEP) {
      this._renderedFilmsCount = FILM_COUNT_STEP;

      render(this._filmListAllComponent, this._showMoreButtonComponent, InsertPlace.BEFORE_END);

      this._showMoreButtonComponent.setClickHandler(() => {

        this._films
          .slice(this._renderedFilmsCount, this._renderedFilmsCount + FILM_COUNT_STEP)
          .forEach((film) => {
            this._renderFilm(this._allFilmsListContainer, film);
          });

        this._renderedFilmsCount += FILM_COUNT_STEP;

        if (this._renderedFilmsCount >= this._films.length) {
          this._showMoreButtonComponent.getElement().remove();
        }
      });
    }
  }

  _clearFilmList() {   // 5.1.11 Реализует очистку списка
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmsCount = FILM_COUNT_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderProfileUser() {
    render(this._headerElement, this._profileUserComponent, InsertPlace.BEFORE_END);
  }

  _renderMenu() {
    render(this._mainElement, this._menuComponent, InsertPlace.AFTER_BEGIN);
  }

  _renderSortList() {
    render(this._mainElement, this._sortListComponent, InsertPlace.BEFORE_END);
  }

  _renderFilmBlock() {
    render(this._mainElement, this._filmBlockComponent, InsertPlace.BEFORE_END);
  }

  _renderFilm(filmContainer, film) {
    const filmPresenter = new FilmPresenter(filmContainer, this._bodyElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetFilm());
  }

  _renderStatistics() {
    render(this._footerElement, this._statisticsComponent, InsertPlace.BEFORE_END);
  }
}
