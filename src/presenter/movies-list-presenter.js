import { render, InsertPlace, remove, replace, updateItem } from '../utils/render.js';
import FilmPresenter from './film-presenter.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmsMessageView from '../view/no-film-message.js';

const INITIAL_FILMS_COUNT = 5;
const FILM_COUNT_STEP = 5;

export default class AllMoviesListPresenter {

  constructor(listContainer, filmListAllComponent, bodyElement) {
    this._listContainer = listContainer;
    this._bodyElement = bodyElement;
    this._filmListAllComponent = filmListAllComponent;
    this._filmPresenter = {};

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._noFilmComponent = new NoFilmsMessageView();

    this._renderFilms = this._renderFilms.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this); // ХОБА 2
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice(); ///// ХОБА 2

    this._renderedFilmsCount = 0;

    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms(0, INITIAL_FILMS_COUNT);
  }

  _handleFilmChange(updateFilm) {  // 5.1.12 Реализует логику обновления задачи
    this._films = updateItem(this._films, updateFilm);
    this._filmPresenter[updateFilm.id].init(updateFilm);
  }

  _handleSortTypeChange(sortType) { // ХОБА 2
////////////////////////////////////////////
  }

  _renderNoFilms() {
    render(this._listContainer, this._noFilmComponent, InsertPlace.AFTER_BEGIN);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => {
        const filmPresenter = new FilmPresenter(this._listContainer, this._bodyElement, this._handleFilmChange); // 5.1.13 Добавит логику обновления задачи
        filmPresenter.init(film);
        this._filmPresenter[film.id] = filmPresenter;
      });


    if (this._films.length > FILM_COUNT_STEP) {
      this._renderedFilmsCount = FILM_COUNT_STEP;

      render(this._filmListAllComponent, this._showMoreButtonComponent, InsertPlace.BEFORE_END);

      this._showMoreButtonComponent.setClickHandler(() => {

        this._films
          .slice(this._renderedFilmsCount, this._renderedFilmsCount + FILM_COUNT_STEP)
          .forEach((film) => {
            const filmPresenter = new FilmPresenter(this._listContainer, this._bodyElement);
            filmPresenter.init(film);
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
}
