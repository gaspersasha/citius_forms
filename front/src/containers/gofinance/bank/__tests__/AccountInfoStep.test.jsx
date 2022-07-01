import React from 'react';
import { INPUT_STATUS } from '~constants';
import AccountInfoStep from '../AccountInfoStep';

describe('<AccountInfoStep />', () => {
  const props = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    accountNumber: {
      value: '12345678',
      status: INPUT_STATUS.VALID,
    },
    sortCode: {
      value: '123456',
      status: INPUT_STATUS.VALID,
    },
  };

  const wrapper = shallow(<AccountInfoStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
