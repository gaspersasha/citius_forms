import React from 'react';
import { InputSelect } from '..';

const defaultProps = {
  onChange: jest.fn(),
  options: [],
};

describe('<InputSelect />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<InputSelect {...defaultProps} {...props} />);

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

  it('renders provided options', () => {
    const options = [
      {
        value: 'test1',
        option: 'Test1',
      },
      {
        value: 'test2',
        option: 'Test2',
      },
    ];

    wrapper = getWrapper({ options });

    const input = wrapper.find('select');

    expect(input.childAt(0).html()).toEqual(
      `<option value="${options[0].value}">${options[0].option}</option>`
    );
    expect(input.childAt(1).html()).toEqual(
      `<option value="${options[1].value}">${options[1].option}</option>`
    );
  });

  it('calls change callback', () => {
    wrapper = getWrapper();

    wrapper.find('select').simulate('change');
    expect(defaultProps.onChange).toBeCalled();
  });

  it('renders placeholder if prop is provided', () => {
    const placeholder = 'test';

    wrapper = getWrapper({ placeholder });

    expect(wrapper.find('select option').exists()).toBe(true);
  });
});
