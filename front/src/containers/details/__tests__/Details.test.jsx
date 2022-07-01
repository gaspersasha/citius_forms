import React from 'react';
import { INPUT_STATUS } from '~constants';
import { scrollUpTo } from '~utils';
import Details from '..';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  scrollUpTo: jest.fn(),
}));

const submitEvent = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
};

describe('<Details />', () => {
  let wrapper;
  const mockGetDetails = jest.fn();
  const mockPostDetails = jest.fn();
  const mockSetDetailsState = jest.fn();

  const getWrapper = (method = shallow, state) => {
    global.mockUseDetailsContext({
      actions: {
        getDetails: mockGetDetails,
        postDetails: mockPostDetails,
        setDetailsState: mockSetDetailsState,
      },
      state: {
        data: global.mockData.details,
        isLoadingGet: false,
        isLoadingPost: false,
        updated: false,
        apiError: false,
        ...state,
      },
    });

    return method(<Details />);
  };

  it('renders without errors', () => {
    wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('calls action to get data on mount', () => {
    wrapper = getWrapper(mount);

    expect(mockGetDetails).toBeCalled();
  });

  it('handles inital loading case', () => {
    wrapper = getWrapper(shallow, { isLoadingGet: true });

    expect(wrapper.find('[data-id="init-spinner"]').exists()).toBe(true);
  });

  it('handles submit loading case', () => {
    wrapper = getWrapper(shallow, { isLoadingPost: true });

    expect(wrapper.find('[data-id="spinner"]').exists()).toBe(true);
  });

  it('handles api error case', () => {
    wrapper = getWrapper(shallow, { apiError: true });

    expect(wrapper.find('[data-id="error"]').exists()).toBe(true);
  });

  it('handles successful update case', () => {
    wrapper = getWrapper(shallow, { updated: true });

    expect(wrapper.find('[data-id="updated"]').exists()).toBe(true);
  });

  it('handles fields change events', () => {
    wrapper = getWrapper();
    const getChild = () => wrapper.find('About');

    getChild().invoke('handleChange')({
      target: { name: 'validUKPassport', value: 'Yes' },
    });
    expect(getChild().prop('fields').validUKPassport.value).toEqual(true);

    getChild().invoke('handleChange')({
      target: { name: 'subscribed', checked: false },
    });
    expect(getChild().prop('fields').subscribed.value).toEqual(true);

    getChild().invoke('handleChange')({
      target: { name: 'dependants', value: '-1' },
    });
    expect(getChild().prop('fields').dependants.value).toEqual(
      global.mockData.details.dependants
    );
    getChild().invoke('handleChange')({
      target: { name: 'dependants', value: '2' },
    });
    expect(getChild().prop('fields').dependants.value).toEqual('2');

    getChild().invoke('handleChange')({
      target: { name: 'phone', value: '+' },
    });
    expect(getChild().prop('fields').phone.value).toEqual(
      global.mockData.details.phone
    );

    const value = {
      county: 'county',
      district: 'district',
      houseName: 'house',
      houseNumber: '1',
      street: 'street',
      town: 'town',
    };

    getChild().invoke('handleChange')({
      target: { value: 'RM82FJ', name: 'postcode' },
    });
    getChild().invoke('handleChange')({ target: { value, name: 'postcode' } });

    const fields = getChild().prop('fields');

    expect(fields.county.value).toEqual(value.county);
    expect(fields.district.value).toEqual(value.district);
    expect(fields.houseName.value).toEqual(value.houseName);
    expect(fields.houseNumber.value).toEqual(value.houseNumber);
    expect(fields.street.value).toEqual(value.street);
    expect(fields.town.value).toEqual(value.town);
  });

  it('calls action to set the default apiError and updated values on change', () => {
    wrapper = getWrapper(shallow, { updated: true });

    wrapper.find('About').invoke('handleChange')({
      target: { name: 'phone', value: '' },
    });
    expect(mockSetDetailsState).toBeCalledWith({
      apiError: false,
      updated: false,
    });
  });

  it('handles submit valid case', () => {
    wrapper = getWrapper();

    wrapper.find('form').simulate('submit', submitEvent);
    expect(mockPostDetails).toBeCalledWith(global.mockData.details);
  });

  it('handles submit invalid case', () => {
    wrapper = getWrapper();

    wrapper.find('About').invoke('handleChange')({
      target: { name: 'phone', value: '0' },
    });
    wrapper.find('form').simulate('submit', submitEvent);

    expect(scrollUpTo).toBeCalledWith('#phone');
  });

  it('handles submit no confirmation case', () => {
    wrapper = getWrapper();
    const getChild = () => wrapper.find('About');

    wrapper.find('About').invoke('handleChange')({
      target: { name: 'emailConfirm', value: INPUT_STATUS.INVALID },
    });

    wrapper.find('About').invoke('handleChange')({
      target: { name: 'password', value: INPUT_STATUS.INVALID },
    });

    wrapper.find('form').simulate('submit', submitEvent);

    const fields = getChild().prop('fields');

    expect(fields.email.status).toEqual(INPUT_STATUS.MISSMATCH);
    expect(fields.emailConfirm.status).toEqual(INPUT_STATUS.MISSMATCH);
    expect(fields.password.status).toEqual(INPUT_STATUS.MISSMATCH);
    expect(fields.passwordConfirm.status).toEqual(INPUT_STATUS.MISSMATCH);
    expect(scrollUpTo).toBeCalledWith('#email');
  });
});
