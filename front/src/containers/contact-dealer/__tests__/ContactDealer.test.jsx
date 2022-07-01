import React from 'react';
import { INPUT_STATUS } from '~constants';
import { scrollUpTo } from '~utils';
import { ContactDealer } from '..';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  scrollUpTo: jest.fn(),
}));

const submitEvent = {
  preventDefault: jest.fn(),
};

const mockReplace = jest.fn();

delete global.window.location;

global.window.location = {
  origin: 'origin',
  replace: mockReplace,
};

describe('<ContactDealer />', () => {
  let wrapper;
  const mockPost = jest.fn();
  const mockPush = jest.fn();
  const mockSetState = jest.fn();
  const mockGetVehicle = jest.fn();
  const mockProductAdvertId = 3018183;

  const getWrapper = (
    method = shallow,
    state,
    isLoggedIn = false,
    productAdvertId = mockProductAdvertId,
    financeQuoteId = 100003
  ) => {
    global.mockUseRouter({
      query: { productAdvertId, financeQuoteId },
      push: mockPush,
      isReady: true,
    });
    global.mockUseUserContext({
      user: { isLoggedIn, firstName: 'Name' },
    });
    global.mockUseContactDealerContext({
      actions: {
        post: mockPost,
        setContactDealerState: mockSetState,
        getVehicle: mockGetVehicle,
      },
      state: {
        data: global.mockData.contactDealer,
        vehicle: global.mockData.contactDealerVehicle,
        isLoadingPost: false,
        apiError: { status: false, message: '' },
        quote: { quoteId: 0, quoteItemId: 0, productAdvertId },
        posted: false,
        isReady: true,
        ...state,
      },
    });

    return method(<ContactDealer />);
  };

  it('renders without errors', () => {
    wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('redirects to /cars if no productAdvertId provided', () => {
    wrapper = getWrapper(mount, {}, false, null);

    expect(mockReplace).toBeCalledWith('origin/cars');
  });

  it('autofills the fields if user is logged in', () => {
    wrapper = getWrapper(mount, {}, true);

    expect(wrapper.find('input#firstName').prop('value')).toEqual('Name');
  });

  it('handles submit loading case', () => {
    wrapper = getWrapper(shallow, { isLoadingPost: true });

    expect(wrapper.find('Spinner').exists()).toBe(true);
  });

  it('handles fields change events', () => {
    wrapper = getWrapper();

    const invokeChange = (target = {}) => {
      wrapper.find('#firstName').invoke('onChange')({
        target,
      });
    };

    invokeChange({ name: 'firstName', value: 'A' });
    expect(wrapper.find('#firstName').prop('value')).toEqual('A');

    invokeChange({ name: 'unsubscribe', checked: true });
    expect(wrapper.find('#unsubscribe').prop('checked')).toEqual(true);

    invokeChange({ name: 'phone', value: '+' });
    expect(wrapper.find('#phone').prop('value')).toEqual('');

    invokeChange({ name: 'phone', value: '0' });
    expect(wrapper.find('#phone').prop('value')).toEqual('0');
  });

  it('handles fields blur events', () => {
    wrapper = getWrapper();

    wrapper.find('#firstName').invoke('onBlur')({
      preventDefault: jest.fn(),
      target: { name: 'firstName', value: '' },
    });

    expect(wrapper.find('#firstName').prop('status')).toEqual(
      INPUT_STATUS.INVALID
    );
  });

  it('handles data submit', () => {
    const data = {
      firstName: 'First',
      lastName: 'Last',
      phone: '07712345678',
      email: 'test@test.test',
      postcode: 'SE231AA',
      message: 'Message',
      campaign: null,
      unsubscribe: true,
    };

    wrapper = getWrapper(shallow, { data });

    wrapper.find('form').simulate('submit', submitEvent);

    expect(mockPost).toBeCalledWith({
      productAdvertId: mockProductAdvertId,
      data,
    });
  });

  it('handles redirect to complete page', () => {
    wrapper = getWrapper(mount, { posted: true });

    expect(mockPush).toBeCalledWith(
      `/contact-dealer/complete?productAdvertId=${mockProductAdvertId}&financeQuoteId=100003`
    );
  });

  it('handles api error case', () => {
    wrapper = getWrapper(mount, {
      apiError: { status: true, message: 'Error' },
    });

    expect(scrollUpTo).toBeCalled();
    expect(wrapper.find('p[data-id="cd-error-msg"]').text()).toEqual(
      'Error occured: Error'
    );

    wrapper.find('input#firstName').invoke('onChange')({
      target: { name: 'firstName', value: 'A' },
    });

    expect(mockSetState).toBeCalledWith({
      apiError: { status: false, message: '' },
    });
  });

  it('calls getVehicle action on mount', () => {
    wrapper = getWrapper(mount, {});

    expect(mockGetVehicle).toBeCalledWith({
      productAdvertId: mockProductAdvertId,
    });
  });

  it('handles prefill message field with vehicle data', () => {
    wrapper = getWrapper(mount, {});

    expect(wrapper.find('textarea#message').prop('value')).toEqual(
      'Hi, I am interested in this vehicle'
    );
  });

  it('handles prefill message field without vehicle data', () => {
    const year = '2020';
    const make = 'Make';
    const range = 'Range';

    wrapper = getWrapper(mount, {
      vehicle: { year, make, range },
    });

    expect(wrapper.find('textarea#message').prop('value')).toEqual(
      `Hi, I am interested in this ${year} ${make} ${range}`
    );
  });
});
