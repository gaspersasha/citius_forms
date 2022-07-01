import React from 'react';
import { INPUT_STATUS } from '~constants';
import TypeStep from '../TypeStep';

describe('<TypeStep />', () => {
  const props = {
    onChange: jest.fn(),
    employmentType: {
      value: 'FULL_TIME_PERMANENT',
      status: INPUT_STATUS.VALID,
    },
  };

  const wrapper = shallow(<TypeStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
