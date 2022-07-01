import React from 'react';
import { AuthWrapper } from '..';

const props = {
  children: jest.fn(),
};

describe('<AuthWrapper />', () => {
  const wrapper = shallow(<AuthWrapper {...props} />);

  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
