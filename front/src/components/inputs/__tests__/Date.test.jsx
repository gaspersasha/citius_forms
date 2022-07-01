import React from 'react';
import { InputDate } from '..';

const defaultProps = {
  onChange: jest.fn(),
};

describe('<InputDate />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<InputDate {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
