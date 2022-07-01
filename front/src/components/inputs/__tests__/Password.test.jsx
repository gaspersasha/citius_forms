import React from 'react';
import { InputPassword } from '..';

const defaultProps = {
  onChange: jest.fn(),
};

describe('<InputPassword />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<InputPassword {...defaultProps} {...props} />);

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

  it('calls onChange callback', () => {
    wrapper = getWrapper();

    wrapper.find('[data-id="password-input"]').simulate('change');
    expect(defaultProps.onChange).toBeCalled();
  });
});
