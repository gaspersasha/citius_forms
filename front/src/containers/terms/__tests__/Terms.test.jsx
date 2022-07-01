import React from 'react';
import { useRouter } from 'next/router';
import { useUserContext, useGOContext, useVehicleContext } from '~contexts';
import { INPUT_STATUS } from '~constants';
import { endpointFetch, endpointPush } from '~utils';
import Terms from '../Terms';
import { DELIVERY_INFO, NEW_FINANCE_QUOTE } from '../constants';

jest.mock('~contexts', () => ({
  useUserContext: jest.fn(),
  useGOContext: jest.fn(),
  useVehicleContext: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  query: { productAdvertId: '3362300' },
}));

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
  endpointPush: jest.fn(),
}));

useUserContext.mockImplementation(() => ({
  user: {},
}));

endpointFetch.mockResolvedValue({
  price: 100000,
});
endpointPush.mockResolvedValue({
  ...NEW_FINANCE_QUOTE,
  ...(NEW_FINANCE_QUOTE.HP.financeType = 'HP'),
});
endpointFetch.mockResolvedValue(DELIVERY_INFO);

useGOContext.mockImplementation(() => ({ isGoRdy: true }));
useVehicleContext.mockImplementation(() => ({ vehicle: { leadgen_B: false } }));

beforeEach(() => {
  Object.defineProperty(window, 'google_optimize', {
    value: {
      get: () => '1',
    },
    configurable: true,
    writable: true,
  });
});

useGOContext.mockImplementation(() => ({ isGoRdy: true }));

beforeEach(() => {
  Object.defineProperty(window, 'google_optimize', {
    value: {
      get: () => '1',
    },
    configurable: true,
    writable: true,
  });
});

const submitEvent = {
  preventDefault: jest.fn(),
};

describe('<Terms />', () => {
  let wrapper;
  const getWrapper = (method = shallow) => method(<Terms />);

  it('rendered without errors', async () => {
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles fields change events TermsInputs', () => {
    wrapper = getWrapper();
    const getChild = () => wrapper.find('TermsInputs');

    getChild().invoke('handleChange')({
      target: { name: 'deposit', value: '' },
    });
    expect(getChild().prop('fields').deposit.status).toEqual(
      INPUT_STATUS.INVALID
    );

    getChild().invoke('handleChange')({
      target: { name: 'deposit', value: 111100 },
    });
    getChild().invoke('handleChange')({
      target: { name: 'finance', value: 'Hire Purchase' },
    });
    expect(getChild().prop('fields').deposit.status).toEqual(
      INPUT_STATUS.INVALID
    );
    expect(getChild().prop('fields').finance.value).toEqual('HP');

    getChild().invoke('handleChange')({
      target: { name: 'deposit', value: '1111' },
    });
    expect(getChild().prop('fields').deposit.value).toEqual('1111');

    getChild().invoke('handleChange')({
      target: { name: 'mileage', value: '20000' },
    });
    expect(getChild().prop('fields').mileage.value).toEqual('20000');

    getChild().invoke('handleChange')({
      target: { name: 'terms', value: '24' },
    });
    expect(getChild().prop('fields').terms.value).toEqual('24');

    getChild().invoke('handleChange')({
      target: { name: 'delivery', value: '19' },
    });
    expect(getChild().prop('fields').delivery.value).toEqual('19');

    getChild().invoke('handleChange')({
      target: { name: 'credit', value: 'good' },
    });
    expect(getChild().prop('fields').credit.value).toEqual('good');

    getChild().invoke('handleChange')({ target: { id: 'PCP' } });
    expect(getChild().prop('fields').finance.value).toEqual('PCP');

    getChild().invoke('handleChange')({
      target: { name: 'deposit', value: 111100 },
    });
    getChild().invoke('handleChange')({ target: { id: 'Hire Purchase' } });
    expect(getChild().prop('fields').deposit.status).toEqual(
      INPUT_STATUS.INVALID
    );
    expect(getChild().prop('fields').finance.value).toEqual('HP');
  });

  it('handles fields change events TermsResults', () => {
    wrapper = getWrapper();
    const getChild = () => wrapper.find('TermsResults');

    getChild().invoke('handleChange')({
      target: { name: 'terms', value: '60' },
    });
    expect(getChild().prop('fields').terms.value).toEqual('60');

    getChild().invoke('disabledForm')({ type: 'PCP' });
    getChild().invoke('showModal')({ type: 'PCP' });
    getChild().invoke('handleChange')({
      target: { name: 'finance', value: 'PCP' },
    });
    expect(getChild().prop('fields').finance.value).toEqual('PCP');
  });

  it('endpointFetch was called on mounting', async () => {
    wrapper = getWrapper(mount);
    const prodAdvertId = { productAdvertId: '3362300' };

    await global.updateWrapper(wrapper);
    expect(endpointFetch).toBeCalledWith('userProfileInfo');
    expect(endpointFetch).toBeCalledWith('productInformation', prodAdvertId);
    expect(endpointFetch).toBeCalledWith('getDeliveryOptions', prodAdvertId);
  });

  it('invalid form can`t be submitted', async () => {
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);

    wrapper.find('form').simulate('submit', submitEvent);
    expect(endpointPush).not.toHaveBeenCalledWith('-=# SOME ENDPOINT #=-');
  });

  it('valid form can be submitted', () => {
    wrapper = getWrapper();

    wrapper.find('form').simulate('submit', submitEvent);
    expect(endpointPush).toHaveBeenCalled();
  });
});
