import React from 'react';
import { useRouter } from 'next/router';

import Footer from '../Footer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  pathname: '/',
}));

describe('<Footer />', () => {
  const wrapper = shallow(<Footer isEmpty={false} />);

  it('rendered without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
