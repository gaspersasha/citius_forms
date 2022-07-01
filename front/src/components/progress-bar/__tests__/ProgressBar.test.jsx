import React from 'react';
import ProgressBar from '../ProgressBar';

describe('<ProgressBar />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<ProgressBar progress={20} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('applies style in accordance to provided progress prop', () => {
    wrapper = getWrapper({ progress: -1 });
    expect(wrapper.find('[data-id="progress-bar"]').prop('style')).toEqual({
      width: '0%',
    });

    wrapper.setProps({ progress: 101 });
    expect(wrapper.find('[data-id="progress-bar"]').prop('style')).toEqual({
      width: '100%',
    });
  });
});
