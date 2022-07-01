import React from 'react';
import { endpointFetch } from '~utils';
import { AuthModal } from '..';

const siteKey = {
  siteKey: '6LfHzPYUAAAAANTcsAxTQrmNH7DJLosXH4Q2DU0q',
};

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointPush: jest.fn(),
  endpointFetch: jest.fn(),
}));

endpointFetch.mockResolvedValue(siteKey);

global.mockUseUserContext({
  actions: { logout: jest.fn() },
});

const props = {
  onModalClose: jest.fn(),
  setActiveForm: jest.fn(),
};

describe('<AuthModal />', () => {
  let wrapper;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        reload: jest.fn(),
      },
      configurable: true,
      writable: true,
    });

    Object.defineProperty(window, 'grecaptcha', {
      value: {
        execute: jest.fn().mockResolvedValue({ token: 'test_token' }),
        reset: jest.fn(),
      },
      configurable: true,
      writable: true,
    });
  });

  it('should login form match snapshots', async () => {
    wrapper = mount(<AuthModal activeForm="login" {...props} />);
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('should reset form match snapshots', async () => {
    wrapper = mount(<AuthModal activeForm="reset" {...props} />);
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('should resetSuccess form match snapshots', async () => {
    wrapper = mount(<AuthModal activeForm="resetSuccess" {...props} />);
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('should sign-up form match snapshots', async () => {
    wrapper = mount(<AuthModal activeForm="signup" {...props} />);
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('login, should set password error', async () => {
    wrapper = mount(<AuthModal activeForm="login" {...props} />);
    await global.updateWrapper(wrapper);

    const emailInput = wrapper.find('input[type="email"]');
    const submitBtn = wrapper.find('button');

    emailInput.simulate('change', {
      target: { name: 'email', value: 'test@test.com' },
    });
    submitBtn.simulate('click');
    const error = wrapper.find('div[data-id="with-error"]').text();

    expect(error).toEqual('Please enter your password');
  });

  it('login, should set email error', async () => {
    wrapper = mount(<AuthModal activeForm="login" {...props} />);
    await global.updateWrapper(wrapper);

    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[data-id="password-input"]');
    const submitBtn = wrapper.find('button');

    emailInput.simulate('change', {
      target: { name: 'email', value: 'wrong-email.gmail' },
    });
    passwordInput.simulate('change', {
      target: { name: 'password', value: 'pass12345' },
    });
    submitBtn.simulate('click');
    const error = wrapper.find('div[data-id="with-error"]').text();

    expect(error).toEqual('Please enter a valid email address');
  });
});
