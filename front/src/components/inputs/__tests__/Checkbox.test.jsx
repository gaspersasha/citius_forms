import React from 'react';
import { InputCheckbox } from '..';

const defaultProps = {
  onChange: jest.fn(),
};

describe('<InputCheckbox />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<InputCheckbox {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onChange', () => {
    wrapper = getWrapper();
    wrapper.find('input[type="checkbox"]').simulate('change');

    expect(defaultProps.onChange).toBeCalled();
  });
});
