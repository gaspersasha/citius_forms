import { deepEqual, isEmpty, getObjProperty } from '../objects';

describe('deepEqual module objects', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual(true, false)).toBe(true);
    expect(deepEqual('url', false)).toBe(false);
    expect(deepEqual('url', -5)).toBe(false);
    expect(deepEqual('', {})).toBe(false);
  });
  it('different objects - normal result', () => {
    expect(
      deepEqual(
        { key2: 0, key4: -89898, key6: 'test$par&am' },
        { key2: 0, key4: -89898, key6: 'test$par&am' }
      )
    ).toBe(true);
    expect(
      deepEqual(
        { key2: 0, key4: -89898, key6: 'test$par&am' },
        {
          key2: 0,
          key4: -89898,
          key6: 'test$par&am',
          key7: 'test$par&otherKey',
        }
      )
    ).toBe(false);
    expect(
      deepEqual({ key1: 'bla', key2: 'bla' }, { key2: 'bla', key1: 'bla' })
    ).toBe(true);
    expect(
      deepEqual({ key1: 'bla', key2: 'bla' }, { key2: 'bla', key3: 'bla' })
    ).toBe(false);
  });
});

describe('isEmpty module objects', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(isEmpty('abc')).toBe(false);
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty()).toBe(true);
  });
  it('normal result ', () => {
    expect(isEmpty({ key: 'abc' })).toBe(false);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(1502)).toBe(false);
  });
});

describe('getObjProperty module objects', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(getObjProperty({}, 'a.d')).toBe(null);
    expect(getObjProperty([], 'a.d')).toBe(null);
    expect(getObjProperty({}, '')).toBe(undefined);
  });
  it('normal result', () => {
    expect(getObjProperty({ a: { b: { c: 'd' } } }, 'a.b.c')).toBe('d');
    expect(getObjProperty({ a: { b: { c: 'd' } } }, 'a.b.d')).toBe(undefined);
    expect(getObjProperty({ a: { b: { c: 'd', d: 'e' } } }, 'a.d')).toBe(
      undefined
    );
  });
});
