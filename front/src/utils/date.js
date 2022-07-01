// eslint-disable-next-line import/no-extraneous-dependencies
import { parse, format } from 'date-fns';

// Format from java will always be Wed Jun 13 10:56:54 BST 2018
const dateFormat = 'ddd MMM DD HH:mm:ss zzz YYYY';

export const removeBST = (s) => s && s.replace('BST ', '');

export const formatDate = (fullDate = '') =>
  format(
    parse(removeBST(fullDate.toString()), dateFormat, new Date()),
    'DD.MM.YY'
  );

export const formatTime = (fullDate = '') =>
  format(parse(removeBST(fullDate.toString()), dateFormat), 'h:mma');

/**
 * returns {string} readable date in format "6th September 2021"
 * @param {string} inputDate - any valid date format
 */
export function getReadableDate(inputDate) {
  const nth = (d) => {
    if (d > 3 && d < 21) return 'th';

    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const myDate = new Date(inputDate);
  const date = myDate.getDate();
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][myDate.getMonth()];

  return `${date}${nth(date)} ${month} ${myDate.getFullYear()}`;
}

// string -> string
export function prepareDate(date = '') {
  if (!date) return;
  const [day, month, year] = date.toString().split('/');

  // eslint-disable-next-line consistent-return
  return [month, day, year].join('/');
}
