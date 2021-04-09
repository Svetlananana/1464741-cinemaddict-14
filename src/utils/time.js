import dayjs from 'dayjs';

export const generateDate = (date) => {
  return dayjs(date).format('«DD MMMM YYYY»');
};

export const genetateRunTime = (time) => {
  return dayjs(time).format('«HH:mm»');
};

export const generateDateComments = (date) => {
  return dayjs(date).format('«DD MMMM YYYY HH:mm»');
};
