import React from 'react';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import ResidentialStep from '../ResidentialStep';

describe('<ResidentialStep />', () => {
  const props = {
    onChange: jest.fn(),
    residentialStatus: {
      value: 'qwerty',
      status: INPUT_STATUS.VALID,
      validationType: VALIDATION_TYPES.NONE,
    },
  };

  const wrapper = shallow(<ResidentialStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
