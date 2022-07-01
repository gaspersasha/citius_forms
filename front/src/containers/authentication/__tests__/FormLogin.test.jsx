import React from 'react';
import { FormLogin } from '..';

const props = {
  extendedActiveForm: jest.fn(),
  setEmail: jest.fn(),
  setPassword: jest.fn(),
  setRememberUser: jest.fn(),
  setFieldValue: jest.fn(),
  onSubmit: jest.fn(),
  isUserRemembered: true,
  errorMessage: '',
  emailValue: 'test@email.com',
};

describe('<FormLogin />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FormLogin {...props} />);
  });

  it('should match snapshots', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call extendedActiveForm function with signup', () => {
    const signUpButton = wrapper.find('b[data-id="link"]');

    signUpButton.simulate('click');
    expect(props.extendedActiveForm).toHaveBeenCalledWith('signup');
  });

  it('should call extendedActiveForm function with reset', () => {
    const resetButton = wrapper.find('span[role="button"]');

    resetButton.simulate('click');
    expect(props.extendedActiveForm).toHaveBeenCalledWith('reset');
  });
});
