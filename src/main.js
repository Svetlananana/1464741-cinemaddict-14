import { createProfileUser } from './view/profile-user.js';
import { createMenuTemplate } from './view/menu.js';
import { createSortList } from './view/sort.js';
import { createFilmBlock } from './view/films.js';
import { createFilmCards } from './view/film-cards.js';
import { createShowMoreButton } from './view/show-more-button.js';
import { createFilmDetails } from './view/film-details.js';
import { generateFilmPoster } from './mock/film.js';
import { render, InsertPlace } from './utils/render';

const FILM_COUNT_LIST = 20;
const FILM_COUNT_EXTRA = 2;
const FILN_COUNT_STEP = 5;

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

render(headerElement, createProfileUser(), InsertPlace.BEFORE_END);
render(mainElement, createMenuTemplate(), InsertPlace.BEFORE_END);
render(mainElement, createSortList(), InsertPlace.BEFORE_END);
render(mainElement, createFilmBlock(), InsertPlace.BEFORE_END);

const films = mainElement.querySelector('.films');
const filmsList = films.querySelector('.films-list');
const filmsListContainer = films.querySelector('.films-list__container');

const filmsListExtra = films.querySelectorAll('.films-list--extra');
const topRated = filmsListExtra[0].querySelector('.films-list__container');
const mostCommented = filmsListExtra[1].querySelector('.films-list__container');

const filmCards = new Array(FILM_COUNT_LIST).fill().map(generateFilmPoster);

for (let i = 0; i < Math.min(filmCards.length, FILN_COUNT_STEP); i++) {
  render(filmsListContainer, createFilmCards(filmCards[i]), InsertPlace.BEFORE_END);
}

if (filmCards.length > FILN_COUNT_STEP) {
  let renderCountStep = FILN_COUNT_STEP;
  render(filmsList, createShowMoreButton(), InsertPlace.BEFORE_END);

  const showMoreButton = films.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    filmCards.slice(renderCountStep, renderCountStep + FILN_COUNT_STEP)
      .forEach((filmCards) => render(filmsListContainer, createFilmCards(filmCards), InsertPlace.BEFORE_END));

    renderCountStep += FILN_COUNT_STEP;

    if (renderCountStep >= filmCards.length) {
      showMoreButton.remove();
    }

  });
}

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(topRated, createFilmCards(filmCards[i]), InsertPlace.BEFORE_END);
}
for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(mostCommented, createFilmCards(filmCards[i]), InsertPlace.BEFORE_END);
}

const body = document.querySelector('body');
render(body, createFilmDetails(filmCards[0]), InsertPlace.BEFORE_END);
