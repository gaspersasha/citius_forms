import React from 'react';
import { AmpSideBar } from '..';

const defaultProps = {
  isAmp: false,
  src: 'test',
  alt: 'test',
};

describe('<AmpSideBar />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<AmpSideBar {...defaultProps} {...props} />);

  it('render without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
