import React from 'react';
import PrivacyNotice from '../PrivacyNotice';

describe('<PrivacyNotice />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<PrivacyNotice onChange={jest.fn()} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
