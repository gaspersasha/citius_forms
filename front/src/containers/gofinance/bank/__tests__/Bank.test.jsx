import React from 'react';
import Bank from '../Bank';

mockUseUserContext({
  user: { id: -1 },
});

describe('<Bank />', () => {
  const props = {
    onSubmit: jest.fn(),
    step: 0,
    isLoading: false,
    isDataSending: false,
  };

  const wrapper = mount(<Bank {...props} />);
  const AN_SELECTOR = 'input[type="number"][name="accountNumber"]';
  const SC_SELECTOR = 'input[type="tel"][name="sortCode"]';
  const SUBMIT = 'button';

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('invalid form can`t be submitted', () => {
    const numberEvent = { target: { value: '123', name: 'accountNumber' } };

    wrapper.find(AN_SELECTOR).simulate('change', numberEvent);
    wrapper.find(SUBMIT).simulate('click');
    expect(wrapper.props().onSubmit).toHaveBeenCalledTimes(0);
  });

  it('account number field responds to valid changes', () => {
    const $el = wrapper.find(AN_SELECTOR);
    const event = { target: { value: '123', name: 'accountNumber' } };

    $el.simulate('change', event);
    expect($el.props().value).toBe('123');
  });

  it('method handleBlurAccountInfoChange should work correct', () => {
    const $an = wrapper.find(AN_SELECTOR);
    const $sc = wrapper.find(SC_SELECTOR);
    const AccountNumberEvent = {
      target: { value: '123', name: 'accountNumber' },
    };
    const sortCodetEvent = { target: { value: '12-34-56', name: 'sortCode' } };

    $an.simulate('change', AccountNumberEvent);
    $an.simulate('blur');
    $sc.simulate('change', sortCodetEvent);
    $sc.simulate('blur');
    expect($an.hasClass('error-input-border'));
    expect($sc.hasClass('success-form-border'));
  });

  it('"years" input responds to changes', () => {
    wrapper.setProps({ ...props, step: 1 });
    const selector =
      'select[data-id="How many years have you been a member of this bank?"]';
    const event = { target: { value: 1, name: 'yearsAtBank' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toEqual(1);
  });

  it('"months" input responds to changes', () => {
    const selector =
      'select[data-id="How many months have you been a member of this bank?"]';
    const event = { target: { value: '2', name: 'monthAtBank' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toBe('2');
  });

  it('onSubmit could be called', () => {
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

    wrapper.find(SUBMIT).simulate('click', event);
    expect(wrapper.props().onSubmit).toBeCalled();
  });
});
