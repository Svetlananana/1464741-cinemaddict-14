import { generateFilm } from './mock/film.js';
import MainPage from './presenter/main-page.js';
import FilterPresenter from './presenter/filter-presenter.js';

import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';

const FILM_COUNT_LIST = 20;

const bodyElement = document.querySelector('body');
const mainElement = bodyElement.querySelector('main');

const filmCards = new Array(FILM_COUNT_LIST).fill().map(generateFilm);
const filmsModel = new FilmsModel();
filmsModel.setFilms(filmCards);

const filterModel = new FilterModel();

const mainPagePresenter = new MainPage(bodyElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

filterPresenter.init();
mainPagePresenter.init();
