import React from 'react';
import TapButtonsList from '../TapButtonsList';

const Component = () => <div />;

const defaultProps = {
  options: [
    {
      value: 'TEST0',
      option: 'Test0',
      content: { Component, props: {} },
    },
    {
      value: 'TEST1',
      option: 'Test1',
    },
  ],
  onChange: jest.fn(),
};

describe('<TapButtonsList />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<TapButtonsList {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders content if it is provided', () => {
    wrapper = getWrapper();
    expect(wrapper.find('Component').exists()).toBe(true);
  });

  it('assigns active option', () => {
    wrapper = getWrapper({ value: defaultProps.options[0].value });
    expect(wrapper.find('input').at(0).prop('checked')).toBe(true);
  });

  it('calls change event calback', () => {
    const name = 'test';

    wrapper = getWrapper();

    wrapper.find('input').at(0).simulate('change', { target: { name } });
    expect(defaultProps.onChange).toBeCalledWith({
      target: { name, value: defaultProps.options[0].value },
    });
  });
});
