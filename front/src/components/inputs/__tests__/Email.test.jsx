import React from 'react';
import { INPUT_STATUS } from '~constants';
import { InputEmail } from '..';

const defaultProps = {
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

describe('<InputEmail />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<InputEmail {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls change/blur callbacks', () => {
    wrapper = getWrapper();
    const input = wrapper.find('input[type="email"]');

    input.simulate('change');
    expect(defaultProps.onChange).toBeCalled();

    input.simulate('blur');
    expect(defaultProps.onBlur).toBeCalled();
  });

  it('renders subtitle if prop is provided', () => {
    const subTitle = 'Test subtitle';

    wrapper = getWrapper({ subTitle });
    expect(wrapper.find('[data-id="input-email-subtitle"]').text()).toEqual(
      subTitle
    );
  });

  // not really useful
  it('assigns right classNames in accordance to status prop', () => {
    wrapper = getWrapper({ status: INPUT_STATUS.VALID, errorMessage: 'Error' });

    wrapper.setProps({ status: INPUT_STATUS.INVALID });
    expect(
      wrapper.find('[data-id="input-email-subtitle"]').prop('className')
    ).toEqual('warning-label-subtitle label-sub-title');

    wrapper.setProps({ status: INPUT_STATUS.MISSMATCH });
    expect(wrapper.find('input[type="email"]').prop('className')).toEqual(
      'error-input-border'
    );
  });
});
