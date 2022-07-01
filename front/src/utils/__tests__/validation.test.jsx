import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  checkNameString,
  formatValidUKPassportVal,
  checkNameStringAdvanced,
  checkText,
  checkSalary,
  checkSortCode,
  checkDependants,
  checkDate,
  checkOldEnough,
  checkNumber,
  checkPhoneNumber,
  checkEmail,
  checkPassword,
  checkNotEmpty,
  checkPostCodeFormat,
  stringLengthIsValid,
  checkAccountNumber,
  prepare,
  simplify,
  isValid,
} from '../validation';

describe('checkNameString module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkNameString(true)).toBe(false);
    expect(checkNameString(false)).toBe(false);
    expect(checkNameString('')).toBe(false);
    expect(checkNameString()).toBe(false);
    expect(checkNameString(-56)).toBe(false);
  });
  it('invalid string passed', () => {
    expect(checkNameString('abc123dfg')).toBe(false);
    expect(checkNameString('testStringWith12numbers')).toBe(false);
    expect(checkNameString('testStr$ing=for check')).toBe(false);
    expect(checkNameString('testStr$ing=forТестcheck')).toBe(false);
  });
  it('valid strings passed', () => {
    expect(checkNameString('abc-sdsdsdg')).toBe(true);
    expect(checkNameString('abc dsdsdg')).toBe(true);
    expect(checkNameString('abc dsdsdg wewewe')).toBe(true);
    expect(checkNameString('   TestString     ')).toBe(true);
  });
});

describe('formatValidUKPassportVal module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(formatValidUKPassportVal(true)).toBe(true);
    expect(formatValidUKPassportVal(false)).toBe(false);
    expect(formatValidUKPassportVal('')).toBe(true);
    expect(formatValidUKPassportVal()).toBe(true);
    expect(formatValidUKPassportVal(-56)).toBe(true);
    expect(formatValidUKPassportVal(0)).toBe(true);
  });
  it('strings passed', () => {
    expect(formatValidUKPassportVal('abc')).toBe(true);
    expect(formatValidUKPassportVal('testStringWith12numbers')).toBe(true);
  });
});

describe('checkNameStringAdvanced module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkNameStringAdvanced(true)).toBe(true);
    expect(checkNameStringAdvanced(-56)).toBe(true);
    expect(checkNameStringAdvanced(false)).toBe(false);
    expect(checkNameStringAdvanced('')).toBe(false);
    expect(checkNameStringAdvanced()).toBe(false);
    expect(checkNameStringAdvanced(0)).toBe(false);
  });
  it('invalid string passed ', () => {
    expect(checkNameStringAdvanced('19sdsdsd%Кириличні/символи-9-5')).toBe(
      false
    );
  });
  it('expected strings', () => {
    expect(checkNameStringAdvanced('abc')).toBe(true);
    expect(checkNameStringAdvanced('abc def')).toBe(true);
    expect(checkNameStringAdvanced('20-206-235')).toBe(true);
    expect(checkNameStringAdvanced('19sdsdsd%fs99-9-5')).toBe(true);
  });
});

describe('checkText module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkText(true)).toBe(true);
    expect(checkText(-56)).toBe(false);
    expect(checkText(false)).toBe(false);
    expect(checkText('')).toBe(false);
    expect(checkText()).toBe(false);
    expect(checkText(0)).toBe(false);
  });
  it('valid string/number passed ', () => {
    expect(checkText('abc')).toBe(true);
    expect(checkText('Textname')).toBe(true);
    expect(checkText('Text name')).toBe(true);
    expect(checkText('TestString256')).toBe(true);
    expect(checkText(256)).toBe(true);
  });
});

describe('checkSalary module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkSalary(true)).toBe(false);
    expect(checkSalary(-56)).toBe(false);
    expect(checkSalary(false)).toBe(false);
    expect(checkSalary('')).toBe(false);
    expect(checkSalary()).toBe(false);
    expect(checkSalary(0)).toBe(false);
    expect(checkSalary('abc')).toBe(false);
  });
  it('smaller number than expected', () => {
    expect(checkSalary(-56)).toBe(false);
    expect(checkSalary(1999)).toBe(false);
    expect(checkSalary(1999.95)).toBe(false);
  });
  it('more then 2000', () => {
    expect(checkSalary(2020)).toBe(true);
    expect(checkSalary(15896)).toBe(true);
  });
});

