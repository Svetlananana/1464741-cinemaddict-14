import { createProfileUser } from './view/profile-user.js';
import { createMenuTemplate } from './view/menu.js';
import { createSortList } from './view/sort.js';
import { createFilmBlock } from './view/films.js';
import { createFilmCards } from './view/films-cards.js';
import { createShowMoreButton } from './view/show-more-button';
import { createFilmDetails } from './view/film-details';

const FILM_COUNT_LIST = 5;
const FILM_COUNT_EXTRA = 2;

const InsertPlace = {
  BEFORE_END: 'beforeend',  //  сразу перед закрывающим тегом element (после последнего потомка)
  AFTER_BEGIN: 'afterbegin', // сразу после открывающего тега  element (перед первым потомком)
  BEFORE_BEGIN: 'beforebegin', // до самого element (до открывающего тега)
  AFTER_END: 'afterend', // после element (после закрывающего тега)
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileUser(), InsertPlace.BEFORE_END);

render(mainElement, createMenuTemplate(), InsertPlace.BEFORE_END);
render(mainElement, createSortList(), InsertPlace.BEFORE_END);
render(mainElement, createFilmBlock(), InsertPlace.BEFORE_END);

const films = mainElement.querySelector('.films');
const filmsList = films.querySelector('.films-list');
const filmsListContainer = films.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT_LIST; i++) {
  render(filmsListContainer, createFilmCards(), InsertPlace.BEFORE_END);
}

render(filmsList, createShowMoreButton(), InsertPlace.BEFORE_END);

const filmsListExtra = films.querySelectorAll('.films-list--extra');
const topRated = filmsListExtra[0].querySelector('.films-list__container');
const mostCommented = filmsListExtra[1].querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(topRated, createFilmCards(), InsertPlace.BEFORE_END);
}

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(mostCommented, createFilmCards(), InsertPlace.BEFORE_END);
}

const body = document.querySelector('body');

render(body, createFilmDetails(), 'beforeend');

