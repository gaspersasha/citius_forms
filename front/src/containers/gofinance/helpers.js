import { capitalize, GTM_EVENT, GTM as gtm } from '~utils';

const GTM_MAP = {
  start: 'ssFinanceApplicationStart',
  drivingLicenceType: 'ssDrivingLicense',
  maritalStatus: 'ssMaritalStatus',
  validUKPassport: 'ssPassport',
  dependants: 'ssDependents',
  residentialStatus: 'ssResidentialStatus',
  addressConfirm: 'ssAddressConfirmation',
  addressChange: 'ssAddressChange',
  residenceYears: 'ssResidedLength',
  employmentType: 'ssEmploymentType',
  employer: 'ssEmployer',
  postCode: 'ssEmployerAddress',
  employmentYears: 'ssEmploymentLength',
  annualSalary: 'ssAnnualIncome',
  accountNumber: 'ssBankDetails',
  yearsAtBank: 'ssBankLength',
};

// Self Service Journey
export const sendGTM = (some) => {
  GTM_EVENT(GTM_MAP[some]);
};

export const handleGTM = (state, keys) => {
  Object.keys(state).forEach((key) => {
    const pos = keys.indexOf(key);

    if (pos > -1) sendGTM(keys[pos]);
  });
};

export const GTM = (path) => gtm(path, 'finance', 'Finance your car');

export const formatOption = (type = '') => {
  const word = type.split('_').join(' ').toLowerCase();

  return capitalize(word);
};

export const getYearsAtJobLabel = (status, type) => {
  if (status !== 'unemployed')
    return 'How many years have you been working at this address?';

  const option = formatOption(type).toLowerCase();

  switch (type) {
    case 'UNEMPLOYED':
    case 'RETIRED':
    case 'UNABLE_TO_WORK':
      return `How long have you been ${option}?`;
    case 'STUDENT':
    case 'HOMEMAKER':
      return `How long have you been a ${option}?`;
    default:
      return `How many years have you spent as a ${option}?`;
  }
};

export const truncateData = ({
  addresses,
  details,
  employments,
  bankDetails,
  ...rest
}) => rest;
