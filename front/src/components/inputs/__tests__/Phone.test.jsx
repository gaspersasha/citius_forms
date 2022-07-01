import React from 'react';
import { preventSymbols, formatPreselectPhone } from '~utils';
import { InputPhone } from '..';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  preventSymbols: jest.fn(),
  formatPreselectPhone: jest.fn(),
}));

const defaultProps = {
  onChange: jest.fn(),
};

describe('<InputPhone />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<InputPhone {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders subtitle if prop is provided', () => {
    const subTitle = 'Test subtitle';

    wrapper = getWrapper({ subTitle });
    expect(wrapper.find('[className="label-sub-title"]').text()).toEqual(
      subTitle
    );
  });

  it('calls change callback', () => {
    const value = '0';
    const event = {
      target: { value },
    };

    formatPreselectPhone.mockReturnValueOnce(value);
    wrapper = getWrapper();

    wrapper.find('input[type="tel"]').simulate('change', event);
    expect(defaultProps.onChange).toBeCalledWith(event);
  });

  it('calls preventSymbols on keypress', () => {
    wrapper = getWrapper();

    wrapper.find('input[type="tel"]').simulate('keypress');
    expect(preventSymbols).toBeCalled();
  });

  it('calls onKeyPress callback', () => {
    const jestFn = jest.fn();

    wrapper = getWrapper({ onKeyPress: jestFn });

    wrapper.find('input[type="tel"]').simulate('keypress');
    expect(jestFn).toBeCalled();
  });
});
