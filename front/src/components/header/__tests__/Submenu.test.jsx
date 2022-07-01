import React from 'react';
import SubMenu from '../Submenu';

describe('<SubMenu />', () => {
  let wrapper;

  global.mockUseRef({ current: { scrollHeight: 50 } });

  const getWrapper = (props) =>
    shallow(
      <SubMenu {...props}>
        <div />
      </SubMenu>
    );

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles opened/closed cases', () => {
    wrapper = getWrapper();

    const getInnerStyle = () =>
      wrapper.find('[data-id="submenu-inner"]').prop('style');

    const simulateBtnClick = () => {
      wrapper.find('button').simulate('click');
    };

    expect(getInnerStyle()).toStrictEqual({ maxHeight: '0px' });

    simulateBtnClick();
    expect(getInnerStyle()).toStrictEqual({ maxHeight: '50px' });

    simulateBtnClick();
    expect(getInnerStyle()).toStrictEqual({ maxHeight: '0px' });
  });

  it('calls recalculateHeight if provided', () => {
    const fn = jest.fn();

    wrapper = getWrapper({ recalculateHeight: fn });

    wrapper.find('button').simulate('click');
    expect(fn).toBeCalledWith(50);

    wrapper.find('button').simulate('click');
    expect(fn).toBeCalledWith(-50);
  });
});
