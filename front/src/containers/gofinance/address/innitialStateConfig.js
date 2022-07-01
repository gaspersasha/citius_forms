import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';

// initial state of <Address />
export const getInitialState = (
  address,
  sumOfYearsInPrevForms,
  vehicleKeptAtAddress,
  index
) => ({
  postCode: {
    value: address.postCode || '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.POSTCODE,
    step: 0,
  },
  houseName: {
    value: address.houseName || '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
    step: 0,
  },
  houseNumber: {
    value: address.houseNumber || '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
    step: 0,
  },
  street: {
    value: address.street || '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NOT_EMPTY,
    step: 0,
  },
  district: {
    value: address.district || '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
    step: 0,
  },
  town: {
    value: address.town || '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NOT_EMPTY,
    step: 0,
  },
  county: {
    value: address.county || '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
    step: 0,
  },
  vehicleKeptAtAddress: {
    value: false,
    status: 'default',
    //  make it required just for a current address - address with index 0
    validationType: !vehicleKeptAtAddress && index === 0 ? 'checkbox' : 'none',
    step: 0,
  },
  residentialStatus: {
    value: address.residentialStatus || 'HOME_OWNER',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
    step: 1,
  },
  residenceYears: {
    value: address.residenceYears || '0',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
    step: 2,
  },
  residenceMonths: {
    // set default value depending on Years value
    value:
      address.residenceMonths || (address.residenceYears || '0') !== '0'
        ? '0'
        : '1',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
    step: 2,
  },
  sumOfYearsInPrevForms,
  isMonthDisabled: sumOfYearsInPrevForms + Number(address.residenceYears) >= 3,
  currentStep: 0,
  validAtStep: 0,
});
