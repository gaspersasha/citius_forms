import React from 'react';
import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  let wrapper;

  const getWrapper = (pathname = '/') => {
    global.mockUseRouter({ pathname });

    return shallow(<Breadcrumbs />);
  };

  // temp. skip it since the component is in test version
  it.skip('should return null on root path', () => {
    wrapper = getWrapper();
    expect(wrapper.find('nav').exists()).toBe(false);
  });

  it('should match snapshot (one level pathname)', () => {
    wrapper = getWrapper('/account');
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (double level and more pathname)', () => {
    wrapper = getWrapper('/account/details');
    expect(wrapper).toMatchSnapshot();
  });
});
