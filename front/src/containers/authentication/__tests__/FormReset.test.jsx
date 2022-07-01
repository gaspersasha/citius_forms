import React from 'react';
import { FormReset } from '..';

describe('<FormResetPass />', () => {
  let wrapper;

  const props = {
    extendedActiveForm: jest.fn(),
    setFieldValue: jest.fn(),
    onSubmit: jest.fn(),
    errorMessage: '',
    setEmail: jest.fn(),
    success: false,
  };

  beforeEach(() => {
    wrapper = mount(<FormReset {...props} />);
  });

  it('component renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('callback function sends value', () => {
    const extendedActiveForm = jest.spyOn(props, 'extendedActiveForm');
    const button = wrapper.find('#authBack');

    button.simulate('click');

    expect(extendedActiveForm).toHaveBeenCalledWith('login');
  });

  it('error message is shown due to wrong of data', () => {
    const errorMessage = 'Please enter an email address';

    wrapper.setProps({ errorMessage });
    expect(wrapper.find('div[data-id="with-error"]')).toHaveLength(1);
    expect(wrapper.find('span[data-id="error-message"]').text()).toEqual(
      errorMessage
    );
  });

  it('should call setFieldValue function', () => {
    const emailInput = wrapper.find('input[type="email"]');
    const e = { target: { name: 'email', value: 'test@val' } };

    emailInput.simulate('change', e);

    expect(props.setFieldValue).toHaveBeenCalledWith('email', e.target.value);
  });
});
