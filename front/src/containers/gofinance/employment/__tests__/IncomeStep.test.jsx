import React from 'react';
import { INPUT_STATUS } from '~constants';
import IncomeStep from '../IncomeStep';

describe('<IncomeStep />', () => {
  const props = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    annualSalary: {
      value: '12345',
      status: INPUT_STATUS.VALID,
    },
  };

  const wrapper = shallow(<IncomeStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