describe('checkSortCode module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkSortCode(true)).toBe(false);
    expect(checkSortCode(-56)).toBe(false);
    expect(checkSortCode(false)).toBe(true);
    expect(checkSortCode('')).toBe(true);
    expect(checkSortCode()).toBe(true);
    expect(checkSortCode(0)).toBe(true);
    expect(checkSortCode('abc')).toBe(false);
    expect(checkSortCode(1999)).toBe(false);
  });
  it('invalid codes string', () => {
    expect(checkSortCode('20-206-235')).toBe(false);
  });
  it('valid codes passed', () => {
    expect(checkSortCode('1999-9-5')).toBe(true);
    expect(checkSortCode('20-26-20')).toBe(true);
    expect(checkSortCode('2-0-2560')).toBe(true);
  });
});

describe('checkDependants module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkDependants(true)).toBe(true);
    expect(checkDependants(-56)).toBe(false);
    expect(checkDependants(false)).toBe(true);
    expect(checkDependants('')).toBe(false);
    expect(checkDependants(0)).toBe(true);
    expect(checkDependants('abc')).toBe(false);
    expect(checkDependants(1999)).toBe(false);
  });
  it('different numbers passed', () => {
    expect(checkDependants(5.6)).toBe(false);
    expect(checkDependants(56)).toBe(false);
    expect(checkDependants(6)).toBe(true);
  });
});

describe('checkDate module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkDate(true)).toBe(false);
    expect(checkDate(false)).toBe(false);
    expect(checkDate('')).toBe(false);
    expect(checkDate(0)).toBe(false);
    expect(checkDate('abc')).toBe(false);
    expect(checkDate(1999)).toBe(true);
    expect(checkDate(-56)).toBe(true);
  });
  it('invalid dates passed', () => {
    expect(checkDate('a/b/c')).toBe(false);
    expect(checkDate('56/15/21458')).toBe(false);
    expect(checkDate('1/1/202')).toBe(true);
    expect(checkDate('25/05/2020')).toBe(true);
    expect(checkDate('1/1/2')).toBe(true);
    expect(checkDate('10/1/20')).toBe(true);
  });
});

describe('checkOldEnough module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkOldEnough(true)).toBe(false);
    expect(checkOldEnough(false)).toBe(false);
    expect(checkOldEnough('')).toBe(false);
    expect(checkOldEnough(0)).toBe(false);
    expect(checkOldEnough('abc')).toBe(false);
    expect(checkOldEnough(-56)).toBe(true);
    expect(checkOldEnough(1999)).toBe(true);
  });
  it('short/invalid/valid year passed', () => {
    expect(checkOldEnough('10/1/20')).toBe(false);
    expect(checkOldEnough('1/1/2')).toBe(true);
    expect(checkOldEnough('10/1/1920')).toBe(true);
  });
});

describe('checkNumber module validation', () => {
  it('default check string/boolean/empty string/nothing passed', () => {
    expect(checkNumber('abc')).toBe(false);
    expect(checkNumber(true)).toBe(false);
    expect(checkNumber(false)).toBe(false);
    expect(checkNumber('')).toBe(false);
    expect(checkNumber()).toBe(false);
  });
  it('not correct float numbers passed', () => {
    expect(checkNumber(150.45)).toBe(false);
    expect(checkNumber(-150)).toBe(false);
  });
  it('correct number passed', () => {
    expect(checkNumber(150)).toBe(true);
  });
});

describe('checkPhoneNumber module validation', () => {
  it('default check string/boolean/empty string/nothing/int passed', () => {
    expect(checkPhoneNumber('abc')).toBe(false);
    expect(checkPhoneNumber(true)).toBe(false);
    expect(checkPhoneNumber(false)).toBe(false);
    expect(checkPhoneNumber('')).toBe(false);
    expect(checkPhoneNumber()).toBe(false);
    expect(checkPhoneNumber(150)).toBe(false);
  });
  it('correct values passed', () => {
    expect(checkPhoneNumber('0123456789')).toBe(true);
    expect(checkPhoneNumber('+440123456789')).toBe(true);
    expect(checkPhoneNumber('+440-123-456-789')).toBe(true);
    expect(checkPhoneNumber('+440 123 456 789')).toBe(true);
  });
  it('not correct values passed', () => {
    expect(checkPhoneNumber('+440-1234-56-789')).toBe(false);
    expect(checkPhoneNumber('+380501234567')).toBe(false);
  });
});

