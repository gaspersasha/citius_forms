import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';

export const getFormFiledProperties = (value, validationType) => ({
  value,
  validationType,
  status: INPUT_STATUS.DEFAULT,
});

export const composeFormState = (state, additional = {}) => {
  const result = { ...additional };

  Object.entries(state).forEach(([key, value]) => {
    switch (key) {
      case 'email':
        result[key] = getFormFiledProperties(value, VALIDATION_TYPES.EMAIL);
        break;

      case 'dateOfBirth':
        result[key] = getFormFiledProperties(value, VALIDATION_TYPES.DATE);
        break;

      case 'postcode':
        result[key] = getFormFiledProperties(value, VALIDATION_TYPES.POSTCODE);
        break;

      case 'title':
      case 'message':
        result[key] = getFormFiledProperties(value, VALIDATION_TYPES.NOT_EMPTY);
        break;

      case 'firstName':
      case 'lastName':
        result[key] = getFormFiledProperties(value, VALIDATION_TYPES.NAME);
        break;

      case 'middleName':
        result[key] = getFormFiledProperties(
          value,
          VALIDATION_TYPES.NOT_REQUIRED_TEXT
        );
        break;

      case 'phone':
        result[key] = getFormFiledProperties(value, VALIDATION_TYPES.PHONE);
        break;

      case 'alternativePhone':
        result[key] = getFormFiledProperties(value, VALIDATION_TYPES.ALT_PHONE);
        break;

      default:
        result[key] = getFormFiledProperties(value, VALIDATION_TYPES.NONE);
        break;
    }
  });

  return result;
};

export const getFormFieldsNames = (fields) => {
  const names = {};

  Object.keys(fields).forEach((key) => {
    names[key] = key;
  });

  return names;
};
