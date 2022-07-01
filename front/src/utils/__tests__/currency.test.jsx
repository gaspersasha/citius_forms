import { currencyFormat, formatNumber } from '../currency';

describe('currencyFormat module currency', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(currencyFormat('abc')).toBe('£0.00');
    expect(currencyFormat(true)).toBe('£0');
    expect(currencyFormat(false)).toBe('£0');
    expect(currencyFormat('')).toBe('£0');
    expect(currencyFormat()).toBe('£0');
  });
  it('correct behavior', () => {
    expect(currencyFormat(15)).toBe('£15');
    expect(currencyFormat(15.05)).toBe('£15.05');
    expect(currencyFormat(15.055)).toBe('£15.06');
    expect(currencyFormat(15.054)).toBe('£15.05');
    expect(currencyFormat(0)).toBe('£0');
    expect(currencyFormat('test.$Str.ing-=')).toBe('£0.00');
    expect(currencyFormat('test.$S185tr.ing23')).toBe('£0.19');
    expect(currencyFormat('test.$S185tring23')).toBe('£0.19');
    expect(currencyFormat('test$S185tri.ng23')).toBe('£185.23');
    expect(currencyFormat('test$String23')).toBe('£23.00');
  });
});

describe('formatNumber module currency', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(formatNumber('abc')).toBe('NaN');
    expect(formatNumber('1wew5ew.errr4555')).toBe('NaN');
    expect(formatNumber(true)).toBe('1');
    expect(formatNumber(false)).toBe('0');
    expect(formatNumber('')).toBe('0');
    expect(formatNumber()).toBe('NaN');
  });
  it('passed int/float number - correct behavior', () => {
    expect(formatNumber(15)).toBe('15');
    expect(formatNumber(-15)).toBe('-15');
    expect(formatNumber(15.05932)).toBe('15.059');
  });
});
