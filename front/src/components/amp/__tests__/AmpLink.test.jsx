import React from 'react';
import { AmpLink } from '..';

const defaultProps = {
  isAmp: false,
  link: 'test',
  children: 'test',
};

describe('<AmpLink />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<AmpLink {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles amp case', () => {
    wrapper = getWrapper({ isAmp: true });

    expect(wrapper.html()).toEqual(
      '<a on="tap:AMP.navigateTo(url=&#x27;test&#x27;)">test</a>'
    );
  });
});
