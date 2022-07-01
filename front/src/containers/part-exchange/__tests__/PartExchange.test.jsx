import React from 'react';
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router';

import { useUserContext, useGOContext, useVehicleContext } from '~contexts';
import { endpointFetch } from '../../../utils';
import PartExchange from '../PartExchange';

const submitEvent = {
  preventDefault: jest.fn(),
};

const payData = {
  registration: '',
  manufacturer: '',
  model: '',
  colour: '',
  year: '',
  transmission: '',
  engineSize: '',
  fuel: '',
  mileage: '',
  acceptPrivacy: false,
  valuation: '',
  unsubscribe: false,
  condition: '',
  serviceHistory: '',
  step: 0,
};

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
  endpointPush: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('~contexts', () => ({
  useUserContext: jest.fn(),
  useGOContext: jest.fn(),
  useSsjContext: jest.fn().mockReturnValue({
    setSsj: jest.fn(),
    ssj: {},
  }),
  useVehicleContext: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  query: { productAdvertId: '3362300' },
  back: jest.fn(),
}));

useUserContext.mockImplementation(() => ({
  user: {},
}));

useVehicleContext.mockImplementation(() => ({ vehicle: { leadgen_B: false } }));

endpointFetch.mockResolvedValue(global.mockData.myPartex);
useGOContext.mockImplementation(() => ({ isGoRdy: true }));

endpointFetch.mockResolvedValue();

beforeEach(() => {
  Object.defineProperty(window, 'google_optimize', {
    value: {
      get: () => '1',
    },
    configurable: true,
    writable: true,
  });
});

describe('<PartExchange />', () => {
  let wrapper;
  const getWrapper = (method = shallow) => method(<PartExchange />);

  it('PartExchange snapshot', async () => {
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a PlateForm', () => {
    expect(wrapper.find('PlateForm').length).toEqual(1);
  });

  it('should have proper props for PlateForm', () => {
    expect(wrapper.find('PlateForm').props()).toEqual({
      setData: expect.any(Function),
      payData,
      setNextStep: expect.any(Function),
      urlParams: { productAdvertId: '3362300' },
      productAdvertId: '3362300',
      deleteEmptyUrlParams: expect.any(Function),
      scroll: expect.any(Function),
      leadgen: '0',
      setIsLoading: expect.any(Function),
    });
  });

  it('button "Back" should be clicked', () => {
    wrapper = getWrapper();
    const back = 'button[type="button"][name="back"]';
    const getChild = () => wrapper.find(back);

    getChild().invoke('onClick')();
  });

  it('valid form can be submitted', async () => {
    wrapper = getWrapper(mount);
    await global.updateWrapper(wrapper);
    const form = 'form[data-id="plate-form"]';
    const plate = 'input[type="text"][name="plate"]';
    const event = { target: { value: 'AB12CDE', name: 'plate' } };

    payData.registration = 'AB12CDE';
    const data = { ...payData, productAdvertId: '3362300' };

    wrapper.find(plate).simulate('change', event);
    wrapper.find(form).simulate('submit', submitEvent);

    await act(async () =>
      expect(endpointFetch).toHaveBeenCalledWith('checkPlatePartEx', data)
    );
  });
});
