import { generateDate } from '../utils/time.js';
import { nanoid } from 'nanoid';

import {
  getRandomFixedFloat,
  getRandomBoolean,
  getRandomArrayItem,
  getRandomArrayItems
} from '../utils/random';

import {
  DESCRIPTIONS,
  PEOPLE,
  TITLES,
  AGE_RATING,
  POSTERS,
  COUNTRIES,
  GENRES
} from './data';

import { generateCommentsList } from './comments.js';

const MAX_FILM_RATING = 10;

export const generateFilm = () => {
  return {
    id: nanoid(),
    comments: generateCommentsList(),
    filmInfo: {
      title: getRandomArrayItem(TITLES),
      alternativeTitle: getRandomArrayItem(TITLES),
      totalRating: getRandomFixedFloat(0, MAX_FILM_RATING),
      poster: `./images/posters/${getRandomArrayItem(POSTERS)}`,
      ageRating: getRandomArrayItem(AGE_RATING),
      director: getRandomArrayItem(PEOPLE),
      writers: getRandomArrayItems(PEOPLE).join(', '),
      actors: getRandomArrayItems(PEOPLE).join(', '),
      release: {
        date: generateDate(),
        relaseCountry: getRandomArrayItem(COUNTRIES),
      },
      runtime: generateDate(),
      genres: getRandomArrayItems(GENRES),
      description: getRandomArrayItems(DESCRIPTIONS).join('. '),
    },
    userDetails: {
      isWatchlist: getRandomBoolean(),
      isWatched: getRandomBoolean(),
      watchingDate: generateDate(),
      isFavorite: getRandomBoolean(),
    },
  };
};
