import React from 'react';
import { AmpHeader } from '..';

const defaultProps = {
  isAmp: false,
  src: 'test',
  alt: 'test',
};

describe('<AmpHeader />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<AmpHeader {...defaultProps} {...props} />);

  it('render without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
