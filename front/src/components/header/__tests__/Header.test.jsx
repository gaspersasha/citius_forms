import React from 'react';
import { DEVICE_TYPES } from '~constants';
import Header from '../Header';
import { accountPage } from '../helpers';

const { DESKTOP, MOBILE } = DEVICE_TYPES;

describe('<Header />', () => {
  let wrapper;

  global.mockUseRef({ current: { scrollHeight: 300 } });

  const mockLogout = jest.fn();

  const getWrapper = (
    props,
    isLoggedIn = true,
    isLoadingUser = false,
    pathname = '/',
    device = DESKTOP
  ) => {
    global.mockUseRouter({ pathname });
    global.mockUseUserContext({
      actions: { logout: mockLogout },
      user: { isLoggedIn, isLoading: isLoadingUser },
    });
    global.mockUseDeviceContext({ device });

    return shallow(<Header {...props} />);
  };

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles empty case', () => {
    wrapper = getWrapper({ isEmpty: true });
    expect(wrapper.find('div[data-id="right-links"]').exists()).toBe(false);
  });

  it('handles subheader case', () => {
    wrapper = getWrapper({}, true, false, accountPage.path);

    expect(wrapper.find('[data-id="subheader"]').exists()).toBe(true);
  });

  it('handles open/closed cases on mobile', () => {
    wrapper = getWrapper({}, true, false, '/', MOBILE);

    const getMenuStyle = () => wrapper.find('[data-id="menu"]').prop('style');

    const simulateMenuBtnClick = () => {
      wrapper.find('button').simulate('click');
    };

    expect(getMenuStyle()).toStrictEqual({ maxHeight: '0px' });

    simulateMenuBtnClick();
    expect(getMenuStyle()).toStrictEqual({ maxHeight: '300px' });

    simulateMenuBtnClick();
    expect(getMenuStyle()).toStrictEqual({ maxHeight: '0px' });
  });

  it("recalculates height on submenu's opening/closing", () => {
    wrapper = getWrapper({}, true, false, '/', MOBILE);

    wrapper.find('[data-id="acc-submenu"]').prop('recalculateHeight')(50);
    expect(wrapper.find('[data-id="menu"]').prop('style')).toStrictEqual({
      maxHeight: '350px',
    });
  });

  it('handles logged out case', () => {
    wrapper = getWrapper({}, false);
    expect(wrapper.find('[data-id="account-link"]').exists()).toBe(false);
    expect(wrapper.find('[data-id="acc-submenu"]').exists()).toBe(false);
    expect(wrapper.find('Authentication').exists()).toBe(true);
  });

  it('handles user loading case', () => {
    wrapper = getWrapper({}, false, true);

    expect(wrapper.find('[data-id="account-link"]').exists()).toBe(false);
    expect(wrapper.find('[data-id="acc-submenu"]').exists()).toBe(false);
    expect(wrapper.find('Authentication').exists()).toBe(false);
  });

  it('handles logged in case', () => {
    wrapper = getWrapper({}, true);

    expect(wrapper.find('[data-id="account-link"]').exists()).toBe(true);
    expect(wrapper.find('[data-id="acc-submenu"]').exists()).toBe(true);
    expect(wrapper.find('Authentication').exists()).toBe(false);

    wrapper.find('[data-id="sign-out"]').simulate('click');
    expect(mockLogout).toBeCalled();
  });
});
