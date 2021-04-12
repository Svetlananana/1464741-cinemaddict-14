import { generateDate, genetateRunTime } from '../utils/time.js';

import {
  getRandomNumber,
  getRandomFixedFloat,
  getRandomBoolean,
  getRandomArrayItem,
  getRandomArrayItems,
  MIN_COUNT_ELEMENT,
  MAX_COUNT_ELEMENT
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

import { generateComment } from './comments.js';

const MAX_FILM_RATING = 10;

export const generateFilmPoster = () => {
  return {
    id: getRandomNumber(0, 1000),
    comments: new Array(getRandomNumber(MIN_COUNT_ELEMENT, MAX_COUNT_ELEMENT)).fill().map(() => generateComment()),
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
        date: generateDate(0),
        relaseCountry: getRandomArrayItem(COUNTRIES),
      },
      runtime: genetateRunTime(0),
      genres: getRandomArrayItems(GENRES),
      description: getRandomArrayItems(DESCRIPTIONS).join('. '),
    },
    userDetails: {
      watchlist: getRandomBoolean(),
      alreadyWatched: getRandomBoolean(),
      watchingDate: generateDate(0),
      favorite: getRandomBoolean(),
    },
  };
};


