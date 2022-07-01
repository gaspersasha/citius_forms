import React from 'react';
import { AuthForm } from '..';

const props = {
  title: 'Test Title',
  subTitle: 'Test Sub Title',
  setFieldValue: jest.fn(),
  onSubmit: jest.fn(),
  isUserRemembered: true,
  activeForm: 'login',
  emailValue: 'test@email.com',
};

describe('<AuthForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AuthForm {...props} />);
  });

  it('should match snapshots', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state for authentication', () => {
    wrapper.find("span[data-id='toggle-pass']").simulate('click');
    const passwordInput = wrapper.find('input[data-id="password-input"]');

    expect(passwordInput.props().type).toBe('text');
  });

  it('should close modal window', () => {
    wrapper = mount(<AuthForm {...props} errorMessage="TestError" />);
    const errorWrapper = wrapper.find('div[data-id="with-error"]');

    expect(errorWrapper.length).toBe(1);
  });

  it('should  call setFieldValue after change', () => {
    wrapper.setProps({ activeForm: 'signup' });
    [
      { field: wrapper.find('input[type="email"]') },
      { field: wrapper.find('input[data-id="password-input"]') },
      { field: wrapper.find('input[type="checkbox"]') },
      { field: wrapper.find('input[type="text"]').at(0) },
      { field: wrapper.find('input[type="text"]').at(1) },
    ].forEach(({ field }) => {
      field.simulate('change');
      expect(props.setFieldValue).toHaveBeenCalled();
    });
  });
});
