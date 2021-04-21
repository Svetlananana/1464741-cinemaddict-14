import ProfileUserView from './view/profile-user.js';
import MenuView from './view/menu.js';
import SortListView from './view/sort.js';
import FilmBlockView from './view/films-section';
import FilmListAllView from './view/film-all.js';
import FilmTopRatedView from './view/film-top-rated';
import FilmMostCommentedView from './view/film-most-commented';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import NoFilmsMessageView from './view/no-film-message.js';
import FilmDetailsView from './view/film-details.js';

import { generateFilm } from './mock/film.js';
import { InsertPlace, render } from './utils/render';
import StatisticsView from './view/stats-footer.js';

const FILM_COUNT_LIST = 20;
const FILM_COUNT_EXTRA = 2;
const FILM_COUNT_STEP = 5;

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

render(
  headerElement,
  new ProfileUserView().getElement(),
  InsertPlace.BEFORE_END,
);

render(
  mainElement,
  new MenuView().getElement(),
  InsertPlace.BEFORE_END,
);

render(
  mainElement,
  new SortListView().getElement(),
  InsertPlace.BEFORE_END,
);

render(
  mainElement,
  new FilmBlockView().getElement(),
  InsertPlace.BEFORE_END,
);

const films = mainElement.querySelector('.films');

render(
  films,
  new FilmListAllView().getElement(),
  InsertPlace.BEFORE_END,
);
render(
  films,
  new FilmTopRatedView().getElement(),
  InsertPlace.BEFORE_END,
);
render(
  films,
  new FilmMostCommentedView().getElement(),
  InsertPlace.BEFORE_END,
  );

const filmsList = films.querySelector('.films-list');
const filmsListContainer = films.querySelector('.films-list__container');
const topRated = films.querySelector('#top-rated-list');
const mostCommented = films.querySelector('#most-commented-list');
const statisticsMovis = footerElement.querySelector('.footer__statistics');

const filmCards = new Array(FILM_COUNT_LIST).fill().map(generateFilm);
const topRatedFilms = new Array(FILM_COUNT_EXTRA).fill().map(generateFilm);
const mostCommentedFilms = new Array(FILM_COUNT_EXTRA).fill().map(generateFilm);

// const createFilmCardWithHandlers = (film) => {
//   const filmCard = new FilmCardView(film);
//   filmCard.setOpenPopupHandler();
//   return filmCard;
// };

const renderFilmCards = (filmContainer, filmCards) => {

  const filmElementCard = new FilmCardView(filmCards);
  const filmDetailsCard = new FilmDetailsView(filmCards);

  const removeFilmDetailsCard = () => {
    filmDetailsCard._element.remove();
    filmDetailsCard._element = null;
    bodyElement.classList.remove('hide-overflow');
  };

  render(filmContainer, filmElementCard, InsertPlace.BEFORE_END);

  filmElementCard.setClickHandler(() => {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removeFilmDetailsCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);

    render(bodyElement, filmDetailsCard, InsertPlace.BEFORE_END);

    filmDetailsCard.setClickHandler(() => {
      removeFilmDetailsCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  });
};

// const renderFilmList = (mainElement, filmsElement) => {
// const filmCard = new FilmCardView(filmsElement);

if (!filmCards.length) {
  render(
    mainElement,
    new NoFilmsMessageView().getElement(),
    InsertPlace.AFTER_BEGIN,
  );
}

else {
  for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_STEP); i++) {
    // render(filmsListContainer, new FilmCardView(filmCards[i]).getElement(), InsertPlace.BEFORE_END);
    renderFilmCards(filmsListContainer, filmCards[i]);
  }

  if (filmCards.length > FILM_COUNT_STEP) {
    let renderCountStep = FILM_COUNT_STEP;

    const showMoreButton = new ShowMoreButtonView();

    render(
      filmsList,
      showMoreButton,
      InsertPlace.BEFORE_END,
    );

    // const showMoreButton = films.querySelector('.films-list__show-more');

    showMoreButton.setClickHandler(() => {

      filmCards
        .slice(renderCountStep, renderCountStep + FILM_COUNT_STEP)
        .forEach((film) => renderFilmCards(filmsListContainer, film)); // .forEach((film) => render(filmsListContainer, new FilmCardView(film).getElement(), InsertPlace.BEFORE_END));

      renderCountStep += FILM_COUNT_STEP;

      if (renderCountStep >= filmCards.length) {
        showMoreButton.removeElement();
      }

    });
  }
}

topRatedFilms.forEach((film) => {
  render(
    topRated,
    new FilmCardView(film).getElement(),
    InsertPlace.BEFORE_END,
  );
});

mostCommentedFilms.forEach((film) => {
  render(
    mostCommented,
    new FilmCardView(film).getElement(),
    InsertPlace.BEFORE_END,
  );
});

render(
  statisticsMovis,
  new StatisticsView().getElement(),
  InsertPlace.BEFORE_END,
);


// renderFilmList(mainElement, filmCards);

// const renderFilmCards = (filmContainer, filmsElement) => {
//   if (!filmsElement.length) {
//     render(filmContainer, new NoFilmsMessageView().getElement(), InsertPlace.AFTER_BEGIN);
//   }

//   else {
//     for (let i = 0; i < Math.min(filmsElement.length, FILM_COUNT_STEP); i++) {
//       render(filmsListContainer, createFilmCardWithHandlers(filmsElement[i]).getElement(), InsertPlace.BEFORE_END);
//     }
//     if (filmsElement.length > FILM_COUNT_STEP) {
//       let renderCountStep = FILM_COUNT_STEP;
//       render(filmsList, new ShowMoreButtonView().getElement(), InsertPlace.BEFORE_END);

//       const showMoreButton = films.querySelector('.films-list__show-more');

//       showMoreButton.addEventListener('click', (evt) => {
//         evt.preventDefault();

//         filmsElement
//           .slice(renderCountStep, renderCountStep + FILM_COUNT_STEP)
//           .forEach((film) => render(filmsListContainer, createFilmCardWithHandlers(film).getElement(), InsertPlace.BEFORE_END));

//         renderCountStep += FILM_COUNT_STEP;

//         if (renderCountStep >= filmsElement.length) {
//           showMoreButton.remove();
//         }

//       });
//     }
//   }
// };

// renderFilmCards(mainElement, filmCards);
