import React from 'react';
import Label from '../Label';

describe('<Label />', () => {
  let wrapper;

  const getWrapper = (props) => shallow(<Label {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
