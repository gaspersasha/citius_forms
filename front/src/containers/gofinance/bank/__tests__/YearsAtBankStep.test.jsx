import React from 'react';
import { INPUT_STATUS } from '~constants';
import YearsAtBankStep from '../YearsAtBankStep';

describe('<YearsAtBankStep />', () => {
  const props = {
    onChange: jest.fn(),
    yearsAtBank: {
      value: '2',
      status: INPUT_STATUS.VALID,
    },
    yearsAtBankOptions: [
      { option: '0 Year(s)', value: '0' },
      { option: '1 Year(s)', value: '1' },
      { option: '2 Year(s)', value: '2' },
      { option: '3 Year(s)', value: '3' },
      { option: '4+ Year(s)', value: '4' },
    ],
    monthAtBank: {
      value: '3',
      status: INPUT_STATUS.VALID,
    },
    monthAtBankOptions: [
      { option: '0 Month(s)', value: '0' },
      { option: '1 Month(s)', value: '1' },
      { option: '2 Month(s)', value: '2' },
      { option: '3 Month(s)', value: '3' },
      { option: '4 Month(s)', value: '4' },
      { option: '5 Month(s)', value: '5' },
      { option: '6 Month(s)', value: '6' },
      { option: '7 Month(s)', value: '7' },
      { option: '8 Month(s)', value: '8' },
      { option: '9 Month(s)', value: '9' },
      { option: '10 Month(s)', value: '10' },
      { option: '11 Month(s)', value: '11' },
    ],
    monthAtBankIsDisabled: false,
  };

  const wrapper = shallow(<YearsAtBankStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
