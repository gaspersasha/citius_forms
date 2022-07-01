import React from 'react';
import { AuthLink } from '..';

const props = {
  openModal: jest.fn(),
  type: 'login',
};

describe('<AuthLink />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AuthLink {...props}>Link</AuthLink>);
  });

  it('should match snapshots', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call function', () => {
    wrapper.find('span').simulate('click');
    expect(props.openModal).toHaveBeenCalled();
  });
});
