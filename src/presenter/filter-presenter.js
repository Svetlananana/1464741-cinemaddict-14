// // import { render, InsertPlace, remove, replace } from '../utils/render.js';
// import SortListView from '../view/sort.js';
// import dayjs from 'dayjs';

// const sortFilmsByDate = (filmA, filmB) => {
//   return dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
// };

// const sortFilmsByRating = (filmA, filmB) => {
//   return filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
// };

// export const FILTER = {
//   ALL_MOVIES: 'All movies',
//   WATCHLIST: 'Watchlist',
//   FAVORITES: 'Favorites',
//   HISTORY: 'History',
//   STATS: 'Stats',
// };

// export default class FilterPresenter {

//   constructor(container, handleFilterChange) {
//     this._container = container;
//     this._handleFilterChange = handleFilterChange;
//   }

//   init(films, currentFilterType) {
//     const watchlistedFilms = (films) => films.filter((films) => films.userInfo.watchlist);
//     const favoriteFilms = (films) => films.filter((films) => films.userInfo.favorite);
//     const historyFilms = (films) => films.filter((films) => films.userInfo.watched);


//     const filterData = {
//       watchlist: watchlistedFilms,
//       favorite: favoriteFilms,
//       history: historyFilms,
//     };

//     const filterComponent = new SortListView(/* ПЕРЕДАТЬ СЮДА ПАРАМЕТРЫ С ФИЛЬМАМИ, ЧТОБЫ ОТОБРАЖАТЬ КОЛИЧЕСТВО */);
//     filterComponent.setSortTypeChangeHandler(/* При нажатии на КНОПОку выбрать ВАРИАНТ СОРТИРОВКИ вызвать функцию handleFilterChange с выбранным значением */);
//   }
// }
