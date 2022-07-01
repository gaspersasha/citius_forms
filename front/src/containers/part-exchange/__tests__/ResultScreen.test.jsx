import React from 'react';
import { useRouter } from 'next/router';
import ResultScreen from '../ResultScreen';

const props = {
  valuation: '',
  productAdvertId: '',
  setNextStep: jest.fn(),
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  query: {
    quoteId: 1,
    quoteItemId: 2,
  },
}));

describe('<ResultScreen />', () => {
  let wrapper;
  const getWrapper = (method = shallow) => method(<ResultScreen {...props} />);

  it('ResultScreen snapshot', async () => {
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('ResultScreen changed props', async () => {
    wrapper = getWrapper();

    wrapper.setProps({ valuation: '1200' });
    expect(wrapper.find('.result')).toBeTruthy();
  });
});
