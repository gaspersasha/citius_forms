import React from 'react';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import PostCodeStep from '../PostCodeStep';

describe('<PostCodeStep />', () => {
  const addressMock = {
    value: 'qwerty',
    status: INPUT_STATUS.VALID,
    validationType: VALIDATION_TYPES.NONE,
  };

  const props = {
    selectAddressHandler: jest.fn(),
    changePostcodeField: jest.fn(),
    changeAddressField: jest.fn(),
    postCode: addressMock,
    houseName: addressMock,
    houseNumber: addressMock,
    street: addressMock,
    district: addressMock,
    town: addressMock,
    county: addressMock,
  };

  const wrapper = shallow(<PostCodeStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
