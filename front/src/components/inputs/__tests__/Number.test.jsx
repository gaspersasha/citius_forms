import React from 'react';
import { preventSymbols } from '~utils';
import { InputNumber } from '..';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  preventSymbols: jest.fn(),
}));

const defaultProps = {
  onChange: jest.fn(),
};

describe('<InputNumber />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<InputNumber {...defaultProps} {...props} />);

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

  it('calls preventSymbols on keypress', () => {
    wrapper = getWrapper();

    wrapper.find('input[type="number"]').simulate('keypress');
    expect(preventSymbols).toBeCalled();
  });

  it('calls onKeyPress callback', () => {
    const jestFn = jest.fn();

    wrapper = getWrapper({ onKeyPress: jestFn });

    wrapper.find('input[type="number"]').simulate('keypress');
    expect(jestFn).toBeCalled();
  });
});
