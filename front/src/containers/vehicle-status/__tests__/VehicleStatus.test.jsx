import React from 'react';
import { DEVICE_TYPES } from '~constants';
import { endpointFetch } from '~utils';
import VehicleStatus, { Finance, Order, Verify, Delivery } from '..';
import { steps, subSteps } from '../helpers';

const { DESKTOP } = DEVICE_TYPES;

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
}));

global.mockUseRouter({
  useRouter: jest.fn(),
});

global.mockUseOrderSummaryContext({
  actions: {
    getDetails: jest.fn(),
  },
  state: {
    isOpen: false,
  },
});

global.mockUseDeviceContext({ device: DESKTOP });

const quoteDetails = {
  step: steps.SEARCH.id,
  subStep: subSteps.START,
  vehicle: {
    advertId: 1556200,
    make: 'vauxhall',
    model: 'corsa hatchback special eds',
    van: true,
    year: 2010,
  },
  customerFinanceTerms: {
    financeQuoteId: 3735215,
  },
  lenderFinanceTerms: {},
  quote: {},
  partex: [],
  financeApplication: {},
  softCreditSearch: {
    band: 'B',
    score: 420,
  },
  reservation: {},
  order: {},
  verification: {},
  delivery: { bookedDate: 'Tue Sep 16 13:33:50 BST 2021' },
};

global.mockUseRouter({
  pathname: '/account/vehicle-status',
  query: {
    quoteId: 10500361,
    quoteItemId: 1523212,
    productAdvertId: 1020046,
  },
});

describe('<VehicleStatus />', () => {
  it('should match snapshot (search)', async () => {
    endpointFetch.mockResolvedValueOnce({ quoteDetails });
    const wrapper = mount(<VehicleStatus />);

    await global.updateWrapper(wrapper);

    expect(wrapper).toMatchSnapshot();
  });

  it('handles finance step case)', async () => {
    endpointFetch.mockResolvedValueOnce({
      quoteDetails: {
        ...quoteDetails,
        step: steps.FINANCE.id,
        subStep: subSteps.SOFT,
      },
    });
    const wrapper = mount(<VehicleStatus />);

    await global.updateWrapper(wrapper);

    expect(wrapper.find(Finance).exists()).toBe(true);
  });

  it('handles order step case', async () => {
    endpointFetch.mockResolvedValueOnce({
      quoteDetails: {
        ...quoteDetails,
        step: steps.ORDER.id,
        subStep: subSteps.PENDING_NO_PAID,
      },
    });
    const wrapper = mount(<VehicleStatus />);

    await global.updateWrapper(wrapper);

    expect(wrapper.find(Order).exists()).toBe(true);
  });

  it('handles verify step case', async () => {
    endpointFetch.mockResolvedValueOnce({
      quoteDetails: {
        ...quoteDetails,
        step: steps.VERIFY.id,
        subStep: subSteps.LINK_SENT,
      },
    });
    const wrapper = mount(<VehicleStatus />);

    await global.updateWrapper(wrapper);

    expect(wrapper.find(Verify).exists()).toBe(true);
  });

  it('handles delivery step case', async () => {
    endpointFetch.mockResolvedValueOnce({
      quoteDetails: {
        ...quoteDetails,
        step: steps.DELIVERY.id,
        subStep: subSteps.BOOKED,
      },
    });
    const wrapper = mount(<VehicleStatus />);

    await global.updateWrapper(wrapper);

    expect(wrapper.find(Delivery).exists()).toBe(true);
  });
});
