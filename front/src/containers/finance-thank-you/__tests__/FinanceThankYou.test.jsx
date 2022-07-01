import React from 'react';
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router';

import { endpointFetch } from '~utils';
import FinanceThankYou from '../FinanceThankYou';
import { confirmationProductInformation } from '../../../../jest/mock-data';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  asPath:
    '/finance-thank-you?quoteId=982643&quoteItemId=1007489&productAdvertId=3365923',
}));

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
}));

endpointFetch
  .mockResolvedValueOnce(confirmationProductInformation)
  .mockResolvedValueOnce(confirmationProductInformation)
  .mockResolvedValueOnce({
    ...confirmationProductInformation,
    reservationInformation: null,
  })
  .mockResolvedValueOnce(confirmationProductInformation)
  .mockResolvedValueOnce({
    ...confirmationProductInformation,
    productInformation: null,
    reservationInformation: null,
  })
  .mockResolvedValueOnce({
    ...confirmationProductInformation,
    productInformation: {
      ...confirmationProductInformation.productInformation,
      leadgen_B: true,
    },
  });

describe('<FinanceThankYou />', () => {
  let wrapper;

  const getWrapper = (method = shallow) => method(<FinanceThankYou />);

  it('renders without errors', async () => {
    wrapper = getWrapper(mount);

    await act(async () => expect(wrapper).toMatchSnapshot());
  });

  it('endpointFetch was called', async () => {
    wrapper = getWrapper(mount);

    await act(async () =>
      expect(endpointFetch).toBeCalledWith('confirmationProductInformation', {
        productAdvertId: '3365923',
      })
    );
  });

  it('Finance form submitted without reservation', async () => {
    wrapper = getWrapper(mount);
    const heading = '[data-id="next-action-heading"]';
    const guideActionLink = '[data-id="guide-action-link"]';
    const cardLink = '[data-id="card-action-link"]';

    await global.updateWrapper(wrapper);

    expect(wrapper.find(heading).text()).toBe('Reserve your car');

    expect(wrapper.find(cardLink).text()).toBe('Pay my deposit');

    expect(wrapper.find(guideActionLink).text()).toBe('Reserve this car');
  });

  it('Finance form submitted after reservation', async () => {
    wrapper = getWrapper(mount);
    const heading = '[data-id="next-action-heading"]';
    const reservationInfo = '[data-id="card-reservation-info"]';
    const cardLink = '[data-id="card-action-link"]';

    await global.updateWrapper(wrapper);

    expect(wrapper.find(heading).text()).toBe(
      'You have successfully reserved your car'
    );

    expect(wrapper.find(reservationInfo).text()).toBe(
      'You paid £199 to reserve this car on 13.06.18'
    );

    expect(wrapper.find(cardLink).text()).toBe('Go to my account');
  });

  it('Finance form submitted without car', async () => {
    wrapper = getWrapper(mount);
    const searchLink = '[data-id="confirmation-search-link"]';
    const guideActionLink = '[data-id="guide-action-link"]';

    await global.updateWrapper(wrapper);

    expect(wrapper.find(searchLink).text()).toBe('Search cars');

    expect(wrapper.find(guideActionLink).text()).toBe('Search for a car');
  });

  it('LeadGen flow ', async () => {
    wrapper = getWrapper(mount);
    const heading = '[data-id="leadgen_confirmation_heading"]';

    await global.updateWrapper(wrapper);

    expect(wrapper.find(heading).text()).toBe(
      'Thank you, your financeapplication has been received'
    );
  });
});