describe('checkEmail module validation', () => {
  it('default check boolean/empty string/nothing/int passed', () => {
    expect(checkEmail(true)).toBe(false);
    expect(checkEmail(false)).toBe(false);
    expect(checkEmail('')).toBe(false);
    expect(checkEmail()).toBe(false);
    expect(checkEmail(150)).toBe(false);
  });
  it('not enought string passed', () => {
    expect(checkEmail('@')).toBe(false);
    expect(checkEmail('re@')).toBe(false);
    expect(checkEmail('re@te')).toBe(false);
  });
  it('correct string passed', () => {
    expect(checkEmail('re@ds.ds5555')).toBe(true);
    expect(checkEmail('tetete-tetetet@ds.ds5555')).toBe(true);
    expect(checkEmail('tetete%%tetetet@ds.com')).toBe(true);
    expect(checkEmail('test123-$@ds.com')).toBe(true);
  });
  it('with special symbols string passed', () => {
    expect(checkEmail('tetete-tet...etet@ds.ds5555')).toBe(true);
    expect(checkEmail('tetete-tet.etet@ds.ds5555')).toBe(true);
    expect(checkEmail('tetete-tet..etet@ds.ds5555')).toBe(true);
    expect(checkEmail('tetete-tet,,,etet@ds.ds5555')).toBe(false);
    expect(checkEmail('test123()-$@ds.com')).toBe(false);
  });
});

describe('checkPassword module validation', () => {
  it('default check boolean/empty string/nothing/int/string passed', () => {
    expect(checkPassword(true)).toBe(false);
    expect(checkPassword(false)).toBe(false);
    expect(checkPassword('')).toBe(false);
    expect(checkPassword()).toBe(false);
    expect(checkPassword(150)).toBe(false);
    expect(checkPassword('150')).toBe(false);
  });
  it('not correct string passed', () => {
    expect(checkPassword('password')).toBe(false);
    expect(checkPassword('pass1word')).toBe(false);
    expect(checkPassword('paSs1w')).toBe(false);
    expect(checkPassword('Pass0-rd')).toBe(false);
  });
  it('correct string passed', () => {
    expect(checkPassword('paS&wo4d')).toBe(true);
    expect(checkPassword('paSw4ordpaSw#4ordpaSw4ordpaSw4ord@paSw4ord')).toBe(
      true
    );
  });
});

describe('checkNotEmpty module validation', () => {
  it('checkNotEmpty check boolean/empty string/nothing/int/string passed', () => {
    expect(checkNotEmpty(true)).toBe(false);
    expect(checkNotEmpty(false)).toBe(false);
    expect(checkNotEmpty('')).toBe(false);
    expect(checkNotEmpty()).toBe(false);
  });
  it('not correct values passed', () => {
    expect(checkNotEmpty(150)).toBe(false);
    expect(checkNotEmpty(null)).toBe(false);
    expect(checkNotEmpty(undefined)).toBe(false);
    expect(checkNotEmpty('        ')).toBe(false);
  });
  it('not correct values passed', () => {
    expect(checkNotEmpty('150')).toBe(true);
  });
});

describe('checkPostCodeFormat module validation', () => {
  it('checkPostCodeFormat check boolean/empty string/nothing/int etc passed', () => {
    expect(checkPostCodeFormat(true)).toBe(false);
    expect(checkPostCodeFormat(false)).toBe(false);
    expect(checkPostCodeFormat('')).toBe(false);
    expect(checkPostCodeFormat()).toBe(false);
    expect(checkPostCodeFormat(150)).toBe(false);
    expect(checkPostCodeFormat(null)).toBe(false);
    expect(checkPostCodeFormat(undefined)).toBe(false);
    expect(checkPostCodeFormat('        ')).toBe(false);
  });
  it('not correct values passed', () => {
    expect(checkPostCodeFormat('45-78-89')).toBe(false);
    expect(checkPostCodeFormat('PC-7889')).toBe(false);
    expect(checkPostCodeFormat('PC-150 23')).toBe(false);
    expect(checkPostCodeFormat('PC 150 23')).toBe(false);
  });
  it('correct values passed', () => {
    expect(checkPostCodeFormat('PP4R 6DD')).toBe(true);
    expect(checkPostCodeFormat('Pp4R 6dd')).toBe(true);
    expect(checkPostCodeFormat('PP4R6DD')).toBe(true);
    expect(checkPostCodeFormat('W1A 0AX')).toBe(true);
    expect(checkPostCodeFormat('M1 1AE')).toBe(true);
    expect(checkPostCodeFormat('B33 8TH')).toBe(true);
    expect(checkPostCodeFormat('CR2 6XH')).toBe(true);
    expect(checkPostCodeFormat('DN55 1PT')).toBe(true);
  });
});

