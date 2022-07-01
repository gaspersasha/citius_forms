import React from 'react';
import { InputText } from '..';

const defaultProps = {
  onChange: jest.fn(),
};

describe('<InputText />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<InputText {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders subtitle if prop is provided', () => {
    const subTitle = 'Test subtitle';

    wrapper = getWrapper({ subTitle });
    expect(wrapper.find('[className="label-sub-title"]').text()).toEqual(
      subTitle
    );
  });

  it('calls click/change/blur callbacks', () => {
    const jestClick = jest.fn();
    const jestBlur = jest.fn();

    wrapper = getWrapper({
      onClick: jestClick,
      onBlur: jestBlur,
    });

    const input = wrapper.find('input[type="text"]');

    input.simulate('change');
    input.simulate('click');
    input.simulate('blur');

    expect(defaultProps.onChange).toBeCalled();
    expect(jestClick).toBeCalled();
    expect(jestBlur).toBeCalled();
  });
});
