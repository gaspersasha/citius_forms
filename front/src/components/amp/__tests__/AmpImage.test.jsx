import React from 'react';
import { AmpImage } from '..';

const defaultProps = {
  isAmp: false,
  src: 'test',
  alt: 'test',
};

describe('<AmpImage />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<AmpImage {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles amp case', () => {
    wrapper = getWrapper({ isAmp: true });

    expect(wrapper.html()).toEqual(
      '<amp-img alt="test" src="test" layout="responsive"></amp-img>'
    );
  });
});
