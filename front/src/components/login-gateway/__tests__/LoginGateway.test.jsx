import React from 'react';
import LoginGateway from '../LoginGateway';

describe('<LoginGateway />', () => {
  let wrapper;

  const getWrapper = (isLoggedIn = true) => {
    global.mockUseUserContext({
      user: { isLoggedIn },
    });

    return shallow(
      <LoginGateway>
        <div>Test</div>
      </LoginGateway>
    );
  };

  it('renders children in logged in user case', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without errors', () => {
    wrapper = getWrapper(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles login modal opening case', () => {
    wrapper = getWrapper(false);
    wrapper.find('Button').simulate('click');

    const modal = wrapper.find('AuthModal');

    expect(modal.prop('activeForm')).toEqual('login');
    expect(modal.exists()).toEqual(true);
  });

  it('handles login modal closing case', () => {
    wrapper = getWrapper(false);
    wrapper.find('Button').simulate('click');

    wrapper.find('AuthModal').invoke('onModalClose')();
    expect(wrapper.find('AuthModal').exists()).toBe(false);
  });

  it('handles modal form type change', () => {
    wrapper = getWrapper(false);
    wrapper.find('Button').simulate('click');

    wrapper.find('AuthModal').invoke('setActiveForm')('reset');
    expect(wrapper.find('AuthModal').prop('activeForm')).toEqual('reset');
  });
});
