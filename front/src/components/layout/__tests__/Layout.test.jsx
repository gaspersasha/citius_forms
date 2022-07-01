import React from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter
  .mockImplementation(() => ({
    pathname: '/',
  }))
  .mockImplementationOnce(() => ({
    pathname: '/goreserve',
  }))
  .mockImplementationOnce(() => ({
    pathname: '/reservation',
  }))
  .mockImplementationOnce(() => ({
    pathname: '/gofinance',
  }));

describe('<Layout />', () => {
  let wrapper;

  const getWrapper = () =>
    shallow(
      <Layout>
        <div>Test</div>
      </Layout>
    );

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('header and footer doesn`t rendered on /goreserve route', () => {
    expect(wrapper.find('[data-id="menu"]').exists()).toBeFalsy();
    expect(wrapper.find('footer').exists()).toBeFalsy();
  });

  it('header and footer doesn`t rendered on /reservation route', () => {
    expect(wrapper.find('[data-id="menu"]').exists()).toBeFalsy();
    expect(wrapper.find('footer').exists()).toBeFalsy();
  });

  it('header and footer doesn`t rendered on /gofinance route', () => {
    expect(wrapper.find('[data-id="menu"]').exists()).toBeFalsy();
    expect(wrapper.find('footer').exists()).toBeFalsy();
  });

  it('rendered without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
