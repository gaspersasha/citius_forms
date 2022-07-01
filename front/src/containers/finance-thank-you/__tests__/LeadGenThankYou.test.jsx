import React from 'react';

import LeadGenThankYou from '../LeadGenThankYou';

describe('<LeadGenThankYou />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<LeadGenThankYou />);

    expect(wrapper).toMatchSnapshot();
  });
});
