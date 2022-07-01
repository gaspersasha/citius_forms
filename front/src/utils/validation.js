/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
import { FORM, INPUT_STATUS, VALIDATION_TYPES } from '~constants';

import { prepareDate } from './date';
import { trimString_ } from './text';

/*
 * accepts data with string type and returns boolean
 */
export const checkNameString = (value) => {
  value = trimString_(value);
  const english = /^[a-zA-Z]+(-[a-zA-Z]+)*$/;

  return Boolean(
    value && value.length && english.test(value.replace(/\s+/g, ''))
  );
};

export const formatValidUKPassportVal = (val) => val !== false;

/**
 * Allow non empty english string with numbers and non-word symbols.
 * Listed all symbols instead of using \W because not english letters (ex: cyrillic) considered as no-word symbols.
 * */
export const checkNameStringAdvanced = (value) => {
  value = trimString_(value);
  const englishNumbersSymbols =
    /^[a-zA-Z\d!@#$%^&*()_+=[{\]};:<>|\\./?,~\-\s]*$/;

  return Boolean(value && englishNumbersSymbols.test(value));
};

export const checkText = (value) => {
  value = trimString_(value);
  const numbers = /^[A-Za-z0-9\s]*$/;

  return Boolean(value && numbers.test(value));
};

export const checkSalary = (value = 0) => parseFloat(value) >= 2000;

// empty value is valid, since field isn't required
export const checkSortCode = (value) =>
  value ? value.length === 8 && value.split('-').length === 3 : true;

export const checkDependants = (value) => {
  if ((value.length && !Number(value)) || value === '') return false;

  return !(value > 50 || value < 0 || value % 1 !== 0);
};

export const checkDate = (value) => {
  const MyDate = new Date(prepareDate(value));

  return !!MyDate.getTime();
};

export const checkOldEnough = (birthDate) => {
  const ageLimit = 18;
  const msInOneYear = 31556952000;
  const minDateStamp = Date.parse(new Date()) - ageLimit * msInOneYear;
  const birthdateStamp = Date.parse(prepareDate(birthDate));

  return birthdateStamp < minDateStamp;
};

export const checkNumber = (value) => {
  const regexp = /^\d+$/;

  return regexp.test(value);
};

/*
 * accepts data with number type and returns boolean
 */
export const checkPhoneNumber = (phone) => {
  // const regexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  // taken from previous form
  // eslint-disable-next-line max-len
  const regexp = new RegExp(
    '^(?:(?:\\(?(?:0(?:0|11)\\)?[\\s-]?\\(?|\\+)44\\)?[\\s-]?(?:\\(?0\\)?[\\s-]?)?)|(?:\\(?0))(?:(?:\\d{5}\\)?[\\s-]?\\d{4,5})|(?:\\d{4}\\)?[\\s-]?(?:\\d{5}|\\d{3}[\\s-]?\\d{3}))|(?:\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{3,4})|(?:\\d{2}\\)?[\\s-]?\\d{4}[\\s-]?\\d{4}))(?:[\\s-]?(?:x|ext\\.?|#)\\d{3,4})?\\s*$'
  );

  return regexp.test(phone);
};

/*
 * accepts data with string type and returns boolean
 * The following email validation requirements have been taken from
 * https://help.salesforce.com/articleView?id=000321158&type=1&mode=1
 */
export const checkEmail = (email) => {
  if (!email || !email.length) return false;
  if (email.indexOf('@') < 0) return false;

  const [, domain] = email.split('@');

  if (!domain || !domain.length) return false;
  // manual validation for '..', cause it fails to work in Regexp in Safari and FF
  if (domain.indexOf('..') > -1) return false;

  // REGEXP TRANSCRIPTION
  // LOCAL PART:
  // ^(?!\.) => not start with dot
  // [\w\/\-+.!#$%&'*=?^`{|}~]+ => group of chars from list, any amount

  // DOMAIN PART:
  // @([\w-][.]?)+ => group of chars with hyphen and  zero or one dot, any amount
  // \.(?<!\.\.) => dot, but not two dots in a row
  // [A-Za-z0-9]{2,20} => group of chars (min 2, max 20) for root domain

  return /^(?!\.)[\w/\-+.!#$%&'*=?^`{|}~]+@([\w-][.]?)+\.[A-Za-z0-9]{2,20}$/.test(
    email
  );
};

/*
 * Password validation for Profile form (Can be empty)
 * Contain at least 8 characters
 * contain at least 1 number
 * contain at least 1 lowercase character (a-z)
 * contain at least 1 uppercase character (A-Z)
 * contain at least 1 special symbol character !@#%&*?£
 * contains only 0-9a-zA-Z
 */
export const checkPassword = (value) => {
  if (typeof value === 'string') value = value.trim();
  const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!@#%&*?£]).{8,}$/;

  return regexp.test(value);
};

export const checkNotEmpty = (value) => {
  if (!value) return false;
  if (typeof value === 'string') value = value.trim();

  return !!value.length;
};

export const regexpPostCode = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i;

/** Completely new validation type, which is acceptable only for PostCode field* */
export const checkPostCodeFormat = (value) => {
  if (!value) return false;
  if (typeof value === 'string') value = value.trim();

  return !!value.length && regexpPostCode.test(value);
};

/*
 * accepts if string length input value length is equal to expected length
 */
export const stringLengthIsValid = (inputValue, expectedInputValueLength) =>
  inputValue.length === expectedInputValueLength;

/*
 * accepts if string is correnct AccountNumber
 */
export const checkAccountNumber = (inputValue) =>
  inputValue === '' || stringLengthIsValid(inputValue, 8);

// https://gist.github.com/danielrbradley/7567269
// eslint-disable-next-line
const ukPlateRegex =
  /(^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$)|(^[A-Z][0-9]{1,3}[A-Z]{3}$)|(^[A-Z]{3}[0-9]{1,3}[A-Z]$)|(^[0-9]{1,4}[A-Z]{1,2}$)|(^[0-9]{1,3}[A-Z]{1,3}$)|(^[A-Z]{1,2}[0-9]{1,4}$)|(^[A-Z]{1,3}[0-9]{1,3}$)|(^[A-Z]{1,3}[0-9]{1,4}$)|(^[0-9]{3}[DX]{1}[0-9]{3}$)/i;

export const checkUKPlate = (plateNumber) =>
  ukPlateRegex.test(plateNumber.trim());

/*
 * accepts if incoming argument is Object
 */
// export const isObject = obj => obj !== null && typeof obj === 'object' && !Array.isArray(obj);

/*
 * Format phone number
 */
// export const formatPhone = phoneNumber => phoneNumber.replace(/[(][0][)]/g, '')
//   .replace(/ /g, '')
//   .replace('+440', '0')
//   .replace('+44', '0')
//   .replace(/[(]/g, '')
//   .replace(/[)]/g, '')
//   .replace(/-/g, '');

// inputs as state
export function validate(inputs) {
  return Object.keys(inputs).reduce((validated, key) => {
    const { validationType, value } = inputs[key];

    switch (validationType) {
      case VALIDATION_TYPES.TEXT:
        validated[key] = {
          ...inputs[key],
          status: checkText(value) ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.NOT_REQUIRED_TEXT: {
        let status = INPUT_STATUS.DEFAULT;

        if (value) {
          status = checkNameString(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID;
        }

        validated[key] = {
          ...inputs[key],
          status,
        };
        break;
      }

      case VALIDATION_TYPES.NOT_EMPTY:
        validated[key] = {
          ...inputs[key],
          status: checkNotEmpty(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.POSTCODE:
        validated[key] = {
          ...inputs[key],
          status: checkPostCodeFormat(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.NONE:
        validated[key] = {
          ...inputs[key],
          status: checkNotEmpty(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.DEFAULT,
        };
        break;

      case VALIDATION_TYPES.NAME:
        validated[key] = {
          ...inputs[key],
          status: checkNameString(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.NAME_ADVANCED:
        validated[key] = {
          ...inputs[key],
          status: checkNameStringAdvanced(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.PHONE:
        validated[key] = {
          ...inputs[key],
          status: checkPhoneNumber(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.ALT_PHONE: {
        const status = checkPhoneNumber(value)
          ? INPUT_STATUS.VALID
          : INPUT_STATUS.INVALID;

        validated[key] = {
          ...inputs[key],
          status: value.length > 0 ? status : INPUT_STATUS.DEFAULT,
        };
        break;
      }

      case VALIDATION_TYPES.DATE:
        validated[key] = {
          ...inputs[key],
          status:
            checkDate(value) && checkOldEnough(value)
              ? INPUT_STATUS.VALID
              : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.EMAIL:
        validated[key] = {
          ...inputs[key],
          status: checkEmail(value) ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.PASSWORD:
        if (value === '') {
          validated[key] = Object.assign(inputs[key], {
            status: INPUT_STATUS.DEFAULT,
          });
        } else {
          validated[key] = Object.assign(inputs[key], {
            status: checkPassword(value)
              ? INPUT_STATUS.VALID
              : INPUT_STATUS.INVALID,
          });
        }

        break;

      case VALIDATION_TYPES.DEPENDANTS:
        validated[key] = {
          ...inputs[key],
          status: checkDependants(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.NUMBER:
        validated[key] = {
          ...inputs[key],
          status: checkNumber(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.SALARY:
        validated[key] = {
          ...inputs[key],
          status: checkSalary(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.CHECKBOX:
        validated[key] = {
          ...inputs[key],
          status: value ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.SORTCODE:
        validated[key] = {
          ...inputs[key],
          status: checkSortCode(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.ACCOUNT_NUMBER:
        validated[key] = {
          ...inputs[key],
          status: checkAccountNumber(value)
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.INVALID,
        };
        break;

      case VALIDATION_TYPES.COUNTRY_OF_BIRTH:
        validated[key] = {
          ...inputs[key],
          status:
            FORM.COUNTRIES.indexOf(value) !== -1
              ? INPUT_STATUS.VALID
              : INPUT_STATUS.INVALID,
        };
        break;

      default:
        validated[key] = {
          ...inputs[key],
          status: INPUT_STATUS.DEFAULT,
        };
        break;
    }

    return validated;
  }, {});
}

// default step is set to -1 so every field from state
// can be prepared, not only from current step
export function prepare(state, step = -1) {
  return Object.keys(state)
    .filter((key) => typeof state[key] === 'object')
    .filter((key) => state[key].validationType)
    .filter((key) => (step !== -1 ? state[key].step === step : true))
    .reduce((forValidation, key) => {
      forValidation[key] = state[key];

      return forValidation;
    }, {});
}

export function simplify(state) {
  return Object.keys(prepare(state)).reduce((form, key) => {
    form[key] = state[key].value;

    return form;
  }, {});
}

export function isValid(state) {
  return !Object.values(state).some(
    ({ validationType, status }) =>
      validationType !== VALIDATION_TYPES.NONE &&
      status === INPUT_STATUS.INVALID
  );
}

export const isMinAddress = (address) =>
  !checkNotEmpty(address.town) ||
  !checkNotEmpty(address.postCode) ||
  !checkNotEmpty(address.street);
