import React from 'react';
import { INPUT_STATUS } from '~constants';
import JobStep from '../JobStep';

describe('<JobStep />', () => {
  const props = {
    employmentStatus: 'employed',
    onJobInfoChange: jest.fn(),
    employer: {
      value: 'Qwerty',
      status: INPUT_STATUS.VALID,
    },
    jobTitle: {
      value: 'Qwerty',
      status: INPUT_STATUS.VALID,
    },
  };

  const wrapper = shallow(<JobStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
