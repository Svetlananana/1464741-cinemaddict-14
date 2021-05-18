import { PEOPLE, DESCRIPTIONS, EMOTIONS } from './data';
import { getRandomArrayItem } from '../utils/random';
import { generateDate } from '../utils/time.js';
import { nanoid } from 'nanoid';

export const generateComment = () => {
  return {
    id: nanoid(),
    author: getRandomArrayItem(PEOPLE),
    text: getRandomArrayItem(DESCRIPTIONS),
    date:  generateDate(),
    emotion: `./images/emoji/${getRandomArrayItem(EMOTIONS)}`,
  };
};
