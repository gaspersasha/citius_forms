import React from 'react';
import NavigationLink from '../NavigationLink';

describe('<NavigationLink />', () => {
  let wrapper;

  const getWrapper = (props, path = '/') => {
    global.mockUseRouter({ pathname: path });

    return shallow(
      <NavigationLink href="/" {...props}>
        Test
      </NavigationLink>
    );
  };

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles active case', () => {
    const path = '/test';

    wrapper = getWrapper(
      {
        activeClassName: 'active',
        href: path,
      },
      path
    );

    expect(wrapper.find('a').prop('className')).toEqual('active');

    wrapper.setProps({ href: '/', as: path });

    expect(wrapper.find('a').prop('className')).toEqual('active');
  });

  it('active towards the root path case', () => {
    wrapper = getWrapper(
      {
        activeClassName: 'active',
        activeTowardsRoot: true,
        href: '/root',
      },
      '/root/sub'
    );

    expect(wrapper.find('a').prop('className')).toEqual('active');
  });

  it('handles absolute link case', () => {
    const path = '/test';

    global.mockUseRouter({ pathname: path });

    wrapper = mount(
      <NavigationLink absolute href={path}>
        Test
      </NavigationLink>
    );

    expect(wrapper.childAt(0).type()).toBe('a');
    expect(wrapper.childAt(0).prop('href')).toBe('http://localhost/test');
  });
});
