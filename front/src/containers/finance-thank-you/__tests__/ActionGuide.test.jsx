import React from 'react';

import ActionGuide from '../ActionGuide';

describe('<ActionGuide />', () => {
  const props = {
    actionLinkText: 'action link',
    actionUrl: '/action',
    actionInfo: 'click me',
  };

  it('renders without errors', () => {
    const wrapper = shallow(<ActionGuide {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
