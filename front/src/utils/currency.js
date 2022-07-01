// TODO: try remove currency formatter dep in fav of Intl
import currencyFormatter from 'currency-formatter';

const currencyCode = () => 'GBP';

// https://github.com/smirzaei/currency-formatter/issues/31
const precision = (value) => (value % 1 === 0 ? 0 : null);

export const currencyFormat = (value = 0) =>
  currencyFormatter.format(value, {
    code: currencyCode(),
    precision: precision(value),
  });
// end TODO

export const formatNumber = (number) =>
  new Intl.NumberFormat().format(Number(number));
export const IntlGBP = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
