import dayjs from 'dayjs';
import { getRandomNumber } from './random.js';

export const DateFormat = {
  COMMENT : 'YYYY/DD/MM HH:mm',
  RELEASE_DATE: 'DD MMM YYYY',
  RELEASE_YEAR: 'YYYY',
  TIME: 'hh:mm',
};

const DateFormatTypes = [
  {
    TYPE: 'minute',
    COUNTE: 60,
  },
  {
    TYPE: 'hour',
    COUNTE: 24,
  },
  {
    TYPE: 'day',
    COUNTE: 7,
  },
  {
    TYPE: 'week',
    COUNTE: 4,
  },
  {
    TYPE: 'month',
    COUNTE: 12,
  },
  {
    TYPE: 'year',
    COUNTE: 2022,
  },
];

export const getHumanizeCommentDate = (data) => {
  for (let i = 0; i < DateFormatTypes.length; i++) {
    const currentDate = DateFormatTypes[i];
    const diff = dayjs().diff((data), currentDate.TYPE);
    if (diff === 0) {
      return 'now';
    }
    if (diff < currentDate.COUNTE) {
      return `${diff} ${currentDate.TYPE} ago`;
    }
  }
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
