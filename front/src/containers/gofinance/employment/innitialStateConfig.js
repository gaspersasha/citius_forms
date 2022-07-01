// initial state of <Employment />
import { FORM, INPUT_STATUS, VALIDATION_TYPES } from '~constants';

const {
  EMPLOYED_STATUSES,
  TEMPORARY_CONTRACT,
  UNEMPLOYED_STATUSES,
  employmentStatus,
} = FORM;
const unemployedValues = {
  employer: {
    value: 'Unemployed',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NAME_ADVANCED,
  },
  jobTitle: {
    value: 'Unemployed',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NAME_ADVANCED,
  },
  postCode: {
    value: '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.POSTCODE,
  },
  buildingName: {
    value: '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
  },
  buildingNumber: {
    value: '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
  },
  street: {
    value: '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NOT_EMPTY,
  },
  district: {
    value: '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
  },
  town: {
    value: '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NOT_EMPTY,
  },
  county: {
    value: '',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NONE,
  },
};
const selfEmployedValues = {
  employer: {
    value: 'SELF_EMPLOYED',
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NAME_ADVANCED,
    step: 1,
  },
};

export function getUpdatedStateByType(type) {
  switch (type) {
    case 'employed':
    default:
      return {
        employer: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NAME_ADVANCED,
          step: 1,
        },
        jobTitle: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NAME_ADVANCED,
          step: 1,
        },
        postCode: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.POSTCODE,
          step: 2,
        },
        buildingName: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NONE,
        },
        buildingNumber: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NONE,
        },
        street: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NOT_EMPTY,
          step: 2,
        },
        district: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NONE,
        },
        town: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NOT_EMPTY,
          step: 2,
        },
        county: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NONE,
        },
        annualSalary: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.SALARY,
          step: 3,
        },
        employmentYears: {
          value: '0',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NOT_EMPTY,
          step: 4,
        },
        employmentMonths: {
          value: '0',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NONE,
          step: 4,
          isActive: true,
        },
      };
    case 'selfEmployed':
      return selfEmployedValues;

    case 'unemployed':
      return {
        ...unemployedValues,
        annualSalary: {
          value: '',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.SALARY,
          step: 1,
        },
        employmentYears: {
          value: '0',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NOT_EMPTY,
          step: 2,
        },
        employmentMonths: {
          value: '0',
          status: INPUT_STATUS.DEFAULT,
          validationType: VALIDATION_TYPES.NONE,
          isActive: true,
          step: 2,
        },
      };
  }
}

export const getEmploymentStatus = (type) => {
  if (type === employmentStatus.SELF_EMPLOYED) return employmentStatus[type];
  if (EMPLOYED_STATUSES.includes(type) || type === TEMPORARY_CONTRACT)
    return employmentStatus.EMPLOYED;
  if (UNEMPLOYED_STATUSES.includes(type)) return employmentStatus.UNEMPLOYED;

  return '';
};

export const initialEmploymentState = (sumOfYearsInPrevForms, employments) => {
  const employmentStatusList = getEmploymentStatus(
    employments.employmentType || 'FULL_TIME_PERMANENT'
  );
  const defaultArr = {
    validAtStep: 0,
    employmentStatus: employmentStatusList,
    employmentType: {
      value: employments.employmentType || 'FULL_TIME_PERMANENT',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 0,
    },
    employer: {
      value: employments.employer || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NAME_ADVANCED,
      step: 1,
    },
    jobTitle: {
      value: employments.jobTitle || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NAME_ADVANCED,
      step: 1,
    },
    postCode: {
      value: employments.postCode || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.POSTCODE,
      step: 2,
    },
    buildingName: {
      value: employments.buildingName || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    buildingNumber: {
      value: employments.building || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    street: {
      value: employments.street || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 2,
    },
    district: {
      value: employments.district || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    town: {
      value: employments.town || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 2,
    },
    county: {
      value: employments.county || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    annualSalary: {
      value: employments.grossAnnualIncome || employments.annualSalary || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.SALARY,
      step: 3,
    },
    employmentYears: {
      value: employments.employmentYears || '0',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 4,
    },
    employmentMonths: {
      value: employments.employmentMonths || '0',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      isActive: employments.employmentYears
        ? sumOfYearsInPrevForms + Number(employments.employmentYears) < 3
        : true,
      step: 4,
    },
    sumOfYearsInPrevForms,
  };

  if (employmentStatusList.toLowerCase() === 'unemployed') {
    return {
      ...defaultArr,
      ...unemployedValues,
      annualSalary: {
        value: employments.grossAnnualIncome || employments.annualSalary || '',
        status: INPUT_STATUS.DEFAULT,
        validationType: VALIDATION_TYPES.SALARY,
        step: 1,
      },
      employmentYears: {
        value: employments.employmentYears || '0',
        status: INPUT_STATUS.DEFAULT,
        validationType: VALIDATION_TYPES.NOT_EMPTY,
        step: 2,
      },
      employmentMonths: {
        value: employments.employmentMonths || '0',
        status: INPUT_STATUS.DEFAULT,
        validationType: VALIDATION_TYPES.NONE,
        step: 2,
        isActive: true,
      },
    };
  }

  if (employmentStatusList.toLowerCase() === 'selfemployed') {
    return {
      ...defaultArr,
      ...selfEmployedValues,
    };
  }

  return defaultArr;
};
