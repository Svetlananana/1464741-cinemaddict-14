import { render, InsertPlace, remove, replace } from '../utils/render.js';
import SortListView from '../view/sort.js'

export const FILTER = {
  ALL_MOVIES: 'All movies',
  WATCHLIST: 'Watchlist',
  FAVORITES: 'Favorites',
  HISTORY: 'History',
  STATS: 'Stats',
};

export default FilterPresenter {
    constructor(container, handleFilterChange) {
        this._container = container;
        this._handleFilterChange = handleFilterChange;
    }

    init(films) {
        const watchlistedFilms = films.filter((film) => film.watchlist);
        const favoriteFilms = films.filter((film) => film.favorite);
        const historyFilms = films.filter((film) => film.watched);

        const filterData = {
            watchlist: watchlistedFilms,
            favorite: favoriteFilms,
            history: historyFilms,
        };

        const filterComponent = new SortListView(/* ПЕРЕДАТЬ СЮДА ПАРАМЕТРЫ С ФИЛЬМАМИ, ЧТОБЫ ОТОБРАЖАТЬ КОЛИЧЕСТВО */);
        filterComponent.setSortTypeChangeHandler(/* При нажатии на КНОПОЧКУ БЛЯТЬ/ВАРИАНТ НАХУЙ ВЫБОРА СОРТИРОВКИ вызвать функцию handleFilterChange с выбранным значением */);
}
