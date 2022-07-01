import React from 'react';
import { Confirm } from '..';

const props = {
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  toggleModal: jest.fn(),
  isLoading: false,
  isDataSending: false,
  isLeadgen: false,
  handlePromoCodeChange: jest.fn(),
};

describe('<Confirm />', () => {
  it('orders snapshot', () => {
    const wrapper = mount(<Confirm {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
