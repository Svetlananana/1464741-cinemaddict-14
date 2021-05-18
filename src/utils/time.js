import dayjs from 'dayjs';
import { getRandomNumber } from './random.js';

export const DateFormat = {
  COMMENT : 'YYYY/DD/MM HH:mm',
  RELEASE_DATE: 'DD MMM YYYY',
  RELEASE_YEAR: 'YYYY',
  TIME: 'hh:mm',
};

export const generateDate = (date = 0) => {
  const yearsGap = getRandomNumber(date, 0);
  return dayjs().add(yearsGap, 'year').toDate();
};

export const formatDate = (date, format = DateFormat.COMMENT) => {
  return dayjs(date).format(format);
};

// export const humanizeDuration = (durationTime) => {
//   dayjs.extend(duration);

//   return `${dayjs.duration(durationTime, 'minutes').hours()}h ${dayjs.duration(durationTime, 'minutes').minutes()}m`;
// };

// export const humanizeCommentDate = (date) => {
//   dayjs.extend(relativeTime);

//   return `${dayjs(date).toNow(true)} ago`;
// };
