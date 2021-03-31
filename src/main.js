import { createProfileUser } from './view/profile-user.js';
import { createMenuTemplate } from './view/menu.js';
import { createSortList } from './view/sort.js';
import { createFilmBlock } from './view/films.js';
import { createFilmCards } from './view/films-cards.js';
import { createShowMoreButton } from './view/show-more-button';
import { createFilmDitels } from './view/film-diteils';

const FILM_COUNT_LIST = 5;
const FILM_COUNT_EXTRA = 2;

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileUser(), 'beforeend');

render(mainElement, createMenuTemplate(), 'beforeend');
render(mainElement, createSortList(), 'beforeend');

render(mainElement, createFilmBlock(), 'beforeend');

const films = mainElement.querySelector('.films');
const filmsList = films.querySelector('.films-list');
const filmsListContainer = films.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT_LIST; i++) {
  render(filmsListContainer, createFilmCards(), 'beforeend');
}

render(filmsList, createShowMoreButton(), 'beforeend');

const filmsListExtra = films.querySelector('.films-list--extra');
const filmsListExtraContainer = filmsListExtra.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(filmsListExtraContainer, createFilmCards(), 'beforeend');
}

const filmsListExtraContainerLast = films.lastElementChild.querySelector('.films-list__container');  // чтот не могу додуматься, как без костылей тут сделать

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(filmsListExtraContainerLast, createFilmCards(), 'beforeend');
}

const body = document.querySelector('body');

render(body, createFilmDitels(), 'beforeend');
//
