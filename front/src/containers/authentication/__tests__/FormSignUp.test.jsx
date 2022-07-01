import React from 'react';
import { FormSignUp } from '..';

const props = {
  extendedActiveForm: jest.fn(),
  setFieldValue: jest.fn(),
  onSubmit: jest.fn(),
  isUserRemembered: true,
  isUnsubscribed: false,
  errorMessage: '',
  activeForm: 'signup',
  firstNameValue: 'FirstName',
  lastNameValue: 'LastName',
};

describe('<FormSignUp />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<FormSignUp {...props} />);
  });

  it('should match snapshots', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call setActiveForm function', () => {
    const loginButton = wrapper.find('b[data-id="link"]');

    loginButton.simulate('click');
    expect(props.extendedActiveForm).toHaveBeenCalledWith('login');
  });

  it('should call setFieldValue function', () => {
    const unsubscribeCheckbox = wrapper.find('input[type="checkbox"]');

    unsubscribeCheckbox.at(1).simulate('change');
    expect(props.setFieldValue).toHaveBeenCalledWith('unsubscribe', true);
  });
});
