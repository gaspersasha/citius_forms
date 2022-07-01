import React from 'react';
import Spinner from '../Spinner';

describe('<Spinner />', () => {
  let wrapper;

  const getWrapper = (props) => shallow(<Spinner {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
