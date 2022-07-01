import React from 'react';
import PaymentMethodForm from '../PaymentMethodForm';

describe('<PaymentMethodForm />', () => {
  let wrapper;

  const props = {
    paymentMethod: 'cash',
    handleChange: () => {},
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<PaymentMethodForm {...props} />);
  });

  it('should match snapshots', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('on submit cb should be called', () => {
    wrapper.find('button').first().simulate('click');
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
