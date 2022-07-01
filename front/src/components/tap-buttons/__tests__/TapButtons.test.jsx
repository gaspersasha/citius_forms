import React from 'react';
import TapButtons from '../TapButtons';

describe('<TapButtons />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(
      <TapButtons options={[]} onChange={jest.fn()} label="Label" {...props} />
    );

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders subtitle if prop is provided', () => {
    const subTitle = 'Test subtitle';

    wrapper = getWrapper({ subTitle });
    expect(wrapper.find('[data-id="tap-btns-subtitle"]').text()).toEqual(
      subTitle
    );
  });
});
