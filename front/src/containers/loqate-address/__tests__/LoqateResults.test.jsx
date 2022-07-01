import React from 'react';
import LoqateResults from '../LoqateResults';

describe('<LoqateResults />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<LoqateResults lines={['test0', 'test1']} />);

    expect(wrapper).toMatchSnapshot();
  });
});
