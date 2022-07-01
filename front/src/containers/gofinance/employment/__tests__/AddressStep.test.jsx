import React from 'react';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import AddressStep from '../AddressStep';

describe('<AddressStep />', () => {
  const addressMock = {
    value: 'qwerty',
    status: INPUT_STATUS.VALID,
    validationType: VALIDATION_TYPES.NONE,
  };
  const props = {
    selectHandler: jest.fn(),
    changePostcodeField: jest.fn(),
    changeAddressField: jest.fn(),
    address: {
      postCode: addressMock,
      buildingName: addressMock,
      buildingNumber: addressMock,
      street: addressMock,
      district: addressMock,
      town: addressMock,
      county: addressMock,
    },
  };

  const wrapper = shallow(<AddressStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
