import React from 'react';
import { INPUT_STATUS } from '~constants';
import InputMaskText from '../InputMaskText';

describe('<InputMaskText />', () => {
  const props = {
    type: 'tel',
    id: 'Fake',
    mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
    value: 'Fake',
    status: INPUT_STATUS.VALID,
    required: false,
    name: 'Fake',
    subTitle: '',
    label: 'Fake',
    placeholder: 'Fake',
    children: null,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    'data-id': 'testid123',
  };

  const wrapper = mount(<InputMaskText {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange could be called', () => {
    const selector = 'input[data-id="testid123"]';

    wrapper.find(selector).simulate('change', 333);
    expect(wrapper.props().onChange).toBeCalled();
  });

  it('onBlur could be called', () => {
    const selector = 'input[data-id="testid123"]';

    wrapper.find(selector).simulate('blur');
    expect(wrapper.props().onBlur).toBeCalled();
  });

  it('should generete error class in case of invalid status prop', () => {
    wrapper.props().status = INPUT_STATUS.INVALID;
    const input = 't[data-id="testid123"]';

    expect(wrapper.find(input).hasClass('error-input-border'));
  });
});
