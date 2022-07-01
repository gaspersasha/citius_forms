import React from 'react';
import Authentication from '..';

global.mockUseUserContext({
  actions: { logout: jest.fn() },
});

describe('<Authentication />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Authentication />);
  });

  it('should match snapshots', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have button for open AuthModal', () => {
    ['login', 'signup'].forEach((selector) => {
      const elem = wrapper
        .find(`span[data-id="button-${selector}"]`)
        .simulate('click');
      const overlay = wrapper.find('div[data-id="overlay"]');

      expect(overlay.length).toBe(1);
      expect(elem).toHaveLength(1);
    });
  });
});
