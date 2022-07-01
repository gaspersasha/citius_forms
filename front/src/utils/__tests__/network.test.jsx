import { makeQueryString } from '../network';

describe('makeQueryString module network', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(makeQueryString('abc', {})).toBe('abc');
    expect(makeQueryString(true, false)).toBe(true);
    expect(makeQueryString('url', false)).toBe('url');
    expect(makeQueryString('url', -5)).toBe('url');
    expect(makeQueryString()).toBe(undefined);
    expect(makeQueryString('', {})).toBe('');
  });
  it('normal result', () => {
    expect(
      makeQueryString('http://www.link', {
        key1: 'value1',
        key2: 0,
        key3: undefined,
        key4: -89898,
        key5: null,
        key6: 'test$par&am',
      })
    ).toBe('http://www.link?key1=value1&key2=0&key4=-89898&key6=test$par&am');
    // eslint-disable-next-line
    expect(
      makeQueryString('http://www.link', {
        key1: 'value1',
      })
    ).toBe('http://www.link?key1=value1');
    expect(makeQueryString('http://www.link', {})).toBe('http://www.link');
  });
});
