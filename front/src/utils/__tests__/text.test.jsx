import { capitalize, trimString_ } from '../text';

describe('capitalize module text', () => {
  it('default check boolean/empty string/nothing passed', () => {
    expect(capitalize(true)).toBe(true);
    expect(capitalize(false)).toBe(false);
    expect(capitalize('')).toBe('');
    expect(capitalize()).toBe('');
    expect(capitalize(123)).toBe(123);
  });
  it('normal capitalized result', () => {
    expect(capitalize('abc')).toBe('Abc');
    expect(capitalize('#dfj66j9$4465')).toBe('#dfj66j9$4465');
  });
});

describe('trimString_ module text', () => {
  it('default check boolean/empty string/nothing passed', () => {
    expect(trimString_(true)).toBe(true);
    expect(trimString_(false)).toBe(false);
    expect(trimString_('')).toBe('');
    expect(trimString_()).toBe('');
    expect(trimString_(123)).toBe(123);
  });
  it('normal trimmed result', () => {
    expect(trimString_('  abc       ')).toBe('abc');
    expect(trimString_('#dfj66j    9$4465')).toBe('#dfj66j    9$4465');
    expect(trimString_('  #dfj66j    9$4465                ')).toBe(
      '#dfj66j    9$4465'
    );
  });
});
