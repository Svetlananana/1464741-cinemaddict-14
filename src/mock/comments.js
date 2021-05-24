import { PEOPLE, DESCRIPTIONS, EMOTIONS } from './data';
import { getRandomArrayItem } from '../utils/random';
import { generateDate } from '../utils/time.js';
import { nanoid } from 'nanoid';

import {
  getRandomNumber,
  MIN_COUNT_ELEMENT,
  MAX_COUNT_ELEMENT
} from '../utils/random';

export const generateComment = () => {
  return {
    id: nanoid(),
    author: getRandomArrayItem(PEOPLE),
    text: getRandomArrayItem(DESCRIPTIONS),
    date:  generateDate(),
    emotion: `./images/emoji/${getRandomArrayItem(EMOTIONS)}`,
  };
};


export const generateCommentsList = () => {
  return new Array(getRandomNumber(MIN_COUNT_ELEMENT, MAX_COUNT_ELEMENT))
    .fill().map(() => generateComment());
};
