import React from 'react';
import { Complete } from '..';

describe('<Complete />', () => {
  let wrapper;

  const getWrapper = (sccCompleted = false) => {
    global.mockUseRouter({
      query: {},
    });
    global.mockUseUserContext({
      user: { sccCompleted },
    });

    return shallow(<Complete />);
  };

  it('rendered without errors', () => {
    wrapper = getWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
