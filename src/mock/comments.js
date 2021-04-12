import dayjs from 'dayjs';
import { PEOPLE, DESCRIPTIONS, EMOTIONS } from './data';
import { getRandomArrayItem } from '../utils/random';
import { generateDate } from '../utils/time.js';

let id = 0;

export const generateComment = () => {
  return {
    id: ++id,
    author: getRandomArrayItem(PEOPLE),
    text: getRandomArrayItem(DESCRIPTIONS),
    date:  dayjs(generateDate(-1)).format('YYYY/DD/MM HH:mm'),
    emotion: `./images/emoji/${getRandomArrayItem(EMOTIONS)}`,
  };
};
