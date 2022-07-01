import React from 'react';
import Icon from './Icon';

describe('Icon', () => {
  it("doesn't get rendered without type", () => {
    const wrapper = mount(<Icon />);

    expect(wrapper).toMatchSnapshot();
  });

  it('info icon', () => {
    const wrapper = mount(<Icon type={['info']} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('info alert', () => {
    const wrapper = mount(<Icon type={['exclamation']} />);

    expect(wrapper).toMatchSnapshot();
  });
});