describe('stringLengthIsValid module validation', () => {
  it('stringLengthIsValid check boolean/empty string/nothing/int etc passed', () => {
    expect(stringLengthIsValid(true, 2)).toBe(false);
    expect(stringLengthIsValid(false, 5)).toBe(false);
    expect(stringLengthIsValid(150, 8)).toBe(false);
  });
  it('not correct values passed', () => {
    expect(stringLengthIsValid('45-78-89', 0)).toBe(false);
    expect(stringLengthIsValid('PC-7889', 9)).toBe(false);
  });
  it('correct values passed', () => {
    expect(stringLengthIsValid('PP4R 6DD', 8)).toBe(true);
    expect(stringLengthIsValid('PP4R6DD', 7)).toBe(true);
  });
});

describe('checkAccountNumber module validation', () => {
  it('checkAccountNumber check boolean/empty string/nothing/int etc passed', () => {
    expect(checkAccountNumber(true)).toBe(false);
    expect(checkAccountNumber(false)).toBe(false);
    expect(checkAccountNumber('')).toBe(true);
    expect(checkAccountNumber(150)).toBe(false);
    expect(checkAccountNumber('        ')).toBe(true);
  });
  it('not correct values passed', () => {
    expect(checkAccountNumber('45-89')).toBe(false);
    expect(checkAccountNumber('PC-7889')).toBe(false);
  });
  it('correct values passed', () => {
    expect(checkAccountNumber('PP4R 6DD')).toBe(true);
    expect(checkAccountNumber('PP4R%6DD')).toBe(true);
  });
});

describe('prepare module validation', () => {
  it('prepare check boolean/empty string/nothing/int etc passed', () => {
    expect(prepare({}, -5)).toEqual({});
    expect(prepare({}, 15)).toEqual({});
    expect(prepare({}, true)).toEqual({});
    expect(prepare({}, false)).toEqual({});
    expect(prepare({}, 'strIng')).toEqual({});
  });
  it('correct values passed', () => {
    // eslint-disable-next-line
    expect(
      prepare(
        {
          key1: 'value1',
          key2: 0,
          key3: undefined,
          key4: -89898,
          key6: 'test$par&am',
          key7: true,
          key8: false,
        },
        6
      )
    ).toEqual({});
    // eslint-disable-next-line
    expect(
      prepare(
        {
          key1: 'value1',
          key2: 0,
          key3: undefined,
          key4: -89898,
          key6: 'test$par&am',
          key7: true,
          key8: 89,
        },
        18
      )
    ).toEqual({});
    expect(
      prepare(
        {
          0: 'value1',
          1: 0,
          2: undefined,
          3: -89898,
          4: 'test$par&am',
          5: true,
          6: false,
          7: 89,
        },
        6
      )
    ).toEqual({});
  });
});

describe('simplify module validation', () => {
  it('simplify check boolean/empty string/nothing/int etc passed', () => {
    expect(simplify({})).toEqual({});
  });
  it('correct values passed', () => {
    // eslint-disable-next-line
    expect(
      simplify({
        key1: 'value1',
        key2: 0,
        key3: undefined,
        key4: -89898,
        key6: 'test$par&am',
        key7: true,
        key8: 89,
      })
    ).toEqual({});
  });
});

describe('isValid module validation', () => {
  it('correct values passed', () => {
    expect(isValid({})).toBe(true);
    expect(
      isValid({
        key1: {
          validationType: VALIDATION_TYPES.NONE,
        },
        key2: {
          validationType: 'default',
        },
        key3: {
          validationType: VALIDATION_TYPES.NONE,
          status: INPUT_STATUS.INVALID,
        },
        key4: {
          validationType: VALIDATION_TYPES.NONE,
          status: INPUT_STATUS.INVALID,
        },
        key5: {
          validationType: 'default',
          status: INPUT_STATUS.VALID,
        },
      })
    ).toBe(true);
  });
  expect(
    isValid({
      key4: {
        validationType: 'default',
        status: INPUT_STATUS.INVALID,
      },
    })
  ).toBe(false);
});
