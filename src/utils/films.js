import dayjs from 'dayjs';

export const sortFilmsByDate = (a, b) => {
  return dayjs(b.filmInfo.release.date).diff(dayjs(a.filmInfo.release.date));
};

export const sortFilmsByRating = (a, b) => {
  return b.filmInfo.totalRating - a.filmInfo.totalRating;
};

