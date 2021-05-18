import { generateFilm } from './mock/film.js';
import MainPage from './presenter/main-page.js';

const FILM_COUNT_LIST = 20;

const bodyElement = document.querySelector('body');

const filmCards = new Array(FILM_COUNT_LIST).fill().map(generateFilm);

const mainPagePresenter = new MainPage(bodyElement);
mainPagePresenter.init(filmCards);
