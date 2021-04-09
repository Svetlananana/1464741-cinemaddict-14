// import dayjs from 'dayjs';

import { generateDate, genetateRunTime } from '../utils/time.js';

import {
  getRandomNumber,
  getRandomFixedFloat,
  getRandomBoolean,
  getRandomArrayItem
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

import { generateComment } from './comments';

export const generateFilmPoster = () => {
  return {
    id: 0,
    comments: new Array(getRandomNumber(1, 3)).fill().map(() => generateComment()),// generateComments(3).map(c => c.id), //[1, 2, 3, 4, 5],
    filmInfo: {
      title: getRandomArrayItem(TITLES),
      alternativeTitle: getRandomArrayItem(TITLES),
      totalRating: getRandomFixedFloat(0, 10),
      poster: `./images/posters/${getRandomArrayItem(POSTERS)}`,
      ageRating: getRandomArrayItem(AGE_RATING),
      director: getRandomArrayItem(PEOPLE),
      writers: new Array(getRandomNumber(1, 3)).fill().map(() => PEOPLE[getRandomNumber(0, PEOPLE.length - 1)]).join(', '),
      actors: new Array(getRandomNumber(1, 3)).fill().map(() => PEOPLE[getRandomNumber(0, PEOPLE.length - 1)]).join(', '),
      release: {
        date: generateDate(0),
        relaseCountry: getRandomArrayItem(COUNTRIES),
      },
      runtime: genetateRunTime(-5),
      genres: new Array(getRandomNumber(1, 3)).fill().map(() => GENRES[getRandomNumber(0, GENRES.length - 1)]),
      description: new Array(getRandomNumber(1, 5)).fill().map(() => DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)]).join('. '),
    },
    userDetails: {
      watchlist: getRandomBoolean(),
      alreadyWatched: getRandomBoolean(),
      watchingDate: generateDate(0),
      favorite: getRandomBoolean(),
    },
  };
};


