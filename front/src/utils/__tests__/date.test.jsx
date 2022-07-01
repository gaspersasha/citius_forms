import { formatDate, formatTime, prepareDate } from '../date';

describe('formatDate module date', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(formatDate('abc')).toBe('Invalid Date');
    expect(formatDate(true)).toBe('Invalid Date');
    expect(formatDate(false)).toBe('Invalid Date');
    expect(formatDate('')).toBe('Invalid Date');
    expect(formatDate()).toBe('Invalid Date');
    expect(formatDate(552005)).toBe('Invalid Date');
  });
  it('passed string/super short/short date', () => {
    expect(formatDate('15.08')).toBe('Invalid Date');
    expect(formatDate('15.08.08')).toBe('Invalid Date');
    expect(formatDate('15/08/08')).toBe('Invalid Date');
    expect(formatDate('$test stri==n%g')).toBe('Invalid Date');
  });
  it('passed number/ string with full date', () => {
    expect(formatDate('15')).toBe('01.01.00');
    expect(formatDate(159)).toBe('01.01.59');
    expect(
      formatDate(
        'Fri Aug 06 2021 12:16:38 GMT+0300 (Eastern European Summer Time)'
      )
    ).toBe('06.08.21');
  });
});

describe('formatTime module date', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(formatTime('abc')).toBe('Invalid Date');
    expect(formatTime(true)).toBe('Invalid Date');
    expect(formatTime(false)).toBe('Invalid Date');
    expect(formatTime('')).toBe('Invalid Date');
    expect(formatTime()).toBe('Invalid Date');
    expect(formatTime(552005)).toBe('Invalid Date');
  });
  it('passed string/number with number', () => {
    expect(formatTime('15')).toBe('12:00am');
    expect(formatTime('12:05')).toBe('Invalid Date');
    expect(formatTime('48')).toBe('12:00am');
    expect(formatTime(48)).toBe('12:00am');
  });
  it('passed full date string', () => {
    expect(formatTime('Fri Aug 06 2021 12:16:38')).toBe('12:16pm');
  });
});

describe('prepareDate module date', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(prepareDate('abc')).toBe('/abc/');
    expect(prepareDate(true)).toBe('/true/');
    expect(prepareDate(false)).toBe(undefined);
    expect(prepareDate('')).toBe(undefined);
    expect(prepareDate()).toBe(undefined);
  });
  it('passed string with number/time', () => {
    expect(prepareDate('15')).toBe('/15/');
    expect(prepareDate('12:05')).toBe('/12:05/');
    expect(prepareDate('15/06/05')).toBe('06/15/05');
    expect(prepareDate('18/01/2021')).toBe('01/18/2021');
    expect(prepareDate(48)).toBe('/48/');
    expect(prepareDate(552005)).toBe('/552005/');
  });
  it('passed full date string', () => {
    expect(
      prepareDate(
        'Fri Aug 06 2021 12:16:38 GMT+0300 (Eastern European Summer Time)'
      )
    ).toBe(
      '/Fri Aug 06 2021 12:16:38 GMT+0300 (Eastern European Summer Time)/'
    );
  });
});
