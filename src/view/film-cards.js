import dayjs from 'dayjs';
const MAX_LENGTH_DESCRIPTION = 140;

export const createFilmCard = (film) => {
  const {
    comments,
    filmInfo: {
      title,
      totalRating,
      runtime,
      genres,
      poster,
      description,
      release: {
        date,
      },
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
  } = film;

  const getDescriptionSlice = (text, count) => {
    return (text.length >= count) ? text.slice(0, count - 1) + '...' : text;
  };

  const filterActiveClass = (attribute) => {
    return attribute ? 'film-card__controls-item--active' : '';
  };

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(date).year()}</span>
    <span class="film-card__duration">${runtime}</span>
    <span class="film-card__genre">${genres.join(' ')}</span>
  </p>

  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${getDescriptionSlice(description, MAX_LENGTH_DESCRIPTION)}</p>

  <a class="film-card__comments">${comments.length} comments</a>

  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${filterActiveClass(watchlist)}"
    type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${filterActiveClass(alreadyWatched)}"
    type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${filterActiveClass(favorite)}"
    type="button">Mark as favorite</button>
  </div>
</article>`;
};

