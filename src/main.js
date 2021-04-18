import ProfileUser from './view/profile-user.js';
import Menu from './view/menu.js';
import SortList from './view/sort.js';
import FilmBlock from './view/films-section';
import FilmListAll from './view/film-all.js';
import FilmTopRated from './view/film-top-rated';
import FilmMostCommented from './view/film-most-commented';
import FilmCard from './view/film-card.js';
import ShowMoreButton from './view/show-more-button.js';
import NoFilmsMessage from './view/no-film-message.js';

import { generateFilm } from './mock/film.js';
import {InsertPlace, render } from './utils/render';

const FILM_COUNT_LIST = 20;
const FILM_COUNT_EXTRA = 2;
const FILM_COUNT_STEP = 5;

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

const filmCards = new Array(FILM_COUNT_LIST).fill().map(generateFilm);
const topRatedFilms = new Array(FILM_COUNT_EXTRA).fill().map(generateFilm);
const mostCommentedFilms = new Array(FILM_COUNT_EXTRA).fill().map(generateFilm);

const createFilmCardWithHandlers = (film) => {
  const filmCard = new FilmCard(film);
  filmCard.setOpenPopupHandler();
  return filmCard;
};

const rendeFilmCard = (filmContainer, cardFilm) => {

  if (cardFilm.every((task) => task.isArchive)) {
    render(filmContainer, new NoFilmsMessage().getElement(), InsertPlace.AFTER_BEGIN);
  }

  for (let i = 0; i < Math.min(cardFilm.length, FILM_COUNT_STEP); i++) {
    render(filmsListContainer, createFilmCardWithHandlers(cardFilm[i]).getElement(), InsertPlace.BEFORE_END);
  }

  if (cardFilm.length > FILM_COUNT_STEP) {
    let renderCountStep = FILM_COUNT_STEP;
    render(filmsList, new ShowMoreButton().getElement(), InsertPlace.BEFORE_END);

    const showMoreButton = films.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      cardFilm
        .slice(renderCountStep, renderCountStep + FILM_COUNT_STEP)
        .forEach((film) => render(filmsListContainer, createFilmCardWithHandlers(film).getElement(), InsertPlace.BEFORE_END));

      renderCountStep += FILM_COUNT_STEP;

      if (renderCountStep >= cardFilm.length) {
        showMoreButton.remove();
      }

    });
  }
};

rendeFilmCard(mainElement, filmCards);

topRatedFilms.forEach((film) => {
  render(topRated, createFilmCardWithHandlers(film).getElement(), InsertPlace.BEFORE_END);
});

mostCommentedFilms.forEach((film) => {
  render(mostCommented, createFilmCardWithHandlers(film).getElement(), InsertPlace.BEFORE_END);
});
