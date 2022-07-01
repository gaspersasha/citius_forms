import React from 'react';
import UserDetails from '..';

mockUseUserContext({
  user: { id: -1 },
});

describe('<UserDetails />', () => {
  const props = {
    onSubmit: jest.fn(),
    title: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    mobile: '',
    email: '',
    step: 0,
    dependants: 0,
    validUKPassport: true,
    isLoggedIn: false,
    isDataSending: false,
  };
  const wrapper = mount(<UserDetails {...props} />);

  it('should component match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('invalid form can`t be submitted', () => {
    const selector = 'button';

    wrapper.find(selector).simulate('click');
    expect(wrapper.props().onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should text fields receive value', () => {
    wrapper.setProps({ ...props, step: 0 });
    const input = wrapper.find('input[name="firstName"]');
    const handleChange = jest.spyOn(input.first().props(), 'onChange');
    const event = { target: { value: 'qwerty' } };

    input.first().invoke('onChange')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should Phone field receiving value', () => {
    wrapper.setProps({ ...props, step: 1 });
    const input = wrapper.find('input[name="phone"]');
    const handleChange = jest.spyOn(input.first().props(), 'onChange');
    const event = { target: { value: '07911123456' } };

    input.first().invoke('onChange')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should phone blur method to be invoked', () => {
    wrapper.setProps({ ...props, step: 1 });
    const input = wrapper.find('input[name="phone"]');
    const handleChange = jest.spyOn(input.first().props(), 'onBlur');
    const event = { target: { value: '07911123457' } };

    input.first().invoke('onBlur')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should altPhone field recieving value', () => {
    wrapper.setProps({ ...props, step: 1 });
    const input = wrapper.find('input[name="mobile"]');
    const handleChange = jest.spyOn(input.first().props(), 'onChange');
    const event = { target: { value: '07911123457' } };

    input.first().invoke('onChange')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should altPhone blur method to be invoked', () => {
    wrapper.setProps({ ...props, step: 1 });
    const input = wrapper.find('input[name="mobile"]');
    const handleChange = jest.spyOn(input.first().props(), 'onBlur');
    const event = { target: { value: '07911123457' } };

    input.first().invoke('onBlur')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should email blur method to be invoked', () => {
    wrapper.setProps({ ...props, step: 1 });
    const input = wrapper.find('input[type="email"]');
    const handleChange = jest.spyOn(input.first().props(), 'onBlur');
    const event = { target: { value: 'ololo@ololo.ho' } };

    input.first().invoke('onBlur')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should datepicker change method to be invoked', () => {
    wrapper.setProps({ ...props, step: 2 });

    // const input = wrapper.find('#datepicker');
    const input = wrapper.find('input[name="dateOfBirth"]');

    const handleChange = jest.spyOn(input.first().props(), 'onChange');
    const event = { target: { value: '12/12/2020' } };

    input.first().invoke('onChange')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should marital status change method to be invoked', () => {
    wrapper.setProps({ ...props, step: 3 });

    // const input = wrapper.find('#inputMaritalStatus');
    const input = wrapper.find('[data-id="Single"]');
    const handleChange = jest.spyOn(input.first().props(), 'onChange');
    const event = { target: { value: 'Undecided yet' } };

    input.first().invoke('onChange')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should dependants change method to be invoked', () => {
    wrapper.setProps({ ...props, step: 4 });

    // const input = wrapper.find('#inputDependants');
    const input = wrapper.find('[data-id="None"]');
    const handleChange = jest.spyOn(input.first().props(), 'onChange');
    const event = { target: { value: 0 } };

    input.first().invoke('onChange')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should driving licence change method to be invoked', () => {
    wrapper.setProps({ ...props, step: 5 });

    // const input = wrapper.find('#inputDrivingLicence');
    const input = wrapper.find('[data-id="Full UK"]');
    const handleChange = jest.spyOn(input.first().props(), 'onChange');
    const event = { target: { value: 'Pony Driving Licence' } };

    input.first().invoke('onChange')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });

  it('should valid UK passport change method to be invoked', () => {
    wrapper.setProps({ ...props, step: 6 });

    const input = wrapper.find('[data-id="Yes"]');
    const handleChange = jest.spyOn(input.first().props(), 'onChange');
    const event = { target: { value: true } };

    input.first().invoke('onChange')(event);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(event);
  });
});
