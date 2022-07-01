import React from 'react';

import Confirmation from '../Confirmation';

describe('<Confirmation />', () => {
  const props = {
    nextActionText: 'next best action',
    callOptionText: 'call us on 648329576235',
    withLink: true,
  };

  const wrapper = shallow(<Confirmation {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders link to search', () => {
    const link = 'a[data-id="confirmation-search-link"]';

    expect(wrapper.find(link).text()).toBe('next best action');
  });

  it('renders heading with next best action', () => {
    wrapper.setProps({ ...props, withLink: false });
    wrapper.update();
    const heading = 'h2[data-id="next-action-heading"]';

    expect(wrapper.find(heading).text()).toBe('next best action');
  });
});
