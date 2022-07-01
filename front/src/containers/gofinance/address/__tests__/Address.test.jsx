import React from 'react';

import { endpointFetch, debounce } from '~utils';
import Address from '../Address';

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

describe('<Address />', () => {
  const props = {
    onSubmit: jest.fn(),
    index: 0,
    sumOfYearsInPrevForms: 0,
    step: 0,
    isLoading: false,
    isDataSending: false,
  };

  const wrapper = mount(<Address {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('invalid form can`t be submitted', () => {
    const selector = 'button';

    wrapper.find(selector).simulate('click');
    expect(wrapper.props().onSubmit).toHaveBeenCalledTimes(0);
  });

  it('"loqate address" input responds to changes', () => {
    wrapper.setProps({ ...props, step: 0 });
    const selector = 'input[type="text"]';
    const event = { target: { value: 'qwerty' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toBe('qwerty');
  });

  it('user got suggested address', () => {
    wrapper.update();
    const results = 'div[data-id="loqate-results"]';

    expect(wrapper.find(results).text()).toBe(
      'F Gyllyng Flats Falmouth TR11 3EZ'
    );
  });

  it('user can select suggested address', async () => {
    const result = 'div[data-id="loqate-results"] ul li';

    wrapper.find(result).simulate('click');
    await endpointFetch;
    await endpointFetch;
    wrapper.update();
    const selectedResult = '[data-id="loqate-results"]';

    expect(wrapper.find(selectedResult).text()).toBe(
      'F Gyllyng FlatsFalmouthTR11 3EZ'
    );
  });

  it('onSubmit shoundnt be called without checkbox selected', () => {
    const selector = 'button';
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

    wrapper.find(selector).simulate('click', event);
    expect(wrapper.props().onSubmit).toHaveBeenCalledTimes(0);
  });

  it('onSubmit could be called when checkbox selected', () => {
    const submit = 'button';
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

    wrapper
      .find(
        'input[data-id="I confirm the vehicle will be kept at this address"]'
      )
      .simulate('change', { target: { checked: true } });

    wrapper.find(submit).simulate('click', event);
    expect(wrapper.props().onSubmit).toHaveBeenCalledTimes(1);
  });

  it('user can clear suggested address', () => {
    const input = 'input[type="text"]';
    const clearAddresLink = 'div[data-id="clear-addres-link"]';

    wrapper.find(clearAddresLink).simulate('click');
    wrapper.update();
    expect(wrapper.find(input).props().value).toBe('');
  });

  it('user can switch to manually entering address inputs', () => {
    const link = 'div[data-id="enter-address-manually"]';

    wrapper.find(link).simulate('click');
    const input = 'input[type="text"]';

    expect(wrapper.find(input)).toHaveLength(7);
  });

  it('inputs for manually entering address responds to changes', () => {
    const input = 'input[type="text"]';
    const postCode = 'input[type="text"][name="postCode"]';

    wrapper.find(input).forEach((node) =>
      node.simulate('change', {
        target: { value: 'asdfgh', name: node.props().name },
      })
    );
    wrapper
      .find(input)
      .not(postCode)
      .forEach((node) => expect(node.props().value).toBe('asdfgh'));
    expect(wrapper.find(postCode).props().value).toBe('ASDFGH');
  });

  it('"residential status" input responds to changes', () => {
    wrapper.setProps({ ...props, step: 1 });
    const selector =
      'input[data-id="Housing association"][value="HOUSING_ASSOCIATION"]';

    wrapper.find(selector).simulate('change');
    expect(wrapper.find(selector).props().checked).toEqual(true);
  });

  it('"years at address" input responds to changes', () => {
    wrapper.setProps({ ...props, step: 2 });
    const selector =
      'select[data-id="How many years have you lived at this address?"]';
    const event = { target: { value: 1, name: 'residenceYears' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toEqual(1);
  });

  it('"months at address" input responds to changes', () => {
    const selector =
      'select[data-id="How many months did you live at this address?"]';
    const event = { target: { value: '2' } };

    wrapper.find(selector).simulate('change', event);
    expect(wrapper.find(selector).props().value).toBe('2');
  });
});
