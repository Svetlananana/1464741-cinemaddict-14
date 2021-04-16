import ProfileUser from './view/profile-user.js';
import Menu from './view/menu.js';
import SortList from './view/sort.js';
import FilmBlock from './view/films-section';
import FilmListAll from './view/film-all.js';
import FilmTopRated from './view/film-top-rated';
import FilmMostCommented from './view/film-most-commented';
import FilmCard from './view/film-cards.js';
import ShowMoreButton from './view/show-more-button.js';
// import FilmDetails from './view/film-details.js';
import NoFilmsMessage from './view/no-film-message.js';

import { generateFilmPoster } from './mock/film.js';
import {InsertPlace, render } from './utils/render';

const FILM_COUNT_LIST = 20;
const FILM_COUNT_EXTRA = 2;
const FILM_COUNT_STEP = 5;

// const body = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');


render(headerElement, new ProfileUser().getElement(), InsertPlace.BEFORE_END);
render(mainElement, new Menu().getElement(), InsertPlace.BEFORE_END);
render(mainElement, new SortList().getElement(), InsertPlace.BEFORE_END);
render(mainElement, new FilmBlock().getElement(), InsertPlace.BEFORE_END);

const films = mainElement.querySelector('.films');
render(films, new FilmListAll().getElement(), InsertPlace.BEFORE_END);
render(films, new FilmTopRated().getElement(), InsertPlace.BEFORE_END);
render(films, new FilmMostCommented().getElement(), InsertPlace.BEFORE_END);


const filmsList = films.querySelector('.films-list');
const filmsListContainer = films.querySelector('.films-list__container');
const topRated = films.querySelector('#top-rated-list');
const mostCommented = films.querySelector('#most-commented-list');

const filmCards = new Array(FILM_COUNT_LIST).fill().map(generateFilmPoster);

if (filmCards.length === 0) {
  render(mainElement, new NoFilmsMessage().getElement(), InsertPlace.AFTER_BEGIN);
}

for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_STEP); i++) {
  render(filmsListContainer, new FilmCard(filmCards[i]).getElement(), InsertPlace.BEFORE_END);
}

if (filmCards.length > FILM_COUNT_STEP) {
  let renderCountStep = FILM_COUNT_STEP;
  render(filmsList, new ShowMoreButton().getElement(), InsertPlace.BEFORE_END);

  const showMoreButton = films.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    filmCards.slice(renderCountStep, renderCountStep + FILM_COUNT_STEP)
      .forEach((filmCards) => render(filmsListContainer, new FilmCard(filmCards).getElement(), InsertPlace.BEFORE_END));

    renderCountStep += FILM_COUNT_STEP;

    if (renderCountStep >= filmCards.length) {
      showMoreButton.remove();
    }

  });
}

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(topRated, new FilmCard(filmCards[i]).getElement(), InsertPlace.BEFORE_END);
}
for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(mostCommented, new FilmCard(filmCards[i]).getElement(), InsertPlace.BEFORE_END);
}

// render(body, new FilmDetails(filmCards[0]).getElement(), InsertPlace.BEFORE_END);
