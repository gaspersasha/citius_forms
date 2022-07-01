import React from 'react';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import YearsStep from '../YearsStep';

describe('<YearsStep />', () => {
  const props = {
    handleResidenceYearsChange: jest.fn(),
    handleResidenceMonthsChange: jest.fn(),
    residenceYears: {
      value: 'qwerty',
      status: INPUT_STATUS.VALID,
      validationType: VALIDATION_TYPES.NONE,
    },
    residenceMonths: {
      value: 'qwerty',
      status: INPUT_STATUS.VALID,
      validationType: VALIDATION_TYPES.NONE,
    },
    isMonthDisabled: false,
  };

  const wrapper = shallow(<YearsStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
