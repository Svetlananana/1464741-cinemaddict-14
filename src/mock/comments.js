import { PEOPLE, DESCRIPTIONS, EMOTIONS } from './data';
import { getRandomArrayItem } from '../utils/random';
import { generateDateComments } from '../utils/time.js';

let id = 0;

export const generateComment = () => {
  return {
    id: ++id,
    author: getRandomArrayItem(PEOPLE),
    text: getRandomArrayItem(DESCRIPTIONS),
    date: generateDateComments(1),
    emotion: `./images/emoji/${getRandomArrayItem(EMOTIONS)}`,
  };
};
