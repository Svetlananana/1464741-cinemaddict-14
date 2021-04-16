import dayjs from 'dayjs';
import { getRandomNumber } from './random.js';

const DateFormat = {
  COMMENT : 'YYYY/DD/MM HH:mm',
  RELEASE_YEAR: 'YYYY',
  TIME: 'HH:mm',
};

export const generateRunTime = (time = 0) => {
  return dayjs(time).format(DateFormat.TIME);
};

export const generateDateComments = (date = 0) => {
  return dayjs(date).format(DateFormat.COMMENT);
};

export const generateDate = (date = 0) => {
  const yearsGap = getRandomNumber(date, 0);
  return dayjs().add(yearsGap, 'year').toDate();
};

// Я говорил о том, чтобы хранить в date именно дату, не отформатированный вариант
// А уже в представлении, когда будешь получать фильм через параметры, например, в createFilmTemplate приводить к нужному формату, а именно сделать функции
