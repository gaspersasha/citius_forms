import React from 'react';

import { endpointFetch, debounce } from '~utils';
import Employment from '../Employment';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../../utils'),
  endpointFetch: jest.fn(),
  debounce: jest.fn(),
}));

mockUseUserContext({
  user: { id: -1 },
});

endpointFetch.mockResolvedValue({
  Items: [
    {
      Id: 'GB|RM|A|25046440',
      Type: 'Address',
      Text: 'F Gyllyng Flats',
      Description: 'Falmouth TR11 3EZ',
      Language: 'ENG',
      SubBuilding: '',
      BuildingNumber: '',
      BuildingName: 'F Gyllyng Flats',
      Street: '',
      District: '',
      City: 'Falmouth',
      PostalCode: 'TR11 3EZ',
    },
  ],
});
debounce.mockImplementation((cb) => cb);

describe('<Employment />', () => {
  const props = {
    isLoading: false,
    onSubmit: jest.fn(),
    step: 2,
    sumOfYearsInPrevForms: 0,
    isDataSending: false,
  };

  const wrapper = mount(<Employment {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('invalid form can`t be submitted', () => {
  //   const selector = 'button[data-id="employment-submit-btn"]';

  //   wrapper.find(selector).simulate('click');
  //   expect(wrapper.props().onSubmit).toHaveBeenCalledTimes(0);
  // });

  // it('"loqate address" input responds to changes', () => {
  //   const selector = 'input[data-id="input-text"]';
  //   const event = { target: { value: 'F Gyllyng Flats' } };

  //   wrapper.find(selector).simulate('change', event);
  //   expect(wrapper.find(selector).props().value).toBe('F Gyllyng Flats');
  // });

  // it('user got suggested address', async () => {
  //   wrapper.update();
  //   const results = 'div[data-id="loqate-results"]';

  //   expect(wrapper.find(results).text()).toBe(
  //     'F Gyllyng Flats Falmouth TR11 3EZ'
  //   );
  // });

  // it('user can select suggested address', async () => {
  //   const result = 'div[data-id="loqate-results"] ul li';

  //   wrapper.find(result).simulate('click');
  //   await endpointFetch;
  //   await endpointFetch;
  //   wrapper.update();
  //   const selectedResult = '[data-id="loqate-results"]';

  //   expect(wrapper.find(selectedResult).text()).toBe('FalmouthTR11 3EZ');
  // });

  // it('onSubmit could be called', () => {
  //   const selector = 'button[data-id="employment-submit-btn"]';
  //   const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

  //   wrapper.find(selector).simulate('click', event);
  //   expect(wrapper.props().onSubmit).toHaveBeenCalledTimes(1);
  // });

  // it('user can clear suggested address', () => {
  //   const input = 'input[data-id="input-text"]';
  //   const clearAddresLink = 'div[data-id="clear-addres-link"]';

  //   wrapper.find(clearAddresLink).simulate('click');
  //   wrapper.update();
  //   expect(wrapper.find(input).props().value).toBe('');
  // });

  // it('user can switch to manually entering address inputs', () => {
  //   const link = 'div[data-id="enter-address-manually"]';

  //   wrapper.find(link).simulate('click');
  //   const input = 'input[data-id="input-text"]';

  //   expect(wrapper.find(input)).toHaveLength(7);
  // });

  // it('inputs for manually entering address responds to changes', () => {
  //   const input = 'input[data-id="input-text"]';
  //   const postCode = 'input[data-id="input-text"][name="postCode"]';

  //   wrapper.find(input).forEach((node) =>
  //     node.simulate('change', {
  //       target: { value: 'asdfgh', name: node.props().name },
  //     })
  //   );
  //   wrapper
  //     .find(input)
  //     .not(postCode)
  //     .forEach((node) => expect(node.props().value).toBe('asdfgh'));
  //   expect(wrapper.find(postCode).props().value).toBe('ASDFGH');
  // });

  it('"employment type" input responds to changes', () => {
    wrapper.setProps({ step: 0 });
    const selector = 'input[data-id="Armed services"][value="ARMED_SERVICES"]';

    wrapper.find(selector).simulate('change');
    expect(wrapper.find(selector).props().checked).toEqual(true);
  });

  it('"employer" input responds to changes', () => {
    wrapper.setProps({ step: 1 });
    const selector = 'input[type="text"][name="employer"]';
    const event = { target: { value: 'Qwerty', name: 'employer' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toBe('Qwerty');
  });

  it('"job title" input responds to changes', () => {
    const selector = 'input[type="text"][name="jobTitle"]';
    const event = { target: { value: 'Asdfgh', name: 'jobTitle' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toBe('Asdfgh');
  });

  it('"Income" input responds to changes', () => {
    wrapper.setProps({ ...props, step: 3 });
    const selector = 'input[name="salary"]';
    const event = { target: { value: '12345' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toBe('12345');
  });

  it('method checkIncomeValue should work correct', () => {
    const incomeInput = 'input[name="salary"]';
    const event = { target: { value: '123' } };

    wrapper.find(incomeInput).simulate('change', event);
    wrapper.find(incomeInput).simulate('blur');
    expect(wrapper.find(incomeInput).hasClass('error-input-border'));
  });

  it('"years" input responds to changes', () => {
    wrapper.setProps({ ...props, step: 4 });
    const selector =
      'select[data-id="How many years have you been working at this address?"]';
    const event = { target: { value: 1, name: 'yearsAtJob' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toEqual(1);
  });

  it('"months" input responds to changes', () => {
    const selector =
      'select[data-id="How many months have you been working at this address?"]';
    const event = { target: { value: '2' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toBe('2');
  });
});
