import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  formatPreselectPhone,
  makeMinTwoDigits,
  fillProgress,
  formatDataFromLoqate,
  getSumYearsByParam,
  findMaxSteps,
  cutUrlFromParams,
  makeYearOptions,
} from '../form';

describe('formatDataFromLoqate', () => {
  const defaultObject = {
    district: '',
    houseName: '',
    houseNumber: '',
    postCode: '',
    street: '[no street entered from Loqate]',
    town: '[no town entered from Loqate]',
  };

  it('default check string/boolean/empty string/nothing passed', () => {
    expect(formatDataFromLoqate('abc')).toEqual(defaultObject);
    expect(formatDataFromLoqate(true)).toEqual(defaultObject);
    expect(formatDataFromLoqate(false)).toEqual(defaultObject);
    expect(formatDataFromLoqate('')).toEqual(defaultObject);
    expect(formatDataFromLoqate(552005)).toEqual(defaultObject);
  });
  it('formatDataFromLoqate full address a new object', () => {
    expect(
      formatDataFromLoqate({
        City: 'City',
        District: 'District',
        PostalCode: 'PostalCode',
        Street: 'Street',
        BuildingNumber: 'BuildingNumber',
        SubBuilding: 'SubBuilding',
        BuildingName: 'BuildingName',
      })
    ).not.toBe({
      district: 'District',
      postCode: 'PostalCode',
      houseNumber: 'BuildingNumber',
      town: 'City',
      street: 'Street',
      houseName: 'SubBuilding, BuildingName',
    });
  });
  it('formatDataFromLoqate full object is equal', () => {
    expect(
      formatDataFromLoqate({
        City: 'City',
        District: 'District',
        PostalCode: 'PostalCode',
        Street: 'Street',
        BuildingNumber: 'BuildingNumber',
        SubBuilding: 'SubBuilding',
        BuildingName: 'BuildingName',
      })
    ).toEqual({
      district: 'District',
      postCode: 'PostalCode',
      houseNumber: 'BuildingNumber',
      town: 'City',
      street: 'Street',
      houseName: 'SubBuilding, BuildingName',
    });
  });
  it('formatDataFromLoqate without City field', () => {
    expect(
      formatDataFromLoqate({
        District: 'District',
        PostalCode: 'PostalCode',
        Street: 'Street',
        BuildingNumber: 'BuildingNumber',
        SubBuilding: 'SubBuilding',
        BuildingName: 'BuildingName',
      })
    ).toEqual({
      district: 'District',
      postCode: 'PostalCode',
      houseNumber: 'BuildingNumber',
      town: '[no town entered from Loqate]',
      street: 'Street',
      houseName: 'SubBuilding, BuildingName',
    });
  });
  it('formatDataFromLoqate with no Street field', () => {
    expect(
      formatDataFromLoqate({
        City: 'City',
        District: 'District',
        PostalCode: 'PostalCode',
        BuildingNumber: 'BuildingNumber',
        SubBuilding: 'SubBuilding',
        BuildingName: 'BuildingName',
      })
    ).toEqual({
      district: 'District',
      postCode: 'PostalCode',
      houseNumber: 'BuildingNumber',
      town: 'City',
      street: '[no street entered from Loqate]',
      houseName: 'SubBuilding, BuildingName',
    });
  });
  it('formatDataFromLoqate with no SubBuilding field', () => {
    expect(
      formatDataFromLoqate({
        City: 'City',
        District: 'District',
        PostalCode: 'PostalCode',
        BuildingNumber: 'BuildingNumber',
        Street: 'Street',
        BuildingName: 'BuildingName',
      })
    ).toEqual({
      district: 'District',
      postCode: 'PostalCode',
      houseNumber: 'BuildingNumber',
      town: 'City',
      street: 'Street',
      houseName: 'BuildingName',
    });
  });
  it('formatDataFromLoqate with no District field', () => {
    expect(
      formatDataFromLoqate({
        City: 'City',
        PostalCode: 'PostalCode',
        BuildingNumber: 'BuildingNumber',
        Street: 'Street',
        BuildingName: 'BuildingName',
      })
    ).toEqual({
      district: '',
      postCode: 'PostalCode',
      houseNumber: 'BuildingNumber',
      town: 'City',
      street: 'Street',
      houseName: 'BuildingName',
    });
  });
});

describe('module form formatPreselectPhone', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(formatPreselectPhone(true)).toBe(true);
    expect(formatPreselectPhone(false)).toBe(false);
    expect(formatPreselectPhone('')).toBe('');
    expect(formatPreselectPhone()).toBe('');
  });
  it('formatPreselectPhone number/string/alphanumeric/with+/special symbols', () => {
    expect(formatPreselectPhone(552005)).toBe(552005);
    expect(formatPreselectPhone('abc')).toBe('abc');
    expect(formatPreselectPhone('0123456789')).toBe('0123456789');
    expect(formatPreselectPhone('123456789')).toBe('123456789');
    expect(formatPreselectPhone('dfdfdfdfdfdf')).toBe('dfdfdfdfdfdf');
    expect(formatPreselectPhone('+44dfdfdfdfdfdf')).toBe('0dfdfdfdfdfdf');
    expect(formatPreselectPhone('+df$$fgg6454545')).toBe('+df$$fgg6454545');
  });
});

