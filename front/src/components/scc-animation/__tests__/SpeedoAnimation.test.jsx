import React from 'react';
import SpeedoAnimation from '../SpeedoAnimation';

const creditSearchProps = {
  band: 'B',
  name: 'Good',
  message: 'You have an good credit profile and are likely to be accepted',
};

describe('<SpeedoAnimation />', () => {
  let wrapper;

  const getWrapper = () =>
    shallow(<SpeedoAnimation creditSearch={creditSearchProps} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('info modal opening without errors', () => {
    wrapper.find('[data-id="soft-check-info-icon"]').simulate('click');
    expect(wrapper.find('[data-id="soft-check-modal"]').exists()).toBe(true);
  });
});
