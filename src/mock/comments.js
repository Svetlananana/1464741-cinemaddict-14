import { PEOPLE, DESCRIPTIONS, EMOTIONS } from './data';
import { getRandomArrayItem } from '../utils/random';
import { generateDate } from '../utils/time.js';


let id = 0;

export const generateComment = () => {
  return {
    id: ++id,
    author: getRandomArrayItem(PEOPLE),
    text: getRandomArrayItem(DESCRIPTIONS),
    date:  generateDate(),
    emotion: `./images/emoji/${getRandomArrayItem(EMOTIONS)}`,
  };
};