describe('module form fillProgress', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(fillProgress([])).toBe(NaN);
    expect(fillProgress()).toBe(NaN);
  });
  it('fillProgress normal expected value', () => {
    expect(
      fillProgress([
        [5, 0],
        [5, 2],
      ])
    ).toBe(20);
    expect(fillProgress([[5, 0]])).toBe(0);
    expect(fillProgress([[5, 6]])).toBe(100);
    expect(
      fillProgress([
        [5, 6],
        [0, 0],
      ])
    ).toBe(100);
    expect(
      fillProgress([
        [5, 2],
        [5, 1],
      ])
    ).toBe(30);
    expect(
      fillProgress([
        [5, 6],
        [0, 0],
        [18, 9],
        [150, 30],
      ])
    ).toBe(26);
  });
});

describe('module form getSumYearsByParam', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(getSumYearsByParam([], -1, 'key')).toBe('0.00');
    expect(getSumYearsByParam([], true, false)).toBe('0.00');
    expect(getSumYearsByParam()).toBe('0.00');
    expect(getSumYearsByParam([], 5, 5)).toBe('0.00');
  });
  it('getSumYearsByParam array and existing/non existing keys passed', () => {
    expect(
      getSumYearsByParam(
        [
          { monthParam: 1, yearParam: 2 },
          { monthParam: 3, yearParam: 4 },
        ],
        'monthParam',
        'yearParam'
      )
    ).toBe('6.33');
    expect(
      getSumYearsByParam(
        [{ yearParam: 2 }, { monthParam: 3, yearParam: 4 }],
        'monthParam',
        'yearParam'
      )
    ).toBe('6.25');
    expect(
      getSumYearsByParam(
        [
          { yearParam: 2, randomParam: 15 },
          { monthParam: 3, yearParam: 4 },
        ],
        'monthParam',
        'yearParam'
      )
    ).toBe('6.25');
    expect(
      getSumYearsByParam(
        [
          { yearParam: 2, randomParam: 15 },
          { monthParam: 3, yearParam: 4 },
        ],
        'monthParam',
        'newParam'
      )
    ).toBe('0.25');
  });
});

describe('module form  findMaxSteps', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(findMaxSteps('abc')).toBe(1);
    expect(findMaxSteps(true)).toBe(1);
    expect(findMaxSteps(false)).toBe(1);
    expect(findMaxSteps('')).toBe(1);
    expect(findMaxSteps({})).toBe(1);
    expect(findMaxSteps([])).toBe(1);
  });
  it('findMaxSteps ', () => {
    expect(
      findMaxSteps({
        sortCode: {
          step: 0,
        },
        yearsAtBank: {
          value: '0',
          validationType: VALIDATION_TYPES.NONE,
          step: 1,
        },
        monthAtBank: {
          step: 8,
        },
      })
    ).toBe(9);
    expect(
      findMaxSteps({
        sortCode: {
          step: 5,
        },
        yearsAtBank: {
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NONE,
          step: 5,
        },
        monthAtBank: {
          value: 'monthAtBank' || '0',
          validationType: VALIDATION_TYPES.NONE,
          step: 5,
        },
      })
    ).toBe(6);
  });
  expect(
    findMaxSteps({
      sortCode: {
        step: 0,
      },
      yearsAtBank: {
        value: '0',
        validationType: VALIDATION_TYPES.NONE,
        step: 0,
      },
      monthAtBank: {
        step: 0,
      },
    })
  ).toBe(1);
});

describe('cutUrlFromParams', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(cutUrlFromParams('abc')).toBe('abc');
    expect(cutUrlFromParams(true)).toBe('');
    expect(cutUrlFromParams(false)).toBe('');
    expect(cutUrlFromParams('')).toBe('');
    expect(cutUrlFromParams({})).toBe('');
    expect(cutUrlFromParams([])).toBe('');
  });
  it('cutUrlFromParams string link/params', () => {
    expect(cutUrlFromParams('http://wwww.google.com')).toBe(
      'http://wwww.google.com'
    );
    expect(cutUrlFromParams('http://wwww.google.com/test/link')).toBe(
      'http://wwww.google.com/test/link'
    );
    expect(
      cutUrlFromParams(
        'http://wwww.google.com/test/link?with=come&random=params'
      )
    ).toBe('http://wwww.google.com/test/link');
    expect(
      cutUrlFromParams('http://wwww.google.com?with=come&random=params')
    ).toBe('http://wwww.google.com');
  });
});

describe('module form makeMinTwoDigits', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(makeMinTwoDigits('abc')).toBe('abc');
    expect(makeMinTwoDigits(true)).toBe(true);
    expect(makeMinTwoDigits(false)).toBe(false);
    expect(makeMinTwoDigits('')).toBe('');
    expect(makeMinTwoDigits({})).toEqual({});
    expect(makeMinTwoDigits([])).toEqual([]);
    expect(makeMinTwoDigits('45fgf$$=gfd%%%%')).toBe('45fgf$$=gfd%%%%');
  });
  it('makeMinTwoDigits normal expected value', () => {
    expect(makeMinTwoDigits(9)).toBe('09');
    expect(makeMinTwoDigits(0)).toBe(0);
    expect(makeMinTwoDigits(10)).toBe('10');
    expect(makeMinTwoDigits(-5)).toBe(-5);
    expect(makeMinTwoDigits(354)).toBe('354');
  });
});

describe('module form makeYearOptions', () => {
  it('makeYearOptions normal expected value', () => {
    expect(makeYearOptions(2021, 2020)).toEqual([]);
  });
});
