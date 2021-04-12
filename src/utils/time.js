import dayjs from 'dayjs';
import { getRandomNumber } from './random.js';

export const genetateRunTime = (time) => {
  return dayjs(time).format('HH:mm');
};

export const generateDateComments = (date) => {
  return dayjs(date).format('YYYY/DD/MM HH:mm');
};

export const generateDate = (date) => {
  const yearsGap = getRandomNumber(date, 0);
  return dayjs().add(yearsGap, 'year').toDate();
};
